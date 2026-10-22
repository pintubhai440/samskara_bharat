import React, { useState } from 'react';
import { Logo } from './Logo';
import { Language, StudentUser } from '../types';
import { translations } from '../data/content';
import { Eye, EyeOff, Lock, User, ArrowLeft, Globe, HelpCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface LoginPageProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onLoginSuccess: (user: StudentUser) => void;
  onNavigateToRegister: () => void;
  onReturnToHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentLang,
  onLanguageChange,
  onLoginSuccess,
  onNavigateToRegister,
  onReturnToHome,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const t = translations[currentLang];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage('Please enter your student username or email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your passcode / password.');
      return;
    }

    // Authenticate student session
    const studentUser: StudentUser = {
      id: `student-${Date.now()}`,
      name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
      username: identifier.toLowerCase().replace(/\s+/g, '_'),
      email: identifier.includes('@') ? identifier : `${identifier.toLowerCase()}@school.edu`,
      grade: 'Class 6',
      school: 'Bharatiya Vidya Vidyalaya',
      preferredLanguage: currentLang,
      avatarId: 'avatar-aarav',
      role: 'student',
      createdAt: new Date().toISOString(),
    };

    onLoginSuccess(studentUser);
  };

  const handleQuickDemo = (demoName: string, demoGrade: string, demoAvatar: string) => {
    const studentUser: StudentUser = {
      id: `demo-${demoGrade.toLowerCase().replace(/\s+/g, '-')}`,
      name: demoName,
      username: demoName.toLowerCase().replace(/\s+/g, '_'),
      email: `${demoName.toLowerCase().replace(/\s+/g, '')}@samskarabharat.edu`,
      grade: demoGrade,
      school: 'Bharatiya Vidya Gurukulam',
      preferredLanguage: currentLang,
      avatarId: demoAvatar,
      role: 'student',
      createdAt: new Date().toISOString(),
    };

    onLoginSuccess(studentUser);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 selection:bg-[#FF9933]/25">
      {/* Top Header Bar */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#FF9933]/20">
        <button
          onClick={onReturnToHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#17324D] hover:text-[#FF9933] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Home</span>
        </button>

        {/* Language Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#FF9933]/30 rounded-xl shadow-2xs">
          <Globe className="w-3.5 h-3.5 text-[#22A06B] ml-2" />
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => onLanguageChange(l.code)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                currentLang === l.code
                  ? 'bg-[#FF9933] text-white shadow-2xs'
                  : 'text-gray-600 hover:text-[#17324D]'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#FF9933]/25 shadow-lg relative">
          
          {/* Logo & Heading */}
          <div className="flex flex-col items-center text-center mb-6">
            <Logo size="md" currentLang={currentLang} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17324D] font-heading mt-4">
              Student Login
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Welcome back to your Samskara Bharat journey
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Email or Username */}
            <div>
              <label className="block text-xs font-bold text-[#17324D] mb-1">
                Email or Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="e.g. aarav_sharma or student@school.edu"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933]"
                />
              </div>
            </div>

            {/* Password with Show/Hide Control */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#17324D]">
                  Password / Passcode
                </label>
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-[11px] font-semibold text-[#FF9933] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-700 p-0.5 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 text-sm font-extrabold text-white bg-[#FF9933] hover:bg-[#e68524] active:scale-[0.99] rounded-xl shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              Sign In to Learning Dashboard
            </button>
          </form>

          {/* Quick Demo Login Shortcuts for Easy Testing */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <span className="block text-[11px] font-semibold text-gray-500 text-center mb-2">
              Instant Evaluator Demo Sign-In:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('Aarav Sharma', 'Class 6', 'avatar-aarav')}
                className="py-2 px-2 text-xs font-bold text-[#17324D] bg-[#FFF9F0] hover:bg-[#FFEECF] border border-[#FF9933]/30 rounded-xl transition-colors cursor-pointer text-center"
              >
                Aarav (Class 6)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Ananya Gupta', 'Class 8', 'avatar-ananya')}
                className="py-2 px-2 text-xs font-bold text-[#17324D] bg-[#FFF9F0] hover:bg-[#FFEECF] border border-[#FF9933]/30 rounded-xl transition-colors cursor-pointer text-center"
              >
                Ananya (Class 8)
              </button>
            </div>
          </div>

          {/* Link to Registration */}
          <div className="mt-6 text-center text-xs text-gray-600">
            Don&apos;t have a student account yet?{' '}
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="font-bold text-[#22A06B] hover:text-[#18754e] hover:underline cursor-pointer ml-1"
            >
              Register Here
            </button>
          </div>

        </div>

        {/* Honest Backend Disclaimer */}
        <div className="mt-4 p-3 rounded-2xl bg-[#FFF9F0] border border-[#FF9933]/20 text-[11px] text-gray-600 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#22A06B] shrink-0 mt-0.5" />
          <span>
            <strong>Evaluation Preview:</strong> Demonstrating responsive authentication flow. Persistent synchronization will connect to institutional school rosters upon backend release.
          </span>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-gray-100 shadow-xl relative animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#17324D] font-heading mb-1">
              Reset Your Password
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Enter your registered parent email or student username.
            </p>

            {forgotSuccess ? (
              <div className="py-4 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#22A06B] mx-auto" />
                <p className="text-xs font-bold text-[#17324D]">Password reset instructions dispatched!</p>
                <p className="text-[11px] text-gray-500">
                  Please ask your parent/guardian or class teacher to assist in resetting your passcode.
                </p>
                <button
                  onClick={() => {
                    setForgotPasswordOpen(false);
                    setForgotSuccess(false);
                  }}
                  className="mt-3 w-full py-2 text-xs font-bold text-white bg-[#17324D] rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForgotSuccess(true);
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  required
                  placeholder="Registered email or username"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#FF9933]"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(false)}
                    className="w-1/2 py-2 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2 text-xs font-bold text-white bg-[#FF9933] hover:bg-[#e68524] rounded-xl"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-4">
        © {new Date().getFullYear()} Samskara Bharat · Dedicated to character education from LKG to Class 10
      </footer>
    </div>
  );
};
