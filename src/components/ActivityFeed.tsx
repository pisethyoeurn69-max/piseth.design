import React, { useState } from 'react';
import { ActivityItem } from '../types';
import { ThumbsUp, MessageSquare, Share2, Sparkles, Clock, CheckCircle2, FileText, Video, Award, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ActivityFeedProps {
  activities: ActivityItem[];
  onActionClick?: (item: ActivityItem) => void;
  className?: string;
  limit?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities: initialActivities,
  onActionClick,
  className = '',
  limit,
}) => {
  const { language } = useLanguage();
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);

  const displayed = limit ? activities.slice(0, limit) : activities;

  const handleLike = (id: string) => {
    setActivities((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isLiked = !item.isLiked;
          return {
            ...item,
            isLiked,
            likesCount: (item.likesCount || 0) + (isLiked ? 1 : -1),
          };
        }
        return item;
      })
    );
  };

  const getIconForType = (type: ActivityItem['type']) => {
    switch (type) {
      case 'feedback':
        return <Sparkles className="w-3.5 h-3.5 text-[#1877F2]" />;
      case 'assignment':
        return <FileText className="w-3.5 h-3.5 text-amber-500" />;
      case 'lesson':
        return <Video className="w-3.5 h-3.5 text-emerald-500" />;
      case 'completed':
        return <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />;
      default:
        return <Award className="w-3.5 h-3.5 text-[#1877F2]" />;
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {displayed.map((item) => (
        <article
          key={item.id}
          className="group p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E4E6EB] dark:border-[#2E3034] shadow-xs hover:shadow-md hover:border-[#1877F2]/40 dark:hover:border-[#4595FF]/40 transition-all duration-200"
        >
          {/* Top Row: User Avatar, Name, Action, Time */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={item.userAvatar}
                  alt={item.userName}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-[#E4E6EB] dark:ring-[#2E3034]"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-[#1C1C1E] border border-[#E4E6EB] dark:border-[#2E3034] flex items-center justify-center shadow-xs">
                  {getIconForType(item.type)}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-semibold text-[#1C1C1E] dark:text-[#F5F5F7]">
                    {item.userName}
                  </span>
                  {item.userRole && (
                    <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-md bg-[#E7F3FF] dark:bg-[#4595FF]/15 text-[#1877F2] dark:text-[#4595FF]">
                      {item.userRole}
                    </span>
                  )}
                  <span className="text-xs text-[#65676B] dark:text-[#A1A1A6]">
                    {language === 'km' && item.actionKh ? item.actionKh : item.action}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#65676B] dark:text-[#A1A1A6]">
                  <Clock className="w-3 h-3" />
                  <span>{language === 'km' && item.timeAgoKh ? item.timeAgoKh : item.timeAgo}</span>
                </div>
              </div>
            </div>

            {item.badgeLabel && (
              <span className="hidden sm:inline-flex text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#242629] text-[#1C1C1E] dark:text-[#F5F5F7] border border-[#E4E6EB] dark:border-[#2E3034]">
                {item.badgeLabel}
              </span>
            )}
          </div>

          {/* Activity Target Card */}
          <div className="mt-3.5 p-3 rounded-xl bg-[#F5F7FA] dark:bg-[#242629] border border-[#E4E6EB]/70 dark:border-[#2E3034] flex items-center gap-3.5">
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt={item.targetTitle}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover shrink-0 border border-black/5 dark:border-white/5"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-[#1C1C1E] dark:text-[#F5F5F7] truncate">
                {item.targetTitle}
              </h4>
              {item.targetSubtitle && (
                <p className="text-[11px] sm:text-xs text-[#65676B] dark:text-[#A1A1A6] line-clamp-1 mt-0.5">
                  {item.targetSubtitle}
                </p>
              )}
            </div>

            {onActionClick && (
              <button
                onClick={() => onActionClick(item)}
                className="shrink-0 py-1.5 px-3 rounded-lg text-xs font-semibold bg-[#1877F2] hover:bg-[#166FE5] text-white shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'km' ? 'ចូលមើល' : 'View'}</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Social Feedback Bar (Facebook Usability with Apple restraint) */}
          <div className="mt-3 pt-2.5 border-t border-[#E4E6EB] dark:border-[#2E3034] flex items-center justify-between text-xs text-[#65676B] dark:text-[#A1A1A6]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleLike(item.id)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer py-1 px-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-[#242629] ${
                  item.isLiked ? 'text-[#1877F2] dark:text-[#4595FF] font-semibold' : ''
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${item.isLiked ? 'fill-current' : ''}`} />
                <span>{item.likesCount || 0}</span>
              </button>

              <div className="flex items-center gap-1.5 py-1 px-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{item.commentsCount || 0}</span>
              </div>
            </div>

            <span className="text-[11px] text-[#65676B] dark:text-[#A1A1A6]">
              {language === 'km' ? 'សកម្មភាពសិក្សា' : 'Learning activity'}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
};
