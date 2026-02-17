import { Bookmark } from '@/services/bookmark.service';
import React from 'react';
import { toast } from 'sonner';

interface BookmarkItemProps {
  bookmark: Bookmark;
  onDelete: (id: string) => Promise<void>;
}

export function BookmarkItem({ bookmark, onDelete }: BookmarkItemProps) {
  // Helper to get domain for display
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'web';
    }
  };

  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isDeleting) {
        setIsDeleting(true);
        // Reset check after 3 seconds if not confirmed
        setTimeout(() => setIsDeleting(false), 3000);
        return;
    }

    try {
        await onDelete(bookmark.id);
        toast.success('Bookmark deleted');
    } catch (error) {
        toast.error('Failed to delete bookmark');
        setIsDeleting(false);
    }
  };

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between h-40 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Decorative Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
            {/* Favicon Placeholder / Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-bold text-white shadow-md shrink-0">
                {bookmark.title.charAt(0).toUpperCase()}
            </div>
            
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md border border-gray-200 dark:border-zinc-700">
                {getDomain(bookmark.url)}
            </span>
        </div>

        <h3 className="font-bold text-lg text-black dark:text-white line-clamp-1 mb-1 group-hover:text-primary transition-colors">
          {bookmark.title}
        </h3>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
          {bookmark.url}
        </p>
      </div>
      
      <button
        onClick={handleDelete}
        className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-all duration-300 ${
            isDeleting 
            ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg scale-110' 
            : 'hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500'
        }`}
        title={isDeleting ? "Confirm Delete" : "Delete bookmark"}
      >
        {isDeleting ? (
            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
        ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        )}
      </button>
    </a>
  );
}

