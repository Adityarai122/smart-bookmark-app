import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

export function Header() {
  const { session } = useAuth();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    try {
        setIsLoggingOut(true);
        await authService.logout();
        toast.success('Signed out successfully');
        router.push('/');
    } catch (error) {
        setIsLoggingOut(false);
        toast.error('Failed to sign out');
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-black tracking-tight group">
          <span className="text-gray-900 dark:text-white">Smart</span>
          <span className="text-gradient">Bookmarks</span>
        </Link>

        {/* GitHub Link */}
        <a 
          href="https://github.com/Adityarai122/smart-bookmark-app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors border border-gray-200 dark:border-zinc-700 rounded-full px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-800"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span className="hidden sm:inline">View on GitHub</span>
        </a>

        {session?.user ? (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
                {session.user.user_metadata?.avatar_url ? (
                    <img 
                        src={session.user.user_metadata.avatar_url} 
                        alt="Profile" 
                        className="w-9 h-9 rounded-full ring-2 ring-white/20 shadow-md"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold ring-2 ring-white/20 shadow-md">
                        {session.user.email?.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-sm font-semibold text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoggingOut ? (
                <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="hidden sm:inline">Signing out...</span>
                </>
              ) : (
                <>
                    <span className="hidden sm:inline">Sign Out</span>
                    <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </>
              )}
            </button>
          </div>
        ) : (
          <Link 
            href="/login"
            className="text-sm font-bold text-gray-900 dark:text-white hover:text-primary transition-colors"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}

