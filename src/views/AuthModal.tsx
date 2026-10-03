import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  KeyRound, 
  GraduationCap,
  ExternalLink
} from 'lucide-react';
import { UserAccount, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  // Modes: 'login' | 'register' | 'forgot' | 'reset'
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'reset'>('login');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nameKh, setNameKh] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Student');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1-Click Demo Login credentials for instant testing
  const handleQuickDemoLogin = (role: UserRole) => {
    if (role === 'Student') {
      const studentUser: UserAccount = {
        id: 'usr-student-01',
        name: 'Sothea Chan',
        nameKh: 'ចាន់ សុធា',
        email: 'sothea.chan@design.kh',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        role: 'Student',
        memberSince: 'January 2026',
      };
      onLoginSuccess(studentUser);
      onClose();
    } else {
      const instructorUser: UserAccount = {
        id: 'usr-teacher-01',
        name: 'Piseth Yoeurn',
        nameKh: 'យឿន ពិសិដ្ឋ',
        email: 'piseth@piseth.design',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        role: 'Instructor',
        memberSince: 'Founding Member',
      };
      onLoginSuccess(instructorUser);
      onClose();
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    // Determine role based on email or password keyword
    const role: UserRole = email.toLowerCase().includes('piseth') || email.toLowerCase().includes('admin')
      ? 'Instructor'
      : 'Student';

    const user: UserAccount = {
      id: `usr-${Date.now()}`,
      name: role === 'Instructor' ? 'Piseth Yoeurn' : (name || 'Sothea Chan'),
      nameKh: role === 'Instructor' ? 'យឿន ពិសិដ្ឋ' : (nameKh || 'ចាន់ សុធា'),
      email,
      avatar: role === 'Instructor'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      role,
      memberSince: 'October 2026',
    };

    onLoginSuccess(user);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;

    const user: UserAccount = {
      id: `usr-${Date.now()}`,
      name,
      nameKh: nameKh || name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      role: selectedRole,
      memberSince: 'October 2026',
    };

    onLoginSuccess(user);
    onClose();
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatusMessage(`Password reset code has been sent to ${email}. (Demo Code: 4920)`);
    setTimeout(() => {
      setMode('reset');
      setResetCode('4920');
      setStatusMessage(null);
    }, 1500);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('Password updated successfully! Redirecting to login...');
    setTimeout(() => {
      setMode('login');
      setStatusMessage(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200 dark:border-[#222936] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#222936] pb-4">
          <div>
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white font-sans">
              piseth<span className="text-[#4DA3FF]">.design</span>
            </span>
            <span className="text-xs text-slate-400 block font-khmer mt-0.5">
              គណនីចូលរៀន និងគ្រប់គ្រង
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs">
            {statusMessage}
          </div>
        )}

        {/* Quick Demo Logins Banner */}
        {mode === 'login' && (
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#11161d] border border-slate-200/80 dark:border-[#222936] space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
              Quick 1-Click Role Login:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Student')}
                className="p-2 rounded-xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-[#4DA3FF] text-left transition-colors cursor-pointer"
              >
                <span className="font-bold block text-slate-900 dark:text-white">Student Demo</span>
                <span className="text-[10px] text-slate-400">Sothea Chan</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Instructor')}
                className="p-2 rounded-xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-[#4DA3FF] text-left transition-colors cursor-pointer"
              >
                <span className="font-bold block text-slate-900 dark:text-white">Teacher Demo</span>
                <span className="text-[10px] text-[#4DA3FF] font-semibold">Piseth Yoeurn</span>
              </button>
            </div>
          </div>
        )}

        {/* 1. LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Sign in to your account
              </h2>
              <p className="text-xs text-slate-500">
                Welcome back! Please enter your details.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Email Address:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sothea.chan@design.kh"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4DA3FF]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Password:
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-[#4DA3FF] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4DA3FF]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white font-semibold text-xs transition-all shadow-md shadow-[#4DA3FF]/20 cursor-pointer"
            >
              Sign In (ចូលរៀន)
            </button>

            {/* Optional Google Login */}
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('Student')}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-[#222936] bg-white dark:bg-[#151B23] hover:bg-slate-50 dark:hover:bg-[#1C232D] text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-[#222936]">
              <span>Don't have an account? </span>
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-[#4DA3FF] font-semibold hover:underline"
              >
                Register here
              </button>
            </div>
          </form>
        )}

        {/* 2. REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Create your student account
              </h2>
              <p className="text-xs text-slate-500">
                Join 2,400+ Cambodian design students.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Full Name (English):</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sothea Chan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Name in Khmer (ឈ្មោះជាភាសាខ្មែរ):</label>
                <input
                  type="text"
                  placeholder="e.g. ចាន់ សុធា"
                  value={nameKh}
                  onChange={(e) => setNameKh(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Email:</label>
                <input
                  type="email"
                  required
                  placeholder="sothea@design.kh"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Password:</label>
                <input
                  type="password"
                  required
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Select Role:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('Student')}
                    className={`p-2 rounded-xl border text-center transition-colors ${
                      selectedRole === 'Student'
                        ? 'border-[#4DA3FF] bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] font-bold'
                        : 'border-slate-200 dark:border-[#222936]'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('Instructor')}
                    className={`p-2 rounded-xl border text-center transition-colors ${
                      selectedRole === 'Instructor'
                        ? 'border-[#4DA3FF] bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] font-bold'
                        : 'border-slate-200 dark:border-[#222936]'
                    }`}
                  >
                    Instructor
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white font-semibold text-xs transition-all shadow-md shadow-[#4DA3FF]/20 cursor-pointer"
            >
              Create Account (ចុះឈ្មោះ)
            </button>

            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-[#222936]">
              <span>Already registered? </span>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#4DA3FF] font-semibold hover:underline"
              >
                Sign in
              </button>
            </div>
          </form>
        )}

        {/* 3. FORGOT PASSWORD */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Forgot password?
              </h2>
              <p className="text-xs text-slate-500">
                Enter your email address and we will send you a 4-digit reset code.
              </p>
            </div>

            <div className="text-xs">
              <label className="font-semibold block mb-1">Your Email Address:</label>
              <input
                type="email"
                required
                placeholder="sothea.chan@design.kh"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white font-semibold text-xs shadow-sm cursor-pointer"
            >
              Send Reset Code (ផ្ញើលេខកូដ)
            </button>

            <div className="text-center text-xs">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                ← Back to Login
              </button>
            </div>
          </form>
        )}

        {/* 4. RESET PASSWORD */}
        {mode === 'reset' && (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Reset your password
              </h2>
              <p className="text-xs text-slate-500">
                Enter verification code and choose a new password.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Verification Code:</label>
                <input
                  type="text"
                  required
                  placeholder="4920"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936] font-mono tracking-widest text-center text-base"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">New Password:</label>
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white font-semibold text-xs shadow-sm cursor-pointer"
            >
              Update Password & Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
