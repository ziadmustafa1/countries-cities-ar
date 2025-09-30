'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  {
    title: 'Documentation',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Why Countries Cities AR', href: '/docs/why' },
    ],
  },
  {
    title: 'Getting Started',
    items: [
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Next.js', href: '/docs/installation/nextjs' },
      { title: 'React', href: '/docs/installation/react' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Types', href: '/docs/api/types' },
      { title: 'Functions', href: '/docs/api/functions' },
      { title: 'Data Exports', href: '/docs/api/exports' },
    ],
  },
  {
    title: 'Examples',
    items: [
      { title: 'React Components', href: '/docs/examples/react' },
      { title: 'Next.js App Router', href: '/docs/examples/nextjs' },
      { title: 'Advanced Patterns', href: '/docs/examples/advanced' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'Multi-language', href: '/docs/guides/multilang' },
      { title: 'Search & Filter', href: '/docs/guides/search' },
      { title: 'Performance', href: '/docs/guides/performance' },
    ],
  },
];

function NavSection({ section }: { section: typeof navigation[0] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-200 transition-all"
      >
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? '' : '-rotate-90'}`} />
        {section.title}
      </button>
      {isOpen && (
        <div className="mt-1 space-y-0.5">
          {section.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-1.5 text-sm rounded-md transition-all ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-400 font-medium border-l-2 border-blue-400 -ml-px'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 h-[calc(100vh-2rem)] sticky top-4 overflow-y-auto bg-[#010409]/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl ml-4">
      <nav className="p-6">
        {navigation.map((section, index) => (
          <NavSection key={index} section={section} />
        ))}
        
        <div className="mt-8 pt-6 border-t border-gray-800">
          <a
            href="https://github.com/ziadmustafa1/countries-cities-ar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/countries-cities-ar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all mt-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 7.334v8c0 .733.6 1.333 1.333 1.333h6.667V5.334H1.333C.6 5.334 0 5.934 0 6.667v.667zM24 7.334v8c0 .733-.6 1.333-1.333 1.333H16V5.334h6.667C23.4 5.334 24 5.934 24 6.667v.667zM16 16.667h-8V5.334h8v11.333z"/>
            </svg>
            npm
          </a>
        </div>
      </nav>
    </aside>
  );
}
