import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { CertificateModal } from './components/CertificateModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';

import { HomeView } from './views/HomeView';
import { CoursesView } from './views/CoursesView';
import { CourseDetailsView } from './views/CourseDetailsView';
import { DashboardView } from './views/DashboardView';
import { LearningView } from './views/LearningView';
import { AssignmentView } from './views/AssignmentView';
import { QuizView } from './views/QuizView';
import { ProfileView } from './views/ProfileView';
import { ResourcesView } from './views/ResourcesView';
import { AboutView } from './views/AboutView';
import { CertificatePageView } from './views/CertificatePageView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { PaymentModal } from './views/PaymentModal';
import { AuthModal } from './views/AuthModal';

import { 
  COURSES_DATA, 
  INITIAL_STUDENT, 
  INITIAL_ASSIGNMENTS, 
  TYPOGRAPHY_QUIZ, 
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITIES
} from './data/coursesData';
import { Course, Student, Assignment, NotificationItem, SubmissionItem, UserAccount } from './types';
import { Home, BookOpen, Video, User, Grid, Bell, Sun, Moon, FolderArchive, Sparkles, Globe } from 'lucide-react';
import { ActivityFeed } from './components/ActivityFeed';
import { useLanguage } from './context/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';

export default function App() {
  // Theme state: dark / light
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('piseth_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('piseth_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('piseth_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const { language, toggleLanguage, setLanguage } = useLanguage();

  // User & Authentication state (Role-based: Student, Instructor, Admin)
  const [currentUser, setCurrentUser] = useState<UserAccount>({
    id: 'usr-student-01',
    name: 'Sothea Chan',
    nameKh: 'ចាន់ សុធា',
    email: 'sothea.chan@design.kh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    role: 'Student',
    memberSince: 'January 2026',
  });

  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('graphic-design-mastery');
  const [currentLessonId, setCurrentLessonId] = useState<string>('gd-04-01');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [courseForPayment, setCourseForPayment] = useState<Course | null>(null);

  // App Data State
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [student, setStudent] = useState<Student>(INITIAL_STUDENT);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Global Command+K Keyboard Shortcut Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Active selected course object
  const activeCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  // Actions
  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentTab('course-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearning = (courseId?: string, lessonId?: string) => {
    if (courseId) setSelectedCourseId(courseId);
    if (lessonId) setCurrentLessonId(lessonId);
    setCurrentTab('learning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 17. Payment Flow: Course -> Enroll -> Checkout -> Payment Method -> Payment Confirmation -> Course Access
  const handleEnrollCourse = (courseId: string) => {
    const targetCourse = courses.find((c) => c.id === courseId);
    if (targetCourse) {
      setCourseForPayment(targetCourse);
      setIsPaymentOpen(true);
    }
  };

  const handlePaymentSuccess = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return { ...c, enrolled: true, progress: 0 };
        }
        return c;
      })
    );
    setStudent((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        enrolledCourses: prev.stats.enrolledCourses + 1,
      },
    }));

    const enrolledCourse = courses.find((c) => c.id === courseId);
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Payment Confirmed: ${enrolledCourse?.title || 'Course'}`,
      message: `Your KHQR payment of $${enrolledCourse?.price || 120} was verified. Lifetime course access is now unlocked!`,
      time: 'Just now',
      read: false,
      type: 'lesson',
      linkTab: 'learning',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    handleStartLearning(courseId);
  };

  // 18. Role-based Login handler:
  // Student -> Student Dashboard
  // Teacher/Admin -> Admin Dashboard
  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    if (user.role === 'Instructor' || user.role === 'Admin') {
      setCurrentTab('admin');
    } else {
      setStudent((prev) => ({
        ...prev,
        name: user.name,
        nameKh: user.nameKh || prev.nameKh,
        email: user.email,
        avatar: user.avatar,
      }));
      setCurrentTab('dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAssignmentStatus = (newStatus: Assignment['status']) => {
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id === 'asg-03') {
          return { ...asg, status: newStatus };
        }
        return asg;
      })
    );
  };

  const handleSyncFeedbackToStudent = (submission: SubmissionItem) => {
    // Sync review from teacher to student's assignment #03
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id === 'asg-03') {
          return {
            ...asg,
            status: submission.status,
            teacherFeedback: {
              teacherName: 'Piseth Yoeurn',
              teacherRole: 'University Lecturer & Lead Instructor',
              comment: submission.feedback || 'Good composition. Improve hierarchy and spacing.',
              grade: submission.grade || '9.0 / 10',
              date: 'Just now',
            },
          };
        }
        return asg;
      })
    );

    // Add notification for the student
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Teacher Piseth reviewed ${submission.assignment}`,
      message: `Status updated to "${submission.status}". Critique: ${submission.feedback || 'Review notes available.'}`,
      time: 'Just now',
      read: false,
      type: 'feedback',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // If in Teacher Admin Portal, render dedicated portal layout
  if (currentTab === 'admin') {
    return (
      <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B0F14] text-slate-900 dark:text-white font-sans transition-colors duration-200">
        <AdminDashboardView
          courses={courses}
          onUpdateCourses={setCourses}
          onSyncFeedbackToStudent={handleSyncFeedbackToStudent}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onExitAdmin={() => {
            setCurrentTab('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#0B0B0D] text-[#1C1C1E] dark:text-[#F5F5F7] flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        student={student}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-0">
        {currentTab === 'home' && (
          <HomeView
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onStartLearning={handleStartLearning}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'courses' && (
          <CoursesView
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onStartLearning={handleStartLearning}
          />
        )}

        {currentTab === 'course-details' && (
          <CourseDetailsView
            course={activeCourse}
            onBack={() => setCurrentTab('courses')}
            onStartLearning={handleStartLearning}
            onEnrollCourse={handleEnrollCourse}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            student={student}
            courses={courses}
            assignments={assignments}
            onStartLearning={handleStartLearning}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'learning' && (
          <LearningView
            course={activeCourse}
            currentLessonId={currentLessonId}
            onSelectLesson={(lesId) => setCurrentLessonId(lesId)}
            onNavigateToAssignment={() => setCurrentTab('assignment')}
            onNavigateToQuiz={() => setCurrentTab('quiz')}
          />
        )}

        {currentTab === 'assignment' && (
          <AssignmentView
            assignment={assignments[0]}
            onUpdateStatus={handleUpdateAssignmentStatus}
            onBackToCourse={() => setCurrentTab('learning')}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizView
            quiz={TYPOGRAPHY_QUIZ}
            onBackToCourse={() => setCurrentTab('learning')}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            student={student}
            courses={courses}
            assignments={assignments}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onNavigateToCertificatePage={() => {
              setCurrentTab('certificate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToCourse={handleSelectCourse}
            onNavigateToAssignment={() => setCurrentTab('assignment')}
            onNavigateToQuiz={() => setCurrentTab('quiz')}
            onNavigateToLearning={handleStartLearning}
          />
        )}

        {currentTab === 'resources' && <ResourcesView />}

        {currentTab === 'certificate' && (
          <CertificatePageView
            student={student}
            courseTitle="Graphic Design"
            onBack={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'about' && (
          <AboutView onNavigateToCourses={() => setCurrentTab('courses')} />
        )}

        {/* Community Learning Activity Tab */}
        {currentTab === 'activity' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
            <div className="border-b border-[#E4E6EB] dark:border-[#2E3034] pb-4">
              <h1 className={`text-2xl sm:text-3xl font-black text-[#1C1C1E] dark:text-[#F5F5F7] ${language === 'km' ? 'font-khmer' : ''}`}>
                {language === 'km' ? 'សកម្មភាពសិក្សាក្នុងសហគមន៍' : 'Community Learning Activity'}
              </h1>
              <p className={`text-xs sm:text-sm text-[#65676B] dark:text-[#A1A1A6] mt-1 ${language === 'km' ? 'font-khmer' : ''}`}>
                {language === 'km'
                  ? 'ការកែលម្អស្នាដៃផ្ទាល់ពីលោកគ្រូ យឿន ពិសិដ្ឋ វឌ្ឍនភាពសិក្សា និងកិច្ចការថ្មីៗរបស់សិស្ស។'
                  : 'Real-time critiques from Teacher Piseth Yoeurn, student milestones, and newly published assignments.'}
              </p>
            </div>
            <ActivityFeed
              activities={INITIAL_ACTIVITIES}
              onActionClick={() => handleStartLearning()}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Mobile Bottom Navigation (Facebook Usability + Apple Clean Touch Targets) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-md border-t border-[#E4E6EB] dark:border-[#2E3034] px-2 py-2">
        <div className="flex items-center justify-around text-[10px] font-medium">
          <button
            onClick={() => setCurrentTab('home')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors cursor-pointer ${
              currentTab === 'home' ? 'text-[#1877F2] dark:text-[#4595FF] font-semibold' : 'text-[#65676B] dark:text-[#A1A1A6]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className={language === 'km' ? 'font-khmer' : ''}>
              {language === 'km' ? 'ទំព័រដើម' : 'Home'}
            </span>
          </button>
          <button
            onClick={() => setCurrentTab('courses')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors cursor-pointer ${
              currentTab === 'courses' ? 'text-[#1877F2] dark:text-[#4595FF] font-semibold' : 'text-[#65676B] dark:text-[#A1A1A6]'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className={language === 'km' ? 'font-khmer' : ''}>
              {language === 'km' ? 'វគ្គសិក្សា' : 'Courses'}
            </span>
          </button>
          <button
            onClick={() => setCurrentTab('resources')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors cursor-pointer ${
              currentTab === 'resources' ? 'text-[#1877F2] dark:text-[#4595FF] font-semibold' : 'text-[#65676B] dark:text-[#A1A1A6]'
            }`}
          >
            <FolderArchive className="w-5 h-5" />
            <span className={language === 'km' ? 'font-khmer' : ''}>
              {language === 'km' ? 'ឯកសារ' : 'Resources'}
            </span>
          </button>
          <button
            onClick={() => setCurrentTab('activity')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors cursor-pointer ${
              currentTab === 'activity' ? 'text-[#1877F2] dark:text-[#4595FF] font-semibold' : 'text-[#65676B] dark:text-[#A1A1A6]'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className={language === 'km' ? 'font-khmer' : ''}>
              {language === 'km' ? 'សកម្មភាព' : 'Activity'}
            </span>
          </button>
          <button
            onClick={() => setCurrentTab('profile')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors cursor-pointer ${
              currentTab === 'profile' ? 'text-[#1877F2] dark:text-[#4595FF] font-semibold' : 'text-[#65676B] dark:text-[#A1A1A6]'
            }`}
          >
            <User className="w-5 h-5" />
            <span className={language === 'km' ? 'font-khmer' : ''}>
              {language === 'km' ? 'គណនី' : 'Profile'}
            </span>
          </button>
        </div>
      </div>

      {/* Global Search Modal (Command + K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCourse={handleSelectCourse}
        onSelectLesson={(courseId, lessonId) => {
          handleStartLearning(courseId, lessonId);
          setIsSearchOpen(false);
        }}
        onSelectResource={() => {
          setIsSearchOpen(false);
          setCurrentTab('resources');
        }}
        onNavigate={(tab) => {
          setIsSearchOpen(false);
          setCurrentTab(tab);
        }}
      />

      {/* 17. Cambodian Payment Modal (KHQR / Bakong / ABA / ACLEDA) */}
      {courseForPayment && (
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          course={courseForPayment}
          studentName={student.name}
          studentEmail={student.email}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* 18. Role-Based Auth Modal (Login / Register / Forgot / Reset) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 19. Notification Center Modal */}
      <NotificationCenterModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={(id) => {
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
          );
        }}
        onMarkAllAsRead={() => {
          setNotifications((prev) =>
            prev.map((n) => ({ ...n, read: true }))
          );
        }}
        onNavigateToTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Official Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        student={student}
        courseTitle="Graphic Design"
      />

      {/* Quick Floating Language & Theme Switcher Bar (Desktop & Tablet) */}
      <div className="hidden md:flex fixed bottom-6 right-5 z-40 items-center gap-2 p-1 rounded-full bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-md border border-[#E4E6EB] dark:border-[#2E3034] shadow-lg">
        {/* Quick Language Toggle */}
        <button
          onClick={toggleLanguage}
          aria-label={language === 'km' ? 'Switch to English' : 'ប្តូរទៅភាសាខ្មែរ'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#1C1C1E] dark:text-[#F5F5F7] hover:bg-[#F5F7FA] dark:hover:bg-[#242629] transition-all cursor-pointer"
          title={language === 'km' ? 'Switch to English (EN)' : 'ប្តូរទៅភាសាខ្មែរ (KM)'}
        >
          <span>{language === 'km' ? '🇰🇭' : '🇬🇧'}</span>
          <span className="font-semibold text-[11px]">
            {language === 'km' ? 'ខ្មែរ' : 'EN'}
          </span>
        </button>

        <span className="w-px h-4 bg-[#E4E6EB] dark:bg-[#2E3034]" />

        {/* Quick Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#1C1C1E] dark:text-[#F5F5F7] hover:bg-[#F5F7FA] dark:hover:bg-[#242629] transition-all cursor-pointer"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <>
              <Moon className="w-3.5 h-3.5 text-[#4595FF]" />
              <span className="text-[11px] font-medium hidden sm:inline">Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-medium hidden sm:inline">Light</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
