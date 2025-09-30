'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
   
  Download, 
  Code2, 
  Lightbulb, 
  
  Settings,
  ChevronRight,
  Home,
  Menu,
  X
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: typeof navigation[0];
  items?: { title: string; href: string }[];
}

const navigation = [
  {
    title: 'Getting Started',
    href: '/docs',
  },
  {
    title: 'Installation',
    href: '/docs/installation',
  },
  {
    title: 'Examples',
    href: '/docs/examples',
  },
  {
    title: 'API Reference',
    href: '/docs/api',
  },
  {
    title: 'Troubleshooting',
    href: '/docs/troubleshooting',
  },
];

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Countries Cities AR
            </h2>
            <p className="text-sm text-gray-600">Documentation</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-500/10 text-blue-400 font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Version Info */}
          <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-xs font-semibold text-purple-700 mb-1">Version</div>
            <div className="text-2xl font-bold text-purple-900">v3.0.1</div>
            <div className="text-xs text-gray-700 mt-1">250 دولة • 4,642 محافظة</div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h3>
            <div className="space-y-2">
              <a
                href="https://www.npmjs.com/package/countries-cities-ar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-purple-600 transition-colors"
              >
                📦 npm Package
              </a>
              <a
                href="https://github.com/ziadmustafa1/countries-cities-ar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-purple-600 transition-colors"
              >
                🔗 GitHub Repo
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
