import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, LogOut, CheckCircle, Shield } from 'lucide-react';
import { LoginModal } from './LoginModal';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem('setu_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem('setu_user', JSON.stringify(user));
  };

  const handleLogout = async () => {
    try {
      const { logout } = await import('../../firebase');
      await logout();
    } catch (e) {
      console.error(e);
    }
    setCurrentUser(null);
    localStorage.removeItem('setu_user');
  };

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-3 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo & National Seal */}
          <Link to="/" className="flex items-center space-x-3.5 group">
            {/* Ashoka Pillar SVG Seal */}
            <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg p-1.5 shadow-xs">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full fill-[#1A3A6B]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 4-lion Ashoka capital stylised vector */}
                <circle cx="50" cy="50" r="46" fill="none" stroke="#1A3A6B" strokeWidth="4" />
                <circle cx="50" cy="50" r="14" fill="none" stroke="#FF6B00" strokeWidth="3" />
                <path d="M50 12 L50 88 M12 50 L88 50 M23 23 L77 77 M23 77 L77 23" stroke="#138808" strokeWidth="2" />
                <rect x="42" y="32" width="16" height="36" rx="3" fill="#1A3A6B" />
                <path d="M30 68 L70 68 L64 78 L36 78 Z" fill="#1A3A6B" />
                <circle cx="50" cy="24" r="6" fill="#FF6B00" />
              </svg>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-2xl tracking-tight text-setu-blue">
                  SETU
                </span>
                <span className="text-slate-300 font-light text-xl">|</span>
                <span className="font-bold text-xl text-setu-saffron font-serif">
                  सेतु
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-[11px] font-medium text-slate-500">
                <span>Government of India</span>
                <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                <span className="text-slate-600">भारत सरकार</span>
              </div>
            </div>
          </Link>

          {/* Right Action: Auth / User info */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 shadow-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-setu-green">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-semibold text-slate-800">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500">Aadhaar: ****{currentUser.aadhaar_last4}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="flex items-center space-x-2 bg-white hover:bg-slate-50 border border-setu-blue text-setu-blue px-4 py-2 rounded-lg font-semibold text-xs shadow-xs hover:shadow transition-all"
              >
                <User className="w-4 h-4 text-setu-blue" />
                <span>{t('nav.login')}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};
