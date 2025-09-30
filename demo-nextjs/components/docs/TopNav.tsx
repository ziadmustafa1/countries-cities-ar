'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Search, Terminal } from 'lucide-react';
import { SearchDialog } from './SearchDialog';

export function TopNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <nav className="sticky top-4 z-50 bg-[#010409]/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl w-[90%] m-auto">
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Countries Cities AR</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/docs"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/10 transition-all"
              >
                Docs
              </Link>
              <Link
                href="/docs/api"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/10 transition-all"
              >
                API Reference
              </Link>
              <Link
                href="/docs/examples"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/10 transition-all"
              >
                Examples
              </Link>
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/10 transition-all"
              >
                Playground
              </Link>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 bg-gray-900/50 hover:bg-gray-800/50 rounded-md transition-all border border-gray-800"
            >
              <Search className="w-4 h-4" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.5 text-xs bg-gray-950 rounded border border-gray-700">⌘K</kbd>
            </button>
            
            <a
              href="https://github.com/ziadmustafa1/countries-cities-ar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
