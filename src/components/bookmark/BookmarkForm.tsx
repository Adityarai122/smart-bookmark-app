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
      
      <div className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
        <div className="flex-1 w-full space-y-2">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Title</label>
            <input
            type="text"
            placeholder="e.g., My Portfolio"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-primary bg-white/50 dark:bg-black/50 w-full"
            required
            />
        </div>
        
        <div className="flex-1 w-full space-y-2">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Url</label>
            <input
            type="url"
            placeholder="https://..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input-primary bg-white/50 dark:bg-black/50 w-full"
            required
            />
        </div>

        <div className="pt-6">
            <button
            type="submit"
            disabled={loading}
            className="btn-primary whitespace-nowrap h-[50px] flex items-center gap-2"
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
