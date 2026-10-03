import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Bookmark, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  FileText, 
  FolderArchive, 
  Layers, 
  MessageSquare, 
  Sparkles, 
  Trash2, 
  Clock, 
  Send,
  HelpCircle,
  Settings,
  RotateCcw,
  X,
  List
} from 'lucide-react';
import { Course, Lesson, Note } from '../types';
import { DiscussionSection } from '../components/DiscussionSection';

interface LearningViewProps {
  course: Course;
  currentLessonId?: string;
  onSelectLesson: (lessonId: string) => void;
  onNavigateToAssignment?: () => void;
  onNavigateToQuiz?: () => void;
}

export const LearningView: React.FC<LearningViewProps> = ({
  course,
  currentLessonId = 'gd-04-01',
  onSelectLesson,
  onNavigateToAssignment,
  onNavigateToQuiz,
}) => {
  // Find current lesson and module
  let currentLesson: Lesson | undefined;
  let currentModuleIndex = 0;
  let currentLessonIndex = 0;

  course.modules.forEach((mod, mIdx) => {
    mod.lessons.forEach((les, lIdx) => {
      if (les.id === currentLessonId) {
        currentLesson = les;
        currentModuleIndex = mIdx;
        currentLessonIndex = lIdx;
      }
    });
  });

  if (!currentLesson && course.modules[0]?.lessons[0]) {
    currentLesson = course.modules[0].lessons[0];
  }

  // Active tab below video
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'resources' | 'assignment' | 'discussion'>('overview');
  const [isCurriculumDrawerOpen, setIsCurriculumDrawerOpen] = useState<boolean>(false);
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);
  
  // Interactive Video Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(34); // %
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1.0x');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(currentLesson?.bookmarked || false);
  const [isCompleted, setIsCompleted] = useState<boolean>(currentLesson?.completed || false);

  // Sync state if lesson changes
  useEffect(() => {
    setIsBookmarked(currentLesson?.bookmarked || false);
    setIsCompleted(currentLesson?.completed || false);
    setVideoProgress(18);
    setIsPlaying(false);
  }, [currentLessonId]);

  // Video progress interval when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Notes state
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 'n-1',
      lessonId: 'gd-04-01',
      timestamp: '04:12',
      content: 'Khmer font stroke weights need 15% optical thinning when paired next to bold Latin titles.',
      createdAt: 'Yesterday',
    },
    {
      id: 'n-2',
      lessonId: 'gd-04-01',
      timestamp: '18:45',
      content: 'Leading rule of thumb: 140% to 160% font size for body paragraphs.',
      createdAt: 'Today',
    },
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const formatTime = (pct: number) => {
      const totalSec = Math.floor((pct / 100) * 38 * 60);
      const mins = Math.floor(totalSec / 60);
      const secs = totalSec % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const note: Note = {
      id: `n-${Date.now()}`,
      lessonId: currentLesson?.id || 'gd-04-01',
      timestamp: formatTime(videoProgress),
      content: newNoteText.trim(),
      createdAt: 'Just now',
    };
    setNotes([note, ...notes]);
    setNewNoteText('');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  // Discussions state
  const [comments, setComments] = useState([
    {
      id: 'c-1',
      author: 'Channak Sovann',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      time: '1 hour ago',
      content: 'Could Teacher Piseth explain how to balance the baseline between Kantumruy Pro and Inter?',
      isTeacher: false,
    },
    {
      id: 'c-2',
      author: 'Piseth Yoeurn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      time: '35 mins ago',
      content: 'Great question Channak! Set Kantumruy Pro font size to 1.1x of the Latin font size and nudge the baseline down by 2px to achieve optical harmony.',
      isTeacher: true,
    },
  ]);
  const [newComment, setNewComment] = useState('');

  const postComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: `c-${Date.now()}`,
        author: 'Sothea Chan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        time: 'Just now',
        content: newComment.trim(),
        isTeacher: false,
      },
    ]);
    setNewComment('');
  };

  // Next / Previous lesson logic
  const allLessons: Lesson[] = [];
  course.modules.forEach((m) => m.lessons.forEach((l) => allLessons.push(l)));
  const currentIdx = allLessons.findIndex((l) => l.id === currentLesson?.id);
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  return (
    <div className="w-full bg-[#F7F9FC] dark:bg-[#0B0F14] min-h-[calc(100vh-64px)] pb-16">
      
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-slate-200/80 dark:border-[#1E2530] bg-white dark:bg-[#0E131A] px-4 sm:px-6 py-3">
        <div className="max-w-[1700px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">{course.title}</span>
            <span aria-hidden="true">/</span>
            <span>Module {course.modules[currentModuleIndex]?.number}</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#4DA3FF] font-medium truncate max-w-[200px] sm:max-w-md">
              {currentLesson?.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Curriculum Drawer Trigger */}
            <button
              onClick={() => setIsCurriculumDrawerOpen(true)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-200 dark:border-[#222936] text-xs flex items-center gap-1.5 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#151B23] cursor-pointer"
              title="Open Curriculum Drawer"
            >
              <List className="w-3.5 h-3.5 text-[#4DA3FF]" />
              <span className="font-semibold text-[11px]">Curriculum</span>
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              aria-label="Bookmark lesson"
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-[#EAF5FF] dark:bg-[#4DA3FF]/20 text-[#4DA3FF] border-[#4DA3FF]/40'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border-slate-200 dark:border-[#222936]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline-block">
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Download Alert Toast */}
      {downloadFeedback && (
        <div className="max-w-md mx-auto mt-4 px-4">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
            <span>{downloadFeedback}</span>
            <button onClick={() => setDownloadFeedback(null)} className="text-emerald-600 hover:underline">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 3-Column Layout:
          LEFT: Course curriculum (sticky desktop, drawer on mobile)
          CENTER: Video player & Tabs
          RIGHT: Lesson Information & Notes summary */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Course Curriculum (Desktop Sticky, Hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-3 lg:sticky lg:top-20 bg-white dark:bg-[#151B23] rounded-2xl border border-slate-200/80 dark:border-[#222936] shadow-sm overflow-hidden flex-col h-[calc(100vh-120px)]">
            <div className="p-4 border-b border-slate-100 dark:border-[#222936] flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Curriculum
                </h3>
                <span className="text-[11px] text-slate-400">
                  {allLessons.filter((l) => l.completed).length} / {allLessons.length} Completed
                </span>
              </div>
              <span className="text-xs font-bold text-[#4DA3FF] font-mono">
                {course.progress || 78}%
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-[#1e2633]">
              {course.modules.map((mod) => (
                <div key={mod.id} className="py-2">
                  <div className="px-4 py-2 text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {mod.number}. {mod.title}
                  </div>
                  <div className="space-y-0.5">
                    {mod.lessons.map((les) => {
                      const isCurrent = les.id === currentLesson?.id;
                      return (
                        <button
                          key={les.id}
                          onClick={() => onSelectLesson(les.id)}
                          className={`w-full px-4 py-2.5 flex items-center justify-between text-left text-xs transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] font-semibold border-l-2 border-[#4DA3FF]'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1C232D]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            {les.completed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            ) : (
                              <div
                                className={`w-3.5 h-3.5 rounded-full border shrink-0 ${
                                  isCurrent ? 'border-[#4DA3FF]' : 'border-slate-300 dark:border-slate-600'
                                }`}
                              />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0 tabular-nums">
                            {les.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER COLUMN: Video Player + Below Video Tabs (6 cols on lg) */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            
            {/* Video Player */}
            <div className="relative aspect-video rounded-2xl bg-black overflow-hidden shadow-2xl border border-slate-800 group">
              
              {/* Animated Canvas Visual Presentation of Design Lecture */}
              <div className="absolute inset-0 bg-[#0A0D14] flex flex-col justify-between p-6 select-none overflow-hidden">
                {/* Visual grid watermark */}
                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:32px_32px]" />

                {/* Lecture Slide Header */}
                <div className="relative z-10 flex items-center justify-between text-white/80">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>piseth.design · Studio Lecture</span>
                  </div>
                  <span className="text-xs font-mono text-[#4DA3FF] bg-[#4DA3FF]/15 px-2 py-0.5 rounded">
                    1080p 60fps
                  </span>
                </div>

                {/* Slide Dynamic Graphic: Typography & Font Psychology */}
                <div className="relative z-10 my-auto text-center space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#4DA3FF]">
                    LESSON 04 · TYPOGRAPHY ARCHITECTURE
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white font-khmer drop-shadow-md">
                    Typography & Font Psychology
                  </h3>
                  <div className="max-w-md mx-auto p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-xs text-slate-300 font-khmer">
                    <p className="font-semibold text-white mb-1">
                      គោលការណ៍សំខាន់៖ តុល្យភាពអក្សរខ្មែរ និងអង់គ្លេស
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Optical Stroke Harmonisation · Leading 150% · Modern Grid Alignment
                    </p>
                  </div>
                </div>

                {/* Speaker Watermark */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Instructor: Piseth Yoeurn (Phnom Penh)</span>
                  <span className="font-mono">piseth.design academy</span>
                </div>
              </div>

              {/* Big Center Play Overlay Button */}
              {!isPlaying && (
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-all"
                >
                  <button
                    aria-label="Play lesson video"
                    className="w-16 h-16 rounded-full bg-[#4DA3FF] text-white flex items-center justify-center hover:scale-105 shadow-xl shadow-[#4DA3FF]/40 transition-all cursor-pointer"
                  >
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </button>
                </div>
              )}

              {/* Custom Video Player Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-200">
                
                {/* Timeline Scrubber */}
                <div 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newPct = (clickX / rect.width) * 100;
                    setVideoProgress(Math.min(100, Math.max(0, newPct)));
                  }}
                  className="relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden group/bar mb-3"
                >
                  <div
                    className="h-full bg-[#4DA3FF] rounded-full transition-all"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                {/* Control Icons Row */}
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-[#4DA3FF] transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-[#4DA3FF] transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-[11px] text-slate-300 tabular-nums">
                      12:54 / 38:00
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Playback rate */}
                    <button
                      onClick={() => {
                        const speeds = ['1.0x', '1.25x', '1.5x', '2.0x'];
                        const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                        setPlaybackSpeed(next);
                      }}
                      className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-mono font-medium transition-colors"
                    >
                      {playbackSpeed}
                    </button>

                    <button
                      onClick={() => alert('Full screen presentation mode toggled')}
                      className="hover:text-[#4DA3FF] transition-colors cursor-pointer"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Below Video Navigation Controls */}
            <div className="flex items-center justify-between p-3.5 bg-white dark:bg-[#151B23] rounded-2xl border border-slate-200/80 dark:border-[#222936] shadow-sm">
              <button
                disabled={!prevLesson}
                onClick={() => prevLesson && onSelectLesson(prevLesson.id)}
                className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                  prevLesson
                    ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1C232D] cursor-pointer'
                    : 'text-slate-400 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Lesson</span>
              </button>

              <button
                onClick={() => setIsCompleted(!isCompleted)}
                className={`py-2 px-4 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#4DA3FF] hover:bg-[#3892F3] text-white shadow-sm'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Completed ✓' : 'Mark as Complete'}</span>
              </button>

              <button
                disabled={!nextLesson}
                onClick={() => nextLesson && onSelectLesson(nextLesson.id)}
                className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                  nextLesson
                    ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1C232D] cursor-pointer'
                    : 'text-slate-400 cursor-not-allowed opacity-50'
                }`}
              >
                <span>Next Lesson</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Below Video Interactive Tabs: Overview, Notes, Resources, Assignment, Discussion */}
            <div className="bg-white dark:bg-[#151B23] rounded-2xl border border-slate-200/80 dark:border-[#222936] shadow-sm overflow-hidden">
              
              {/* Tab Selector */}
              <div className="flex items-center border-b border-slate-100 dark:border-[#222936] overflow-x-auto px-4">
                {(['overview', 'notes', 'resources', 'assignment', 'discussion'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3.5 px-4 text-xs font-semibold transition-colors capitalize border-b-2 whitespace-nowrap cursor-pointer ${
                      activeTab === tab
                        ? 'border-[#4DA3FF] text-[#4DA3FF]'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {tab}
                    {tab === 'resources' && ' (3)'}
                    {tab === 'notes' && ` (${notes.length})`}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                
                {/* TAB 1: OVERVIEW */}
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {currentLesson?.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1 font-sans">
                        {currentLesson?.description}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936] space-y-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                        Key Takeaways from Teacher Piseth
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF] mt-1.5" />
                          <span>Always set the focal headline first before defining secondary dates and captions.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF] mt-1.5" />
                          <span>Check contrast ratio against dark backgrounds using the WCAG AA standard.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF] mt-1.5" />
                          <span>Pair a serif or expressive display font with a clean neutral geometric sans serif.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Quick links to Assignment / Quiz if available */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {currentLesson?.hasAssignment && onNavigateToAssignment && (
                        <button
                          onClick={onNavigateToAssignment}
                          className="py-2 px-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 hover:bg-amber-100 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Assignment #03 Brief</span>
                        </button>
                      )}
                      {currentLesson?.hasQuiz && onNavigateToQuiz && (
                        <button
                          onClick={onNavigateToQuiz}
                          className="py-2 px-3 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 hover:bg-purple-100 transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Take Typography Quiz</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: NOTES */}
                {activeTab === 'notes' && (
                  <div className="space-y-5">
                    {/* Add note form */}
                    <form onSubmit={addNote} className="space-y-2">
                      <div className="relative">
                        <textarea
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          placeholder="Type your personal lesson note here (Ctrl+Enter to save)..."
                          rows={3}
                          className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#222936] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4DA3FF]"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="py-1.5 px-4 text-xs font-semibold text-white bg-[#4DA3FF] hover:bg-[#3892F3] rounded-lg transition-colors cursor-pointer"
                        >
                          Save Note
                        </button>
                      </div>
                    </form>

                    {/* Notes list */}
                    <div className="space-y-3">
                      {notes.map((note) => (
                        <div
                          key={note.id}
                          className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936] flex items-start justify-between gap-3 group"
                        >
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-[#4DA3FF] font-semibold bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 px-1.5 py-0.5 rounded">
                              {note.timestamp}
                            </span>
                            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed pt-1">
                              {note.content}
                            </p>
                            <span className="text-[10px] text-slate-400 block">
                              {note.createdAt}
                            </span>
                          </div>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete note"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: RESOURCES */}
                {activeTab === 'resources' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500">
                      Download lecture reference files and exercise kits provided for this lesson:
                    </p>

                    <div className="space-y-3">
                      {/* PDF Cheat Sheet */}
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-500 flex items-center justify-center font-mono text-xs font-bold">
                            PDF
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                              Khmer & Latin Typography Scale.pdf
                            </h5>
                            <span className="text-[11px] text-slate-400">
                              PDF Document · 2.4 MB · High-res print guide
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => alert('Downloading Khmer & Latin Typography Scale.pdf...')}
                          className="p-2 text-slate-500 hover:text-[#4DA3FF] rounded-lg transition-colors cursor-pointer"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Exercise File */}
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-500 flex items-center justify-center font-mono text-xs font-bold">
                            FIG
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                              Typography_Poster_Starter.fig
                            </h5>
                            <span className="text-[11px] text-slate-400">
                              Figma Project File · 4.8 MB · 1080x1350 Canvas Grid
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setDownloadFeedback('Downloading Typography_Poster_Starter.fig (4.8 MB)...');
                            setTimeout(() => setDownloadFeedback(null), 4000);
                          }}
                          className="p-2 text-slate-500 hover:text-[#4DA3FF] rounded-lg transition-colors cursor-pointer"
                          title="Download Figma File"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Reference Images */}
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#11161d] border border-slate-100 dark:border-[#222936] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-500 flex items-center justify-center font-mono text-xs font-bold">
                            ZIP
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                              Swiss_Modernism_References.zip
                            </h5>
                            <span className="text-[11px] text-slate-400">
                              Archive · 18.2 MB · 25 Curated Poster Scans
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setDownloadFeedback('Downloading Swiss_Modernism_References.zip (18.2 MB)...');
                            setTimeout(() => setDownloadFeedback(null), 4000);
                          }}
                          className="p-2 text-slate-500 hover:text-[#4DA3FF] rounded-lg transition-colors cursor-pointer"
                          title="Download Archive"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: ASSIGNMENT PREVIEW */}
                {activeTab === 'assignment' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                          Assignment #03 · Typography Poster
                        </span>
                        <span className="text-[11px] text-amber-600 font-mono">
                          Revision Required
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                        Create a poster using typography as the main visual element. Dimensions: 1080 × 1350 px.
                      </p>
                      <div className="mt-3">
                        <button
                          onClick={onNavigateToAssignment}
                          className="py-2 px-3 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
                        >
                          Open Assignment Workspace →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: DISCUSSION */}
                {activeTab === 'discussion' && (
                  <DiscussionSection lessonId={currentLesson?.id} />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Lesson Information & Notes summary (3 cols) */}
          <div className="lg:col-span-3 order-3 space-y-6">
            
            {/* Lesson details card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                About this Lesson
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Duration:</span>
                  <span className="font-mono text-slate-900 dark:text-white">{currentLesson?.duration}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Level:</span>
                  <span className="text-slate-900 dark:text-white">{course.level}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Instructor:</span>
                  <span className="text-slate-900 dark:text-white">{course.instructor.name}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Status:</span>
                  <span className={isCompleted ? 'text-emerald-500 font-semibold' : 'text-[#4DA3FF]'}>
                    {isCompleted ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-[#222936]">
                <span className="text-[11px] text-slate-400 block mb-1">Instructor Philosophy:</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 italic font-khmer leading-relaxed">
                  "ការរៀបចំអក្សរគឺជាឆ្អឹងខ្នងនៃ Design ទាំងមូល។ ចំណាយពេលផ្ចិតផ្ចង់ជាមួយ spacing នោះការងាររបស់អ្នកនឹងឡើងកម្រិតភ្លាមៗ។"
                </p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#151B23] border border-slate-200/80 dark:border-[#222936] shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Next Steps for You
              </h4>

              <button
                onClick={onNavigateToAssignment}
                className="w-full p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 text-left hover:border-amber-400 transition-colors"
              >
                <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 text-xs font-bold">
                  <span>Assignment #03</span>
                  <span className="text-[10px]">Due Oct 4</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Submit Typography Poster for review
                </p>
              </button>

              <button
                onClick={onNavigateToQuiz}
                className="w-full p-2.5 rounded-xl border border-purple-200 dark:border-purple-900/40 bg-purple-50/50 dark:bg-purple-950/20 text-left hover:border-purple-400 transition-colors"
              >
                <div className="flex items-center justify-between text-purple-700 dark:text-purple-400 text-xs font-bold">
                  <span>Typography Quiz</span>
                  <span className="text-[10px]">5 Questions</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Evaluate font psychology retention
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Curriculum Slide-Over Drawer */}
      {isCurriculumDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            onClick={() => setIsCurriculumDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer content panel */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white dark:bg-[#151B23] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-slate-100 dark:border-[#222936] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Course Curriculum
                </h3>
                <span className="text-xs text-slate-400">
                  {allLessons.filter((l) => l.completed).length} / {allLessons.length} Completed ({course.progress || 78}%)
                </span>
              </div>
              <button
                onClick={() => setIsCurriculumDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close curriculum drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-[#1e2633] p-2">
              {course.modules.map((mod) => (
                <div key={mod.id} className="py-2">
                  <div className="px-3 py-1.5 text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {mod.number}. {mod.title}
                  </div>
                  <div className="space-y-1">
                    {mod.lessons.map((les) => {
                      const isCurrent = les.id === currentLesson?.id;
                      return (
                        <button
                          key={les.id}
                          onClick={() => {
                            onSelectLesson(les.id);
                            setIsCurriculumDrawerOpen(false);
                          }}
                          className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-left text-xs transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] font-semibold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1C232D]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            {les.completed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            ) : (
                              <div
                                className={`w-3.5 h-3.5 rounded-full border shrink-0 ${
                                  isCurrent ? 'border-[#4DA3FF]' : 'border-slate-300 dark:border-slate-600'
                                }`}
                              />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0 tabular-nums">
                            {les.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
