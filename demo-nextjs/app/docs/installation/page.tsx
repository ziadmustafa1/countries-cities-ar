import { CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { CodeBlock } from '@/components/code-block';

export default function InstallationPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
        📦 Installation
      </h1>
      <p className="text-gray-400 text-lg leading-relaxed mb-8">
        Get started with Countries Cities AR in your project. Choose your preferred package manager and follow the guide.
      </p>

      {/* Quick Install */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/30 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Install</h2>
        
        <div className="space-y-4">
          <div>
            <div className="text-sm font-semibold text-gray-300 mb-2">npm</div>
            <CodeBlock code="npm install countries-cities-ar" language="bash" />
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-300 mb-2">yarn</div>
            <CodeBlock code="yarn add countries-cities-ar" language="bash" />
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-300 mb-2">pnpm</div>
            <CodeBlock code="pnpm add countries-cities-ar" language="bash" />
          </div>
        </div>
      </div>

      {/* Requirements */}
      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Requirements</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
          <div>
            <div className="font-semibold text-white">Node.js 16+</div>
            <div className="text-sm text-gray-400">Required for all setups</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
          <div>
            <div className="font-semibold text-white">TypeScript 5+</div>
            <div className="text-sm text-gray-400">Optional, but recommended</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <CheckCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
          <div>
            <div className="font-semibold text-white">React 18+</div>
            <div className="text-sm text-gray-400">For React examples</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
          <div>
            <div className="font-semibold text-white">Next.js 13+</div>
            <div className="text-sm text-gray-400">For Next.js examples</div>
          </div>
        </div>
      </div>

      {/* Basic Usage */}
      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Basic Usage</h2>
      <CodeBlock
        code={`import { allCountries, getCountryByCode } from 'countries-cities-ar';

// Get all countries
console.log(allCountries.length); // 250

// Get a specific country
const egypt = getCountryByCode('EG');
console.log(egypt?.nameAr); // "مصر"
console.log(egypt?.cities.length); // 27

// Get Saudi Arabia
const saudi = getCountryByCode('SA');
console.log(saudi?.cities); // 13 regions with Arabic names`}
        language="typescript"
      />

      {/* Setup Guides */}
      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Framework Setup Guides</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Link
          href="/docs/installation/nextjs"
          className="p-6 border border-blue-500/30 rounded-xl hover:border-blue-500 hover:bg-blue-500/5 transition-all group"
        >
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            Next.js Setup
          </h3>
          <p className="text-gray-400 mb-4">
            Step-by-step guide for Next.js 13+ App Router with Server and Client Components
          </p>
          <div className="text-blue-400 font-semibold group-hover:translate-x-2 transition-transform inline-block">
            Read Guide →
          </div>
        </Link>

        <Link
          href="/docs/installation/react"
          className="p-6 border border-cyan-500/30 rounded-xl hover:border-cyan-500 hover:bg-cyan-500/5 transition-all group"
        >
          <div className="text-3xl mb-3">⚛️</div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            React + Vite Setup
          </h3>
          <p className="text-gray-400 mb-4">
            Quick setup guide for React with Vite, create-react-app, or any React setup
          </p>
          <div className="text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform inline-block">
            Read Guide →
          </div>
        </Link>
      </div>

      {/* Verify Installation */}
      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Verify Installation</h2>
      <p className="text-gray-400 mb-6">
        After installation, verify that the library is working correctly:
      </p>

      <CodeBlock
        code={`// Create a test file: test.js
import { allCountries } from 'countries-cities-ar';

console.log('✅ Library loaded successfully!');
console.log(\`📊 Total countries: \${allCountries.length}\`);
console.log(\`🌍 First country: \${allCountries[0].name}\`);

// Run with:
// node test.js`}
        language="javascript"
        filename="test.js"
      />

      {/* Troubleshooting */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Installation Issues?</h3>
            <p className="text-gray-400 mb-4">
              If you encounter any issues during installation, check our troubleshooting guide.
            </p>
            <Link
              href="/docs/troubleshooting"
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors font-semibold"
            >
              View Troubleshooting Guide →
            </Link>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Next Steps</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          href="/docs/api"
          className="p-4 border border-gray-800 rounded-lg hover:border-blue-500 hover:bg-blue-500/5 transition-all"
        >
          <div className="text-2xl mb-2">📚</div>
          <div className="font-semibold text-white mb-1">API Reference</div>
          <div className="text-sm text-gray-400">Explore all functions</div>
        </Link>

        <Link
          href="/docs/examples"
          className="p-4 border border-gray-800 rounded-lg hover:border-cyan-500 hover:bg-cyan-500/5 transition-all"
        >
          <div className="text-2xl mb-2">💡</div>
          <div className="font-semibold text-white mb-1">Examples</div>
          <div className="text-sm text-gray-400">See code samples</div>
        </Link>

        <Link
          href="/docs/guides"
          className="p-4 border border-gray-800 rounded-lg hover:border-purple-500 hover:bg-purple-500/5 transition-all"
        >
          <div className="text-2xl mb-2">📖</div>
          <div className="font-semibold text-white mb-1">Guides</div>
          <div className="text-sm text-gray-400">Learn best practices</div>
        </Link>
      </div>
    </div>
  );
}
