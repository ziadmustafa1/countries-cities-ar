import { CodeBlock } from '@/components/code-block';

export default function ReactInstallationPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">React Installation</h1>
      <p className="text-lg text-gray-400 mb-8">
        Integrate Countries Cities AR with React using Vite or Create React App
      </p>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-300">
          <strong>Compatibility:</strong> React 16.8+ with hooks support
        </p>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">1. Create React App</h2>
          <CodeBlock 
            code="npx create-react-app my-app --template typescript
cd my-app"
            language="bash"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">2. Install the package</h2>
          <CodeBlock 
            code="npm install countries-cities-ar"
            language="bash"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">3. Basic Component</h2>
          <p className="text-gray-400 mb-3">Create a simple country selector component:</p>
          <CodeBlock 
            code={`import React, { useState } from 'react';
import { allCountries, type Country, type City } from 'countries-cities-ar';

export default function CountryPicker() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleCountryChange = (code: string) => {
    const country = allCountries.find(c => c.code === code);
    setSelectedCountry(country || null);
    setSelectedCity(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <select 
        onChange={(e) => handleCountryChange(e.target.value)}
        className="px-4 py-2 rounded border"
      >
        <option value="">Select Country</option>
        {allCountries.map(country => (
          <option key={country.code} value={country.code}>
            {country.nameAr} - {country.name}
          </option>
        ))}
      </select>

      {selectedCountry && selectedCountry.cities.length > 0 && (
        <select 
          onChange={(e) => {
            const city = selectedCountry.cities.find(c => c.name === e.target.value);
            setSelectedCity(city || null);
          }}
          className="px-4 py-2 rounded border"
        >
          <option value="">Select City</option>
          {selectedCountry.cities.map((city, idx) => (
            <option key={idx} value={city.name}>
              {city.nameAr} - {city.name}
            </option>
          ))}
        </select>
      )}

      {selectedCity && (
        <div className="p-4 bg-gray-100 rounded">
          <p>Selected: {selectedCity.nameAr}</p>
          <p>English: {selectedCity.name}</p>
        </div>
      )}
    </div>
  );
}`}
            language="tsx"
            filename="CountryPicker.tsx"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">4. Use in App</h2>
          <CodeBlock 
            code={`import React from 'react';
import CountryPicker from './CountryPicker';

function App() {
  return (
    <div className="App">
      <h1>Select Your Location</h1>
      <CountryPicker />
    </div>
  );
}

export default App;`}
            language="tsx"
            filename="App.tsx"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">5. With Search</h2>
          <CodeBlock 
            code={`import { searchCountries } from 'countries-cities-ar';

const results = searchCountries('egy');
// Returns countries matching the search term`}
            language="typescript"
          />
        </div>

        <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <h3 className="font-semibold text-green-300 mb-2">Next Steps</h3>
          <ul className="space-y-1 text-sm text-green-400">
            <li>• Check the Examples section for more patterns</li>
            <li>• Use TypeScript for better type safety</li>
            <li>• Consider memoization for large lists</li>
          </ul>
        </div>
      </section>
    </div>
  );
}