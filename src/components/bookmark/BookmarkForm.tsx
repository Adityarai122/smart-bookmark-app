'use client';

import React, { useState } from 'react';
import { isValidUrl } from '@/utils/validation';

interface BookmarkFormProps {
  onAdd: (title: string, url: string) => Promise<any>;
}

export function BookmarkForm({ onAdd }: BookmarkFormProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    if (!isValidUrl(url)) {
      alert('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    try {
      setLoading(true);
      await onAdd(title, url);
      setTitle('');
      setUrl('');
    } catch (error) {
      alert('Failed to add bookmark');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 mb-12 relative overflow-hidden">
      {/* Decorative blurred blob */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-6 items-end">
        <div className="flex-1 w-full space-y-2 group">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">Title</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="e.g., My Portfolio"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-primary bg-white/50 dark:bg-black/50 w-full pl-11"
                    required
                />
            </div>
        </div>
        
        <div className="flex-1 w-full space-y-2 group">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1 group-focus-within:text-accent transition-colors">Url</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                </div>
                <input
                    type="url"
                    placeholder="https://..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="input-primary bg-white/50 dark:bg-black/50 w-full pl-11 focus:ring-accent/50 focus:border-accent"
                    required
                />
            </div>
        </div>

        <div className="pt-2">
            <button
            type="submit"
            disabled={loading}
            className="btn-primary whitespace-nowrap h-[50px] flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
            {loading ? (
                <span className="animate-pulse">Adding...</span>
            ) : (
                <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    <span>Add</span>
                </>
            )}
            </button>
        </div>
      </div>
    </form>
  );
}
