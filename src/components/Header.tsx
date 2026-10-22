import React, { useState } from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../data/content';
import { Globe, Menu, X, UserCheck } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  isAuthenticated: boolean;
  onOpenDashboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenLogin,
  onOpenRegister,
  isAuthenticated,
  onOpenDashboard,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = translations[currentLang];

  const languages: { code: Language; label: string; script: string }[] = [
    { code: 'en', label: 'English', script: 'EN' },
    { code: 'te', label: 'తెలుగు', script: 'Telugu' },
    { code: 'hi', label: 'हिन्दी', script: 'Hindi' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF9F0]/95 backdrop-blur-md border-b border-[#FF9933]/20 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-20 sm:min-h-22 py-2 flex items-center justify-between gap-4">
        {/* Left Zone: Prominent Logo Symbol with Samskara Bharat text */}
        <a 
          href="#" 
          className="shrink-0 flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF9933] rounded-lg"
          aria-label="Samskara Bharat Home"
        >
          <Logo size="md" currentLang={currentLang} />
        </a>

        {/* Center Zone: Clean Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-[#17324D]/85">
          <a
            href="#about"
            className="hover:text-[#FF9933] transition-colors py-1 whitespace-nowrap"
          >
            {t.nav.about}
          </a>
          <a
            href="#curriculum"
            className="hover:text-[#FF9933] transition-colors py-1 whitespace-nowrap"
          >
            {t.nav.curriculum}
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#FF9933] transition-colors py-1 whitespace-nowrap"
          >
            {t.nav.howItWorks}
          </a>
          <a
            href="#modes"
            className="hover:text-[#FF9933] transition-colors py-1 whitespace-nowrap"
          >
            {t.nav.modes}
          </a>
        </nav>

        {/* Right Zone: Language Selector + Auth Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#17324D] bg-white border border-[#FF9933]/30 rounded-xl hover:bg-[#FFF2DE] hover:border-[#FF9933] transition-all shadow-2xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF9933]"
              aria-label="Select Language"
              aria-expanded={langMenuOpen}
            >
              <Globe className="w-4 h-4 text-[#22A06B]" />
              <span>{languages.find((l) => l.code === currentLang)?.label}</span>
            </button>

            {langMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setLangMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-[#FF9933]/20 py-1.5 z-20">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                        currentLang === lang.code
                          ? 'bg-[#FFF9F0] text-[#FF9933] font-bold'
                          : 'text-[#17324D] hover:bg-[#FFF9F0]/60'
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span className="text-[10px] text-gray-400">{lang.script}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Login and Register Buttons */}
          {isAuthenticated ? (
            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#22A06B] hover:bg-[#1b8256] rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <UserCheck className="w-4 h-4" />
              <span>Student Dashboard</span>
            </button>
          ) : (
            <>
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 text-xs font-bold text-[#17324D] hover:text-[#FF9933] bg-white hover:bg-[#FFF2DE] border border-gray-200 hover:border-[#FF9933]/50 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-2xs"
              >
                {t.nav.login}
              </button>
              <button
                onClick={onOpenRegister}
                className="px-4 py-2 text-xs font-bold text-white bg-[#FF9933] hover:bg-[#e68524] rounded-xl shadow-xs hover:shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                {t.nav.register}
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Quick Language pill on mobile */}
          <button
            onClick={() => {
              const next: Record<Language, Language> = { en: 'te', te: 'hi', hi: 'en' };
              onLanguageChange(next[currentLang]);
            }}
            className="p-2 text-xs font-bold text-[#17324D] bg-white border border-[#FF9933]/30 rounded-lg flex items-center gap-1"
            title="Cycle Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#22A06B]" />
            <span className="text-[11px] uppercase">{currentLang}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-[#17324D] hover:bg-white border border-transparent hover:border-gray-200 transition-colors focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#FF9933]/20 bg-[#FFF9F0] px-4 pt-4 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 font-semibold text-base text-[#17324D]">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white hover:text-[#FF9933] transition-colors"
            >
              {t.nav.about}
            </a>
            <a
              href="#curriculum"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white hover:text-[#FF9933] transition-colors"
            >
              {t.nav.curriculum}
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white hover:text-[#FF9933] transition-colors"
            >
              {t.nav.howItWorks}
            </a>
            <a
              href="#modes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white hover:text-[#FF9933] transition-colors"
            >
              {t.nav.modes}
            </a>
          </nav>

          <div className="pt-2 border-t border-gray-200 flex flex-col gap-2">
            <span className="text-xs font-semibold text-gray-500 px-1">Choose Language:</span>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 text-xs font-bold rounded-lg border text-center transition-all ${
                    currentLang === lang.code
                      ? 'bg-[#FF9933] text-white border-[#FF9933]'
                      : 'bg-white text-[#17324D] border-gray-200'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  onOpenDashboard();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 text-sm font-bold text-white bg-[#22A06B] rounded-xl flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Open Student Dashboard</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    onOpenLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-sm font-bold text-[#17324D] bg-white border border-gray-300 rounded-xl"
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={() => {
                    onOpenRegister();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-sm font-bold text-white bg-[#FF9933] rounded-xl shadow-xs"
                >
                  {t.nav.register}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
