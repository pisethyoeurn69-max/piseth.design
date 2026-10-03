import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Video, 
  Award,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  Users
} from 'lucide-react';
import { Student, Course, Assignment } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ActivityFeed } from '../components/ActivityFeed';
import { INITIAL_ACTIVITIES } from '../data/coursesData';

interface DashboardViewProps {
  student: Student;
  courses: Course[];
  assignments?: Assignment[];
  onStartLearning: (courseId: string, lessonId?: string) => void;
  onNavigate: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  student,
  courses,
  assignments,
  onStartLearning,
  onNavigate,
}) => {
  const { language } = useLanguage();
  const graphicDesignCourse = courses.find((c) => c.id === 'graphic-design-mastery') || courses[0];
  const activeAssignment = assignments?.[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* 1. Header: Good morning 👋 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E6EB] dark:border-[#2E3034] pb-6">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-black text-[#1C1C1E] dark:text-[#F5F5F7] flex items-center gap-2 ${language === 'km' ? 'font-khmer' : ''}`}>
            <span>{language === 'km' ? 'អរុណសួស្តី 👋' : 'Good morning 👋'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#65676B] dark:text-[#A1A1A6] mt-1">
            {language === 'km'
              ? 'រីករាយដែលបានជួបគ្នា! បន្តការសិក្សាដើម្បីពង្រឹងជំនាញ Design របស់អ្នកនៅថ្ងៃនេះ។'
              : 'Glad to see you! Continue mastering your design skills today.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="block text-xs font-semibold text-[#1C1C1E] dark:text-[#F5F5F7]">
              {language === 'km' ? student.nameKh : student.name}
            </span>
            <span className="block text-[11px] text-[#65676B] dark:text-[#A1A1A6]">
              {student.role}
            </span>
          </div>
          <img
            src={student.avatar}
            alt={student.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#1877F2]/40"
          />
        </div>
      </div>

      {/* 2. Two-Column Desktop Layout (Productivity + Social Usability) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Learning Track & Activity Feed */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Card: Continue Learning */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E4E6EB] dark:border-[#2E3034] shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#1877F2] dark:text-[#4595FF] font-semibold">
                {language === 'km' ? 'បន្តការសិក្សា' : 'Continue Learning'}
              </span>
              <span className="text-xs font-semibold text-[#1877F2] dark:text-[#4595FF] tabular-nums">
                78%
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-[#F5F5F7]">
                Graphic Design
              </h2>
              <p className="text-sm font-medium text-[#65676B] dark:text-[#A1A1A6]">
                Typography & Font Psychology · Module 04
              </p>
            </div>

            {/* Apple Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-2.5 bg-[#F5F7FA] dark:bg-[#242629] rounded-full overflow-hidden border border-[#E4E6EB]/50 dark:border-[#2E3034]">
                <div 
                  className="h-full bg-[#1877F2] dark:bg-[#4595FF] rounded-full transition-all duration-500" 
                  style={{ width: '78%' }} 
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#65676B] dark:text-[#A1A1A6]">
                <span>Lesson 04 of 06 in this module</span>
                <span>38 mins remaining</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onStartLearning('graphic-design-mastery')}
                className="py-3 px-6 rounded-xl text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{language === 'km' ? 'បន្តការរៀន' : 'Continue Learning'}</span>
              </button>

              <button
                onClick={() => onNavigate('courses')}
                className="py-3 px-5 rounded-xl text-xs font-semibold text-[#1C1C1E] dark:text-[#F5F5F7] hover:bg-[#F5F7FA] dark:hover:bg-[#242629] border border-[#E4E6EB] dark:border-[#2E3034] transition-colors cursor-pointer"
              >
                {language === 'km' ? 'មើលវគ្គសិក្សាទាំងអស់' : 'Browse All Courses'}
              </button>
            </div>
          </div>

          {/* Section: Learning Activity (Facebook-inspired) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-bold text-[#1C1C1E] dark:text-[#F5F5F7] flex items-center gap-2 ${language === 'km' ? 'font-khmer' : ''}`}>
                <Sparkles className="w-4 h-4 text-[#1877F2]" />
                <span>{language === 'km' ? 'សកម្មភាពសិក្សាក្នុងសហគមន៍' : 'Learning Activity'}</span>
              </h3>
              <span className="text-xs text-[#65676B] dark:text-[#A1A1A6]">
                Updated live
              </span>
            </div>

            <ActivityFeed 
              activities={INITIAL_ACTIVITIES} 
              onActionClick={() => onStartLearning('graphic-design-mastery')}
            />
          </div>

          {/* Section: Recently Completed */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E4E6EB] dark:border-[#2E3034] shadow-xs space-y-4">
            <h3 className={`text-base font-bold text-[#1C1C1E] dark:text-[#F5F5F7] flex items-center gap-2 ${language === 'km' ? 'font-khmer' : ''}`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{language === 'km' ? 'មេរៀនដែលទើបបញ្ចប់ថ្មីៗ' : 'Recently Completed'}</span>
            </h3>

            <div className="space-y-2.5">
              {[
                { title: 'Optical Stroke Harmonisation for Khmer Consonants', time: 'Yesterday', course: 'Graphic Design' },
                { title: 'Golden Ratio & Modular Grids in Modern Branding', time: '3 days ago', course: 'Graphic Design' },
                { title: 'Variable Typography Tokens & Stylesheet in Figma', time: '5 days ago', course: 'UX/UI Design' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F5F7FA] dark:bg-[#242629] border border-[#E4E6EB]/60 dark:border-[#2E3034] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <span className="font-semibold text-[#1C1C1E] dark:text-[#F5F5F7] block">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-[#65676B] dark:text-[#A1A1A6]">
                        {item.course} · Completed {item.time}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    100%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Productivity Widgets, Upcoming Class & Certificate */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Widget 1: Overall Learning Progress Card (78%) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E4E6EB] dark:border-[#2E3034] shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#65676B] dark:text-[#A1A1A6] block">
                {language === 'km' ? 'វឌ្ឍនភាពសិក្សាសរុប' : 'Overall Progress'}
              </span>
              <span className="text-3xl sm:text-4xl font-black text-[#1C1C1E] dark:text-[#F5F5F7] tabular-nums">
                78%
              </span>
              <span className="text-xs text-emerald-500 font-medium flex items-center gap-1 pt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +12% this week
              </span>
            </div>

            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#F5F7FA] dark:text-[#242629]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#1877F2] dark:text-[#4595FF]"
                  strokeDasharray="78, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <Award className="w-6 h-6 text-[#1877F2] dark:text-[#4595FF] absolute" />
            </div>
          </div>

          {/* Widget 2: Upcoming Assignment */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E4E6EB] dark:border-[#2E3034] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'km' ? 'កិច្ចការបន្ទាប់' : 'Upcoming Assignment'}</span>
              </span>
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-900/50">
                Due Tomorrow
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-[#1C1C1E] dark:text-[#F5F5F7]">
                Typography Poster (#03)
              </h4>
              <p className="text-xs text-[#65676B] dark:text-[#A1A1A6] mt-1">
                Bauhaus vs Khmer Modern: Layout hierarchy, contrast balance, and grid alignment.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 space-y-1">
              <span className="font-semibold block">Teacher Feedback:</span>
              <p className="text-[11px] leading-relaxed">
                "Tighten horizontal kerning between consonant subscripts and increase leading by 4pt."
              </p>
            </div>

            <button
              onClick={() => onNavigate('assignment')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>{language === 'km' ? 'ផ្ញើកិច្ចការកែសម្រួល' : 'Submit Revised Work'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Widget 3: Upcoming Live Class */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E4E6EB] dark:border-[#2E3034] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#1877F2] dark:text-[#4595FF] font-semibold flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" />
                <span>{language === 'km' ? 'ថ្នាក់ផ្ទាល់បន្ទាប់' : 'Upcoming Live Class'}</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Live Studio
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-[#F5F5F7]">
                Live Studio Critique & Portfolio Review
              </h4>
              <div className="flex items-center gap-2 text-xs text-[#65676B] dark:text-[#A1A1A6] mt-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Sunday, 2:00 PM – 4:00 PM</span>
              </div>
              <p className="text-xs text-[#65676B] dark:text-[#A1A1A6] mt-1">
                With university lecturer Piseth Yoeurn. Bring your in-progress Figma & Illustrator files.
              </p>
            </div>

            <button
              onClick={() => alert('Live meeting link is activated 15 minutes before the session starts.')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#1C1C1E] dark:text-[#F5F5F7] bg-[#F5F7FA] dark:bg-[#242629] hover:bg-[#E4E6EB] dark:hover:bg-[#2E3034] border border-[#E4E6EB] dark:border-[#2E3034] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{language === 'km' ? 'ចូលរួមតាម Meet' : 'Join Google Meet Session'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Widget 4: Official Certificates Preview */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E4E6EB] dark:border-[#2E3034] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#1877F2]" />
                <span>{language === 'km' ? 'វិញ្ញាបនបត្រ' : 'Certificates'}</span>
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                1 Verified
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#111317] to-[#1C1E24] text-white space-y-2 border border-[#2E3034]">
              <div className="flex items-center justify-between text-[10px] text-white/70 font-mono">
                <span>RUFA / PISETH.DESIGN</span>
                <span>ID: GD-2026-8842</span>
              </div>
              <h5 className="text-xs font-bold text-white font-khmer">
                វិញ្ញាបនបត្របញ្ជាក់ការបញ្ចប់វគ្គ Graphic Design
              </h5>
              <p className="text-[10px] text-white/60">
                Issued to {student.name} · Verified Digital Credential
              </p>
            </div>

            <button
              onClick={() => onNavigate('profile')}
              className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-[#1877F2] dark:text-[#4595FF] hover:bg-[#E7F3FF] dark:hover:bg-[#4595FF]/10 transition-colors text-center cursor-pointer"
            >
              {language === 'km' ? 'មើលវិញ្ញាបនបត្រក្នុង Profile' : 'View Verified Certificate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
