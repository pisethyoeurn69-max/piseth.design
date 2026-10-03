import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Megaphone, 
  Award, 
  Video, 
  Check, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { NotificationItem, NotificationCategory } from '../types';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigateToTab,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return !n.read;
    return n.type === filterType;
  });

  const getNotificationIcon = (type: NotificationCategory) => {
    switch (type) {
      case 'lesson':
        return <Video className="w-4 h-4 text-[#4DA3FF]" />;
      case 'deadline':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'feedback':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      case 'announcement':
        return <Megaphone className="w-4 h-4 text-blue-500" />;
      case 'certificate':
        return <Award className="w-4 h-4 text-emerald-500" />;
      default:
        return <Bell className="w-4 h-4 text-[#4DA3FF]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-white dark:bg-[#151B23] rounded-3xl border border-slate-200 dark:border-[#222936] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 dark:border-[#222936] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EAF5FF] dark:bg-[#4DA3FF]/15 text-[#4DA3FF] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Notification Center
                </h3>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-mono font-bold bg-[#EAF5FF] dark:bg-[#4DA3FF]/20 text-[#4DA3FF] px-2 py-0.5 rounded-full">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-khmer">
                មជ្ឈមណ្ឌលដំណឹង និងការជូនដំណឹងពីលោកគ្រូ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="py-1 px-2.5 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:text-[#4DA3FF] hover:bg-slate-100 dark:hover:bg-[#1C232D] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-2.5 border-b border-slate-100 dark:border-[#222936] bg-slate-50/50 dark:bg-[#11161d] flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'unread', label: 'Unread' },
            { id: 'feedback', label: 'Feedback' },
            { id: 'deadline', label: 'Deadlines' },
            { id: 'lesson', label: 'Lessons' },
            { id: 'announcement', label: 'Announcements' },
            { id: 'certificate', label: 'Certificates' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filterType === tab.id
                  ? 'bg-white dark:bg-[#151B23] text-[#4DA3FF] font-semibold shadow-sm border border-slate-200 dark:border-[#2b3342]'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications Scroll List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1 divide-y divide-slate-100 dark:divide-[#222936]">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onMarkAsRead(item.id);
                if (item.linkTab) {
                  onNavigateToTab(item.linkTab);
                  onClose();
                }
              }}
              className={`p-3.5 rounded-2xl transition-all cursor-pointer flex items-start gap-3.5 group ${
                !item.read
                  ? 'bg-[#EAF5FF]/40 dark:bg-[#4DA3FF]/10 border border-[#4DA3FF]/20'
                  : 'hover:bg-slate-50 dark:hover:bg-[#18202A] border border-transparent'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#151B23] border border-slate-200 dark:border-[#222936] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                {getNotificationIcon(item.type)}
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#4DA3FF] transition-colors truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {item.time}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.message}
                </p>

                {item.linkTab && (
                  <div className="pt-1 flex items-center gap-1 text-[11px] font-semibold text-[#4DA3FF]">
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                )}
              </div>

              {!item.read && (
                <span className="w-2 h-2 rounded-full bg-[#4DA3FF] shrink-0 mt-2" />
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-12 text-center space-y-1">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                No notifications in this filter.
              </p>
              <p className="text-[11px] text-slate-400">
                You are all caught up!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-[#222936] bg-slate-50 dark:bg-[#11161d] flex items-center justify-between text-[11px] text-slate-400">
          <span>piseth.design student notification engine</span>
          <button
            onClick={onClose}
            className="hover:text-slate-900 dark:hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
