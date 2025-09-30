import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function TroubleshootingPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
        🔧 Troubleshooting
      </h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-8">
        Solutions to common issues and errors you might encounter.
      </p>

      {/* Module Not Found */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8 not-prose">
        <div className="flex items-start gap-3">
          <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-900 mb-3">
              Module not found: Can't resolve 'countries-cities-ar'
            </h3>
            
            <p className="text-gray-700 mb-4">
              This error occurs when Next.js or your bundler can&apos;t find the package.
            </p>

            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="text-sm font-semibold text-gray-700 mb-2">Solution:</div>
              <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded"><code>{`# 1. Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# 2. Reinstall dependencies
npm install

# 3. Clear Next.js cache
rm -rf .next

# 4. Restart dev server
npm run dev`}</code></pre>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Make sure you're using version 3.0.1 or later:
              </p>
              <pre className="text-sm mt-2 bg-gray-900 text-green-400 p-2 rounded"><code>npm install countries-cities-ar@^3.0.1</code></pre>
            </div>
          </div>
        </div>
      </div>

      {/* TypeScript Errors */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-8 not-prose">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-orange-900 mb-3">
              TypeScript Type Errors
            </h3>
            
            <p className="text-gray-700 mb-4">
              If you see type-related errors, ensure you have the latest version.
            </p>

            <div className="bg-white rounded-lg p-4">
              <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded"><code>{`npm install countries-cities-ar@latest`}</code></pre>
            </div>
          </div>
        </div>
      </div>

      {/* Server/Client Components */}
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Next.js: Server vs Client Components</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8 not-prose">
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <h3 className="text-lg font-bold text-green-900">Server Components ✅</h3>
          </div>
          
          <p className="text-gray-700 mb-4 text-sm">
            Can use the library directly without 'use client':
          </p>
          
          <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded overflow-x-auto"><code>{`import { allCountries } from 'countries-cities-ar';

export default function Page() {
  return (
    <div>
      {allCountries.length} countries
    </div>
  );
}`}</code></pre>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <h3 className="text-lg font-bold text-blue-900">Client Components ✅</h3>
          </div>
          
          <p className="text-gray-700 mb-4 text-sm">
            Add 'use client' at the top:
          </p>
          
          <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded overflow-x-auto"><code>{`'use client';
import { useState } from 'react';
import { allCountries } from 'countries-cities-ar';

export default function Component() {
  const [data] = useState(allCountries);
  return <div>{data.length}</div>;
}`}</code></pre>
        </div>
      </div>

      {/* Performance Issues */}
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">⚡ Performance Optimization</h2>

      <div className="space-y-6 mb-8">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6 not-prose">
          <h3 className="text-lg font-bold text-gray-900 mb-3">1. Import Only What You Need</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-semibold text-green-700 mb-2">✅ Good</div>
              <pre className="text-sm bg-gray-900 text-green-400 p-3 rounded"><code>{`import { getCountryByCode } from 'countries-cities-ar';

const egypt = getCountryByCode('EG');`}</code></pre>
            </div>
            
            <div>
              <div className="text-sm font-semibold text-red-700 mb-2">❌ Avoid (if not needed)</div>
              <pre className="text-sm bg-gray-900 text-red-400 p-3 rounded"><code>{`import { allCountries } from 'countries-cities-ar';

// Only if you really need all 250 countries`}</code></pre>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-pink-50 border-2 border-indigo-200 rounded-xl p-6 not-prose">
          <h3 className="text-lg font-bold text-gray-900 mb-3">2. Use Memoization for Filtering</h3>
          
          <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded overflow-x-auto"><code>{`import { useMemo } from 'react';
import { allCountries } from 'countries-cities-ar';

function Component() {
  const [search, setSearch] = useState('');
  
  const filtered = useMemo(() => {
    return allCountries.filter(c => 
      c.nameAr.includes(search)
    );
  }, [search]); // Only re-compute when search changes
  
  return <div>{/* ... */}</div>;
}`}</code></pre>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 rounded-xl p-6 not-prose">
          <h3 className="text-lg font-bold text-gray-900 mb-3">3. Lazy Load Components</h3>
          
          <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded overflow-x-auto"><code>{`import dynamic from 'next/dynamic';

const CountrySelector = dynamic(
  () => import('./CountrySelector'),
  { 
    loading: () => <p>Loading...</p>,
    ssr: false // Disable server-side rendering if needed
  }
);

export default function Page() {
  return <CountrySelector />;
}`}</code></pre>
        </div>
      </div>

      {/* Build Errors */}
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">🏗️ Build Errors</h2>

      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8 not-prose">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Export Errors</h3>
        <p className="text-gray-700 mb-4">
          If you see errors like "Cannot find module" during build:
        </p>
        
        <ol className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="font-bold text-purple-600">1.</span>
            <span>Ensure you're using version <code className="bg-purple-100 px-2 py-1 rounded">3.0.1</code> or later</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-purple-600">2.</span>
            <span>Clear your build cache and node_modules</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-purple-600">3.</span>
            <span>Check your package.json to ensure correct version</span>
          </li>
        </ol>
      </div>

      {/* Getting Help */}
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">💬 Getting Help</h2>
      
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white mb-8 not-prose">
        <h3 className="text-xl font-bold mb-4">Still Having Issues?</h3>
        <p className="mb-4">
          If none of the above solutions work, here's how to get help:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="https://github.com/ziadmustafa1/countries-cities-ar/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all"
          >
            <div className="text-2xl">🐛</div>
            <div>
              <div className="font-semibold">Report a Bug</div>
              <div className="text-sm text-purple-100">GitHub Issues</div>
            </div>
          </a>

          <a
            href="https://github.com/ziadmustafa1/countries-cities-ar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all"
          >
            <div className="text-2xl">📖</div>
            <div>
              <div className="font-semibold">Read the Docs</div>
              <div className="text-sm text-purple-100">Full Documentation</div>
            </div>
          </a>
        </div>
      </div>

      {/* Back to Docs */}
      <div className="flex gap-4 not-prose">
        <Link
          href="/docs"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
        >
          ← Back to Documentation
        </Link>
        <Link
          href="/docs/installation"
          className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
        >
          Installation Guide
        </Link>
      </div>
    </div>
  );
}
