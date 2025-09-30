import { CodeBlock } from '@/components/code-block';

export default function NextjsExamplesPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Next.js Examples</h1>
      <p className="text-lg text-gray-400 mb-8">
        App Router patterns and server/client component examples
      </p>

      <section className="space-y-8">
        {/* Server Component with Data */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Server Component</h2>
          <p className="text-gray-400 mb-4">Render countries data at build time for optimal performance.</p>
          <CodeBlock
            code={`import { allCountries } from 'countries-cities-ar';

export default function CountriesPage() {
  // Data is loaded at build time - no client JS needed
  const arabCountries = allCountries.filter(c => 
    ['EG', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'YE', 'SY', 'LB', 'JO', 'IQ'].includes(c.code)
  );
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {arabCountries.map(country => (
        <div key={country.code} className="p-4 border rounded-lg">
          <h2 className="font-bold text-lg">{country.nameAr}</h2>
          <p className="text-gray-600">{country.name}</p>
          <p className="text-sm mt-2">
            {country.cities.length} محافظة
          </p>
        </div>
      ))}
    </div>
  );
}`}
            language="tsx"
            filename="app/countries/page.tsx"
          />
        </div>

        {/* Dynamic Route with Params */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Dynamic Routes</h2>
          <p className="text-gray-400 mb-4">Create dynamic pages for each country.</p>
          <CodeBlock
            code={`import { getCountryByCode, allCountries } from 'countries-cities-ar';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return allCountries.map((country) => ({
    code: country.code,
  }));
}

export default function CountryPage({ params }: { params: { code: string } }) {
  const country = getCountryByCode(params.code.toUpperCase());
  
  if (!country) {
    notFound();
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {country.nameAr} - {country.name}
      </h1>
      
      <div className="grid grid-cols-4 gap-3">
        {country.cities.map((city, idx) => (
          <div key={idx} className="p-3 bg-gray-800 rounded">
            <div className="font-medium">{city.nameAr || city.name}</div>
            <div className="text-sm text-gray-400">{city.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}`}
            language="tsx"
            filename="app/country/[code]/page.tsx"
          />
        </div>

        {/* Client Component with Search */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Client Component with Server Action</h2>
          <p className="text-gray-400 mb-4">Interactive search using server actions.</p>
          <CodeBlock
            code={`import { searchCountries } from 'countries-cities-ar';
import SearchForm from './search-form';

async function searchAction(query: string) {
  'use server';
  
  if (!query || query.length < 2) {
    return [];
  }
  
  const results = searchCountries(query, 'ar');
  return results.slice(0, 10).map(country => ({
    code: country.code,
    name: country.name,
    nameAr: country.nameAr,
    cities: country.cities.length,
  }));
}

export default function SearchPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Search Countries</h1>
      <SearchForm searchAction={searchAction} />
    </div>
  );
}`}
            language="tsx"
            filename="app/search/page.tsx"
          />

          <CodeBlock
            code={`'use client';

import { useState, useTransition } from 'react';

export default function SearchForm({ searchAction }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleSearch = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      const data = await searchAction(query);
      setResults(data);
    });
  };
  
  return (
    <div>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن دولة..."
          className="px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white"
        />
        <button 
          type="submit"
          disabled={isPending}
          className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          {isPending ? 'جاري البحث...' : 'بحث'}
        </button>
      </form>
      
      <div className="grid grid-cols-2 gap-4">
        {results.map(country => (
          <div key={country.code} className="p-4 border border-gray-700 rounded">
            <h3 className="font-bold text-white">{country.nameAr}</h3>
            <p className="text-gray-400">{country.name}</p>
            <p className="text-sm text-gray-500">{country.cities} cities</p>
          </div>
        ))}
      </div>
    </div>
  );
}`}
            language="tsx"
            filename="app/search/search-form.tsx"
          />
        </div>

        {/* Streaming with Suspense */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Streaming with Suspense</h2>
          <p className="text-gray-400 mb-4">Load data progressively with React Suspense.</p>
          <CodeBlock
            code={`import { Suspense } from 'react';
import { allCountries } from 'countries-cities-ar';

async function CountryStats() {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const stats = {
    total: allCountries.length,
    withArabic: allCountries.filter(c => c.nameAr).length,
    totalCities: allCountries.reduce((acc, c) => acc + c.cities.length, 0),
  };
  
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded">
        <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
        <div className="text-gray-400">Total Countries</div>
      </div>
      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded">
        <div className="text-2xl font-bold text-green-400">{stats.withArabic}</div>
        <div className="text-gray-400">With Arabic</div>
      </div>
      <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded">
        <div className="text-2xl font-bold text-purple-400">{stats.totalCities}</div>
        <div className="text-gray-400">Total Cities</div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <Suspense fallback={
        <div className="animate-pulse">
          <div className="h-20 bg-gray-800 rounded mb-4"></div>
        </div>
      }>
        <CountryStats />
      </Suspense>
    </div>
  );
}`}
            language="tsx"
            filename="app/dashboard/page.tsx"
          />
        </div>
      </section>
    </div>
  );
}
