import { CodeBlock } from '@/components/code-block';

export default function NextjsInstallationPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Next.js Installation</h1>
      <p className="text-lg text-gray-400 mb-8">
        Step-by-step guide to integrate Countries Cities AR with Next.js App Router
      </p>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-300">
          <strong>Compatibility:</strong> Next.js 13+ with App Router
        </p>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">1. Install the package</h2>
          <CodeBlock 
            code="npm install countries-cities-ar" 
            language="bash"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">2. Create a Server Component</h2>
          <p className="text-gray-400 mb-3">Server components can use the library directly without client-side JavaScript:</p>
          <CodeBlock 
            code={`import { allCountries, getCountryByCode } from 'countries-cities-ar';

export default function CountriesPage() {
  const egypt = getCountryByCode('EG');
  
  return (
    <div>
      <h1>Countries: {allCountries.length}</h1>
      <h2>{egypt?.nameAr}</h2>
      <ul>
        {egypt?.cities.map((city, i) => (
          <li key={i}>{city.nameAr}</li>
        ))}
      </ul>
    </div>
  );
}`}
            language="tsx"
            filename="app/countries/page.tsx"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">3. Create a Client Component</h2>
          <p className="text-gray-400 mb-3">For interactive features, create a client component:</p>
          <CodeBlock 
            code={`'use client';

import { useState } from 'react';
import { allCountries, type Country } from 'countries-cities-ar';

export default function CountrySelector() {
  const [selected, setSelected] = useState<Country | null>(null);
  
  return (
    <div>
      <select onChange={(e) => {
        const country = allCountries.find(c => c.code === e.target.value);
        setSelected(country || null);
      }}>
        <option value="">Select Country</option>
        {allCountries.map(country => (
          <option key={country.code} value={country.code}>
            {country.nameAr}
          </option>
        ))}
      </select>
      
      {selected && (
        <div>
          <h3>{selected.name}</h3>
          <p>{selected.cities.length} cities</p>
        </div>
      )}
    </div>
  );
}`}
            language="tsx"
            filename="components/CountrySelector.tsx"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">4. Use in your page</h2>
          <CodeBlock 
            code={`import CountrySelector from '@/components/CountrySelector';

export default function Home() {
  return (
    <main>
      <h1>Select your country</h1>
      <CountrySelector />
    </main>
  );
}`}
            language="tsx"
            filename="app/page.tsx"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">5. TypeScript Configuration</h2>
          <p className="text-gray-400 mb-3">The library includes TypeScript definitions. No additional setup required!</p>
          <CodeBlock 
            code={`// Types are automatically available
import type { Country, City } from 'countries-cities-ar';

const processCountry = (country: Country) => {
  console.log(country.name);
  console.log(country.nameAr);
  console.log(country.cities.length);
};`}
            language="typescript"
          />
        </div>

        <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <h3 className="font-semibold text-green-300 mb-2">Pro Tips</h3>
          <ul className="space-y-1 text-sm text-green-400">
            <li>• Use Server Components for static data to reduce client bundle size</li>
            <li>• Import only the functions you need for better tree-shaking</li>
            <li>• Consider using dynamic imports for large components</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
