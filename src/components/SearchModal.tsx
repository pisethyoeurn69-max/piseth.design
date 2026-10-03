import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  Video, 
  FileText, 
  Layers, 
  ArrowRight, 
  Sparkles,
  Command
} from 'lucide-react';
import { COURSES_DATA, INITIAL_ASSIGNMENTS } from '../data/coursesData';
import { RESOURCES_DATA } from '../data/resourcesData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (courseId: string) => void;
  onSelectLesson: (courseId: string, lessonId: string) => void;
  onSelectResource: (resourceId: string) => void;
  onNavigate: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCourse,
  onSelectLesson,
  onSelectResource,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [filterDomain, setFilterDomain] = useState<'all' | 'courses' | 'lessons' | 'resources' | 'assignments'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setFilterDomain('all');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 1. Courses
  const filteredCourses = COURSES_DATA.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
      (c.titleKh && c.titleKh.includes(query)) ||
      c.software.some((s) => s.name.toLowerCase().includes(query.toLowerCase()))
  );

  // 2. Lessons (extracted across all courses and modules)
  const allLessonsWithCourse: { lesson: any; course: any }[] = [];
  COURSES_DATA.forEach((course) => {
    course.modules.forEach((mod) => {
      mod.lessons.forEach((les) => {
        allLessonsWithCourse.push({ lesson: les, course });
      });
    });
  });

  const filteredLessons = allLessonsWithCourse.filter(
    ({ lesson, course }) =>
      lesson.title.toLowerCase().includes(query.toLowerCase()) ||
      lesson.description.toLowerCase().includes(query.toLowerCase()) ||
      course.title.toLowerCase().includes(query.toLowerCase())
  );

  // 3. Resources
  const filteredResources = RESOURCES_DATA.filter(
    (r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      (r.titleKh && r.titleKh.includes(query)) ||
      r.category.toLowerCase().includes(query.toLowerCase()) ||
      r.software.toLowerCase().includes(query.toLowerCase()) ||
      r.type.toLowerCase().includes(query.toLowerCase())
  );

  // 4. Assignments
  const filteredAssignments = INITIAL_ASSIGNMENTS.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      (a.titleKh && a.titleKh.includes(query)) ||
      a.courseTitle.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults =
    filteredCourses.length +
    filteredLessons.length +
    filteredResources.length +
    filteredAssignments.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200 dark:border-[#222936] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-100 dark:border-[#222936] gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Courses, Lessons, Resources, Assignments... (⌘K)"
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">
            <Command className="w-3 h-3" /> K
          </span>
        </div>

        {/* Domain Filter Tabs */}
        {query && (
          <div className="px-5 py-2 border-b border-slate-100 dark:border-[#222936] bg-slate-50/50 dark:bg-[#11161d] flex items-center gap-2 overflow-x-auto text-xs">
            {[
              { id: 'all', label: `All (${totalResults})` },
              { id: 'courses', label: `Courses (${filteredCourses.length})` },
              { id: 'lessons', label: `Lessons (${filteredLessons.length})` },
              { id: 'resources', label: `Resources (${filteredResources.length})` },
              { id: 'assignments', label: `Assignments (${filteredAssignments.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterDomain(tab.id as any)}
                className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  filterDomain === tab.id
                    ? 'bg-white dark:bg-[#151B23] text-[#4DA3FF] font-semibold shadow-sm border border-slate-200 dark:border-[#2b3342]'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-5 flex-1">
          
          {/* Quick links when empty */}
          {!query && (
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Typography',
                    'Swiss Grid',
                    'Figma Auto Layout',
                    'Assignment #03',
                    'Photoshop Retouching',
                    'Motion Graphics',
                    'Khmer Font Specimen',
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-[#1C232D] text-slate-700 dark:text-slate-300 hover:bg-[#EAF5FF] dark:hover:bg-[#4DA3FF]/15 hover:text-[#4DA3FF] transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Quick Navigation
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      onNavigate('learning');
                      onClose();
                    }}
                    className="p-3 text-left rounded-xl border border-slate-100 dark:border-[#222936] bg-slate-50/50 dark:bg-[#11161d] hover:border-[#4DA3FF]/40 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block">Resume Learning</span>
                      <span className="text-[11px] text-slate-500">Lesson 04: Typography & Font Psychology</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#4DA3FF]" />
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('assignment');
                      onClose();
                    }}
                    className="p-3 text-left rounded-xl border border-slate-100 dark:border-[#222936] bg-slate-50/50 dark:bg-[#11161d] hover:border-[#4DA3FF]/40 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block">Assignment #03 Brief</span>
                      <span className="text-[11px] text-slate-500">Typography Poster workspace</span>
                    </div>
                    <FileText className="w-4 h-4 text-amber-500" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 1. COURSES RESULTS */}
          {query && (filterDomain === 'all' || filterDomain === 'courses') && filteredCourses.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Courses ({filteredCourses.length})
              </span>
              <div className="space-y-1">
                {filteredCourses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCourse(c.id);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#1C232D] flex items-center justify-between transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] flex items-center justify-center font-bold text-xs">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#4DA3FF] transition-colors block">
                          {c.title}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {c.level} · {c.duration} · ${c.price}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-[#4DA3FF] font-medium flex items-center gap-1">
                      View Course <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. LESSONS RESULTS */}
          {query && (filterDomain === 'all' || filterDomain === 'lessons') && filteredLessons.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Lessons ({filteredLessons.length})
              </span>
              <div className="space-y-1">
                {filteredLessons.map(({ lesson, course }) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      onSelectLesson(course.id, lesson.id);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#1C232D] flex items-center justify-between transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-500 flex items-center justify-center">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#4DA3FF] transition-colors block">
                          {lesson.title}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          in {course.title} · {lesson.duration}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-[#4DA3FF] font-medium flex items-center gap-1">
                      Watch <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. RESOURCES RESULTS */}
          {query && (filterDomain === 'all' || filterDomain === 'resources') && filteredResources.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Resources & Downloads ({filteredResources.length})
              </span>
              <div className="space-y-1">
                {filteredResources.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => {
                      onNavigate('resources');
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#1C232D] flex items-center justify-between transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#4DA3FF] transition-colors block">
                          {res.title}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {res.category} · {res.type} · {res.fileSize}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-[#4DA3FF] font-medium flex items-center gap-1">
                      Download <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. ASSIGNMENTS RESULTS */}
          {query && (filterDomain === 'all' || filterDomain === 'assignments') && filteredAssignments.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Assignments ({filteredAssignments.length})
              </span>
              <div className="space-y-1">
                {filteredAssignments.map((asg) => (
                  <button
                    key={asg.id}
                    onClick={() => {
                      onNavigate('assignment');
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#1C232D] flex items-center justify-between transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center font-mono font-bold text-xs">
                        {asg.number}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#4DA3FF] transition-colors block">
                          {asg.title}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {asg.courseTitle} · Due {asg.dueDate}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                      Open Brief <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="py-12 text-center space-y-1">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No matching items found for "{query}"
              </p>
              <p className="text-xs text-slate-400">
                Try searching for 'Typography', 'Figma', 'Grid', or 'Photoshop'
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-[#222936] bg-slate-50 dark:bg-[#11161d] flex items-center justify-between text-[11px] text-slate-400">
          <span>piseth.design global search</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
