import { CodeBlock } from '@/components/code-block';

export default function PerformancePage() {
  return (
    <div className="max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Performance Optimization</h1>
      <p className="text-lg text-gray-400 mb-8">
        Best practices for optimizing performance when using Countries Cities AR
      </p>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Bundle Size Optimization</h2>
          <p className="text-gray-400 mb-4">Reduce your bundle size by importing only what you need:</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h3 className="text-sm font-semibold text-red-300 mb-2">❌ Don&apos;t</h3>
              <CodeBlock 
                code="import * from 'countries-cities-ar';"
                language="javascript"
              />
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <h3 className="text-sm font-semibold text-green-300 mb-2">✅ Do</h3>
              <CodeBlock 
                code="import { getCountryByCode, searchCountries } from 'countries-cities-ar';"
                language="javascript"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Regional Imports</h2>
          <p className="text-gray-400 mb-4">Import only specific regions to reduce bundle size:</p>
          <CodeBlock 
            code={`// Import only Arab countries
import { africaCountries, asiaCountries } from 'countries-cities-ar';

const arabCountries = [
  ...africaCountries.filter(c => ['EG', 'LY', 'TN', 'DZ', 'MA', 'SD'].includes(c.code)),
  ...asiaCountries.filter(c => ['SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'YE', 'SY', 'IQ', 'JO', 'LB', 'PS'].includes(c.code))
];`}
            language="javascript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Lazy Loading</h2>
          <p className="text-gray-400 mb-4">Load data only when needed using dynamic imports:</p>
          <CodeBlock 
            code={`// Dynamic import for heavy operations
const loadCountries = async () => {
  const { allCountries } = await import('countries-cities-ar');
  return allCountries;
};

// Use with React Suspense
const CountryList = lazy(() => import('./CountryList'));`}
            language="javascript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Memoization</h2>
          <p className="text-gray-400 mb-4">Cache expensive operations for better performance:</p>
          <CodeBlock 
            code={`import { useMemo } from 'react';
import { allCountries } from 'countries-cities-ar';

function CountrySelector({ region }) {
  // Memoize filtered countries
  const filteredCountries = useMemo(() => {
    if (!region) return allCountries;
    return allCountries.filter(c => c.region === region);
  }, [region]);
  
  // Memoize sorted countries
  const sortedCountries = useMemo(() => {
    return [...filteredCountries].sort((a, b) => 
      a.nameAr.localeCompare(b.nameAr, 'ar')
    );
  }, [filteredCountries]);
  
  return (
    <select>
      {sortedCountries.map(country => (
        <option key={country.code} value={country.code}>
          {country.nameAr}
        </option>
      ))}
    </select>
  );
}`}
            language="tsx"
            filename="CountrySelector.tsx"
          />
        </div>

        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <h3 className="font-semibold text-yellow-300 mb-2">Pro Tips</h3>
          <ul className="space-y-1 text-sm text-yellow-400">
            <li>• Use virtual scrolling for long lists (react-window)</li>
            <li>• Implement search debouncing (300ms recommended)</li>
            <li>• Consider server-side filtering for large datasets</li>
            <li>• Use React.memo for pure components</li>
          </ul>
        </div>
      </section>
    </div>
  );
}