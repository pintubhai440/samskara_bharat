import React, { useState } from 'react';
import { Language, AuthState, StudentUser } from '../types';
import { X, Lock, User, GraduationCap, School, Mail, Phone, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface AuthModalsProps {
  currentLang: Language;
  loginOpen: boolean;
  registerOpen: boolean;
  dashboardOpen: boolean;
  contactOpen: boolean;
  privacyOpen: boolean;
  onCloseAll: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  authState: AuthState;
  onLoginSuccess: (user: StudentUser) => void;
  onLogout: () => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  currentLang,
  loginOpen,
  registerOpen,
  dashboardOpen,
  contactOpen,
  privacyOpen,
  onCloseAll,
  onOpenLogin,
  onOpenRegister,
  authState,
  onLoginSuccess,
  onLogout,
}) => {
  // Login form state
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginRole, setLoginRole] = useState<'student' | 'teacher'>('student');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regGrade, setRegGrade] = useState('Class 6');
  const [regSchool, setRegSchool] = useState('');
  const [regParentContact, setRegParentContact] = useState('');
  const [regSuccessMessage, setRegSuccessMessage] = useState(false);

  // Student notebook thought for dashboard preview
  const [studentJournal, setStudentJournal] = useState(
    'Today during recess, I noticed a junior student dropping their water bottle. Remembering our lesson on Daya, I helped them pick it up and refill it.'
  );
  const [journalSaved, setJournalSaved] = useState(false);

  // Quick Demo Login helper
  const handleQuickDemoLogin = (gradeName = 'Class 6') => {
    onLoginSuccess({
      id: 'demo-aditya',
      name: 'Aditya Sharma',
      username: 'aditya_sharma',
      email: 'aditya@samskarabharat.edu',
      grade: gradeName,
      school: 'Bharatiya Vidya Vidyalaya',
      preferredLanguage: currentLang,
      avatarId: 'avatar-aarav',
      role: 'student',
      createdAt: new Date().toISOString(),
    });
    onCloseAll();
  };

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      id: `student-${Date.now()}`,
      name: loginId.trim() || 'Aditya Sharma',
      username: (loginId.trim() || 'aditya').toLowerCase().replace(/\s+/g, '_'),
      email: loginId.includes('@') ? loginId.trim() : `${loginId.trim()}@samskarabharat.edu`,
      grade: 'Class 6',
      school: 'Bharatiya Vidya Vidyalaya',
      preferredLanguage: currentLang,
      avatarId: 'avatar-aarav',
      role: 'student',
      createdAt: new Date().toISOString(),
    });
    onCloseAll();
  };

  const handleRegisterFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSuccessMessage(true);
    setTimeout(() => {
      onLoginSuccess({
        id: `student-${Date.now()}`,
        name: regName.trim() || 'Student Scholar',
        username: (regName.trim() || 'student').toLowerCase().replace(/\s+/g, '_'),
        email: regParentContact.includes('@') ? regParentContact.trim() : `${regName.toLowerCase().replace(/\s+/g, '')}@samskarabharat.edu`,
        grade: regGrade,
        school: regSchool.trim() || 'Samskara Gurukulam',
        preferredLanguage: currentLang,
        avatarId: 'avatar-ananya',
        role: 'student',
        createdAt: new Date().toISOString(),
      });
      setRegSuccessMessage(false);
      onCloseAll();
    }, 1200);
  };

  const gradesList = [
    'LKG', 'UKG',
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'
  ];

  if (!loginOpen && !registerOpen && !dashboardOpen && !contactOpen && !privacyOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      
      {/* 1. LOGIN MODAL */}
      {loginOpen && (
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={onCloseAll}
            className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center mb-6">
            <Logo size="sm" currentLang={currentLang} />
            <h3 className="text-2xl font-bold text-[#17324D] font-heading mt-3">
              Student &amp; School Login
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Enter your student roll number or school login credentials
            </p>
          </div>

          <form onSubmit={handleLoginFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#17324D] mb-1">
                Student ID or Registered Mobile
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="e.g. SB-2026-8491 or 9876543210"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17324D] mb-1">
                Passcode / Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-sm font-bold text-white bg-[#FF9933] hover:bg-[#e68524] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Sign In to Learning Portal
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-5 pt-4 border-t border-gray-100 text-center">
            <span className="text-[11px] font-medium text-gray-500 block mb-2">
              For testing evaluation:
            </span>
            <button
              onClick={() => handleQuickDemoLogin('Class 6')}
              className="w-full py-2 px-3 text-xs font-bold text-[#22A06B] bg-[#22A06B]/10 hover:bg-[#22A06B]/20 rounded-xl transition-colors cursor-pointer"
            >
              One-Click Demo Student Preview (Aditya · Class 6)
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                onCloseAll();
                onOpenRegister();
              }}
              className="text-xs font-semibold text-gray-600 hover:text-[#FF9933] transition-colors"
            >
              New student or school? <strong className="text-[#FF9933]">Register Now</strong>
            </button>
          </div>
        </div>
      )}

      {/* 2. REGISTER MODAL */}
      {registerOpen && (
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={onCloseAll}
            className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center mb-6">
            <Logo size="sm" currentLang={currentLang} />
            <h3 className="text-2xl font-bold text-[#17324D] font-heading mt-3">
              Register Student for Samskara Bharat
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Begin character-building education from LKG to Class 10
            </p>
          </div>

          {regSuccessMessage ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#22A06B]/20 text-[#22A06B] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#17324D]">Registration Complete!</h4>
              <p className="text-xs text-gray-600">
                Opening your student learning portal...
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegisterFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#17324D] mb-1">
                  Student Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#17324D] mb-1">
                    Class / Grade Level
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <select
                      value={regGrade}
                      onChange={(e) => setRegGrade(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:border-[#FF9933]"
                    >
                      {gradesList.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17324D] mb-1">
                    School Name
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={regSchool}
                      onChange={(e) => setRegSchool(e.target.value)}
                      placeholder="School name"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#FF9933]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17324D] mb-1">
                  Parent or Guardian Contact Phone / Email
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={regParentContact}
                    onChange={(e) => setRegParentContact(e.target.value)}
                    placeholder="+91 98765 43210 or parent@email.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="text-[11px] text-gray-500 leading-normal">
                By registering, parents and schools agree to the Samskara Bharat ethical code of conduct.
              </div>

              <button
                type="submit"
                className="w-full py-3 text-sm font-bold text-white bg-[#22A06B] hover:bg-[#1b8256] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Register &amp; Begin Journey
              </button>
            </form>
          )}

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                onCloseAll();
                onOpenLogin();
              }}
              className="text-xs font-semibold text-gray-600 hover:text-[#FF9933] transition-colors"
            >
              Already registered? <strong className="text-[#FF9933]">Login here</strong>
            </button>
          </div>
        </div>
      )}

      {/* 3. STUDENT DASHBOARD PREVIEW MODAL */}
      {dashboardOpen && (
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={onCloseAll}
            className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Student Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF9933]/15 text-[#FF9933] flex items-center justify-center font-bold text-lg font-heading">
                {authState.user?.name.charAt(0) || 'S'}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#17324D] font-heading">
                  {authState.user?.name || 'Student Scholar'}
                </h3>
                <p className="text-xs text-gray-500">
                  {authState.user?.grade || 'Class 6'} · {authState.user?.school || 'Bharatiya Vidya'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#22A06B] bg-[#22A06B]/10 px-3 py-1 rounded-full">
                Active Student
              </span>
              <button
                onClick={onLogout}
                className="px-3 py-1 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Transparent Notice */}
          <div className="my-4 p-3 bg-[#FFF9F0] border border-[#FF9933]/25 rounded-xl text-xs text-gray-700 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
            <span>
              <strong>Student Dashboard Preview:</strong> You are viewing the authenticated student workspace. Full progress sync with school servers will occur upon backend deployment.
            </span>
          </div>

          {/* Current Active Guna */}
          <div className="space-y-4 my-6">
            <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#FF9933]/25">
              <span className="text-[11px] font-bold text-[#FF9933] uppercase tracking-wider">
                Current Active Module
              </span>
              <h4 className="text-base font-bold text-[#17324D] mt-1">
                Module 04: Vinaya (Humility &amp; True Knowledge)
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                Episode: &quot;The Scholar and the Boatman&quot; from Classical Panchatantra
              </p>
            </div>

            {/* Student Reflection Journal */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#17324D]">
                My Private Reflection Journal (Swadhyaya)
              </label>
              <textarea
                rows={3}
                value={studentJournal}
                onChange={(e) => {
                  setStudentJournal(e.target.value);
                  setJournalSaved(false);
                }}
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933]"
                placeholder="Write your reflections on today's moral challenge..."
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  {journalSaved ? '✓ Saved to your session' : 'Changes uncommitted'}
                </span>
                <button
                  onClick={() => setJournalSaved(true)}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-[#22A06B] hover:bg-[#1c8055] rounded-lg transition-colors cursor-pointer"
                >
                  Save Reflection
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={onCloseAll}
              className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
            >
              Return to Entrance Page
            </button>
            <a
              href="#curriculum"
              onClick={onCloseAll}
              className="text-xs font-bold text-[#FF9933] hover:underline flex items-center gap-1"
            >
              <span>Explore All 16 Gunas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* 4. CONTACT MODAL */}
      {contactOpen && (
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={onCloseAll}
            className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-2xl font-bold text-[#17324D] font-heading mb-2">
            Contact Samskara Bharat
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            School partnerships, teacher orientation workshops, and curriculum queries
          </p>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#FF9933]/20 flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#FF9933] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#17324D] text-xs">Curriculum &amp; School Inquiries</strong>
                <span className="text-xs text-gray-600">contact@samskarabharat.org</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#22A06B]/20 flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#22A06B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#17324D] text-xs">Education Helpline (Toll-Free)</strong>
                <span className="text-xs text-gray-600">1800-SAMSKARA (Mon - Sat, 9:00 AM - 5:00 PM IST)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 text-xs leading-relaxed text-gray-600">
              <strong className="text-[#17324D] block mb-1">Central Secretariat:</strong>
              Samskara Bharat Bhavan, New Delhi &amp; Hyderabad Academic Hub, India.
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onCloseAll}
              className="w-full py-2.5 text-xs font-bold text-white bg-[#17324D] hover:bg-[#254668] rounded-xl transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* 5. PRIVACY MODAL */}
      {privacyOpen && (
        <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
          <button
            onClick={onCloseAll}
            className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-2xl font-bold text-[#17324D] font-heading mb-2">
            Student Privacy &amp; Data Ethics Policy
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            Committed to child safety, ethical reflection privacy, and zero commercial tracking
          </p>

          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div>
              <h4 className="font-bold text-[#17324D] mb-1">1. Introspective Privacy Guarantee</h4>
              <p className="text-gray-600">
                A child&apos;s reflective answers in the Individual Mode (Swadhyaya) are personal moral exercises. They are never sold, graded competitively, or made public.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#17324D] mb-1">2. Zero Advertisements &amp; No Dark Patterns</h4>
              <p className="text-gray-600">
                Samskara Bharat contains zero third-party advertisements, behavioral ad trackers, or addictive gamification algorithms.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#17324D] mb-1">3. Parental &amp; School Consent</h4>
              <p className="text-gray-600">
                Accounts for minors (LKG to Class 10) require parental or institutional school enrollment verification in accordance with Digital Personal Data Protection (DPDP) frameworks.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onCloseAll}
              className="w-full py-2.5 text-xs font-bold text-white bg-[#17324D] hover:bg-[#254668] rounded-xl transition-colors cursor-pointer"
            >
              Understood &amp; Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
