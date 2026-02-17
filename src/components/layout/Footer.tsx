import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 mt-auto">
      <div className="container-layout py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Smart Bookmark App. All rights reserved.</p>
      </div>
    </footer>
  );
}
