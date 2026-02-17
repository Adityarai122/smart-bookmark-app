import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black font-sans">
      <Header />
      <main className="flex-1 container-layout w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
