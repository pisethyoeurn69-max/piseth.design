import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '../context/LanguageContext';
import { Globe, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'compact' | 'dropdown' | 'pill';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'pill') {
    return (
      <div className={`inline-flex items-center p-1 rounded-xl bg-[#F5F7FA] dark:bg-[#242629] border border-[#E4E6EB] dark:border-[#2E3034] text-xs font-semibold ${className}`}>
        <button
          onClick={() => setLanguage('km')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            language === 'km'
              ? 'bg-white dark:bg-[#1C1C1E] text-[#1877F2] dark:text-[#4595FF] shadow-xs font-bold'
              : 'text-[#65676B] dark:text-[#A1A1A6] hover:text-[#1C1C1E] dark:hover:text-[#F5F5F7]'
          }`}
          title="ភាសាខ្មែរ (Khmer)"
        >
          <span>🇰🇭</span>
          <span className="font-khmer">ខ្មែរ</span>
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-white dark:bg-[#1C1C1E] text-[#1877F2] dark:text-[#4595FF] shadow-xs font-bold'
              : 'text-[#65676B] dark:text-[#A1A1A6] hover:text-[#1C1C1E] dark:hover:text-[#F5F5F7]'
          }`}
          title="English"
        >
          <span>🇬🇧</span>
          <span>EN</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language (ប្តូរភាសា)"
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-[#F5F7FA] dark:bg-[#242629] border border-[#E4E6EB] dark:border-[#2E3034] text-[#1C1C1E] dark:text-[#F5F5F7] hover:border-[#1877F2]/40 transition-all cursor-pointer shadow-xs"
        title={language === 'km' ? 'ប្តូរទៅភាសាអង់គ្លេស' : 'Switch to Khmer language'}
      >
        <Globe className="w-3.5 h-3.5 text-[#1877F2] dark:text-[#4595FF]" />
        <span className="font-semibold text-[11px]">
          {language === 'km' ? 'ខ្មែរ' : 'EN'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#1C1C1E] rounded-2xl border border-[#E4E6EB] dark:border-[#2E3034] shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 border-b border-[#E4E6EB] dark:border-[#2E3034] text-[10px] font-mono text-[#65676B] dark:text-[#A1A1A6] uppercase tracking-wider">
            Select Language
          </div>
          <button
            onClick={() => {
              setLanguage('km');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors text-left cursor-pointer ${
              language === 'km'
                ? 'bg-[#E7F3FF] dark:bg-[#4595FF]/15 text-[#1877F2] dark:text-[#4595FF] font-bold'
                : 'text-[#1C1C1E] dark:text-[#F5F5F7] hover:bg-[#F5F7FA] dark:hover:bg-[#242629]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">🇰🇭</span>
              <span className="font-khmer">ភាសាខ្មែរ</span>
            </div>
            {language === 'km' && <Check className="w-3.5 h-3.5 text-[#1877F2] dark:text-[#4595FF]" />}
          </button>
          <button
            onClick={() => {
              setLanguage('en');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors text-left cursor-pointer ${
              language === 'en'
                ? 'bg-[#E7F3FF] dark:bg-[#4595FF]/15 text-[#1877F2] dark:text-[#4595FF] font-bold'
                : 'text-[#1C1C1E] dark:text-[#F5F5F7] hover:bg-[#F5F7FA] dark:hover:bg-[#242629]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">🇬🇧</span>
              <span>English</span>
            </div>
            {language === 'en' && <Check className="w-3.5 h-3.5 text-[#1877F2] dark:text-[#4595FF]" />}
          </button>
        </div>
      )}
    </div>
  );
};
