/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroEntrance } from './components/HeroEntrance';
import { AboutSection } from './components/AboutSection';
import { CurriculumSection } from './components/CurriculumSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { LearningModesSection } from './components/LearningModesSection';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AuthModals } from './components/AuthModals';
import { Language, StudentUser, AuthState } from './types';

type AppView = 'entrance' | 'login' | 'register' | 'dashboard';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<AppView>('entrance');

  // Contact and Privacy footer modal states
  const [contactOpen, setContactOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // Authentication state with local storage restoration
  const [authState, setAuthState] = useState<AuthState>(() => {
    const saved = localStorage.getItem('sb_active_student');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          isAuthenticated: true,
          user: parsed,
        };
      } catch (e) {
        console.error('Failed to parse active student from local storage', e);
      }
    }
    return {
      isAuthenticated: false,
      user: null,
    };
  });

  // Keep localStorage synchronized with active student
  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      localStorage.setItem('sb_active_student', JSON.stringify(authState.user));
    } else {
      localStorage.removeItem('sb_active_student');
    }
  }, [authState]);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    if (authState.user) {
      setAuthState((prev) => ({
        ...prev,
        user: prev.user ? { ...prev.user, preferredLanguage: lang } : null,
      }));
    }
  };

  const handleExploreCurriculum = () => {
    const el = document.getElementById('curriculum');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBeginLearning = () => {
    if (authState.isAuthenticated && authState.user) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('login');
    }
  };

  const handleLoginSuccess = (student: StudentUser) => {
    setAuthState({
      isAuthenticated: true,
      user: student,
    });
    setCurrentView('dashboard');
  };

  const handleRegisterSuccess = (student: StudentUser) => {
    setAuthState({
      isAuthenticated: true,
      user: student,
    });
    setCurrentView('dashboard');
  };

  const handleUpdateUser = (updatedUser: StudentUser) => {
    setAuthState({
      isAuthenticated: true,
      user: updatedUser,
    });
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
    setCurrentView('entrance');
  };

  // 1. DEDICATED LOGIN VIEW
  if (currentView === 'login') {
    return (
      <LoginPage
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onLoginSuccess={handleLoginSuccess}
        onNavigateToRegister={() => setCurrentView('register')}
        onReturnToHome={() => setCurrentView('entrance')}
      />
    );
  }

  // 2. DEDICATED STUDENT REGISTRATION VIEW
  if (currentView === 'register') {
    return (
      <RegisterPage
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onRegisterSuccess={handleRegisterSuccess}
        onNavigateToLogin={() => setCurrentView('login')}
        onReturnToHome={() => setCurrentView('entrance')}
      />
    );
  }

  // 3. STUDENT DASHBOARD VIEW
  if (currentView === 'dashboard' && authState.user) {
    return (
      <StudentDashboard
        user={authState.user}
        onLogout={handleLogout}
        onReturnToHome={() => setCurrentView('entrance')}
        onUpdateUser={handleUpdateUser}
      />
    );
  }

  // 4. MAIN PUBLIC ENTRANCE PAGE (Preserved in full)
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F0] text-[#17324D] selection:bg-[#FF9933]/25 selection:text-[#17324D]">
      
      {/* Top Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenLogin={() => setCurrentView('login')}
        onOpenRegister={() => setCurrentView('register')}
        isAuthenticated={authState.isAuthenticated}
        onOpenDashboard={() => setCurrentView('dashboard')}
      />

      <main className="grow">
        {/* Main Entrance Section (Sanskrit Motto & Tasteful Illustration) */}
        <HeroEntrance
          currentLang={currentLang}
          onExploreCurriculum={handleExploreCurriculum}
          onBeginLearning={handleBeginLearning}
        />

        {/* Public Information Sections */}
        <AboutSection currentLang={currentLang} />
        <CurriculumSection currentLang={currentLang} />
        <HowItWorksSection currentLang={currentLang} />
        <LearningModesSection currentLang={currentLang} />
      </main>

      {/* Footer with Contact and Privacy Triggers */}
      <Footer
        currentLang={currentLang}
        onOpenContact={() => setContactOpen(true)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />

      {/* Contact and Privacy Dialogs */}
      <AuthModals
        currentLang={currentLang}
        loginOpen={false}
        registerOpen={false}
        dashboardOpen={false}
        contactOpen={contactOpen}
        privacyOpen={privacyOpen}
        onCloseAll={() => {
          setContactOpen(false);
          setPrivacyOpen(false);
        }}
        onOpenLogin={() => setCurrentView('login')}
        onOpenRegister={() => setCurrentView('register')}
        authState={authState}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />
    </div>
  );
}
