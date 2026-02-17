import { createClient } from '@/utils/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface Bookmark {
    id: string;
    title: string;
    url: string;
    user_id: string;
    created_at: string;
}

export const bookmarkService = {
    async getBookmarks() {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('bookmarks')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Bookmark[];
    },

    async createBookmark(title: string, url: string) {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
            .from('bookmarks')
            .insert([{ title, url, user_id: user.id }])
            .select()
            .single();

        if (error) throw error;
        return data as Bookmark;
    },

    async deleteBookmark(id: string) {
        const supabase = createClient();
        const { error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    subscribeToBookmarks(callback: (payload: any) => void): RealtimeChannel {
        const supabase = createClient();
        return supabase
            .channel('bookmarks_channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'bookmarks' },
                (payload) => {
                    callback(payload);
                }
            )
            .subscribe();
    }
};
