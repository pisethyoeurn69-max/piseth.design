import React from 'react';
import { Play, CheckCircle2, Award, Clock, ArrowUpRight, BookOpen, Layers } from 'lucide-react';

interface HeroVisualProps {
  onStartLearning: () => void;
  onViewCourse: () => void;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ onStartLearning, onViewCourse }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none lg:h-[540px] flex items-center justify-center select-none py-6 lg:py-0">
      {/* Ambient gradient glow behind hero visual */}
      <div 
        aria-hidden="true" 
        className="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-[#1877F2]/10 blur-3xl -top-8 -right-8 pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute w-60 h-60 rounded-full bg-blue-500/10 blur-2xl -bottom-6 -left-8 pointer-events-none" 
      />

      {/* Main Center Canvas: Modern Design Project Artboard */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1C1C1E] rounded-2xl border border-[#E4E6EB] dark:border-[#2E3034] shadow-xl shadow-slate-900/5 dark:shadow-black/40 overflow-hidden transition-all duration-300">
        {/* Apple-style window bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E6EB] dark:border-[#2E3034] bg-[#F5F7FA] dark:bg-[#242629]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            <span className="ml-2 text-xs font-mono text-[#65676B] dark:text-[#A1A1A6] tracking-tight">
              project_typography_poster.fig
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#65676B] dark:text-[#A1A1A6] bg-white dark:bg-[#1C1C1E] px-2 py-0.5 rounded-md border border-[#E4E6EB] dark:border-[#2E3034]">
            <Layers className="w-3 h-3 text-[#1877F2]" />
            <span>Figma Canvas</span>
          </div>
        </div>

        {/* Poster Canvas Preview */}
        <div className="p-5 bg-[#F5F7FA] dark:bg-[#0B0B0D]">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#111317] text-white p-6 flex flex-col justify-between border border-[#2E3034] shadow-inner group">
            {/* Subtle grid lines inside canvas */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Poster Header */}
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#1877F2] dark:text-[#4595FF]">
                  SWISS MODERNISM & KHMER GLYPH
                </p>
                <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 font-khmer">
                  សិល្បៈនៃតួអក្សរ
                </h4>
              </div>
              <span className="text-[10px] font-mono text-slate-400 border border-slate-700 px-2 py-0.5 rounded">
                1080 × 1350 px
              </span>
            </div>

            {/* Graphic Focal Center */}
            <div className="relative z-10 my-auto py-2 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl font-black text-white/90 font-khmer leading-none">
                  ក · A
                </span>
                <span className="text-xs text-slate-400 mt-2 font-mono">
                  Optical Stroke Harmonisation
                </span>
              </div>
              <div className="w-20 h-20 rounded-full border border-dashed border-[#1877F2]/40 flex items-center justify-center animate-[spin_16s_linear_infinite]">
                <div className="w-14 h-14 rounded-full border border-[#1877F2]/70 flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#1877F2] rounded-sm rotate-45" />
                </div>
              </div>
            </div>

            {/* Poster Footer */}
            <div className="relative z-10 flex items-end justify-between border-t border-slate-800/80 pt-3 text-[11px] text-slate-400">
              <span className="font-mono">Module 04: Typography</span>
              <span className="text-[#1877F2] dark:text-[#4595FF] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Open in Workspace <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Project bar footer */}
        <div className="p-3 px-5 flex items-center justify-between bg-white dark:bg-[#1C1C1E] border-t border-[#E4E6EB] dark:border-[#2E3034]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#E7F3FF] dark:bg-[#4595FF]/15 flex items-center justify-center text-[10px] font-bold text-[#1877F2] dark:text-[#4595FF]">
              PY
            </div>
            <span className="text-xs text-[#65676B] dark:text-[#A1A1A6]">
              Instructor: <strong className="text-[#1C1C1E] dark:text-[#F5F5F7] font-medium">Piseth Yoeurn</strong>
            </span>
          </div>
          <button
            onClick={onViewCourse}
            className="text-xs font-medium text-[#1877F2] dark:text-[#4595FF] hover:underline cursor-pointer"
          >
            Course Curriculum →
          </button>
        </div>
      </div>

      {/* FLOATING CARD 1 (Top Left / Above): Course Progress Widget */}
      <div 
        className="hidden sm:flex absolute -top-4 -left-6 z-20 items-center gap-3 p-3.5 bg-white dark:bg-[#1C1C1E] rounded-2xl border border-[#E4E6EB] dark:border-[#2E3034] shadow-lg shadow-slate-900/5 dark:shadow-black/40 animate-[bounce_6s_ease-in-out_infinite]"
        style={{ animationDuration: '5s' }}
      >
        <div className="relative w-11 h-11 flex items-center justify-center">
          <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100 dark:text-slate-800"
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
          <span className="absolute text-[11px] font-bold text-[#1C1C1E] dark:text-[#F5F5F7] tabular-nums">
            78%
          </span>
        </div>
        <div>
          <span className="block text-[11px] text-[#65676B] dark:text-[#A1A1A6] font-medium">
            Overall Progress
          </span>
          <span className="block text-xs font-semibold text-[#1C1C1E] dark:text-[#F5F5F7]">
            Graphic Design
          </span>
        </div>
      </div>

      {/* FLOATING CARD 2 (Bottom Right): Video Lesson Quick Player Card */}
      <div 
        className="hidden sm:flex absolute -bottom-6 -right-6 z-20 items-center gap-3 p-3.5 bg-white dark:bg-[#1C1C1E] rounded-2xl border border-[#E4E6EB] dark:border-[#2E3034] shadow-lg shadow-slate-900/5 dark:shadow-black/40 animate-[bounce_6s_ease-in-out_infinite]"
        style={{ animationDuration: '6s', animationDelay: '1s' }}
      >
        <button
          onClick={onStartLearning}
          aria-label="Play video lesson"
          className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:bg-[#166FE5] transition-colors shrink-0 shadow-sm cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </button>
        <div className="pr-1">
          <div className="flex items-center gap-1.5 text-[10px] text-[#1877F2] dark:text-[#4595FF] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2] animate-pulse" />
            <span>Currently Learning</span>
          </div>
          <h5 className="text-xs font-semibold text-[#1C1C1E] dark:text-[#F5F5F7] line-clamp-1 max-w-[170px]">
            Typography & Font Psychology
          </h5>
          <span className="text-[11px] text-[#65676B] dark:text-[#A1A1A6] flex items-center gap-1">
            <Clock className="w-3 h-3" /> 38 mins remaining
          </span>
        </div>
      </div>

      {/* FLOATING CARD 3 (Bottom Left): Assignment Badge */}
      <div 
        className="hidden md:flex absolute bottom-8 -left-10 z-20 items-center gap-2.5 px-3.5 py-2.5 bg-white dark:bg-[#1C1C1E] rounded-2xl border border-[#E4E6EB] dark:border-[#2E3034] shadow-lg shadow-slate-900/5 dark:shadow-black/40 animate-[bounce_7s_ease-in-out_infinite]"
        style={{ animationDuration: '7s', animationDelay: '2s' }}
      >
        <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-semibold">
          #03
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#1C1C1E] dark:text-[#F5F5F7]">
              Typography Poster
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
            <span>Teacher Feedback Received</span>
          </div>
        </div>
      </div>

      {/* FLOATING CARD 4 (Top Right): Student Milestone Pill */}
      <div 
        className="hidden md:flex absolute top-6 -right-8 z-20 items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#1C1C1E] rounded-full border border-[#E4E6EB] dark:border-[#2E3034] shadow-md shadow-slate-900/5 dark:shadow-black/30 animate-[bounce_8s_ease-in-out_infinite]"
        style={{ animationDuration: '8s', animationDelay: '1.5s' }}
      >
        <Award className="w-3.5 h-3.5 text-[#1877F2] dark:text-[#4595FF]" />
        <span className="text-xs font-medium text-[#1C1C1E] dark:text-[#F5F5F7]">
          48 Lessons Completed
        </span>
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
      </div>
    </div>
  );
};
