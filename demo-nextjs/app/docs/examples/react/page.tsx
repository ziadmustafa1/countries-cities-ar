import { CodeBlock } from '@/components/code-block';

export default function ReactExamplesPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">React Examples</h1>
      <p className="text-lg text-gray-400 mb-8">
        Real-world React components and patterns
      </p>

      <section className="space-y-8">
        {/* Basic Dropdown */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Basic Dropdown</h2>
          <p className="text-gray-400 mb-4">Simple country and city selection dropdowns.</p>
          <CodeBlock 
            code={`import React, { useState } from 'react';
import { allCountries } from 'countries-cities-ar';

function CountryDropdown() {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const selectedCountry = allCountries.find(c => c.code === country);

  return (
    <div className="space-y-4">
      <select 
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setCity(''); // Reset city
        }}
        className="w-full p-2 border rounded"
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
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select City</option>
          {selectedCountry.cities.map((city, i) => (
            <option key={i} value={city.name}>
              {city.nameAr}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}`}
            language="tsx"
            filename="CountryDropdown.tsx"
          />
        </div>

        {/* Search with Autocomplete */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Search Autocomplete</h2>
          <p className="text-gray-400 mb-4">Country search with debounced autocomplete.</p>
          <CodeBlock 
            code={`import React, { useState, useEffect, useCallback } from 'react';
import { searchCountries } from 'countries-cities-ar';

function CountryAutocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Debounced search
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      const searchResults = searchCountries(query);
      setResults(searchResults.slice(0, 5));
      setLoading(false);
      setIsOpen(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder="Search countries..."
        className="w-full px-4 py-2 border rounded-lg"
      />
      
      {isOpen && results.length > 0 && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
          {results.map(country => (
            <button
              key={country.code}
              onClick={() => {
                setQuery(country.name);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50"
            >
              <div className="font-medium">{country.name}</div>
              <div className="text-sm text-gray-500">{country.nameAr}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}`}
            language="tsx"
            filename="CountryAutocomplete.tsx"
          />
        </div>
      </section>
    </div>
  );
}