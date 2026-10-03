import React from 'react';
import { Clock, BookOpen, Star, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Course } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CourseCardProps {
  course: Course;
  onViewCourse: (courseId: string) => void;
  onStartLearning?: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onViewCourse,
  onStartLearning,
}) => {
  const { language } = useLanguage();
  const softwareSummary = course.software.map((s) => s.name.replace('Adobe ', '')).join(' + ');

  return (
    <div className="group relative bg-white dark:bg-[#1C1C1E] rounded-2xl border border-[#E4E6EB] dark:border-[#2E3034] hover:border-[#1877F2]/50 dark:hover:border-[#4595FF]/50 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* 1. Visual Thumbnail / Image Header */}
      <div 
        onClick={() => onViewCourse(course.id)}
        className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-[#111317] to-[#1C1E24] p-5 flex flex-col justify-between cursor-pointer border-b border-[#E4E6EB] dark:border-[#2E3034]"
      >
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {course.software.map((s) => (
              <span
                key={s.name}
                className="w-6 h-6 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold flex items-center justify-center font-mono"
                title={s.name}
              >
                {s.icon}
              </span>
            ))}
          </div>

          <span className="text-[11px] font-medium text-white/90 bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15">
            {course.category}
          </span>
        </div>

        {/* Center Title Graphic */}
        <div className="relative z-10 my-auto py-2">
          <h3 className="text-xl sm:text-2xl font-black text-white font-khmer drop-shadow-sm">
            {course.titleKh || course.title}
          </h3>
          <p className="text-xs text-white/70 font-mono mt-0.5">
            {softwareSummary}
          </p>
        </div>

        {/* Bottom Thumbnail Metadata */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-white/80">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <strong className="text-white font-semibold">{course.rating.toFixed(2)}</strong>
            <span className="text-white/60">({course.ratingCount})</span>
          </span>
          <span className="font-mono text-white/70">
            {course.studentsCount.toLocaleString()} {language === 'km' ? 'សិស្ស' : 'Students'}
          </span>
        </div>
      </div>

      {/* 2. Card Content (Apple-like Visual Hierarchy) */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Course Title */}
          <h3 
            onClick={() => onViewCourse(course.id)}
            className="text-lg sm:text-xl font-bold text-[#1C1C1E] dark:text-[#F5F5F7] group-hover:text-[#1877F2] dark:group-hover:text-[#4595FF] transition-colors cursor-pointer"
          >
            {course.title}
          </h3>

          {/* Software stack highlight */}
          <p className="text-xs font-semibold text-[#1877F2] dark:text-[#4595FF] mt-0.5">
            {softwareSummary}
          </p>

          {/* Short description */}
          <p className="text-xs text-[#65676B] dark:text-[#A1A1A6] mt-2 line-clamp-2 leading-relaxed">
            {course.fullDescription}
          </p>

          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-[#65676B] dark:text-[#A1A1A6] mt-3.5 font-medium">
            <span>
              {language === 'km' && course.level === 'Beginner → Intermediate'
                ? 'ដំបូង → មធ្យម'
                : course.level}
            </span>
            <span aria-hidden="true" className="text-[#E4E6EB] dark:text-[#2E3034]">·</span>
            <span>{course.duration}</span>
            <span aria-hidden="true" className="text-[#E4E6EB] dark:text-[#2E3034]">·</span>
            <span>{course.totalLessons} {language === 'km' ? 'មេរៀន' : 'Lessons'}</span>
          </div>
        </div>

        {/* 3. Progress Bar & CTA */}
        <div className="pt-3 border-t border-[#E4E6EB] dark:border-[#2E3034] space-y-3">
          
          {/* Progress bar if enrolled */}
          {course.enrolled && typeof course.progress === 'number' ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#65676B] dark:text-[#A1A1A6] font-medium">
                  {language === 'km' ? 'វឌ្ឍនភាពសិក្សា' : 'Progress'}
                </span>
                <span className="font-bold text-[#1877F2] dark:text-[#4595FF] tabular-nums">
                  {course.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#F5F7FA] dark:bg-[#242629] rounded-full overflow-hidden border border-[#E4E6EB]/50 dark:border-[#2E3034]">
                <div
                  className="h-full bg-[#1877F2] dark:bg-[#4595FF] rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-[#65676B] dark:text-[#A1A1A6]">
              <span>{language === 'km' ? 'តម្លៃសិក្សា' : 'Tuition'}</span>
              <div className="text-right">
                <span className="text-base font-bold text-[#1C1C1E] dark:text-[#F5F5F7] tabular-nums">
                  ${course.price}
                </span>
                {course.originalPrice && (
                  <span className="ml-1.5 text-xs text-[#65676B] dark:text-[#A1A1A6] line-through tabular-nums">
                    ${course.originalPrice}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-0.5">
            <button
              onClick={() => onViewCourse(course.id)}
              className="flex-1 py-2.5 px-3 text-xs font-semibold text-[#1C1C1E] dark:text-[#F5F5F7] hover:bg-[#F5F7FA] dark:hover:bg-[#242629] border border-[#E4E6EB] dark:border-[#2E3034] rounded-xl transition-colors text-center cursor-pointer"
            >
              {language === 'km' ? 'ព័ត៌មានលម្អិត' : 'View Course'}
            </button>

            {course.enrolled && onStartLearning ? (
              <button
                onClick={() => onStartLearning(course.id)}
                className="py-2.5 px-4 text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{language === 'km' ? 'បន្តការរៀន' : 'Continue Learning'}</span>
              </button>
            ) : (
              <button
                onClick={() => onViewCourse(course.id)}
                className="py-2.5 px-4 text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] rounded-xl transition-all flex items-center gap-1 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>{language === 'km' ? 'ចុះឈ្មោះរៀន' : 'Enroll Now'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
