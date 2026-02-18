'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { useBookmarks } from '@/hooks/useBookmarks';
import { BookmarkForm } from '@/components/bookmark/BookmarkForm';
import { BookmarkList } from '@/components/bookmark/BookmarkList';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { toast } from 'sonner';

export const dynamic = 'force-dynamic';

function DashboardContent() {
  const { bookmarks, loading, addBookmark, deleteBookmark } = useBookmarks();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('welcome')) {
      toast.success('Welcome back to your digital universe! 🚀');
      router.replace('/dashboard');
    }
  }, [searchParams, router]);

  return (
    <div className="py-4 md:py-8 px-4 md:px-0 relative">
        {/* Dashboard Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] animate-[float_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] animate-[float_10s_ease-in-out_infinite_reverse]" />
        </div>

        <h1 className="text-2xl md:text-3xl font-black dark:text-white mb-6 md:mb-8 text-center md:text-left">
          <span className="text-gray-900 dark:text-gray-100">My </span>
          <span className="text-gradient">Bookmarks</span>
        </h1>
        
        <BookmarkForm onAdd={addBookmark} />
        
        <div className="mt-6 md:mt-8">
            <BookmarkList 
            bookmarks={bookmarks} 
            loading={loading} 
            onDelete={deleteBookmark} 
            />
        </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="p-8 text-center">Loading dashboard...</div>}>
        <DashboardContent />
      </Suspense>
    </AppLayout>
  );
}
