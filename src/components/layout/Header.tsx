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

