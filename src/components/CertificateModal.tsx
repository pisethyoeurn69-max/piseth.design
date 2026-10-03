import React from 'react';
import { X, Download, Share2, Award, CheckCircle, ShieldCheck } from 'lucide-react';
import { Student } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  courseTitle: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  student,
  courseTitle,
}) => {
  const [actionFeedback, setActionFeedback] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(`https://piseth.design/verify/PIS-2026-8942`);
    setActionFeedback('Verification link copied to clipboard!');
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleDownload = () => {
    setActionFeedback('Downloading verified PDF Certificate (PIS-2026-8942.pdf)...');
    setTimeout(() => setActionFeedback(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-[#151B23] rounded-2xl border border-slate-200 dark:border-[#222936] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-[#222936]">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#4DA3FF]" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Verified Certificate of Completion
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close certificate"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Artboard Container */}
        <div className="p-6 bg-slate-50 dark:bg-[#0E1217] flex justify-center">
          <div className="relative w-full aspect-[1.414/1] max-w-2xl bg-white rounded-lg border-8 border-double border-slate-200 p-8 sm:p-10 shadow-lg flex flex-col justify-between text-slate-900 select-none">
            {/* Subtle Guilloche Corner Accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#4DA3FF]" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#4DA3FF]" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#4DA3FF]" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#4DA3FF]" />

            {/* Certificate Header */}
            <div className="text-center space-y-1">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#4DA3FF]">
                piseth.design academy · phnom penh
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif tracking-wide text-slate-900 font-bold uppercase">
                Certificate of Completion
              </h2>
              <p className="text-[11px] text-slate-500 font-khmer">
                វិញ្ញាបនបត្របញ្ជាក់ការបញ្ចប់វគ្គសិក្សាដោយជោគជ័យ
              </p>
            </div>

            {/* Recipient */}
            <div className="text-center my-auto py-4 space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-widest">
                This is proudly presented to
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
                {student.name}
              </h3>
              <p className="text-sm font-khmer text-slate-600 font-medium">
                {student.nameKh}
              </p>
              <p className="text-xs text-slate-600 max-w-md mx-auto pt-2 leading-relaxed">
                for demonstrating exceptional proficiency and successfully completing 45 hours of rigorous studio coursework in
              </p>
              <p className="text-base sm:text-lg font-bold text-[#4DA3FF]">
                {courseTitle} Mastery
              </p>
              <p className="text-[11px] text-slate-500">
                Photoshop · Illustrator · InDesign · Typography & Swiss Grid Systems
              </p>
            </div>

            {/* Certificate Footer */}
            <div className="flex items-end justify-between border-t border-slate-200 pt-4 text-xs">
              <div className="text-left space-y-0.5">
                <span className="block font-mono text-[10px] text-slate-400">Date Issued:</span>
                <span className="font-semibold text-slate-800">September 28, 2026</span>
                <span className="block font-mono text-[10px] text-slate-400">Credential ID: PD-2026-GD-0492</span>
              </div>

              {/* Gold Seal Graphic */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-50 border-2 border-amber-400 flex flex-col items-center justify-center text-amber-700 shadow-sm shrink-0">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span className="text-[8px] font-bold uppercase tracking-tight">VERIFIED</span>
              </div>

              <div className="text-right space-y-0.5">
                <span className="font-serif italic text-base block text-slate-800 font-bold">Piseth Yoeurn</span>
                <div className="w-28 h-px bg-slate-400 ml-auto" />
                <span className="text-[10px] text-slate-500 block">Lead Instructor & Founder</span>
                <span className="text-[9px] text-slate-400 block font-khmer">សាស្ត្រាចារ្យ យឿន ពិសិដ្ឋ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Alert */}
        {actionFeedback && (
          <div className="mx-6 mt-3 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Modal Actions */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-[#222936] flex items-center justify-between">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Verified against piseth.design registry
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-[#1C232D] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button
              onClick={handleDownload}
              className="py-2 px-4 text-xs font-semibold text-white bg-[#4DA3FF] hover:bg-[#3892F3] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
