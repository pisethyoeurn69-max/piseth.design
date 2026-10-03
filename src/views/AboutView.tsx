import React from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Heart, 
  MapPin, 
  Mail, 
  ArrowRight,
  CheckCircle2,
  Send
} from 'lucide-react';

interface AboutViewProps {
  onNavigateToCourses: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateToCourses }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      
      {/* Hero / Intro */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#1E2530] bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                alt="Piseth Yoeurn"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-[#151B23] border border-slate-200 dark:border-[#222936] p-3 rounded-2xl shadow-xl flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] flex items-center justify-center font-bold text-xs">
                PY
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Piseth Yoeurn
                </span>
                <span className="text-[10px] text-slate-400 font-khmer block">
                  សាស្ត្រាចារ្យ យឿន ពិសិដ្ឋ
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 space-y-4 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4DA3FF] uppercase tracking-wider">
            <span>The Founder & Educator</span>
            <span aria-hidden="true">·</span>
            <span className="font-khmer text-slate-400">ប្រវត្តិរូបសង្ខេប</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-khmer">
            លោកគ្រូ យឿន ពិសិដ្ឋ (Piseth Yoeurn)
          </h1>

          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Senior Visual & Motion Designer · University Lecturer at Royal University of Fine Arts, Phnom Penh.
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            With over a decade of hands-on agency leadership in Phnom Penh, Piseth has designed visual identities for top Cambodian brands, commercial broadcast campaigns, and digital consumer products. His teaching journey began in university classrooms, noticing a wide gap between academic software tutorials and true international-standard design thinking.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToCourses}
              className="py-2.5 px-5 text-xs font-semibold text-white bg-[#4DA3FF] hover:bg-[#3892F3] rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Studio Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="mailto:pisethyoeurn69@gmail.com"
              className="py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-[#151B23] dark:hover:bg-[#1C232D] rounded-xl border border-slate-200/80 dark:border-[#222936] transition-colors"
            >
              Contact Teacher Piseth
            </a>
          </div>
        </div>
      </div>

      {/* Teaching Philosophy */}
      <div className="bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200/80 dark:border-[#222936] p-8 sm:p-10 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-khmer">
          ទស្សនវិជ្ជានៃការបង្រៀន (Teaching Philosophy)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Rigor Over Shortcuts
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-khmer">
              មិនបង្រៀនត្រឹមតែចុច Tool នោះទេ។ យើងផ្តោតលើ Typography, Grid និង Layout ដើម្បីបង្កើតស្នាដៃមានតម្លៃយូរអង្វែង។
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Bilingual Khmer Harmony
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-khmer">
              ជំនាញផ្សំពុម្ពអក្សរខ្មែរ និងអង់គ្លេសឲ្យស៊ីសង្វាក់គ្នា ដោយរក្សាអត្តសញ្ញាណ និងភាពងាយស្រួលអានកម្រិតអន្តរជាតិ។
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Studio Practice & Critique
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-khmer">
              រាល់កិច្ចការស្វ័យសិក្សាត្រូវបានត្រួតពិនិត្យ និងផ្តល់មតិកែលម្អលម្អិត ១ ទល់ ១ ដើម្បីអភិវឌ្ឍជំនាញជាក់ស្តែង។
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
