import React, { useState } from 'react';
import { Logo } from './Logo';
import { Language, StudentUser } from '../types';
import { availableAvatars } from '../data/avatarsData';
import { allClassLevels } from '../data/lessonsData';
import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, GraduationCap, Globe, CheckCircle2, ShieldAlert } from 'lucide-react';

interface RegisterPageProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onRegisterSuccess: (user: StudentUser) => void;
  onNavigateToLogin: () => void;
  onReturnToHome: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  currentLang,
  onLanguageChange,
  onRegisterSuccess,
  onNavigateToLogin,
  onReturnToHome,
}) => {
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [grade, setGrade] = useState('Class 6');
  const [schoolName, setSchoolName] = useState('Bharatiya Vidya Vidyalaya');
  const [preferredLang, setPreferredLang] = useState<Language>(currentLang);
  const [selectedAvatarId, setSelectedAvatarId] = useState('avatar-aarav');
  const [errorMessage, setErrorMessage] = useState('');

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!identifier.trim()) {
      setErrorMessage('Please provide an email or username.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both fields.');
      return;
    }

    // Strictly enforce role as student: public registration can NEVER grant teacher or admin roles
    const newStudentUser: StudentUser = {
      id: `student-${Date.now()}`,
      name: fullName.trim(),
      username: identifier.toLowerCase().replace(/\s+/g, '_'),
      email: identifier.includes('@') ? identifier.trim() : `${identifier.toLowerCase().trim()}@samskarabharat.edu`,
      grade,
      school: schoolName.trim() || 'Bharatiya Vidya Vidyalaya',
      preferredLanguage: preferredLang,
      avatarId: selectedAvatarId,
      avatarConfig: {
        themeColor: availableAvatars.find((a) => a.id === selectedAvatarId)?.themeColor || '#FF9933',
        accessory: 'Student Satchel & Badge',
      },
      role: 'student', // Non-negotiable security invariant
      createdAt: new Date().toISOString(),
    };

    onRegisterSuccess(newStudentUser);
  };

  const selectedAvatar = availableAvatars.find((a) => a.id === selectedAvatarId) || availableAvatars[0];

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 selection:bg-[#FF9933]/25">
      {/* Top Header */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#FF9933]/20">
        <button
          onClick={onReturnToHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#17324D] hover:text-[#FF9933] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Home</span>
        </button>

        {/* Global Language Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#FF9933]/30 rounded-xl shadow-2xs">
          <Globe className="w-3.5 h-3.5 text-[#22A06B] ml-2" />
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                onLanguageChange(l.code);
                setPreferredLang(l.code);
              }}
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

      {/* Main Registration Form */}
      <main className="max-w-xl w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#22A06B]/25 shadow-lg relative">
          
          <div className="flex flex-col items-center text-center mb-6">
            <Logo size="md" currentLang={currentLang} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17324D] font-heading mt-4">
              Student Registration
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Enroll in character education &amp; life skills from LKG to Class 10
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#17324D] mb-1">
                Student Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#22A06B] focus:ring-1 focus:ring-[#22A06B]"
                />
              </div>
            </div>

            {/* Email or Username */}
            <div>
              <label className="block text-xs font-bold text-[#17324D] mb-1">
                Email Address or Username *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="e.g. aarav_sharma or student@school.edu"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#22A06B] focus:ring-1 focus:ring-[#22A06B]"
                />
              </div>
            </div>

            {/* Class Selection & Preferred Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#17324D] mb-1">
                  Class (LKG to Class 10) *
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:border-[#22A06B]"
                  >
                    {allClassLevels.map((lvl) => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17324D] mb-1">
                  Preferred Language *
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <select
                    value={preferredLang}
                    onChange={(e) => setPreferredLang(e.target.value as Language)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:border-[#22A06B]"
                  >
                    <option value="en">English</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* School Name */}
            <div>
              <label className="block text-xs font-bold text-[#17324D] mb-1">
                School Name
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="e.g. Kendriya Vidyalaya / Delhi Public School"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#22A06B]"
              />
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#17324D] mb-1">
                  Password *
                </label>
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
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#22A06B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-700 p-0.5 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17324D] mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Repeat password"
                    className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#22A06B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-700 p-0.5 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Avatar Selection */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#17324D]">
                  Select Your Student Avatar *
                </label>
                <span className="text-[11px] font-semibold text-[#22A06B]">
                  Selected: {selectedAvatar.name.split(' ')[0]}
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 p-2 bg-[#FFF9F0] border border-[#FF9933]/20 rounded-2xl">
                {availableAvatars.map((av) => (
                  <button
                    type="button"
                    key={av.id}
                    onClick={() => setSelectedAvatarId(av.id)}
                    className={`relative p-2 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      selectedAvatarId === av.id
                        ? 'bg-white shadow-md ring-2 ring-[#22A06B] scale-105'
                        : 'hover:bg-white/60'
                    }`}
                    title={av.name}
                  >
                    <span className="text-2xl">{av.emoji}</span>
                    <span className="text-[9px] font-bold text-gray-600 truncate max-w-full mt-1">
                      {av.name.split(' ')[0]}
                    </span>
                    {selectedAvatarId === av.id && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B] absolute -top-1 -right-1 bg-white rounded-full" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-gray-500 mt-1 italic">
                {selectedAvatar.personality} You can customize your avatar anytime inside &quot;My Avatar&quot;.
              </p>
            </div>

            {/* Role Security Guarantee */}
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-[11px] text-blue-800 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Account Privilege:</strong> Public registration is strictly restricted to student accounts. Teacher and administrator credentials must be provisioned through verified school rosters.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 text-sm font-extrabold text-white bg-[#22A06B] hover:bg-[#1a7e53] active:scale-[0.99] rounded-xl shadow-xs hover:shadow-sm transition-all cursor-pointer mt-4"
            >
              Complete Registration &amp; Open Dashboard
            </button>
          </form>

          {/* Link to Login */}
          <div className="mt-6 text-center text-xs text-gray-600">
            Already registered?{' '}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="font-bold text-[#FF9933] hover:text-[#e68524] hover:underline cursor-pointer ml-1"
            >
              Log In Here
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-4">
        © {new Date().getFullYear()} Samskara Bharat · Committed to children&apos;s privacy and ethical learning
      </footer>
    </div>
  );
};
