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
    <div className="py-4 md:py-8 px-4 md:px-0">
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white mb-6 md:mb-8 text-center md:text-left">My Bookmarks</h1>
        
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
