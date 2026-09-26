import json
import logging
from typing import AsyncGenerator, Dict, Any, List
from sqlalchemy.orm import Session
from app.config import settings
from app.ai.tools import execute_tool, ANTHROPIC_TOOLS
from app.ai.fallback_engine import stream_ai_response as stream_fallback_engine, SYSTEM_PROMPT

logger = logging.getLogger("setu.ai")

async def chat_stream(
    message: str,
    language: str,
    conversation_history: List[Dict[str, str]],
    user_profile: Dict[str, Any],
    db: Session
) -> AsyncGenerator[str, None]:
    """
    Main entry point for AI Chat. Uses Claude if ANTHROPIC_API_KEY is available,
    otherwise uses the built-in deterministic multilingual engine.
    """
    api_key = settings.OPENROUTER_API_KEY or settings.ANTHROPIC_API_KEY
    is_openrouter = bool(settings.OPENROUTER_API_KEY and settings.OPENROUTER_API_KEY.strip())

    if api_key and api_key.strip() != "":
        try:
            import anthropic
            
            if is_openrouter:
                client = anthropic.AsyncAnthropic(
                    api_key=api_key,
                    base_url="https://openrouter.ai/api",
                )
                model_name = "anthropic/claude-3.5-sonnet"
            else:
                client = anthropic.AsyncAnthropic(api_key=api_key)
                model_name = settings.CLAUDE_MODEL

            # Build messages list
            messages = []
            for m in conversation_history:
                role = "user" if m.get("role") == "user" else "assistant"
                messages.append({"role": role, "content": m.get("content", "")})
            messages.append({"role": "user", "content": message})

            # Call Anthropic with tools
            response = await client.messages.create(
                model=model_name,
                max_tokens=1024,
                system=SYSTEM_PROMPT,
                tools=ANTHROPIC_TOOLS,
                messages=messages
            )

            # Check if tools were called
            has_tool_call = False
            for content_block in response.content:
                if content_block.type == "tool_use":
                    has_tool_call = True
                    tool_name = content_block.name
                    tool_input = content_block.input
                    
                    yield f"data: {json.dumps({'type': 'tool_call', 'tool': tool_name, 'input': tool_input})}\n\n"
                    
                    tool_res = execute_tool(tool_name, tool_input, db)
                    yield f"data: {json.dumps({'type': 'tool_result', 'data': tool_res})}\n\n"

                    # Handle contextual right-panel actions
                    if tool_name == "search_schemes":
                        schemes = tool_res.get("schemes", [])
                        yield f"data: {json.dumps({'type': 'action', 'action': 'show_schemes', 'data': {'schemes': schemes, 'count': len(schemes)}})}\n\n"
                    elif tool_name == "check_payment_status":
                        if tool_input.get("requires_digilocker") and not (user_profile and user_profile.get("digilocker_verified")):
                            yield f"data: {json.dumps({'type': 'action', 'action': 'show_digilocker_prompt', 'data': {'scheme_name': tool_input.get('scheme_name')}})}\n\n"
                    elif tool_name == "get_required_documents":
                        yield f"data: {json.dumps({'type': 'action', 'action': 'show_document_checklist', 'data': tool_res})}\n\n"
                    elif tool_name == "check_eligibility":
                        yield f"data: {json.dumps({'type': 'action', 'action': 'show_eligibility_breakdown', 'data': tool_res})}\n\n"

                    # Second turn to summarize tool result
                    followup = await client.messages.create(
                        model=model_name,
                        max_tokens=1024,
                        system=SYSTEM_PROMPT,
                        tools=ANTHROPIC_TOOLS,
                        messages=messages + [
                            {"role": "assistant", "content": [{"type": "tool_use", "id": content_block.id, "name": tool_name, "input": tool_input}]},
                            {"role": "user", "content": [{"type": "tool_result", "tool_use_id": content_block.id, "content": json.dumps(tool_res)}]}
                        ]
                    )

                    for b in followup.content:
                        if b.type == "text":
                            for chunk in b.text.split(" "):
                                yield f"data: {json.dumps({'type': 'text', 'content': chunk + ' '})}\n\n"

                elif content_block.type == "text":
                    for chunk in content_block.text.split(" "):
                        yield f"data: {json.dumps({'type': 'text', 'content': chunk + ' '})}\n\n"

            # Suggestion pills
            yield f"data: {json.dumps({'type': 'suggestions', 'pills': ['Check my eligibility', 'What documents do I need?', 'How do I apply?', 'Find other schemes']})}\n\n"
            yield f"data: {json.dumps({'type': 'done'})}\n\n"
            return

        except Exception as e:
            logger.warning(f"Claude API invocation fallback triggered: {e}")

    # Fallback engine
    async for event in stream_fallback_engine(message, language, conversation_history, user_profile, db):
        yield event
