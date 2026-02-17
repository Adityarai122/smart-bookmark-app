'use client';

import { useState, useEffect } from 'react';
import { bookmarkService, Bookmark } from '@/services/bookmark.service';
import { useAuth } from './useAuth';

export function useBookmarks() {
    const { session } = useAuth();
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user) {
            setBookmarks([]);
            setLoading(false);
            return;
        }

        // Fetch initial bookmarks
        loadBookmarks();

        // Subscribe to changes
        const channel = bookmarkService.subscribeToBookmarks((payload) => {
            if (payload.eventType === 'INSERT') {
                setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
            } else if (payload.eventType === 'DELETE') {
                setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
            }
        });

        return () => {
            channel.unsubscribe();
        };
    }, [session?.user]);

    const loadBookmarks = async () => {
        try {
            setLoading(true);
            const data = await bookmarkService.getBookmarks();
            setBookmarks(data);
        } catch (error: any) {
            console.error('Error loading bookmarks:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint
            });
        } finally {
            setLoading(false);
        }
    };

    const addBookmark = async (title: string, url: string) => {
        try {
            // Optimistic update
            const tempId = Math.random().toString();
            const newBookmark: Bookmark = {
                id: tempId,
                title,
                url,
                user_id: session?.user.id!,
                created_at: new Date().toISOString(),
            };

            setBookmarks((prev) => [newBookmark, ...prev]);

            const created = await bookmarkService.createBookmark(title, url);

            // Replace optimistic bookmark with real one (though realtime might handle this too)
            setBookmarks((prev) => prev.map(b => b.id === tempId ? created : b));
            return created;
        } catch (error) {
            console.error('Error adding bookmark:', error);
            // Revert optimistic update? logic could be improved here
            loadBookmarks(); // Fallback
            throw error;
        }
    };

    const deleteBookmark = async (id: string) => {
        try {
            // Optimistic update
            setBookmarks((prev) => prev.filter((b) => b.id !== id));
            await bookmarkService.deleteBookmark(id);
        } catch (error) {
            console.error('Error deleting bookmark:', error);
            loadBookmarks();
            throw error;
        }
    };

    return {
        bookmarks,
        loading,
        addBookmark,
        deleteBookmark,
        refresh: loadBookmarks
    };
}
