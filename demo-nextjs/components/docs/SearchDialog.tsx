'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, FileText, Hash, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
  title: string;
  href: string;
  category: string;
  description?: string;
}

const docsContent: SearchResult[] = [
  // Documentation
  { title: 'Introduction', href: '/docs', category: 'Documentation', description: 'Get started with Countries Cities AR' },
  { title: 'Why Countries Cities AR', href: '/docs/why', category: 'Documentation', description: 'Benefits and use cases' },
  
  // Getting Started
  { title: 'Installation', href: '/docs/installation', category: 'Getting Started', description: 'Install the library in your project' },
  { title: 'Next.js Setup', href: '/docs/installation/nextjs', category: 'Getting Started', description: 'Next.js 13+ configuration' },
  { title: 'React Setup', href: '/docs/installation/react', category: 'Getting Started', description: 'React + Vite setup guide' },
  
  // API Reference
  { title: 'Types', href: '/docs/api/types', category: 'API Reference', description: 'TypeScript type definitions' },
  { title: 'Functions', href: '/docs/api/functions', category: 'API Reference', description: 'Available functions and utilities' },
  { title: 'Data Exports', href: '/docs/api/exports', category: 'API Reference', description: 'Exported data structures' },
  
  // Examples
  { title: 'React Components', href: '/docs/examples/react', category: 'Examples', description: 'React component examples' },
  { title: 'Next.js App Router', href: '/docs/examples/nextjs', category: 'Examples', description: 'Next.js patterns and examples' },
  { title: 'Advanced Patterns', href: '/docs/examples/advanced', category: 'Examples', description: 'Advanced usage patterns' },
  
  // Guides
  { title: 'Multi-language Support', href: '/docs/guides/multilang', category: 'Guides', description: 'Working with multiple languages' },
  { title: 'Search & Filter', href: '/docs/guides/search', category: 'Guides', description: 'Search and filter countries' },
  { title: 'Performance', href: '/docs/guides/performance', category: 'Guides', description: 'Optimization tips' },
];

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = docsContent.filter(item => {
      return (
        item.title.toLowerCase().includes(lowercaseQuery) ||
        item.category.toLowerCase().includes(lowercaseQuery) ||
        item.description?.toLowerCase().includes(lowercaseQuery)
      );
    });

    setResults(filtered);
  }, []);

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleResultClick = () => {
    onClose();
    setQuery('');
    setResults([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl mx-4 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-800">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base"
            autoFocus
          />
          <kbd className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded border border-gray-700">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query && results.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-400">No results found for "{query}"</p>
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((result, idx) => (
                <Link
                  key={result.href}
                  href={result.href}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-all group"
                >
                  <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                    <FileText className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white group-hover:text-blue-400 transition-colors">
                        {result.title}
                      </span>
                      <ChevronRight className="w-3 h-3 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{result.category}</span>
                      {result.description && (
                        <>
                          <span className="text-gray-700">•</span>
                          <span className="text-xs text-gray-600 truncate">{result.description}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Hash className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-4xl mb-3">💡</div>
              <p className="text-gray-400 mb-2">Quick search</p>
              <p className="text-sm text-gray-600">
                Search across all documentation pages, API references, examples, and guides
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800 bg-gray-900/50">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↓</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↵</kbd>
              <span>Select</span>
            </div>
          </div>
          <span className="text-xs text-gray-600">{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
