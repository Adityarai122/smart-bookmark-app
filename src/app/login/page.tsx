'use client';

import { authService } from '@/services/auth.service';
import React, { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await authService.loginWithGoogle();
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-black font-sans">
        {/* Animated Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-20%] right-[10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-[float_10s_ease-in-out_infinite]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] animate-[float_12s_ease-in-out_infinite_reverse]" />
        </div>

        <div className="relative z-10 w-full max-w-md px-6">
            <div className="glass-card p-10 rounded-3xl text-center shadow-2xl space-y-8 border-t border-white/50 dark:border-white/10">
                <div className="space-y-3">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Sign in to access your digital universe
                    </p>
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full group relative flex items-center justify-center gap-3 bg-white dark:bg-zinc-800 text-gray-700 dark:text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all border border-gray-200 dark:border-zinc-700"
                >
                    {loading ? (
                        <span className="animate-pulse">Connecting...</span>
                    ) : (
                        <>
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span>Continue with Google</span>
                        </>
                    )}
                </button>
                
                <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                    By clicking continue, you agree to our <span className="underline cursor-pointer hover:text-primary">Terms of Service</span> and <span className="underline cursor-pointer hover:text-primary">Privacy Policy</span>.
                </p>
            </div>
        </div>
    </div>
  );
}
