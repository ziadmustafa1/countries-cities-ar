import { Rocket, Zap, Globe, Code2, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function DocsHome() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="pb-8 border-b border-gray-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800/50 text-gray-300 rounded-md mb-4 text-sm">
          <Rocket className="w-4 h-4" />
          Version 3.0.1
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Countries Cities AR
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
          A comprehensive TypeScript library with <strong className="text-neutral-900 dark:text-neutral-100">250 countries</strong> and <strong className="text-neutral-900 dark:text-neutral-100">4,642 states/provinces</strong> in <strong className="text-neutral-900 dark:text-neutral-100">3 languages</strong>
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-6 border border-gray-800 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors bg-white dark:bg-neutral-900">
          <Globe className="w-8 h-8 text-neutral-900 dark:text-neutral-100 mb-3" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Complete Coverage</h3>
          <p className="text-gray-300 mb-4">
            All 250 world countries with 4,642 administrative divisions including states, provinces, governorates, and cities
          </p>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>✅ Egypt: 27 governorates</li>
            <li>✅ Saudi Arabia: 13 regions</li>
            <li>✅ UAE: 7 emirates</li>
            <li>✅ All Arab countries: 100% accurate Arabic</li>
          </ul>
        </div>

        <div className="p-6 border border-gray-800 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors bg-white dark:bg-neutral-900">
          <Zap className="w-8 h-8 text-neutral-900 dark:text-neutral-100 mb-3" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">TypeScript First</h3>
          <p className="text-gray-300 mb-4">
            Built with TypeScript, fully typed, and optimized for modern JavaScript frameworks
          </p>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>✅ Full type definitions</li>
            <li>✅ Tree-shakeable</li>
            <li>✅ ESM & CommonJS support</li>
            <li>✅ 586KB bundle size</li>
          </ul>
        </div>

        <div className="p-6 border border-gray-800 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors bg-white dark:bg-neutral-900">
          <Code2 className="w-8 h-8 text-neutral-900 dark:text-neutral-100 mb-3" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Developer Friendly</h3>
          <p className="text-gray-300 mb-4">
            Simple API with powerful search and filter functions for all your needs
          </p>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>✅ Easy to use functions</li>
            <li>✅ Multi-language search</li>
            <li>✅ React, Next.js, Vue ready</li>
            <li>✅ Well documented</li>
          </ul>
        </div>

        <div className="p-6 border border-gray-800 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors bg-white dark:bg-neutral-900">
          <BookOpen className="w-8 h-8 text-neutral-900 dark:text-neutral-100 mb-3" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Trilingual Support</h3>
          <p className="text-gray-300 mb-4">
            Every country and city includes names in English, Arabic, and French
          </p>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>✅ English names</li>
            <li>✅ Arabic translations (عربي)</li>
            <li>✅ French translations (Français)</li>
            <li>✅ Perfect for i18n apps</li>
          </ul>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-neutral-900 dark:bg-neutral-950 border border-neutral-800 dark:border-neutral-700 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-3">Quick Start</h2>
        <p className="text-neutral-300 mb-4">Get started in seconds with npm</p>
        
        <div className="bg-black dark:bg-neutral-900 rounded-lg p-4 mb-4 font-mono text-sm">
          <span className="text-neutral-400">$</span> npm install countries-cities-ar
        </div>

        <div className="bg-neutral-800 dark:bg-black rounded-lg p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`import { allCountries, getCountryByCode } from 'countries-cities-ar';

// Get all countries
console.log(allCountries.length); // 250

// Get Egypt data
const egypt = getCountryByCode('EG');
console.log(egypt.nameAr); // "مصر"
console.log(egypt.cities.length); // 27 governorates`}</code>
          </pre>
        </div>

        <div className="mt-4 flex gap-3">
          <Link
            href="/docs/installation"
            className="px-4 py-2 bg-white text-neutral-900 rounded-md text-sm font-medium hover:bg-neutral-100 transition-colors"
          >
            Installation Guide →
          </Link>
          <Link
            href="/docs/examples"
            className="px-4 py-2 bg-neutral-800 text-white rounded-md text-sm font-medium hover:bg-neutral-700 transition-colors"
          >
            View Examples
          </Link>
        </div>
      </div>

      {/* Next Steps */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">What's Next?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/docs/installation"
            className="p-4 border border-gray-800 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors bg-white dark:bg-neutral-900"
          >
            <div className="text-2xl mb-2">📦</div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
              Installation
            </h3>
            <p className="text-sm text-gray-400">
              Install and set up the library
            </p>
          </Link>

          <Link
            href="/docs/api"
            className="p-4 border border-gray-800 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors bg-white dark:bg-neutral-900"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
              API Reference
            </h3>
            <p className="text-sm text-gray-400">
              All functions and types
            </p>
          </Link>

          <Link
            href="/docs/examples"
            className="p-4 border border-gray-800 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors bg-white dark:bg-neutral-900"
          >
            <div className="text-2xl mb-2">💡</div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
              Examples
            </h3>
            <p className="text-sm text-gray-400">
              Real-world code examples
            </p>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Library Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-3xl font-bold text-white mb-1">250</div>
            <div className="text-sm text-gray-400">Countries</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">4,642</div>
            <div className="text-sm text-gray-400">States/Provinces</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">3</div>
            <div className="text-sm text-gray-400">Languages</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">586KB</div>
            <div className="text-sm text-gray-400">Bundle Size</div>
          </div>
        </div>
      </div>
    </div>
  );
}
