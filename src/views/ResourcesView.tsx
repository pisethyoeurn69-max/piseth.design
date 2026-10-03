import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  Bookmark, 
  Check, 
  ExternalLink,
  Layers,
  Sparkles,
  Filter
} from 'lucide-react';
import { RESOURCES_LIST } from '../data/resourcesData';
import { ResourceCardItem, ResourceCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const ResourcesView: React.FC = () => {
  const { language, t } = useLanguage();
  const [resources, setResources] = useState<ResourceCardItem[]>(RESOURCES_LIST);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const categories: (ResourceCategory | 'All')[] = [
    'All',
    'Photoshop',
    'Illustrator',
    'InDesign',
    'After Effects',
    'Figma',
    'Typography',
    'Branding',
    'Motion Graphics',
  ];

  // Toggle bookmark handler
  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, bookmarked: !r.bookmarked } : r))
    );
  };

  const handleDownload = (resource: ResourceCardItem) => {
    setDownloadNotice(`Downloading "${resource.title}" (${resource.fileSize})...`);
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  // Filtered resources
  const filtered = resources.filter((res) => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.software.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.titleKh && res.titleKh.includes(searchQuery));
    const matchesBookmark = !showOnlyBookmarked || res.bookmarked;

    return matchesCategory && matchesSearch && matchesBookmark;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#4DA3FF] uppercase tracking-wider">
          <span>Creative Studio Toolkit</span>
          <span aria-hidden="true">·</span>
          <span className="font-khmer text-slate-400">
            {language === 'km' ? 'បណ្ណាល័យធនធាន និងឯកសាររចនា' : 'Curated Design Assets'}
          </span>
        </div>
        <h1 className={`text-3xl sm:text-4xl font-black text-slate-900 dark:text-white ${language === 'km' ? 'font-khmer' : ''}`}>
          {language === 'km' ? 'បណ្ណាល័យធនធានរចនា' : 'Design Resources Library'}
        </h1>
        <p className={`text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed ${language === 'km' ? 'font-khmer' : 'font-sans'}`}>
          {language === 'km'
            ? 'ទាញយក Presets ស្តង់ដារ, ពុម្ពអក្សរខ្មែរ, Vector Kit និង Figma Library រៀបចំដោយលោកគ្រូ យឿន ពិសិដ្ឋ។'
            : 'Download industry-standard presets, Khmer typography specimens, vector grid kits, and Figma component libraries prepared by Teacher Piseth Yoeurn.'}
        </p>
      </div>

      {/* Download Alert Toast */}
      {downloadNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{downloadNotice}</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-mono">Ready in downloads</span>
        </div>
      )}

      {/* Control Bar: Categories Filter & Search */}
      <div className="space-y-4">
        
        {/* Top search & bookmark toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'km' ? 'ស្វែងរកឯកសារតាមចំណងជើង ប្រភេទ ឬកម្មវិធី...' : 'Search resources by title, type, or software...'}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-[#222936] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4DA3FF]"
            />
          </div>

          {/* Bookmarks toggle */}
          <button
            onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
            className={`py-2 px-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto ${
              showOnlyBookmarked
                ? 'bg-[#EAF5FF] dark:bg-[#4DA3FF]/20 text-[#4DA3FF] border-[#4DA3FF]/40'
                : 'bg-white dark:bg-[#151B23] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#222936]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarked ? 'fill-current' : ''}`} />
            <span>
              {language === 'km' ? 'បានកត់ចំណាំ' : 'Bookmarked Only'} ({resources.filter((r) => r.bookmarked).length})
            </span>
          </button>
        </div>

        {/* Categories Bar: Exactly 8 categories requested in prompt */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-slate-100 dark:bg-[#151B23] rounded-2xl border border-slate-200/80 dark:border-[#222936]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-[#202834] text-slate-950 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat === 'All' ? (language === 'km' ? 'ទាំងអស់' : 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid: Title, Type, Software, Download, Bookmark */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white dark:bg-[#151B23] rounded-2xl border border-slate-200/80 dark:border-[#222936] hover:border-[#4DA3FF]/50 dark:hover:border-[#4DA3FF]/50 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
          >
            {/* Top row: Software tag, Type, and Bookmark button */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-semibold text-[#4DA3FF] bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 px-2 py-0.5 rounded">
                  {item.software}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                  {item.type}
                </span>
              </div>

              {/* Required: Bookmark button */}
              <button
                onClick={(e) => handleToggleBookmark(item.id, e)}
                aria-label={item.bookmarked ? 'Remove bookmark' : 'Bookmark resource'}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  item.bookmarked
                    ? 'bg-[#EAF5FF] dark:bg-[#4DA3FF]/20 text-[#4DA3FF] border-[#4DA3FF]/40'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-white border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                }`}
                title={item.bookmarked ? 'Bookmarked' : 'Add bookmark'}
              >
                <Bookmark className={`w-4 h-4 ${item.bookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Middle: Title & Description */}
            <div className="space-y-1.5">
              {/* Required: Title */}
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#4DA3FF] transition-colors">
                {item.title}
              </h3>
              {item.titleKh && (
                <p className="text-xs text-slate-400 font-khmer">
                  {item.titleKh}
                </p>
              )}
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1 line-clamp-2">
                {item.description}
              </p>
            </div>

            {/* Bottom Row: Metadata & Required Download Button */}
            <div className="pt-3 border-t border-slate-100 dark:border-[#222936] flex items-center justify-between">
              <div className="text-[11px] font-mono text-slate-400">
                <span>{item.fileSize}</span>
                <span className="mx-1.5">·</span>
                <span>{item.downloadsCount.toLocaleString()} {language === 'km' ? 'ដង' : 'downloads'}</span>
              </div>

              {/* Required: Download button */}
              <button
                onClick={() => handleDownload(item)}
                className="py-1.5 px-3.5 text-xs font-semibold text-white bg-[#4DA3FF] hover:bg-[#3892F3] rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'km' ? 'ទាញយក' : 'Download'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No resources found in this category or search.
          </p>
          <p className="text-xs text-slate-400">
            Try adjusting your search query or switching to 'All' categories.
          </p>
        </div>
      )}
    </div>
  );
};
