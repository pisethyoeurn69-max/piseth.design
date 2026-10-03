import React, { useState } from 'react';
import { Search, Filter, Sparkles, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import { Course } from '../types';
import { CourseCard } from '../components/CourseCard';
import { useLanguage } from '../context/LanguageContext';

interface CoursesViewProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onStartLearning: (courseId?: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  onSelectCourse,
  onStartLearning,
}) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Graphic Design', 'UX/UI Design', 'Motion Graphics'];

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesQuery =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.titleKh && c.titleKh.includes(searchQuery)) ||
      c.software.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1877F2] dark:text-[#4595FF] uppercase tracking-wider">
          <span>Curriculum Catalog</span>
          <span aria-hidden="true">·</span>
          <span className="font-khmer text-[#65676B] dark:text-[#A1A1A6]">
            {language === 'km' ? 'វគ្គសិក្សាទាំងអស់' : 'All Curriculums'}
          </span>
        </div>
        <h1 className={`text-3xl sm:text-4xl font-black text-[#1C1C1E] dark:text-[#F5F5F7] ${language === 'km' ? 'font-khmer' : ''}`}>
          {language === 'km' ? 'វគ្គសិក្សាដែលមានសម្រាប់អ្នក' : 'Professional Design Courses'}
        </h1>
        <p className={`text-sm sm:text-base text-[#65676B] dark:text-[#A1A1A6] leading-relaxed ${language === 'km' ? 'font-khmer' : ''}`}>
          {language === 'km'
            ? 'រៀន Graphic Design, UX/UI, Motion Graphics និងជំនាញ Creative ដោយផ្តោតលើការអនុវត្តជាក់ស្តែងជាមួយលោកគ្រូ ពិសិដ្ឋ។'
            : 'Master Graphic Design, UX/UI, and Motion Graphics through real-world studio projects taught by university lecturer Piseth Yoeurn.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2 bg-white dark:bg-[#1C1C1E] rounded-2xl border border-[#E4E6EB] dark:border-[#2E3034] shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1877F2] text-white shadow-xs font-semibold'
                  : 'text-[#65676B] dark:text-[#A1A1A6] hover:text-[#1C1C1E] dark:hover:text-[#F5F5F7] hover:bg-[#F5F7FA] dark:hover:bg-[#242629]'
              }`}
            >
              {cat === 'All' ? (language === 'km' ? 'ទាំងអស់' : 'All') : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'km' ? 'ស្វែងរកវគ្គសិក្សា ឬកម្មវិធី (Ps, Figma)...' : 'Search courses or software (Ps, Figma)...'}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#F5F7FA] dark:bg-[#242629] border border-[#E4E6EB] dark:border-[#2E3034] text-[#1C1C1E] dark:text-[#F5F5F7] placeholder-[#65676B] dark:placeholder-[#A1A1A6] focus:outline-none focus:ring-1 focus:ring-[#1877F2]"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onViewCourse={onSelectCourse}
            onStartLearning={onStartLearning}
          />
        ))}
      </div>

      {/* Value Proposition Box */}
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#11161d] border border-slate-200/80 dark:border-[#1E2530] grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        <div className="space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">45 Hours Per Course</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-khmer">
            មេរៀនលម្អិតពីមូលដ្ឋានគ្រឹះរហូតដល់កម្រិតខ្ពស់ ដោយមិនកាត់បន្ថយខ្លឹមសារ។
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Studio Project Based</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-khmer">
            រៀនអនុវត្តតាម Case Study ពិតៗ សម្រាប់ដាក់ក្នុង Portfolio ស្វែងរកការងារ។
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">University-Grade Review</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-khmer">
            ទទួលការកែលម្អផ្ទាល់ពីលោកគ្រូ យឿន ពិសិដ្ឋ គ្រប់កិច្ចការស្វ័យសិក្សា។
          </p>
        </div>
      </div>
    </div>
  );
};
