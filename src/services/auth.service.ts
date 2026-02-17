import { createClient } from '@/utils/supabase/client';

export const authService = {
    async loginWithGoogle() {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) throw error;
    },

    async logout() {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    async getSession() {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        return data.session;
    },
};
