import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  return (
    <footer className="border-t border-slate-200/80 dark:border-[#1E2530] bg-white dark:bg-[#0B0F14] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              piseth<span className="text-[#4DA3FF]">.design</span>
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Modern creative design academy founded by university lecturer Piseth Yoeurn. Educating Cambodian creators to craft international-standard design.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-khmer">
              រៀន Design ឲ្យច្បាស់ បង្កើតស្នាដៃឲ្យមានតម្លៃ។
            </p>
          </div>

          {/* Courses Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Courses · វគ្គសិក្សា
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-[#4DA3FF] transition-colors text-left"
                >
                  Graphic Design Mastery (Ps + Ai + Id)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-[#4DA3FF] transition-colors text-left"
                >
                  UX/UI Design with Figma
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-[#4DA3FF] transition-colors text-left"
                >
                  Motion Graphics & Kinetic Type
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-[#4DA3FF] transition-colors text-left"
                >
                  Advanced 2D & 3D Motion II
                </button>
              </li>
            </ul>
          </div>

          {/* Student Hub Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Student Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-[#4DA3FF] transition-colors text-left"
                >
                  Student Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('learning')}
                  className="hover:text-[#4DA3FF] transition-colors text-left"
                >
                  Video Classroom
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assignment')}
                  className="hover:text-[#4DA3FF] transition-colors text-left"
                >
                  Assignments & Feedback (#03)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-[#4DA3FF] transition-colors text-left"
                >
                  Typography Knowledge Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-[#4DA3FF] transition-colors text-left"
                >
                  Free Khmer Fonts & Templates
                </button>
              </li>
            </ul>
          </div>

          {/* Academy & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Teacher & Community
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Lecturer at Royal University of Fine Arts, Phnom Penh.
            </p>
            <div className="pt-1 flex flex-col space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-mono text-[11px] text-slate-400">Telegram Community:</span>
              <a 
                href="#telegram" 
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-1 text-[#4DA3FF] hover:underline"
              >
                t.me/pisethdesign_academy <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="font-mono text-[11px] text-slate-400 pt-1">Direct Mentorship:</span>
              <span className="text-slate-700 dark:text-slate-300">pisethyoeurn69@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-[#1E2530] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>© 2026 piseth.design. All rights reserved. Phnom Penh, Cambodia.</p>
            <LanguageSwitcher variant="pill" />
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Apple-inspired Minimalist UX</span>
            <span aria-hidden="true">·</span>
            <span>Khmer Creative Education</span>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('about')} className="hover:text-[#4DA3FF] cursor-pointer">
              About Teacher Piseth
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
