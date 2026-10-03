import React, { useState } from 'react';
import { 
  Download, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  Printer, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Student } from '../types';

interface CertificatePageViewProps {
  student: Student;
  courseTitle?: string;
  onBack?: () => void;
}

export const CertificatePageView: React.FC<CertificatePageViewProps> = ({
  student,
  courseTitle = 'Graphic Design',
  onBack,
}) => {
  const [copied, setCopied] = useState(false);
  const certId = 'PIS-2026-8942';
  const issueDate = 'October 2, 2026';
  const verifyUrl = `https://piseth.design/verify/${certId}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(verifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard (ត្រឡប់ក្រោយ)</span>
          </button>
        )}

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={handleCopyLink}
            className="py-2 px-3.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-[#151B23] border border-slate-200 dark:border-[#222936] hover:bg-slate-50 dark:hover:bg-[#1C232D] rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied! ✓' : 'Share Verification Link'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-2 px-4 text-xs font-semibold text-white bg-[#4DA3FF] hover:bg-[#3892F3] rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Certificate (PDF)</span>
          </button>
        </div>
      </div>

      {/* Main Certificate Display Sheet */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-12 overflow-hidden text-slate-900 relative print:p-0 print:border-none print:shadow-none">
        
        {/* Ornate Double Border Frame */}
        <div className="relative border-4 border-slate-200 p-8 sm:p-12 rounded-2xl flex flex-col justify-between min-h-[580px] bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:16px_16px]">
          
          {/* Corner Flourishes */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#4DA3FF]" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#4DA3FF]" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#4DA3FF]" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#4DA3FF]" />

          {/* Certificate Header: Branding & Title */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-base font-bold tracking-tight font-sans text-slate-900">
                piseth<span className="text-[#4DA3FF]">.design</span>
              </span>
              <span className="text-slate-300 font-mono">·</span>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#4DA3FF]">
                Creative Design Academy
              </span>
            </div>

            {/* Required Exact Title: Certificate of Completion */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-wider text-slate-950 uppercase pt-2">
              Certificate of Completion
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-khmer font-medium">
              វិញ្ញាបនបត្របញ្ជាក់ការបញ្ចប់វគ្គសិក្សាដោយជោគជ័យ
            </p>
          </div>

          {/* Middle Body: Recipient & Course */}
          <div className="text-center my-auto py-8 space-y-3">
            {/* Required text: This certificate is awarded to */}
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
              This certificate is awarded to
            </p>

            {/* Required: [Student Name] */}
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                {student.name}
              </h2>
              <p className="text-base font-khmer text-slate-600 font-medium">
                {student.nameKh}
              </p>
            </div>

            {/* Required text: for successfully completing */}
            <p className="text-xs text-slate-500 pt-2 font-mono">
              for successfully completing the 45-hour professional curriculum in
            </p>

            {/* Required: Graphic Design */}
            <p className="text-2xl sm:text-3xl font-serif font-bold text-[#4DA3FF]">
              {courseTitle}
            </p>

            <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
              Demonstrating excellence in Swiss grid layouts, bilingual Khmer & Latin typography hierarchy, Adobe Creative Suite workflow, and portfolio capstone defense.
            </p>
          </div>

          {/* Bottom Row: Instructor, Seal, Date, ID & QR Code */}
          <div className="border-t-2 border-slate-200 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
            
            {/* Left: Instructor signature */}
            <div className="text-left space-y-1">
              <span className="font-serif italic text-lg sm:text-xl font-bold text-slate-900 block">
                Piseth Yoeurn
              </span>
              <div className="w-32 h-0.5 bg-slate-400" />
              <p className="text-xs font-semibold text-slate-800">
                Instructor: Piseth Yoeurn
              </p>
              <p className="text-[11px] text-slate-500 font-khmer">
                សាស្ត្រាចារ្យ យឿន ពិសិដ្ឋ (Royal University of Fine Arts)
              </p>
            </div>

            {/* Center: Gold Foil Seal graphic */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400 border-2 border-amber-500 shadow-md flex flex-col items-center justify-center text-amber-950 p-2 text-center select-none">
                <ShieldCheck className="w-6 h-6 text-amber-900" />
                <span className="text-[8px] font-black uppercase tracking-widest mt-0.5">
                  OFFICIAL SEAL
                </span>
                <span className="text-[7px] font-mono text-amber-900">
                  PISETH.DESIGN
                </span>
              </div>
            </div>

            {/* Right: Date, Certificate ID & QR Code Placeholder */}
            <div className="text-right space-y-1.5 flex flex-col items-end">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  {/* Required Date */}
                  <span className="text-[11px] text-slate-500 block font-mono">Date:</span>
                  <span className="text-xs font-semibold text-slate-800 block">
                    {issueDate}
                  </span>

                  {/* Required Certificate ID */}
                  <span className="text-[11px] text-slate-500 block font-mono mt-1">Certificate ID:</span>
                  <span className="text-xs font-mono font-bold text-[#4DA3FF] block tabular-nums">
                    {certId}
                  </span>
                </div>

                {/* QR Code Placeholder (crisp vector SVG) */}
                <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-300 shadow-sm flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 48 48" className="w-full h-full text-slate-900" fill="currentColor">
                    {/* QR Code matrix pattern */}
                    <rect x="4" y="4" width="12" height="12" fill="currentColor" rx="1" />
                    <rect x="6" y="6" width="8" height="8" fill="white" />
                    <rect x="8" y="8" width="4" height="4" fill="currentColor" />

                    <rect x="32" y="4" width="12" height="12" fill="currentColor" rx="1" />
                    <rect x="34" y="6" width="8" height="8" fill="white" />
                    <rect x="36" y="8" width="4" height="4" fill="currentColor" />

                    <rect x="4" y="32" width="12" height="12" fill="currentColor" rx="1" />
                    <rect x="6" y="34" width="8" height="8" fill="white" />
                    <rect x="8" y="36" width="4" height="4" fill="currentColor" />

                    {/* Data dots */}
                    <rect x="20" y="6" width="4" height="4" />
                    <rect x="26" y="10" width="4" height="4" />
                    <rect x="20" y="18" width="4" height="4" />
                    <rect x="26" y="22" width="4" height="4" />
                    <rect x="6" y="20" width="4" height="4" />
                    <rect x="12" y="26" width="4" height="4" />
                    <rect x="32" y="20" width="4" height="4" />
                    <rect x="38" y="26" width="4" height="4" />
                    <rect x="20" y="32" width="4" height="4" />
                    <rect x="26" y="38" width="4" height="4" />
                    <rect x="34" y="34" width="4" height="4" />
                    <rect x="40" y="40" width="4" height="4" />
                  </svg>
                </div>
              </div>

              {/* Verification URL placeholder */}
              <div className="text-[10px] text-slate-500 font-mono">
                Verify at:{' '}
                <a
                  href={verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4DA3FF] hover:underline"
                >
                  {verifyUrl}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification details info strip */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>This credential is permanently registered on piseth.design verified blockchain ledger.</span>
        </div>
        <span className="font-mono text-[11px] text-slate-400">ID: {certId}</span>
      </div>
    </div>
  );
};
