import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ExternalLink, Globe, Landmark, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C2331] text-slate-300 pt-12 pb-6 border-t-4 border-[#00875A] no-print text-xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-700/60">
          
          {/* Col 1: SETU Branding & Identity */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-2xl text-white">SETU</span>
              <span className="text-slate-400 font-light text-xl">|</span>
              <span className="font-bold text-xl text-[#FF7700] font-serif">सेतु</span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              National AI-Powered Citizen Welfare Gateway.<br />
              Powered by <strong className="text-slate-200">Digital India Corporation (DIC)</strong>,<br />
              Ministry of Electronics & IT (MeitY),<br />
              Government of India.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#00875A]" />
              <span>GIGW Compliant | WCAG 2.0 AA Certified</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-700 pb-1.5 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About SETU
                </Link>
              </li>
              <li>
                <Link to="/find" className="hover:text-emerald-400 transition-colors">
                  Find Schemes for You
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="hover:text-emerald-400 transition-colors">
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-emerald-400 transition-colors">
                  SETU AI Assistant
                </Link>
              </li>
              <li>
                <a href="#faqs" className="hover:text-emerald-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Useful Links (Original Gov Portals) */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-700 pb-1.5 inline-block">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a
                  href="https://www.india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-emerald-400 transition-colors"
                >
                  <span>National Portal of India</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-emerald-400 transition-colors"
                >
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://digitalindia.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-emerald-400 transition-colors"
                >
                  <span>Digital India</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://data.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-emerald-400 transition-colors"
                >
                  <span>Open Government Data (OGD)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.digilocker.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-emerald-400 transition-colors"
                >
                  <span>DigiLocker</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Get In Touch */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-700 pb-1.5 inline-block">
              Get in Touch
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>Electronics Niketan, 6, CGO Complex, Lodhi Road, New Delhi: 110003</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>support-setu@gov.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Toll Free: 1800-111-555</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-3 md:space-y-0">
          <div>
            <p>(C) 2026 SETU | Government of India. All Rights Reserved.</p>
            <p className="text-[11px] text-slate-500">Official citizen welfare portal with verified central & state government database integrations.</p>
          </div>

          <div className="flex items-center space-x-5 text-xs text-slate-400">
            <Link to="/about" className="hover:text-white transition-colors">About SETU</Link>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] text-slate-500">Last updated: 26/09/2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
