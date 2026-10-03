import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  Users, 
  FileText, 
  Inbox, 
  Sparkles, 
  Award, 
  CreditCard, 
  Megaphone, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Download, 
  ArrowUpRight, 
  Eye, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  X, 
  Save, 
  MessageSquare, 
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { Course, Lesson, SubmissionItem, AdminStudent } from '../types';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { 
  ADMIN_STATS, 
  INITIAL_SUBMISSIONS, 
  ADMIN_STUDENTS_LIST, 
  ADMIN_PAYMENTS, 
  ADMIN_ANNOUNCEMENTS 
} from '../data/adminData';

interface AdminDashboardViewProps {
  courses: Course[];
  onUpdateCourses: (courses: Course[]) => void;
  onSyncFeedbackToStudent: (submission: SubmissionItem) => void;
  onExitAdmin: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  courses,
  onUpdateCourses,
  onSyncFeedbackToStudent,
  onExitAdmin,
  isDark,
  onToggleTheme,
}) => {
  // Sidebar tab state
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'courses'
    | 'lessons'
    | 'students'
    | 'assignments'
    | 'submissions'
    | 'quizzes'
    | 'certificates'
    | 'payments'
    | 'announcements'
    | 'settings'
  >('dashboard');

  // Submissions State
  const [submissions, setSubmissions] = useState<SubmissionItem[]>(INITIAL_SUBMISSIONS);
  const [selectedSubmissionForReview, setSelectedSubmissionForReview] = useState<SubmissionItem | null>(null);
  const [reviewFeedbackText, setReviewFeedbackText] = useState<string>('');
  const [reviewGradeText, setReviewGradeText] = useState<string>('9.0 / 10');

  // Course Management State
  const [courseList, setCourseList] = useState<Course[]>(courses);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [isCreatingCourse, setIsCreatingCourse] = useState<boolean>(false);
  const [newCourseForm, setNewCourseForm] = useState({
    title: '',
    titleKh: '',
    category: 'Graphic Design' as Course['category'],
    level: 'Beginner → Intermediate' as Course['level'],
    duration: '45 Hours',
    price: 120,
    instructorName: 'Piseth Yoeurn',
    shortDescription: '',
    fullDescription: '',
  });

  // Selected Course for Lesson Management
  const [selectedCourseForLessons, setSelectedCourseForLessons] = useState<Course>(courseList[0]);
  const [isAddingLesson, setIsAddingLesson] = useState<boolean>(false);
  const [newLessonForm, setNewLessonForm] = useState({
    title: '',
    duration: '25 min',
    videoUrl: 'https://cdn.piseth.design/lectures/sample.mp4',
    description: '',
    hasAssignment: false,
    hasQuiz: false,
    pdfAttachment: 'Lecture_Handout.pdf',
    exerciseFile: 'Exercise_Starter.fig',
  });

  // Student Detail Drawer
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<AdminStudent | null>(null);

  // Search filter for students
  const [studentSearchQuery, setStudentSearchQuery] = useState('');

  // 16. Assignment Review actions
  const handleOpenReviewModal = (submission: SubmissionItem) => {
    setSelectedSubmissionForReview(submission);
    setReviewFeedbackText(submission.feedback || '');
    setReviewGradeText(submission.grade || '9.0 / 10');
  };

  const handleUpdateSubmissionStatus = (status: SubmissionItem['status']) => {
    if (!selectedSubmissionForReview) return;
    const updated: SubmissionItem = {
      ...selectedSubmissionForReview,
      status,
      feedback: reviewFeedbackText.trim() || 'Good progress. Follow teacher notes.',
      grade: reviewGradeText.trim() || '9.0 / 10',
    };

    const newSubmissions = submissions.map((s) => (s.id === updated.id ? updated : s));
    setSubmissions(newSubmissions);
    onSyncFeedbackToStudent(updated);
    setSelectedSubmissionForReview(null);
  };

  // 14. Course CRUD
  const handlePromptDeleteCourse = (course: Course) => {
    setCourseToDelete(course);
  };

  const handleConfirmDeleteCourse = () => {
    if (!courseToDelete) return;
    const updated = courseList.filter((c) => c.id !== courseToDelete.id);
    setCourseList(updated);
    onUpdateCourses(updated);
    setCourseToDelete(null);
  };

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseForm.title) return;
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      slug: newCourseForm.title.toLowerCase().replace(/\s+/g, '-'),
      title: newCourseForm.title,
      titleKh: newCourseForm.titleKh || newCourseForm.title,
      shortDescription: newCourseForm.shortDescription || 'Master visual design fundamentals',
      fullDescription: newCourseForm.fullDescription || 'Comprehensive curriculum created by Piseth Yoeurn.',
      level: newCourseForm.level,
      category: newCourseForm.category,
      duration: newCourseForm.duration,
      totalLessons: 12,
      instructor: {
        name: newCourseForm.instructorName || 'Piseth Yoeurn',
        nameKh: 'យឿន ពិសិដ្ឋ',
        title: 'Lead Instructor & Lecturer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        bio: 'Senior designer and university lecturer.',
      },
      price: newCourseForm.price,
      rating: 5.0,
      ratingCount: 1,
      studentsCount: 0,
      software: [{ name: 'Adobe Suite', icon: 'Cc' }],
      whatYouWillLearn: ['Master studio typography', 'Build industry-grade portfolio pieces'],
      requirements: ['Computer and modern web browser'],
      projects: [{ title: 'Capstone Project', description: 'Studio brand identity', tag: 'Capstone' }],
      modules: [
        {
          id: `mod-${Date.now()}`,
          number: '01',
          title: 'Introduction & Foundations',
          lessons: [
            {
              id: `les-${Date.now()}`,
              title: 'Orientation & Workspace Setup',
              duration: '15 min',
              description: 'Course introduction and asset setup.',
            },
          ],
        },
      ],
      gradient: 'from-[#4DA3FF] to-[#0066FF]',
      accentColor: '#4DA3FF',
    };

    const updated = [newCourse, ...courseList];
    setCourseList(updated);
    onUpdateCourses(updated);
    setIsCreatingCourse(false);
    setNewCourseForm({
      title: '',
      titleKh: '',
      category: 'Graphic Design',
      level: 'Beginner → Intermediate',
      duration: '45 Hours',
      price: 120,
      instructorName: 'Piseth Yoeurn',
      shortDescription: '',
      fullDescription: '',
    });
  };

  // Lesson reordering (move up / down)
  const handleMoveLesson = (moduleIdx: number, lessonIdx: number, direction: 'up' | 'down') => {
    if (!selectedCourseForLessons) return;
    const targetCourse = { ...selectedCourseForLessons };
    const currentModule = targetCourse.modules[moduleIdx];
    if (!currentModule) return;

    const lessons = [...currentModule.lessons];
    const targetIdx = direction === 'up' ? lessonIdx - 1 : lessonIdx + 1;
    if (targetIdx < 0 || targetIdx >= lessons.length) return;

    const [moved] = lessons.splice(lessonIdx, 1);
    lessons.splice(targetIdx, 0, moved);

    currentModule.lessons = lessons;
    setSelectedCourseForLessons(targetCourse);

    const updatedCourses = courseList.map((c) =>
      c.id === targetCourse.id ? targetCourse : c
    );
    setCourseList(updatedCourses);
    onUpdateCourses(updatedCourses);
  };

  // Add lesson to module
  const handleAddLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonForm.title || !selectedCourseForLessons) return;
    const targetCourse = { ...selectedCourseForLessons };
    const targetModule = targetCourse.modules[0];
    if (!targetModule) return;

    const newLesson: Lesson = {
      id: `les-${Date.now()}`,
      title: newLessonForm.title,
      duration: newLessonForm.duration,
      videoUrl: newLessonForm.videoUrl,
      description: newLessonForm.description || 'Comprehensive video lesson.',
      hasAssignment: newLessonForm.hasAssignment,
      hasQuiz: newLessonForm.hasQuiz,
    };

    targetModule.lessons.push(newLesson);
    setSelectedCourseForLessons(targetCourse);

    const updatedCourses = courseList.map((c) =>
      c.id === targetCourse.id ? targetCourse : c
    );
    setCourseList(updatedCourses);
    onUpdateCourses(updatedCourses);
    setIsAddingLesson(false);
    setNewLessonForm({
      title: '',
      duration: '25 min',
      videoUrl: 'https://cdn.piseth.design/lectures/sample.mp4',
      description: '',
      hasAssignment: false,
      hasQuiz: false,
      pdfAttachment: 'Lecture_Handout.pdf',
      exerciseFile: 'Exercise_Starter.fig',
    });
  };

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'lessons', label: 'Lessons', icon: Video },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'submissions', label: 'Submissions', icon: Inbox },
    { id: 'quizzes', label: 'Quizzes', icon: Sparkles },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B0F14] text-slate-900 dark:text-white flex flex-col md:flex-row font-sans">
      
      {/* 13. SIDEBAR */}
      <aside className="w-full md:w-64 bg-white dark:bg-[#151B23] border-r border-slate-200/80 dark:border-[#222936] flex flex-col justify-between shrink-0">
        <div>
          {/* Header Brand */}
          <div className="p-5 border-b border-slate-100 dark:border-[#222936] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                piseth<span className="text-[#4DA3FF]">.admin</span>
              </span>
              <span className="text-[10px] font-mono bg-blue-50 dark:bg-blue-950/40 text-[#4DA3FF] px-1.5 py-0.5 rounded font-semibold">
                Portal
              </span>
            </div>
          </div>

          {/* Teacher Profile Card in Sidebar */}
          <div className="p-4 border-b border-slate-100 dark:border-[#222936] flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
              alt="Teacher Piseth Yoeurn"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#4DA3FF]/40"
            />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                Piseth Yoeurn
              </h4>
              <p className="text-[11px] text-slate-500 truncate font-khmer">
                សាស្ត្រាចារ្យ · RUFA
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#4DA3FF] text-white font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1C232D] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                  {item.id === 'submissions' && (
                    <span className={`ml-auto text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300'
                    }`}>
                      {submissions.filter((s) => s.status === 'Submitted' || s.status === 'Under Review').length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Exit Admin Button */}
        <div className="p-4 border-t border-slate-100 dark:border-[#222936]">
          <button
            onClick={onExitAdmin}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-[#222936] bg-slate-50 dark:bg-[#11161d] hover:bg-slate-100 dark:hover:bg-[#1C232D] text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Return to Student App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-[#222936] pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#4DA3FF]">
              Teacher & Admin Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white capitalize">
              {activeTab} Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-[#151B23] border border-slate-200 dark:border-[#222936] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-xs"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#4DA3FF]" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => setIsCreatingCourse(true)}
              className="py-2 px-3.5 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Course</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: DASHBOARD OVERVIEW (Section 13 exact statistics) */}
        {/* ============================================================ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            {/* Required Dashboard Statistics Grid:
                - Students: 128
                - Active Courses: 6
                - Assignments: 42
                - Certificates: 86
                - Revenue: $1,280
                - Course completion: 84% */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              
              {/* Stat 1: Students 128 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] shadow-sm space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Students
                </span>
                <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  {ADMIN_STATS.studentsCount}
                </span>
                <span className="text-[10px] text-emerald-500 font-semibold block">
                  +14 this month
                </span>
              </div>

              {/* Stat 2: Active Courses 6 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] shadow-sm space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Active Courses
                </span>
                <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  {ADMIN_STATS.activeCoursesCount}
                </span>
                <span className="text-[10px] text-[#4DA3FF] block">
                  All published
                </span>
              </div>

              {/* Stat 3: Assignments 42 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] shadow-sm space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Assignments
                </span>
                <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  {ADMIN_STATS.assignmentsCount}
                </span>
                <span className="text-[10px] text-amber-500 font-semibold block">
                  4 pending review
                </span>
              </div>

              {/* Stat 4: Certificates 86 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] shadow-sm space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Certificates
                </span>
                <span className="text-3xl font-black text-[#4DA3FF] tabular-nums">
                  {ADMIN_STATS.certificatesCount}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Verified issued
                </span>
              </div>

              {/* Stat 5: Revenue $1,280 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] shadow-sm space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Revenue
                </span>
                <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  ${ADMIN_STATS.revenue.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-500 font-semibold block">
                  Bakong & ABA
                </span>
              </div>

              {/* Stat 6: Course completion 84% */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] shadow-sm space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Completion
                </span>
                <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  {ADMIN_STATS.courseCompletionRate}%
                </span>
                <span className="text-[10px] text-emerald-500 font-semibold block">
                  Industry standard
                </span>
              </div>
            </div>

            {/* Required: Recent Submissions Table */}
            <div className="bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200/80 dark:border-[#222936] shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#222936] pb-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Recent Submissions
                  </h3>
                  <p className="text-xs text-slate-400">
                    Student work awaiting teacher critique and grade approval
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('submissions')}
                  className="text-xs font-semibold text-[#4DA3FF] hover:underline"
                >
                  View All Submissions ({submissions.length})
                </button>
              </div>

              {/* Submissions List: Show student name, course, assignment, date, status */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-[#222936] text-slate-400 font-mono text-[11px]">
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Course</th>
                      <th className="py-2.5 px-3">Assignment</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#222936]">
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-[#18202A] transition-colors">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={sub.studentAvatar}
                              alt={sub.studentName}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white block">
                                {sub.studentName}
                              </span>
                              <span className="text-[10px] text-slate-400 font-khmer">
                                {sub.studentNameKh}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-medium">
                          {sub.course}
                        </td>
                        <td className="py-3 px-3 text-slate-800 dark:text-slate-200">
                          {sub.assignment}
                        </td>
                        <td className="py-3 px-3 text-slate-400 font-mono tabular-nums">
                          {sub.date}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                              sub.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-500/30'
                                : sub.status === 'Revision Required'
                                ? 'bg-amber-50 text-amber-700 border-amber-500/30'
                                : 'bg-blue-50 text-blue-700 border-blue-500/30'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleOpenReviewModal(sub)}
                            className="py-1 px-3 rounded-lg bg-[#4DA3FF] hover:bg-[#3892F3] text-white font-semibold text-[11px] transition-colors"
                          >
                            Review & Grade
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: COURSE MANAGEMENT (Section 14) */}
        {/* ============================================================ */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                All Published Curriculums ({courseList.length})
              </h3>
              <button
                onClick={() => setIsCreatingCourse(true)}
                className="py-2 px-3.5 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Course</span>
              </button>
            </div>

            {/* Courses List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courseList.map((course) => (
                <div
                  key={course.id}
                  className="bg-white dark:bg-[#151B23] rounded-2xl border border-slate-200/80 dark:border-[#222936] p-6 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-mono font-semibold text-[#4DA3FF]">
                        {course.category} · {course.level}
                      </span>
                      <span className="text-sm font-black text-slate-900 dark:text-white font-mono tabular-nums">
                        ${course.price}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {course.title}
                    </h4>
                    <p className="text-xs text-[#4DA3FF] font-khmer">{course.titleKh}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {course.fullDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-[#222936] flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">
                      {course.duration} · {course.totalLessons} Lessons
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCourseForLessons(course);
                          setActiveTab('lessons');
                        }}
                        className="py-1 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#1C232D] text-slate-700 dark:text-slate-300 font-medium text-[11px]"
                      >
                        Manage Lessons
                      </button>
                      <button
                        onClick={() => handlePromptDeleteCourse(course)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                        title="Delete Course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: LESSON MANAGEMENT & REORDERING (Section 14) */}
        {/* ============================================================ */}
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            
            {/* Course Selector for Lesson Management */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936]">
              <div>
                <span className="text-[11px] font-mono text-slate-400 block">Selected Course:</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {selectedCourseForLessons.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCourseForLessons.id}
                  onChange={(e) => {
                    const c = courseList.find((item) => item.id === e.target.value);
                    if (c) setSelectedCourseForLessons(c);
                  }}
                  className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#0B0F14] border border-slate-200 dark:border-[#222936] text-slate-900 dark:text-white focus:outline-none"
                >
                  {courseList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setIsAddingLesson(true)}
                  className="py-1.5 px-3 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Lesson</span>
                </button>
              </div>
            </div>

            {/* Modules & Lesson Reordering List */}
            <div className="space-y-4">
              {selectedCourseForLessons.modules.map((mod, modIdx) => (
                <div
                  key={mod.id}
                  className="bg-white dark:bg-[#151B23] rounded-2xl border border-slate-200/80 dark:border-[#222936] p-5 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#222936] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#4DA3FF]">
                        Module {mod.number}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {mod.title}
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {mod.lessons.length} lessons
                    </span>
                  </div>

                  {/* Lessons list with order buttons */}
                  <div className="space-y-2">
                    {mod.lessons.map((les, lesIdx) => (
                      <div
                        key={les.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936] flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-slate-400 w-5">
                            {lesIdx + 1}.
                          </span>
                          <div>
                            <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                              {les.title}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {les.duration} · Video Lecture
                            </span>
                          </div>
                        </div>

                        {/* Lesson reordering controls */}
                        <div className="flex items-center gap-1">
                          <button
                            disabled={lesIdx === 0}
                            onClick={() => handleMoveLesson(modIdx, lesIdx, 'up')}
                            className="p-1 rounded bg-white dark:bg-[#1F2733] border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-[#4DA3FF] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            title="Move Lesson Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={lesIdx === mod.lessons.length - 1}
                            onClick={() => handleMoveLesson(modIdx, lesIdx, 'down')}
                            className="p-1 rounded bg-white dark:bg-[#1F2733] border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-[#4DA3FF] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            title="Move Lesson Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: STUDENT MANAGEMENT (Section 15) */}
        {/* ============================================================ */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            
            {/* Search Bar for Students */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={studentSearchQuery}
                  onChange={(e) => setStudentSearchQuery(e.target.value)}
                  placeholder="Search student by name or email..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-[#222936] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4DA3FF]"
                />
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Showing {ADMIN_STUDENTS_LIST.length} enrolled students
              </span>
            </div>

            {/* Students Table */}
            <div className="bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200/80 dark:border-[#222936] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-[#222936] text-slate-400 font-mono text-[11px] bg-slate-50/50 dark:bg-[#11161d]">
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Courses</th>
                      <th className="py-3 px-4">Progress</th>
                      <th className="py-3 px-4">Last Active</th>
                      <th className="py-3 px-4">Assignments</th>
                      <th className="py-3 px-4">Certificates</th>
                      <th className="py-3 px-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#222936]">
                    {ADMIN_STUDENTS_LIST.filter(
                      (s) =>
                        s.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
                        s.email.toLowerCase().includes(studentSearchQuery.toLowerCase())
                    ).map((stu) => (
                      <tr key={stu.id} className="hover:bg-slate-50 dark:hover:bg-[#18202A] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={stu.avatar}
                              alt={stu.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white block">
                                {stu.name}
                              </span>
                              <span className="text-[10px] text-slate-400 font-khmer">
                                {stu.nameKh}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                          {stu.email}
                        </td>
                        <td className="py-3.5 px-4 text-slate-800 dark:text-slate-200">
                          {stu.courses.join(', ')}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#4DA3FF] rounded-full"
                                style={{ width: `${stu.progress}%` }}
                              />
                            </div>
                            <span className="font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                              {stu.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                          {stu.lastActive}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-center">
                          {stu.assignments}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-center">
                          {stu.certificates}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedStudentForDetail(stu)}
                            className="py-1 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#1C232D] text-[#4DA3FF] font-semibold text-[11px] cursor-pointer"
                          >
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: SUBMISSIONS & ASSIGNMENT REVIEW (Section 16) */}
        {/* ============================================================ */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Studio Submissions awaiting Teacher Review ({submissions.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#4DA3FF]">
                        {sub.course}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-xs text-slate-400 font-mono">{sub.date}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {sub.assignment}
                    </h4>

                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
                      <img
                        src={sub.studentAvatar}
                        alt={sub.studentName}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-semibold text-slate-900 dark:text-white">{sub.studentName}</span>
                      <span className="text-slate-400 font-khmer">({sub.studentNameKh})</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[11px]">{sub.files[0]?.name} ({sub.files[0]?.size})</span>
                    </div>

                    {sub.feedback && (
                      <p className="text-xs text-slate-500 italic pt-1">
                        "Current Feedback: {sub.feedback}" (Grade: {sub.grade})
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
                        sub.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-500/30'
                          : sub.status === 'Revision Required'
                          ? 'bg-amber-50 text-amber-700 border-amber-500/30'
                          : 'bg-blue-50 text-blue-700 border-blue-500/30'
                      }`}
                    >
                      {sub.status}
                    </span>

                    <button
                      onClick={() => handleOpenReviewModal(sub)}
                      className="py-1.5 px-3.5 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Critique & Action
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* OTHER TABS: Payments, Announcements, Settings, etc. */}
        {/* ============================================================ */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200/80 dark:border-[#222936] shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Payment Transactions (Total Revenue: ${ADMIN_STATS.revenue})
              </h3>
              <div className="divide-y divide-slate-100 dark:divide-[#222936]">
                {ADMIN_PAYMENTS.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{p.student}</span>
                      <span className="text-[11px] text-slate-400">{p.course} · {p.date}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-slate-900 dark:text-white font-mono text-sm block">
                        +${p.amount}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-mono">{p.method}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200/80 dark:border-[#222936] shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Studio Announcements
              </h3>
              <div className="space-y-3">
                {ADMIN_ANNOUNCEMENTS.map((a) => (
                  <div key={a.id} className="p-4 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{a.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{a.date}</span>
                    </div>
                    <span className="text-[11px] text-[#4DA3FF]">{a.audience}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================ */}
      {/* 16. ASSIGNMENT REVIEW MODAL */}
      {/* ============================================================ */}
      {selectedSubmissionForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200 dark:border-[#222936] shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#222936] pb-4">
              <div>
                <span className="text-xs font-mono text-[#4DA3FF] font-semibold">
                  {selectedSubmissionForReview.course}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Review: {selectedSubmissionForReview.assignment}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSubmissionForReview(null)}
                className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Student & File Details */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedSubmissionForReview.studentAvatar}
                  alt={selectedSubmissionForReview.studentName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {selectedSubmissionForReview.studentName} ({selectedSubmissionForReview.studentNameKh})
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Submitted: {selectedSubmissionForReview.date}
                  </span>
                </div>
              </div>

              {/* Action: Download Submission */}
              <button
                onClick={() => alert(`Downloading student file: ${selectedSubmissionForReview.files[0]?.name}...`)}
                className="py-1.5 px-3 rounded-lg bg-white dark:bg-[#1C232D] border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-[#4DA3FF] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Submission</span>
              </button>
            </div>

            {/* Actions: Add Feedback & Grade */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white block mb-1">
                  Teacher Feedback (Critique Note):
                </label>
                <textarea
                  rows={4}
                  value={reviewFeedbackText}
                  onChange={(e) => setReviewFeedbackText(e.target.value)}
                  placeholder="e.g. Good composition. Improve hierarchy and spacing between the header and body text."
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4DA3FF]"
                />
              </div>

              <div className="w-40">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white block mb-1">
                  Grade / Score:
                </label>
                <input
                  type="text"
                  value={reviewGradeText}
                  onChange={(e) => setReviewGradeText(e.target.value)}
                  placeholder="8.8 / 10"
                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936] text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Actions: Approve / Request Revision */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-[#222936]">
              <button
                onClick={() => handleUpdateSubmissionStatus('Revision Required')}
                className="py-2.5 px-4 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 dark:border-amber-800 rounded-xl transition-colors cursor-pointer"
              >
                Request Revision (កែសម្រួលឡើងវិញ)
              </button>
              <button
                onClick={() => handleUpdateSubmissionStatus('Approved')}
                className="py-2.5 px-5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Approve Submission (ជាប់ជាស្ថាពរ)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 15. STUDENT DETAILED PROGRESS DRAWER */}
      {/* ============================================================ */}
      {selectedStudentForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md h-full bg-white dark:bg-[#151B23] border-l border-slate-200 dark:border-[#222936] p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#222936] pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Student Learning Profile
              </h3>
              <button
                onClick={() => setSelectedStudentForDetail(null)}
                className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center space-y-2">
              <img
                src={selectedStudentForDetail.avatar}
                alt={selectedStudentForDetail.name}
                className="w-20 h-20 rounded-full object-cover mx-auto ring-2 ring-[#4DA3FF]/40"
              />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedStudentForDetail.name}
              </h2>
              <p className="text-xs text-[#4DA3FF] font-khmer">{selectedStudentForDetail.nameKh}</p>
              <p className="text-xs text-slate-400 font-mono">{selectedStudentForDetail.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936]">
                <span className="text-[10px] text-slate-400 block">Overall Progress</span>
                <span className="text-lg font-black text-[#4DA3FF]">{selectedStudentForDetail.progress}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936]">
                <span className="text-[10px] text-slate-400 block">Completed Lessons</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {selectedStudentForDetail.completedLessonsCount}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936]">
                <span className="text-[10px] text-slate-400 block">Assignments</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {selectedStudentForDetail.assignments}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936]">
                <span className="text-[10px] text-slate-400 block">Certificates</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {selectedStudentForDetail.certificates}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Enrolled Curriculums
              </h4>
              <div className="space-y-2">
                {selectedStudentForDetail.courses.map((cName, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-[#11161d] text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center justify-between">
                    <span>{cName}</span>
                    <span className="text-[#4DA3FF] font-mono">Active</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-[#222936]">
              <button
                onClick={() => alert(`Direct email sent to ${selectedStudentForDetail.email}`)}
                className="w-full py-2.5 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white text-xs font-semibold cursor-pointer"
              >
                Send Direct Message to Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 14. CREATE COURSE MODAL */}
      {/* ============================================================ */}
      {isCreatingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleCreateCourseSubmit}
            className="w-full max-w-xl bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200 dark:border-[#222936] shadow-2xl p-6 sm:p-8 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#222936] pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Create New Studio Course
              </h3>
              <button
                type="button"
                onClick={() => setIsCreatingCourse(false)}
                className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Course Title:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3D Spatial Typography"
                  value={newCourseForm.title}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Title (Khmer):
                </label>
                <input
                  type="text"
                  placeholder="e.g. សិល្បៈអក្សរ 3D"
                  value={newCourseForm.titleKh}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, titleKh: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Category:
                </label>
                <select
                  value={newCourseForm.category}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                >
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="UX/UI Design">UX/UI Design</option>
                  <option value="Motion Graphics">Motion Graphics</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Level:
                </label>
                <select
                  value={newCourseForm.level}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, level: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                >
                  <option value="Beginner → Intermediate">Beginner → Intermediate</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Duration:
                </label>
                <input
                  type="text"
                  value={newCourseForm.duration}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, duration: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  Price ($ USD):
                </label>
                <input
                  type="number"
                  value={newCourseForm.price}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, price: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                Course Description:
              </label>
              <textarea
                rows={3}
                placeholder="Brief description of the curriculum..."
                value={newCourseForm.fullDescription}
                onChange={(e) => setNewCourseForm({ ...newCourseForm, fullDescription: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-[#222936]">
              <button
                type="button"
                onClick={() => setIsCreatingCourse(false)}
                className="py-2 px-4 rounded-xl border text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-5 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white text-xs font-semibold cursor-pointer"
              >
                Save Course
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================ */}
      {/* 14. ADD LESSON MODAL */}
      {/* ============================================================ */}
      {isAddingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleAddLessonSubmit}
            className="w-full max-w-lg bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200 dark:border-[#222936] shadow-2xl p-6 sm:p-8 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#222936] pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add Lesson to {selectedCourseForLessons.title}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddingLesson(false)}
                className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Lesson Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Pages & Baseline Automation"
                  value={newLessonForm.title}
                  onChange={(e) => setNewLessonForm({ ...newLessonForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Upload / Video URL:</label>
                <input
                  type="text"
                  value={newLessonForm.videoUrl}
                  onChange={(e) => setNewLessonForm({ ...newLessonForm, videoUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Description:</label>
                <textarea
                  rows={2}
                  value={newLessonForm.description}
                  onChange={(e) => setNewLessonForm({ ...newLessonForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-[#222936] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newLessonForm.hasAssignment}
                    onChange={(e) => setNewLessonForm({ ...newLessonForm, hasAssignment: e.target.checked })}
                  />
                  <span>Attach Studio Assignment</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-[#222936] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newLessonForm.hasQuiz}
                    onChange={(e) => setNewLessonForm({ ...newLessonForm, hasQuiz: e.target.checked })}
                  />
                  <span>Attach Knowledge Quiz</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-[#222936]">
              <button
                type="button"
                onClick={() => setIsAddingLesson(false)}
                className="py-2 px-4 rounded-xl border text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-5 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white text-xs font-semibold cursor-pointer"
              >
                Save Lesson
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Course Deletion Confirmation Modal */}
      {courseToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#151B23] rounded-2xl border border-slate-200 dark:border-[#222936] p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Delete Course</h3>
                <p className="text-xs text-slate-500">This action will remove the course from the academy catalog.</p>
              </div>
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold bg-slate-50 dark:bg-[#0E131A] p-3 rounded-xl border border-slate-100 dark:border-[#222936]">
              <p className="font-bold">{courseToDelete.title}</p>
              <p className="text-[11px] text-slate-400 font-normal">{courseToDelete.category} · {courseToDelete.level}</p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setCourseToDelete(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1C232D] rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeleteCourse}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
