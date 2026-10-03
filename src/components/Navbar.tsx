import React, { useState, useRef, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Bell, 
  Menu as MenuIcon, 
  X, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  User, 
  FileText, 
  Check, 
  LogOut,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Student, NotificationItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch?: () => void;
  onOpenNotifications: () => void;
  onOpenAuth: () => void;
  student: Student;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenSearch,
  onOpenNotifications,
  onOpenAuth,
  student,
  notifications,
  onMarkNotificationRead,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', labelKh: 'ទំព័រដើម' },
    { id: 'courses', label: 'Courses', labelKh: 'វគ្គសិក្សា' },
    { id: 'resources', label: 'Resources', labelKh: 'ឯកសារ' },
    { id: 'about', label: 'About', labelKh: 'អំពីលោកគ្រូ' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#1C1C1E]/85 backdrop-blur-md border-b border-[#E4E6EB] dark:border-[#2E3034] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand mark */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 text-left group cursor-pointer"
          >
            <span className="text-xl font-bold tracking-tight text-[#1C1C1E] dark:text-[#F5F5F7] font-sans">
              piseth<span className="text-[#1877F2] dark:text-[#4595FF]">.design</span>
            </span>
          </button>
        </div>

        {/* Center: Home, Courses, Resources, About */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            const displayLabel = language === 'km' ? link.labelKh : link.label;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative py-1.5 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  language === 'km' ? 'font-khmer' : ''
                } ${
                  isActive
                    ? 'text-[#1877F2] dark:text-[#4595FF] font-semibold'
                    : 'text-[#65676B] dark:text-[#A1A1A6] hover:text-[#1C1C1E] dark:hover:text-[#F5F5F7]'
                }`}
              >
                {displayLabel}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1877F2] dark:bg-[#4595FF] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions & Controls (Minimal Apple style: clean, uncrowded, responsive) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Notifications Popover */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => onOpenNotifications()}
              aria-label="Notifications"
              className="relative p-2 text-[#65676B] dark:text-[#A1A1A6] hover:text-[#1C1C1E] dark:hover:text-[#F5F5F7] rounded-xl hover:bg-[#F5F7FA] dark:hover:bg-[#242629] transition-colors cursor-pointer"
              title="Notification Center"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#1877F2] ring-2 ring-white dark:ring-[#1C1C1E]" />
              )}
            </button>
          </div>

          {/* Student Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-[#1877F2]/40 transition-all cursor-pointer"
              aria-label="Student profile menu"
            >
              <img
                src={student.avatar}
                alt={student.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#E4E6EB] dark:ring-[#2E3034]"
              />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#151B23] rounded-xl border border-slate-200 dark:border-[#222936] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3.5 border-b border-slate-100 dark:border-[#222936]">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">{student.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{student.email}</p>
                  <p className="text-[10px] text-[#4DA3FF] font-medium mt-1 font-khmer">{student.nameKh}</p>
                </div>
                <div className="p-1 text-xs">
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1C232D] rounded-lg transition-colors text-left"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#4DA3FF]" />
                    <span>My Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1C232D] rounded-lg transition-colors text-left"
                  >
                    <User className="w-3.5 h-3.5 text-[#4DA3FF]" />
                    <span>Student Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('assignment');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1C232D] rounded-lg transition-colors text-left"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>Assignments (#03)</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('quiz');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1C232D] rounded-lg transition-colors text-left"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                    <span>Typography Quiz</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('certificate');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1C232D] rounded-lg transition-colors text-left"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                    <span>My Certificate</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenNotifications();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1C232D] rounded-lg transition-colors text-left"
                  >
                    <Bell className="w-3.5 h-3.5 text-[#4DA3FF]" />
                    <span>Notification Center</span>
                  </button>

                  <div className="pt-1 mt-1 border-t border-slate-100 dark:border-[#222936] space-y-0.5">
                    {/* Language Switch in Dropdown */}
                    <button
                      onClick={toggleLanguage}
                      className="w-full flex items-center justify-between px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1C232D] rounded-lg transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{language === 'km' ? '🇰🇭' : '🇬🇧'}</span>
                        <span>{language === 'km' ? 'ភាសា: ខ្មែរ (KM)' : 'Language: English (EN)'}</span>
                      </div>
                      <span className="text-[10px] text-[#4DA3FF] font-semibold">
                        {language === 'km' ? 'ប្តូរជា EN' : 'Switch KM'}
                      </span>
                    </button>

                    <button
                      onClick={onToggleTheme}
                      className="w-full flex items-center justify-between px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1C232D] rounded-lg transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        {isDark ? <Moon className="w-3.5 h-3.5 text-[#4DA3FF]" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                        <span>Appearance: {isDark ? 'Dark Mode' : 'Light Mode'}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Toggle</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenAuth();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1C232D] rounded-lg transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5 text-slate-400" />
                      <span>Switch Account / Sign In</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('admin');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-[#4DA3FF] hover:bg-[#EAF5FF] dark:hover:bg-[#4DA3FF]/15 rounded-lg transition-colors text-left font-semibold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Teacher Admin Portal</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Teacher Portal Switcher Button */}
          <button
            onClick={() => onNavigate('admin')}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#4DA3FF] bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 hover:bg-[#d9edff] dark:hover:bg-[#4DA3FF]/25 rounded-lg transition-all border border-[#4DA3FF]/30 cursor-pointer"
            title="Open Teacher / Admin Portal"
          >
            <span>{t('nav.teacherPortal')}</span>
          </button>

          {/* Primary Action Button: "Start Learning" */}
          <button
            onClick={() => onNavigate('learning')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#4DA3FF] hover:bg-[#3892F3] rounded-lg transition-all shadow-sm whitespace-nowrap cursor-pointer"
          >
            {t('nav.startLearning')}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-[#151B23]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-[#222936] bg-white dark:bg-[#0B0F14] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  currentTab === link.id
                    ? 'bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF]'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#151B23]'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-400 font-khmer">{link.labelKh}</span>
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#151B23]"
            >
              <span>Dashboard</span>
              <span className="text-xs text-slate-400 font-khmer">ផ្ទាំងគ្រប់គ្រង</span>
            </button>
            <button
              onClick={() => {
                onNavigate('profile');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#151B23]"
            >
              <span>Student Profile</span>
              <span className="text-xs text-slate-400 font-khmer">គណនីនិស្សិត</span>
            </button>

            {/* Mobile Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-100 dark:bg-[#151B23] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#222936]"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{language === 'km' ? '🇰🇭' : '🇬🇧'}</span>
                <span>{language === 'km' ? 'ភាសាខ្មែរ (Khmer)' : 'English'}</span>
              </div>
              <span className="text-xs text-[#4DA3FF] font-semibold">
                {language === 'km' ? 'ប្តូរជា EN' : 'Switch KM'}
              </span>
            </button>

            {/* Mobile Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-100 dark:bg-[#151B23] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#222936]"
            >
              <div className="flex items-center gap-2">
                {isDark ? <Moon className="w-4 h-4 text-[#4DA3FF]" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span>Theme: {isDark ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <span className="text-xs text-[#4DA3FF] font-semibold">Switch</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onNavigate('learning');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-white bg-[#4DA3FF] hover:bg-[#3892F3] rounded-lg shadow-sm"
            >
              {language === 'km' ? 'ចាប់ផ្ដើមរៀន' : 'Start Learning'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
