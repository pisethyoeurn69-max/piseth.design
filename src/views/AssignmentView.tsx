import React, { useState } from 'react';
import { 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  RefreshCw, 
  ArrowLeft, 
  Image, 
  Eye, 
  User, 
  Sparkles,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { Assignment } from '../types';

interface AssignmentViewProps {
  assignment: Assignment;
  onUpdateStatus?: (newStatus: Assignment['status']) => void;
  onBackToCourse?: () => void;
}

export const AssignmentView: React.FC<AssignmentViewProps> = ({
  assignment: initialAssignment,
  onUpdateStatus,
  onBackToCourse,
}) => {
  const [assignment, setAssignment] = useState<Assignment>(initialAssignment);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [submissionNote, setSubmissionNote] = useState<string>('');
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState<boolean>(false);
  const [previewArtworkOpen, setPreviewArtworkOpen] = useState<boolean>(false);
  const [downloadAlert, setDownloadAlert] = useState<string | null>(null);

  // Status badge styling helper
  const getStatusBadge = (status: Assignment['status']) => {
    switch (status) {
      case 'Approved':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
          icon: CheckCircle2,
          text: 'Approved · ជាប់ជាស្ថាពរ',
        };
      case 'Revision Required':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-500/30',
          icon: AlertCircle,
          text: 'Revision Required · ត្រូវកែសម្រួលឡើងវិញ',
        };
      case 'Under Review':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-500/30',
          icon: Clock,
          text: 'Under Review · កំពុងពិនិត្យដោយលោកគ្រូ',
        };
      case 'Submitted':
        return {
          bg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-500/30',
          icon: FileCheck,
          text: 'Submitted · បានបញ្ជូនរួចរាល់',
        };
      case 'Not Submitted':
      default:
        return {
          bg: 'bg-slate-100 dark:bg-[#1C232D] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
          icon: FileText,
          text: 'Not Submitted · មិនទាន់បានបញ្ជូន',
        };
    }
  };

  const currentBadge = getStatusBadge(assignment.status);
  const BadgeIcon = currentBadge.icon;

  // Handle simulated upload
  const handleUploadNewFile = () => {
    setIsUploading(true);
    setTimeout(() => {
      const updated: Assignment = {
        ...assignment,
        status: 'Submitted',
        submittedFile: {
          name: 'SotheaChan_Assignment03_Typography_v2_Revision.png',
          size: '4.6 MB',
          url: '#',
          submittedAt: 'Just now (Oct 2, 2026)',
        },
      };
      setAssignment(updated);
      setIsUploading(false);
      setShowSubmissionSuccess(true);
      if (onUpdateStatus) onUpdateStatus('Submitted');
      setTimeout(() => setShowSubmissionSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Back button */}
      {onBackToCourse && (
        <div>
          <button
            onClick={onBackToCourse}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Video Classroom (ត្រឡប់ទៅមេរៀន)</span>
          </button>
        </div>
      )}

      {/* Header & Status Bar */}
      <div className="bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200/80 dark:border-[#222936] p-6 sm:p-8 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#222936] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#4DA3FF] font-bold">
                Assignment {assignment.number}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">{assignment.courseTitle}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {assignment.title}
            </h1>
            <p className="text-sm font-khmer text-[#4DA3FF] font-medium">
              {assignment.titleKh}
            </p>
          </div>

          {/* Submission Status Badge */}
          <div className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold self-start sm:self-auto ${currentBadge.bg}`}>
            <BadgeIcon className="w-4 h-4" />
            <span>{currentBadge.text}</span>
          </div>
        </div>

        {/* Description & Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left: Description & Requirements */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                Project Description
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {assignment.description}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Technical Requirements
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {assignment.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4DA3FF] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Action Buttons: Download Brief & Upload Assignment */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setDownloadAlert('Project brief downloaded: Assignment_03_Typography_Poster_Guidelines.pdf');
                  setTimeout(() => setDownloadAlert(null), 4000);
                }}
                className="py-2.5 px-4 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-[#1C232D] dark:hover:bg-[#252E3B] rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Brief (ទាញយកឯកសារណែនាំ)</span>
              </button>

              <button
                disabled={isUploading}
                onClick={handleUploadNewFile}
                className="py-2.5 px-4 text-xs font-semibold text-white bg-[#4DA3FF] hover:bg-[#3892F3] rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                <span>{isUploading ? 'Uploading artwork...' : 'Upload Assignment (បញ្ជូនកិច្ចការ)'}</span>
              </button>
            </div>

            {downloadAlert && (
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-500/30 text-blue-800 dark:text-blue-300 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{downloadAlert}</span>
              </div>
            )}

            {showSubmissionSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Revision v2 successfully submitted! Teacher Piseth will review within 24 hours.</span>
              </div>
            )}
          </div>

          {/* Right: Submission File Card & Due Date */}
          <div className="md:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#11161d] border border-slate-200/80 dark:border-[#222936] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900 dark:text-white">
                  Submitted File
                </span>
                <span className="text-slate-400 font-mono text-[11px]">
                  {assignment.dueDate}
                </span>
              </div>

              {assignment.submittedFile ? (
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-[#222936] space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] flex items-center justify-center">
                      <Image className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white truncate block">
                        {assignment.submittedFile.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {assignment.submittedFile.size} · {assignment.submittedFile.submittedAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#222936] text-xs">
                    <button
                      onClick={() => setPreviewArtworkOpen(true)}
                      className="text-[#4DA3FF] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Artwork</span>
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono">1080 × 1350 px</span>
                  </div>
                </div>
              ) : (
                <div className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-center space-y-2">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-500">No artwork uploaded yet</p>
                  <p className="text-[10px] text-slate-400">Drop your JPG/PNG file here</p>
                </div>
              )}

              {/* State Tester Dropdown (allows checking all 5 submission states requested in brief) */}
              <div className="pt-2 border-t border-slate-200/80 dark:border-[#222936] text-xs space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400 block">
                  Interactive State Switcher (for preview):
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  {(['Not Submitted', 'Submitted', 'Under Review', 'Revision Required', 'Approved'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        setAssignment({ ...assignment, status: st });
                        if (onUpdateStatus) onUpdateStatus(st);
                      }}
                      className={`p-1.5 rounded-lg border text-left transition-colors ${
                        assignment.status === st
                          ? 'border-[#4DA3FF] bg-[#EAF5FF] dark:bg-[#4DA3FF]/20 text-[#4DA3FF] font-semibold'
                          : 'border-slate-200 dark:border-[#222936] text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TEACHER FEEDBACK SECTION (Exact spec from user request):
          Teacher: Piseth Yoeurn
          Feedback: Good composition. Improve hierarchy and spacing.
          Allow student to resubmit. */}
      {assignment.teacherFeedback && (
        <div className="bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200/80 dark:border-[#222936] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#222936] pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4DA3FF]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Teacher Review & Critique (ការកែលម្អពីលោកគ្រូ)
              </h3>
            </div>
            {assignment.teacherFeedback.grade && (
              <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded">
                Grade: {assignment.teacherFeedback.grade}
              </span>
            )}
          </div>

          <div className="flex items-start gap-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt={assignment.teacherFeedback.teacherName}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#4DA3FF]/30 shrink-0"
            />
            <div className="space-y-2 flex-1">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Teacher: {assignment.teacherFeedback.teacherName}
                </h4>
                <span className="text-xs text-slate-400">
                  {assignment.teacherFeedback.teacherRole} · {assignment.teacherFeedback.date}
                </span>
              </div>

              {/* Exact user feedback text */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#11161d] border border-slate-200/80 dark:border-[#222936]">
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                  <strong>Feedback:</strong> {assignment.teacherFeedback.comment}
                </p>
                <p className="text-xs text-slate-500 font-khmer mt-2">
                  "ស្នាដៃនេះមានចំណុចទាក់ទាញល្អ! សូមពង្រីកគម្លាតអក្សរចន្លោះកាលបរិច្ឆេទ និងចំណងជើងធំ ដើម្បីឲ្យភ្នែកអ្នកមើលចាប់អារម្មណ៍តាមលំដាប់លំដោយ។"
                </p>
              </div>

              {/* Resubmit button if revision required */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Version history: v1 submitted Sep 28 · v2 pending
                </span>
                <button
                  onClick={handleUploadNewFile}
                  className="py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Resubmit Assignment v2 (ផ្ញើការងារកែសម្រួល)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Full Artwork Preview Modal */}
      {previewArtworkOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewArtworkOpen(false)}
        >
          <div 
            className="w-full max-w-2xl bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200 dark:border-[#222936] overflow-hidden shadow-2xl space-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-[#222936]">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {assignment.submittedFile?.name || 'Submitted Artwork'}
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  {assignment.submittedFile?.size || '4.6 MB'} · High-Resolution Creative File
                </p>
              </div>
              <button
                onClick={() => setPreviewArtworkOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E2530] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 bg-slate-950 flex items-center justify-center min-h-[400px]">
              <div className="w-full max-w-md aspect-[3/4] bg-white rounded-xl shadow-2xl p-6 flex flex-col justify-between border border-slate-200 text-slate-900 relative overflow-hidden">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#4DA3FF] uppercase font-bold">
                    SWISS TYPOGRAPHY & KHMER SCRIPT EXHIBITION
                  </span>
                  <h2 className="text-3xl font-black tracking-tight leading-none text-slate-950">
                    ពុម្ពអក្សរ<br />និងទម្រង់
                  </h2>
                  <p className="text-xs font-serif italic text-slate-600">
                    A visual dialogue between modernist grid systems and classical Khmer glyph proportions.
                  </p>
                </div>
                <div className="border-t-2 border-slate-950 pt-4 flex items-end justify-between text-[10px] font-mono">
                  <div>
                    <p className="font-bold">DESIGN: SOTHEA CHAN</p>
                    <p className="text-slate-500">RUFA GRAPHIC LAB 2026</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#4DA3FF] font-bold">CRITIQUE v1.2</p>
                    <p className="text-slate-500">1080 × 1350 PX</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-[#222936] flex items-center justify-between text-xs text-slate-500">
              <span>Critique: Improve hierarchy & spacing</span>
              <button
                onClick={() => setPreviewArtworkOpen(false)}
                className="py-1.5 px-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#1E2530] dark:hover:bg-[#252E3B] text-slate-800 dark:text-slate-200 font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
