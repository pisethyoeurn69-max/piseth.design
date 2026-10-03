import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Layers, 
  Flame, 
  Star, 
  Compass, 
  Heart,
  ChevronRight
} from 'lucide-react';
import { Course } from '../types';
import { HeroVisual } from '../components/HeroVisual';
import { CourseCard } from '../components/CourseCard';
import { ActivityFeed } from '../components/ActivityFeed';
import { STUDENT_WORKS, INITIAL_ACTIVITIES } from '../data/coursesData';
import { useLanguage } from '../context/LanguageContext';

interface HomeViewProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onStartLearning: (courseId?: string) => void;
  onNavigate: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  courses,
  onSelectCourse,
  onStartLearning,
  onNavigate,
}) => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Graphic Design', 'UX/UI Design', 'Motion Graphics'];

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-20 sm:space-y-24 pb-20">
      
      {/* 3. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 lg:pt-18 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Quiet kicker with zero-pill discipline */}
              <div className="flex items-center gap-2 text-xs font-medium text-[#4DA3FF]">
                <span className="w-2 h-2 rounded-full bg-[#4DA3FF] animate-pulse" />
                <span>Modern Cambodian Design Academy</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-slate-500 dark:text-slate-400 font-khmer">
                  {language === 'km' ? 'បង្រៀនដោយលោកគ្រូ ពិសិដ្ឋ' : 'Led by Lecturer Piseth Yoeurn'}
                </span>
              </div>

              {/* Dynamic Bilingual Headline */}
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.25] sm:leading-[1.2] ${language === 'km' ? 'font-khmer' : ''}`}>
                {language === 'km' ? (
                  <>
                    រៀន Design ឲ្យច្បាស់<br />
                    <span className="text-[#4DA3FF]">បង្កើតស្នាដៃឲ្យមានតម្លៃ។</span>
                  </>
                ) : (
                  <>
                    Master Design Fundamentals.<br />
                    <span className="text-[#4DA3FF]">Craft Valuable Creations.</span>
                  </>
                )}
              </h1>

              {/* Dynamic Bilingual Supporting Text */}
              <p className={`text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl ${language === 'km' ? 'font-khmer' : ''}`}>
                {language === 'km'
                  ? 'រៀន Graphic Design, UX/UI, Motion Graphics និងជំនាញ Creative ដោយផ្តោតលើការអនុវត្តជាក់ស្តែង ជាមួយសាស្ត្រាចារ្យ យឿន ពិសិដ្ឋ។'
                  : 'Learn Graphic Design, UX/UI, Motion Graphics, and studio creative workflows through hands-on practice led by university lecturer Piseth Yoeurn.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onStartLearning('graphic-design-mastery')}
                  className="py-3 px-6 text-sm font-semibold text-white bg-[#4DA3FF] hover:bg-[#3892F3] rounded-xl transition-all shadow-md shadow-[#4DA3FF]/20 flex items-center gap-2 cursor-pointer group"
                >
                  <span className={language === 'km' ? 'font-khmer' : ''}>
                    {language === 'km' ? 'ចាប់ផ្ដើមរៀន' : 'Start Learning'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('courses')}
                  className="py-3 px-6 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-[#151B23] dark:hover:bg-[#1C232D] rounded-xl border border-slate-200/80 dark:border-[#222936] transition-all cursor-pointer"
                >
                  <span className={language === 'km' ? 'font-khmer' : ''}>
                    {language === 'km' ? 'មើលវគ្គសិក្សា' : 'Explore Courses'}
                  </span>
                </button>
              </div>

              {/* Proof stats directly adjacent to claims */}
              <div className="pt-6 border-t border-slate-200/70 dark:border-[#1E2530] grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="block text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    2,400+
                  </span>
                  <span className={`text-xs text-slate-500 dark:text-slate-400 ${language === 'km' ? 'font-khmer' : ''}`}>
                    {language === 'km' ? 'សិស្សបានចុះឈ្មោះ' : 'Students Enrolled'}
                  </span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    45 {language === 'km' ? 'ម៉ោង' : 'Hours'}
                  </span>
                  <span className={`text-xs text-slate-500 dark:text-slate-400 ${language === 'km' ? 'font-khmer' : ''}`}>
                    {language === 'km' ? 'ក្នុងមួយវគ្គសិក្សា' : 'Per Course'}
                  </span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    4.9 / 5
                  </span>
                  <span className={`text-xs text-slate-500 dark:text-slate-400 ${language === 'km' ? 'font-khmer' : ''}`}>
                    {language === 'km' ? 'ការវាយតម្លៃខ្ពស់' : 'Average Rating'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Column (Floating Dashboard Composition) */}
            <div className="lg:col-span-6">
              <HeroVisual
                onStartLearning={() => onStartLearning('graphic-design-mastery')}
                onViewCourse={() => onSelectCourse('graphic-design-mastery')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED COURSES SECTION */}
      <section id="courses-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#4DA3FF] uppercase tracking-wider mb-1">
              <span>Featured Curriculums</span>
            </div>
            {/* Required Section Title */}
            <h2 className={`text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white ${language === 'km' ? 'font-khmer' : ''}`}>
              {language === 'km' ? 'វគ្គសិក្សាដែលមានសម្រាប់អ្នក' : 'Featured Design Curriculums'}
            </h2>
            <p className={`text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl ${language === 'km' ? 'font-khmer' : ''}`}>
              {language === 'km'
                ? 'កម្មវិធីសិក្សាផ្តោតលើជំនាញ Graphic Design, UI/UX, និង Motion Graphics ស្របតាមតម្រូវការទីផ្សារការងារ។'
                : 'Curriculums engineered for professional mastery in graphic design, product UI/UX, and motion graphics.'}
            </p>
          </div>

          {/* Category Filter Tabs (functional segmented control) */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-[#151B23] rounded-xl border border-slate-200/80 dark:border-[#222936] overflow-x-auto self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-[#202834] text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onViewCourse={onSelectCourse}
              onStartLearning={onStartLearning}
            />
          ))}
        </div>
      </section>

      {/* FACEBOOK-INSPIRED ACTIVITY FEED SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-[#E4E6EB] dark:border-[#2E3034] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1877F2] dark:text-[#4595FF] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Studio Community</span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-bold text-[#1C1C1E] dark:text-[#F5F5F7] ${language === 'km' ? 'font-khmer' : ''}`}>
                {language === 'km' ? 'សកម្មភាពសិក្សាក្នុងសហគមន៍' : 'Learning Activity Feed'}
              </h2>
              <p className="text-xs sm:text-sm text-[#65676B] dark:text-[#A1A1A6] mt-1">
                {language === 'km'
                  ? 'ការកែលម្អកិច្ចការ, មេរៀនថ្មីៗ និងការបញ្ចប់វគ្គសិក្សារបស់សិស្សានុសិស្ស'
                  : 'Real-time studio critiques, newly released lessons, and student milestones.'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('dashboard')}
              className="text-xs font-semibold text-[#1877F2] dark:text-[#4595FF] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <span>{language === 'km' ? 'មើលផ្ទាំងគ្រប់គ្រង' : 'View Full Feed'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <ActivityFeed
            activities={INITIAL_ACTIVITIES}
            onActionClick={() => onStartLearning('graphic-design-mastery')}
          />
        </div>
      </section>

      {/* TEACHER SPOTLIGHT: PISETH YOEURN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E4E6EB] dark:border-[#2E3034] p-8 sm:p-12 overflow-hidden relative shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Teacher Visual Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden bg-slate-900 shadow-xl border-2 border-slate-200 dark:border-[#2b3545]">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                    alt="Piseth Yoeurn - University Lecturer"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Badge Overlay */}
                <div className="absolute -bottom-3 -right-3 bg-white dark:bg-[#0B0F14] border border-slate-200 dark:border-[#222936] p-2.5 rounded-xl shadow-lg flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#4DA3FF]" />
                  <div className="text-left">
                    <span className="text-[11px] font-bold text-slate-900 dark:text-white block">
                      University Lecturer
                    </span>
                    <span className="text-[10px] text-slate-400 font-khmer block">
                      សាស្ត្រាចារ្យសាកលវិទ្យាល័យ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher Bio & Philosophy */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#4DA3FF] uppercase tracking-wider">
                <span>Meet Your Instructor</span>
                <span aria-hidden="true">·</span>
                <span className="font-khmer text-slate-400">បទពិសោធន៍ជាង ១០ ឆ្នាំ</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-khmer">
                លោកគ្រូ យឿន ពិសិដ្ឋ (Piseth Yoeurn)
              </h3>

              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Senior Visual & Motion Designer · Lecturer at Royal University of Fine Arts, Phnom Penh
              </p>

              <blockquote className="border-l-2 border-[#4DA3FF] pl-4 italic text-sm text-slate-600 dark:text-slate-300 font-khmer leading-relaxed">
                "ការរចនាមិនមែនត្រឹមតែការប្រើ Tool នោះទេ ប៉ុន្តែជាការគិតស៊ីជម្រៅពី Layout, Grid, Typography និង Emotion ដើម្បីដោះស្រាយបញ្ហាពិតប្រាកដ។ ខ្ញុំបង្កើត piseth.design ដើម្បីចែករំលែកបទពិសោធន៍ជាក់ស្តែងដល់ប្អូនៗនិស្សិតខ្មែរ។"
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4DA3FF]" />
                  <span>Direct 1-on-1 Feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4DA3FF]" />
                  <span>Real Agency Client Briefs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4DA3FF]" />
                  <span>Khmer Typography Expertise</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs font-semibold text-[#4DA3FF] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Read Full Teaching Philosophy & Story <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT CREATIVE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-khmer">
              ស្នាដៃសិស្សឆ្នើម (Student Showcase)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Projects built by Cambodian students following piseth.design studio assignments.
            </p>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-semibold text-[#4DA3FF] hover:underline hidden sm:flex items-center gap-1"
          >
            Explore All Courses <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STUDENT_WORKS.map((work) => (
            <div
              key={work.id}
              className="bg-white dark:bg-[#151B23] rounded-2xl border border-slate-200/80 dark:border-[#222936] overflow-hidden shadow-sm group hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-900 relative">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-medium text-white border border-white/10">
                  {work.badge}
                </div>
              </div>
              <div className="p-4 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{work.course}</span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> {work.likes}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {work.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-khmer">
                  ដោយនិស្សិត: {work.studentName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
