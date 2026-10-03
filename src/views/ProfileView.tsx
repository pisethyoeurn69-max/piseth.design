import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Bookmark, 
  Clock, 
  ChevronRight, 
  Download, 
  Share2, 
  Eye, 
  MapPin, 
  Mail, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Student, Course, Assignment } from '../types';
import { ActivityFeed } from '../components/ActivityFeed';
import { INITIAL_ACTIVITIES } from '../data/coursesData';
import { useLanguage } from '../context/LanguageContext';

interface ProfileViewProps {
  student: Student;
  courses: Course[];
  assignments: Assignment[];
  onOpenCertificate: () => void;
  onNavigateToCertificatePage?: () => void;
  onNavigateToCourse: (courseId: string) => void;
  onNavigateToAssignment: () => void;
  onNavigateToQuiz: () => void;
  onNavigateToLearning: (courseId: string, lessonId?: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  student,
  courses,
  assignments,
  onOpenCertificate,
  onNavigateToCertificatePage,
  onNavigateToCourse,
  onNavigateToAssignment,
  onNavigateToQuiz,
  onNavigateToLearning,
}) => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<
    'courses' | 'activity' | 'assignments' | 'certificates' | 'saved' | 'quizzes'
  >('courses');

  const enrolledCourses = courses.filter((c) => c.enrolled);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200/80 dark:border-[#222936] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-[#4DA3FF]/40 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#151B23]" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {student.name}
                </h1>
                <span className="text-xs bg-[#EAF5FF] dark:bg-[#4DA3FF]/20 text-[#4DA3FF] font-medium px-2 py-0.5 rounded">
                  Active Student
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-khmer">
                {student.nameKh} · {student.role}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {student.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Member since {student.memberSince}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {student.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={onOpenCertificate}
              className="py-2.5 px-4 text-xs font-semibold text-white bg-[#4DA3FF] hover:bg-[#3892F3] rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Award className="w-4 h-4" />
              <span>View Verified Certificate</span>
            </button>
          </div>
        </div>

        {/* Required Statistics Grid:
            - Courses
            - Completed Lessons
            - Assignments
            - Certificates */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-8 border-t border-slate-100 dark:border-[#222936]">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Courses
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums">
              {student.stats.enrolledCourses}
            </span>
            <span className="text-[11px] text-slate-500 block">Enrolled active</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Completed Lessons
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums">
              {student.stats.completedLessons}
            </span>
            <span className="text-[11px] text-emerald-500 font-semibold block">78% Progress</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Assignments
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums">
              {student.stats.assignmentsSubmitted}
            </span>
            <span className="text-[11px] text-amber-500 font-semibold block">6 Reviewed</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Certificates
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#4DA3FF] tabular-nums">
              {student.stats.certificatesCount}
            </span>
            <span className="text-[11px] text-slate-500 block">Issued by Piseth Yoeurn</span>
          </div>
        </div>
      </div>

      {/* Required Profile Sections Tabs:
          - My Courses
          - My Certificates
          - Assignment History
          - Quiz Results
          - Saved Lessons */}
      <div className="space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5F7FA] dark:bg-[#242629] rounded-2xl border border-[#E4E6EB] dark:border-[#2E3034] overflow-x-auto">
          {[
            { id: 'courses', label: language === 'km' ? 'វគ្គសិក្សារបស់ខ្ញុំ' : 'My Courses' },
            { id: 'activity', label: language === 'km' ? 'សកម្មភាពសិក្សា' : 'Activity' },
            { id: 'assignments', label: language === 'km' ? 'កិច្ចការ & ការកែលម្អ' : 'Assignments' },
            { id: 'quizzes', label: language === 'km' ? 'លទ្ធផលតេស្ត Quiz' : 'Quiz Results' },
            { id: 'certificates', label: language === 'km' ? 'វិញ្ញាបនបត្រ' : 'Certificates' },
            { id: 'saved', label: language === 'km' ? 'បានរក្សាទុក' : 'Saved' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeSection === tab.id
                  ? 'bg-white dark:bg-[#1C1C1E] text-[#1877F2] dark:text-[#4595FF] shadow-xs'
                  : 'text-[#65676B] dark:text-[#A1A1A6] hover:text-[#1C1C1E] dark:hover:text-[#F5F5F7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SECTION 2: ACTIVITY FEED */}
        {activeSection === 'activity' && (
          <div className="space-y-4">
            <ActivityFeed 
              activities={INITIAL_ACTIVITIES} 
              onActionClick={() => onNavigateToLearning('graphic-design-mastery')}
            />
          </div>
        )}

        {/* SECTION 1: MY COURSES */}
        {activeSection === 'courses' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-6 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] shadow-sm space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono text-[#4DA3FF] font-semibold">
                        {course.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-khmer">{course.titleKh}</p>
                    </div>
                    <span className="text-xs font-black text-[#4DA3FF] font-mono tabular-nums">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4DA3FF] rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-[#222936]">
                    <span className="text-slate-500">Instructor: {course.instructor.name}</span>
                    <button
                      onClick={() => onNavigateToLearning(course.id, course.lastLessonId)}
                      className="text-xs font-semibold text-[#4DA3FF] hover:underline flex items-center gap-1"
                    >
                      Continue <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: MY CERTIFICATES */}
        {activeSection === 'certificates' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center shrink-0">
                  <Award className="w-7 h-7" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-mono text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Credential
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Graphic Design Mastery (45 Hours)
                  </h3>
                  <p className="text-xs text-slate-500 font-khmer">
                    បញ្ជាក់ការបញ្ចប់វគ្គសិក្សាដោយជោគជ័យ ចេញដោយលោកគ្រូ យឿន ពិសិដ្ឋ
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    ID: PD-2026-GD-0492 · Issued Sep 28, 2026
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={onOpenCertificate}
                  className="py-2.5 px-3.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-[#1C232D] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Eye className="w-4 h-4" />
                  <span>Quick Modal</span>
                </button>
                {onNavigateToCertificatePage && (
                  <button
                    onClick={onNavigateToCertificatePage}
                    className="py-2.5 px-4 text-xs font-semibold text-white bg-[#4DA3FF] hover:bg-[#3892F3] rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Dedicated Certificate Page</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: ASSIGNMENT HISTORY */}
        {activeSection === 'assignments' && (
          <div className="space-y-3">
            {assignments.map((asg) => (
              <div
                key={asg.id}
                onClick={onNavigateToAssignment}
                className="p-5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] hover:border-[#4DA3FF]/40 transition-colors cursor-pointer shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#1C232D] text-slate-700 dark:text-slate-300 font-mono text-xs font-bold flex items-center justify-center">
                      {asg.number}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {asg.title}
                      </h4>
                      <span className="text-[11px] text-slate-400">{asg.courseTitle}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold border ${
                      asg.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-500/30'
                        : asg.status === 'Revision Required'
                        ? 'bg-amber-50 text-amber-700 border-amber-500/30'
                        : 'bg-blue-50 text-blue-700 border-blue-500/30'
                    }`}
                  >
                    {asg.status}
                  </span>
                </div>

                {asg.teacherFeedback && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#11161d] text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Feedback from {asg.teacherFeedback.teacherName}:
                    </span>{' '}
                    {asg.teacherFeedback.comment}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* SECTION 4: QUIZ RESULTS */}
        {activeSection === 'quizzes' && (
          <div className="space-y-3">
            {[
              {
                id: 'qz-1',
                title: 'Typography & Font Psychology Quiz',
                score: '85%',
                correct: '17 / 20',
                date: 'Oct 1, 2026',
                status: 'Passed',
              },
              {
                id: 'qz-2',
                title: 'Color Theory & Cultural Palette Test',
                score: '95%',
                correct: '19 / 20',
                date: 'Sep 26, 2026',
                status: 'Passed',
              },
              {
                id: 'qz-3',
                title: 'Visual Hierarchy & Grid Foundations',
                score: '90%',
                correct: '18 / 20',
                date: 'Sep 18, 2026',
                status: 'Passed',
              },
            ].map((q) => (
              <div
                key={q.id}
                onClick={onNavigateToQuiz}
                className="p-5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] flex items-center justify-between hover:border-[#4DA3FF]/40 transition-colors cursor-pointer shadow-sm"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400">{q.date}</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {q.title}
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">
                    Correct Answers: {q.correct}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums block">
                    {q.score}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-500">
                    {q.status} ✓
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION 5: SAVED LESSONS */}
        {activeSection === 'saved' && (
          <div className="space-y-3">
            <div
              onClick={() => onNavigateToLearning('graphic-design-mastery', 'gd-04-01')}
              className="p-5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] flex items-center justify-between hover:border-[#4DA3FF]/40 transition-colors cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] flex items-center justify-center">
                  <Bookmark className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Typography & Font Psychology
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Graphic Design · Module 04 · 38 min
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#4DA3FF] flex items-center gap-1">
                Play Lesson <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
