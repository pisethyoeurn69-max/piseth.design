import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Users, 
  Star, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  FileCheck, 
  HelpCircle, 
  Layers, 
  Sparkles,
  Download,
  Share2
} from 'lucide-react';
import { Course } from '../types';

interface CourseDetailsViewProps {
  course: Course;
  onBack: () => void;
  onStartLearning: (courseId: string, lessonId?: string) => void;
  onEnrollCourse: (courseId: string) => void;
}

export const CourseDetailsView: React.FC<CourseDetailsViewProps> = ({
  course,
  onBack,
  onStartLearning,
  onEnrollCourse,
}) => {
  // Keep module 01, 04, and 06 expanded by default
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-01': true,
    'mod-04': true,
    'mod-06': true,
  });

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    course.modules.forEach((m) => { all[m.id] = true; });
    setExpandedModules(all);
  };

  const collapseAll = () => {
    setExpandedModules({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses (ត្រឡប់ទៅបញ្ជីវគ្គសិក្សា)</span>
        </button>
      </div>

      {/* Course Hero & Overview Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left: Course Description & Metadata */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-[#4DA3FF]">{course.category}</span>
            <span aria-hidden="true">·</span>
            <span>{course.level}</span>
            <span aria-hidden="true">·</span>
            <span>{course.duration}</span>
            <span aria-hidden="true">·</span>
            <span>{course.totalLessons} Lessons</span>
          </div>

          {/* Course Title */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {course.title}
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-[#4DA3FF] mt-1 font-khmer">
              {course.titleKh}
            </p>
          </div>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            {course.fullDescription}
          </p>

          {/* Social Proof Stats */}
          <div className="flex items-center flex-wrap gap-6 pt-2 text-xs text-slate-600 dark:text-slate-400 border-y border-slate-200/80 dark:border-[#222936] py-3.5">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <strong className="text-slate-900 dark:text-white font-medium">{course.rating.toFixed(2)}</strong>
              <span>({course.ratingCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-400" />
              <span>{course.studentsCount.toLocaleString()} Students Enrolled</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>45 Hours Live & Studio Content</span>
            </div>
          </div>

          {/* Instructor Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] flex items-center gap-4">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-300 dark:ring-slate-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {course.instructor.name}
                </h4>
                <span className="text-xs text-[#4DA3FF] font-khmer">
                  {course.instructor.nameKh}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {course.instructor.title}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                {course.instructor.bio}
              </p>
            </div>
          </div>

          {/* Software Required */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Software Required
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {course.software.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-[#222936] shadow-sm"
                >
                  <span className="w-7 h-7 rounded-lg bg-black text-white font-mono text-xs font-bold flex items-center justify-center">
                    {s.icon}
                  </span>
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Floating Enrollment Action Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200/80 dark:border-[#222936] shadow-xl overflow-hidden p-6 space-y-6">
            
            {/* Cover Graphic Preview */}
            <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-5 text-white flex flex-col justify-between border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#4DA3FF]">piseth.design</span>
                <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded">45h Video + Files</span>
              </div>
              <div>
                <span className="text-xl font-bold font-khmer block text-white">
                  {course.titleKh || course.title}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {course.shortDescription}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>By Piseth Yoeurn</span>
                <span className="text-[#4DA3FF] font-medium">Official Curriculum</span>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  ${course.price}
                </span>
                {course.originalPrice && (
                  <span className="ml-2 text-sm text-slate-400 line-through tabular-nums">
                    ${course.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Lifetime Access Included
              </span>
            </div>

            {/* Progress if already enrolled */}
            {course.enrolled && typeof course.progress === 'number' && (
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">You are enrolled!</span>
                  <span className="font-bold text-[#4DA3FF] tabular-nums">{course.progress}% Completed</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4DA3FF] rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Required Action Buttons */}
            <div className="space-y-2.5">
              {course.enrolled ? (
                <button
                  onClick={() => onStartLearning(course.id, course.lastLessonId)}
                  className="w-full py-3 px-4 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white font-semibold text-sm transition-all shadow-md shadow-[#4DA3FF]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Learning · បន្តរៀន</span>
                </button>
              ) : (
                <button
                  onClick={() => onEnrollCourse(course.id)}
                  className="w-full py-3 px-4 rounded-xl bg-[#4DA3FF] hover:bg-[#3892F3] text-white font-semibold text-sm transition-all shadow-md shadow-[#4DA3FF]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enroll Now · ចុះឈ្មោះឥឡូវនេះ</span>
                </button>
              )}

              <button
                onClick={() => onStartLearning(course.id, course.modules[0]?.lessons[0]?.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1C232D] dark:hover:bg-[#252E3B] text-slate-800 dark:text-slate-200 font-medium text-xs transition-colors cursor-pointer"
              >
                Preview Syllabus & Free Lesson
              </button>
            </div>

            {/* Quick Guarantees */}
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-[#222936]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4DA3FF]" />
                <span>45 hours of high-definition video lessons</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4DA3FF]" />
                <span>Original exercise files (.fig, .psd, .ai)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4DA3FF]" />
                <span>Teacher Piseth direct feedback on 3 assignments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4DA3FF]" />
                <span>Verified Certificate of Completion</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Course Overview Tabs & Sections */}
      <div className="space-y-12 pt-6">
        
        {/* What you will learn */}
        <section className="bg-slate-50 dark:bg-[#151B23] p-8 rounded-3xl border border-slate-200/80 dark:border-[#222936]">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-khmer mb-6">
            អ្វីដែលអ្នកនឹងទទួលបានពីវគ្គនេះ (What You Will Learn)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.whatYouWillLearn.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#4DA3FF] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Course Projects */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-khmer">
              គម្រោងដែលត្រូវអនុវត្តជាក់ស្តែង (Course Projects)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Studio-level deliverables you will build to complete your graduation portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {course.projects.map((proj, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] space-y-3"
              >
                <div className="text-[11px] font-mono text-[#4DA3FF] font-semibold">
                  {proj.tag}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Course Curriculum (10 Modules with Expand/Collapse) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-khmer">
                មាតិកាវគ្គសិក្សា (Course Curriculum)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {course.modules.length} Modules · {course.totalLessons} Lessons · {course.duration} Total Duration
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-[#4DA3FF] px-2.5 py-1 rounded bg-slate-100 dark:bg-[#1C232D]"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-[#4DA3FF] px-2.5 py-1 rounded bg-slate-100 dark:bg-[#1C232D]"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Module Accordion List */}
          <div className="space-y-3">
            {course.modules.map((module) => {
              const isExpanded = !!expandedModules[module.id];
              return (
                <div
                  key={module.id}
                  className="rounded-2xl border border-slate-200/80 dark:border-[#222936] bg-white dark:bg-[#151B23] overflow-hidden transition-all"
                >
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-[#18202A] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#11161d] text-slate-700 dark:text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {module.number}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {module.title}
                        </h3>
                        {module.titleKh && (
                          <span className="text-xs text-slate-400 font-khmer block mt-0.5">
                            {module.titleKh}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">
                        {module.lessons.length} lessons
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Module Lessons Dropdown */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 dark:border-[#222936] bg-slate-50/50 dark:bg-[#11161d] divide-y divide-slate-100 dark:divide-[#1e2633]">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="p-3.5 sm:px-5 flex items-center justify-between hover:bg-white dark:hover:bg-[#151B23] transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => onStartLearning(course.id, lesson.id)}
                              className="w-7 h-7 rounded-full bg-white dark:bg-[#1F2733] border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-[#4DA3FF] group-hover:border-[#4DA3FF]/40 cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-current ml-0.5" />
                            </button>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#4DA3FF] transition-colors">
                                  {lesson.title}
                                </span>
                                {lesson.completed && (
                                  <span className="text-[10px] text-emerald-500 flex items-center gap-0.5 font-medium">
                                    <CheckCircle2 className="w-3 h-3" /> Completed
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 max-w-xl">
                                {lesson.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {lesson.hasAssignment && (
                              <span className="text-[10px] text-amber-500 font-mono border border-amber-500/30 px-1.5 py-0.5 rounded hidden sm:inline-block">
                                Assignment
                              </span>
                            )}
                            {lesson.hasQuiz && (
                              <span className="text-[10px] text-purple-500 font-mono border border-purple-500/30 px-1.5 py-0.5 rounded hidden sm:inline-block">
                                Quiz
                              </span>
                            )}
                            <span className="text-xs text-slate-400 font-mono tabular-nums">
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Requirements */}
        <section className="p-8 rounded-3xl bg-slate-50 dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-khmer">
            តម្រូវការមុនពេលចូលរៀន (Requirements)
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {course.requirements.map((req, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF]" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
