import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AccessibilityBar } from './components/layout/AccessibilityBar';
import { Header } from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';

// Pages
import { HomePage } from './pages/HomePage';
import { WizardPage } from './pages/WizardPage';
import { SchemesPage } from './pages/SchemesPage';
import { SchemeDetailPage } from './pages/SchemeDetailPage';
import { ChatPage } from './pages/ChatPage';
import { DigiLockerCallback } from './pages/DigiLockerCallback';
import { CscPage } from './pages/CscPage';
import { AboutPage } from './pages/AboutPage';
import { DashboardPage } from './pages/DashboardPage';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-setu-bg text-slate-900 selection:bg-setu-saffron selection:text-white">
      {/* 1. Fixed Accessibility Bar */}
      <AccessibilityBar />

      {/* 2. Top Header with Emblem */}
      <Header />

      {/* 3. Sticky Navigation Bar */}
      <Navbar />

      {/* 4. Main Content Area */}
      <main id="main-content" className="flex-1 pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find" element={<WizardPage />} />
          <Route path="/schemes" element={<SchemesPage />} />
          <Route path="/schemes/:id" element={<SchemeDetailPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/digilocker/callback" element={<DigiLockerCallback />} />
          <Route path="/csc" element={<CscPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>

      {/* 5. Official Government Footer */}
      <Footer />

      {/* 6. Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};
