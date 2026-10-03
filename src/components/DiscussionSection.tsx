import React, { useState } from 'react';
import { DiscussionComment } from '../types';
import { INITIAL_DISCUSSIONS } from '../data/coursesData';
import { MessageSquare, ThumbsUp, Bookmark, Send, CornerDownRight, Check, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DiscussionSectionProps {
  lessonId?: string;
  className?: string;
}

export const DiscussionSection: React.FC<DiscussionSectionProps> = ({
  lessonId,
  className = '',
}) => {
  const { language } = useLanguage();
  const [comments, setComments] = useState<DiscussionComment[]>(INITIAL_DISCUSSIONS);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: DiscussionComment = {
      id: `comment-${Date.now()}`,
      userName: 'Sothea Chan',
      userRole: 'Student',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      content: newCommentText.trim(),
      createdAt: 'Just now',
      likesCount: 0,
      isLiked: false,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return;

    const reply: DiscussionComment = {
      id: `reply-${Date.now()}`,
      userName: 'Sothea Chan',
      userRole: 'Student',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      content: replyText.trim(),
      createdAt: 'Just now',
      likesCount: 0,
      isLiked: false,
    };

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [...(c.replies || []), reply],
          };
        }
        return c;
      })
    );

    setReplyingToId(null);
    setReplyText('');
  };

  const toggleLike = (commentId: string, isReply: boolean = false, parentId?: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (!isReply && c.id === commentId) {
          const isLiked = !c.isLiked;
          return {
            ...c,
            isLiked,
            likesCount: c.likesCount + (isLiked ? 1 : -1),
          };
        }
        if (isReply && c.id === parentId && c.replies) {
          return {
            ...c,
            replies: c.replies.map((r) => {
              if (r.id === commentId) {
                const isLiked = !r.isLiked;
                return {
                  ...r,
                  isLiked,
                  likesCount: r.likesCount + (isLiked ? 1 : -1),
                };
              }
              return r;
            }),
          };
        }
        return c;
      })
    );
  };

  const toggleBookmark = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return { ...c, bookmarked: !c.bookmarked };
        }
        return c;
      })
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      
      {/* Write Question / Discussion Form */}
      <form onSubmit={handleAddComment} className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E4E6EB] dark:border-[#2E3034] shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
            alt="Your avatar"
            className="w-9 h-9 rounded-full object-cover ring-1 ring-[#E4E6EB] dark:ring-[#2E3034]"
          />
          <div className="flex-1">
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder={language === 'km' ? 'សួរសំណួរ ឬបញ្ចេញមតិទៅកាន់លោកគ្រូ និងមិត្តរួមថ្នាក់...' : 'Ask a question or discuss this design principle with Teacher Piseth...'}
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#F5F7FA] dark:bg-[#242629] border border-[#E4E6EB] dark:border-[#2E3034] text-[#1C1C1E] dark:text-[#F5F5F7] placeholder-[#65676B] dark:placeholder-[#A1A1A6] focus:outline-none focus:ring-1 focus:ring-[#1877F2]"
            />
          </div>
          <button
            type="submit"
            disabled={!newCommentText.trim()}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] disabled:opacity-50 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>{language === 'km' ? 'ផ្ញើ' : 'Post'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Discussions Feed */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E4E6EB] dark:border-[#2E3034] shadow-xs space-y-3"
          >
            {/* Header: User Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-[#E4E6EB] dark:ring-[#2E3034]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-[#1C1C1E] dark:text-[#F5F5F7]">
                      {comment.userName}
                    </span>
                    {comment.userRole === 'Instructor' ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1877F2] text-white flex items-center gap-1">
                        <Award className="w-3 h-3" /> Teacher
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-[#242629] text-[#65676B] dark:text-[#A1A1A6]">
                        {comment.userRole || 'Student'}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#65676B] dark:text-[#A1A1A6]">
                    {comment.createdAt}
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleBookmark(comment.id)}
                className={`p-1.5 rounded-lg text-[#65676B] dark:text-[#A1A1A6] hover:text-[#1C1C1E] dark:hover:text-[#F5F5F7] transition-colors cursor-pointer ${
                  comment.bookmarked ? 'text-[#1877F2] dark:text-[#4595FF]' : ''
                }`}
                title={comment.bookmarked ? 'Saved to bookmarks' : 'Save bookmark'}
              >
                <Bookmark className={`w-4 h-4 ${comment.bookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Comment Body */}
            <p className="text-xs sm:text-sm text-[#1C1C1E] dark:text-[#F5F5F7] leading-relaxed pl-12">
              {comment.content}
            </p>

            {/* Actions Bar: Like & Reply */}
            <div className="pl-12 flex items-center gap-4 text-xs text-[#65676B] dark:text-[#A1A1A6] pt-1">
              <button
                onClick={() => toggleLike(comment.id)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer hover:text-[#1877F2] ${
                  comment.isLiked ? 'text-[#1877F2] dark:text-[#4595FF] font-semibold' : ''
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${comment.isLiked ? 'fill-current' : ''}`} />
                <span>{comment.likesCount} {language === 'km' ? 'ចូលចិត្ត' : 'Likes'}</span>
              </button>

              <button
                onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                className="flex items-center gap-1.5 transition-colors cursor-pointer hover:text-[#1877F2]"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{language === 'km' ? 'ឆ្លើយតប' : 'Reply'}</span>
              </button>
            </div>

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-6 sm:pl-12 pt-3 space-y-3 border-t border-[#E4E6EB]/60 dark:border-[#2E3034]/60">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="p-3.5 rounded-xl bg-[#F5F7FA] dark:bg-[#242629] border border-[#E4E6EB]/60 dark:border-[#2E3034] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={reply.userAvatar}
                          alt={reply.userName}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-[#E4E6EB] dark:ring-[#2E3034]"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-[#1C1C1E] dark:text-[#F5F5F7]">
                              {reply.userName}
                            </span>
                            {reply.userRole === 'Instructor' && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#1877F2] text-white">
                                Instructor
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#65676B] dark:text-[#A1A1A6]">
                            {reply.createdAt}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleLike(reply.id, true, comment.id)}
                        className={`flex items-center gap-1 text-[11px] transition-colors cursor-pointer ${
                          reply.isLiked ? 'text-[#1877F2] dark:text-[#4595FF] font-semibold' : 'text-[#65676B] dark:text-[#A1A1A6]'
                        }`}
                      >
                        <ThumbsUp className={`w-3 h-3 ${reply.isLiked ? 'fill-current' : ''}`} />
                        <span>{reply.likesCount}</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#1C1C1E] dark:text-[#F5F5F7] leading-relaxed">
                      {reply.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Inline Reply Box if open */}
            {replyingToId === comment.id && (
              <div className="pl-6 sm:pl-12 pt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={language === 'km' ? 'សរសេរចម្លើយតប...' : 'Write a reply...'}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#F5F7FA] dark:bg-[#242629] border border-[#E4E6EB] dark:border-[#2E3034] text-[#1C1C1E] dark:text-[#F5F5F7] focus:outline-none focus:ring-1 focus:ring-[#1877F2]"
                />
                <button
                  onClick={() => handleAddReply(comment.id)}
                  disabled={!replyText.trim()}
                  className="py-2 px-3 text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] disabled:opacity-50 rounded-xl transition-all cursor-pointer"
                >
                  {language === 'km' ? 'ឆ្លើយ' : 'Send'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
