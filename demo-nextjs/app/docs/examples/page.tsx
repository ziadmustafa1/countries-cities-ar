import Link from 'next/link';

export default function ExamplesPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
        💡 Examples
      </h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-8">
        Real-world examples showing how to use Countries Cities AR in different frameworks and scenarios.
      </p>

      {/* React Example */}
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">⚛️ React Example</h2>
      <p className="text-gray-700 mb-6">
        Complete country and city selector with multi-language support.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8 not-prose">
        <pre className="text-sm overflow-x-auto"><code className="language-tsx">{`import { useState, useMemo } from 'react';
import { allCountries, type Country } from 'countries-cities-ar';

function CountryCitySelector() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState<'ar' | 'en' | 'fr'>('ar');

  const filteredCountries = useMemo(() => {
    if (!search) return allCountries;
    return allCountries.filter(country => {
      const name = language === 'ar' ? country.nameAr :
                   language === 'fr' ? country.nameFr : country.name;
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, language]);

  return (
    <div className="p-6">
      {/* Language Selector */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setLanguage('ar')}
          className={\`px-4 py-2 rounded \${
            language === 'ar' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }\`}
        >
          🇸🇦 العربية
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={\`px-4 py-2 rounded \${
            language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }\`}
        >
          🇬🇧 English
        </button>
        <button
          onClick={() => setLanguage('fr')}
          className={\`px-4 py-2 rounded \${
            language === 'fr' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }\`}
        >
          🇫🇷 Français
        </button>
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={language === 'ar' ? 'ابحث عن دولة...' : 'Search...'}
        className="w-full p-3 border rounded-lg mb-4"
      />

      {/* Countries Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {filteredCountries.slice(0, 20).map((country) => (
          <button
            key={country.code}
            onClick={() => setSelectedCountry(country)}
            className="p-3 border rounded-lg hover:bg-blue-50"
          >
            <div className="font-semibold">
              {language === 'ar' ? country.nameAr :
               language === 'fr' ? country.nameFr : country.name}
            </div>
            <div className="text-xs text-gray-500">
              {country.cities.length} states
            </div>
          </button>
        ))}
      </div>

      {/* Selected Country Details */}
      {selectedCountry && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-3">
            {language === 'ar' ? selectedCountry.nameAr : selectedCountry.name}
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {selectedCountry.cities.map((city, idx) => (
              <div key={idx} className="p-2 bg-white rounded border text-sm">
                {language === 'ar' && city.nameAr ? city.nameAr : city.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryCitySelector;`}</code></pre>
      </div>

      {/* Next.js Example */}
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">⚡ Next.js App Router</h2>
      <p className="text-gray-700 mb-6">
        Using Server Components for optimal performance.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8 not-prose">
        <div className="text-sm font-semibold text-gray-700 mb-3">app/countries/page.tsx</div>
        <pre className="text-sm overflow-x-auto"><code className="language-tsx">{`import { allCountries, getCountryByCode } from 'countries-cities-ar';

export default function CountriesPage() {
  // Server Component - data fetched at build time
  const egypt = getCountryByCode('EG');
  const saudi = getCountryByCode('SA');
  const uae = getCountryByCode('AE');
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        🌍 Countries & Cities
      </h1>
      
      <div className="grid md:grid-cols-3 gap-4">
        {[egypt, saudi, uae].map((country) => (
          <div key={country?.code} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              {country?.nameAr}
            </h2>
            <p className="text-gray-600">{country?.name}</p>
            <p className="text-sm text-gray-500 mt-2">
              {country?.cities.length} محافظة
            </p>
            
            <div className="mt-4 space-y-1">
              {country?.cities.slice(0, 5).map((city, idx) => (
                <div key={idx} className="text-sm text-gray-700">
                  • {city.nameAr || city.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          📊 Total Countries: <strong>{allCountries.length}</strong>
        </p>
      </div>
    </div>
  );
}`}</code></pre>
      </div>

      {/* Autocomplete Example */}
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">🔍 Autocomplete Search</h2>
      <p className="text-gray-700 mb-6">
        Debounced search with loading state.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8 not-prose">
        <pre className="text-sm overflow-x-auto"><code className="language-typescript">{`import { useState, useEffect } from 'react';
import { searchCountries } from 'countries-cities-ar';

function CountryAutocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const searchResults = searchCountries(query, 'ar');
      setResults(searchResults);
      setLoading(false);
    }, 300); // Debounce 300ms

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ابحث عن دولة..."
        className="w-full p-3 border rounded-lg"
      />
      
      {loading && (
        <div className="absolute top-full mt-2 w-full p-3 bg-white border rounded-lg">
          جاري البحث...
        </div>
      )}
      
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {results.map((country) => (
            <button
              key={country.code}
              className="w-full text-left p-3 hover:bg-gray-50"
            >
              <div className="font-semibold">{country.nameAr}</div>
              <div className="text-xs text-gray-500">
                {country.name} • {country.cities.length} محافظة
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}`}</code></pre>
      </div>

      {/* Form Example */}
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">📝 Address Form</h2>
      <p className="text-gray-700 mb-6">
        Dynamic form with country and city selection.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8 not-prose">
        <pre className="text-sm overflow-x-auto"><code className="language-tsx">{`import { useState } from 'react';
import { allCountries, type Country, type City } from 'countries-cities-ar';

function AddressForm() {
  const [country, setCountry] = useState<Country | null>(null);
  const [city, setCity] = useState<City | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      country: country?.name,
      city: city?.name,
      countryAr: country?.nameAr,
      cityAr: city?.nameAr,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Country Select */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          الدولة
        </label>
        <select
          onChange={(e) => {
            const selected = allCountries.find(c => c.code === e.target.value);
            setCountry(selected || null);
            setCity(null); // Reset city when country changes
          }}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">اختر الدولة</option>
          {allCountries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.nameAr}
            </option>
          ))}
        </select>
      </div>

      {/* City Select */}
      {country && (
        <div>
          <label className="block text-sm font-semibold mb-2">
            المحافظة
          </label>
          <select
            onChange={(e) => {
              const idx = parseInt(e.target.value);
              setCity(country.cities[idx] || null);
            }}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">اختر المحافظة</option>
            {country.cities.map((city, idx) => (
              <option key={idx} value={idx}>
                {city.nameAr || city.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={!country || !city}
        className="w-full py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
      >
        إرسال
      </button>
    </form>
  );
}`}</code></pre>
      </div>

      {/* API Example */}
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">🌐 Express.js API</h2>
      <p className="text-gray-700 mb-6">
        RESTful API with search functionality.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8 not-prose">
        <pre className="text-sm overflow-x-auto"><code className="language-javascript">{`const express = require('express');
const { 
  allCountries,
  getCountryByCode, 
  searchCountries 
} = require('countries-cities-ar');

const app = express();

// Get all countries
app.get('/api/countries', (req, res) => {
  const { search, lang = 'en' } = req.query;
  
  if (search) {
    const results = searchCountries(search, lang);
    return res.json(results);
  }
  
  res.json(allCountries);
});

// Get country by code
app.get('/api/countries/:code', (req, res) => {
  const country = getCountryByCode(req.params.code);
  
  if (!country) {
    return res.status(404).json({ error: 'Country not found' });
  }
  
  res.json(country);
});

// Get cities for a country
app.get('/api/countries/:code/cities', (req, res) => {
  const country = getCountryByCode(req.params.code);
  
  if (!country) {
    return res.status(404).json({ error: 'Country not found' });
  }
  
  res.json(country.cities);
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});`}</code></pre>
      </div>

      {/* More Examples */}
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">📚 More Examples</h2>
      <div className="grid md:grid-cols-2 gap-6 not-prose">
        <Link
          href="/docs/guides/multilang"
          className="p-6 border-2 border-purple-200 rounded-xl hover:shadow-lg transition-all group bg-white"
        >
          <div className="text-3xl mb-3">🌐</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
            Multi-language Guide
          </h3>
          <p className="text-gray-600">
            Learn how to implement multi-language support in your app
          </p>
        </Link>

        <Link
          href="/docs/guides/search"
          className="p-6 border-2 border-indigo-200 rounded-xl hover:shadow-lg transition-all group bg-white"
        >
          <div className="text-3xl mb-3">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
            Search & Filter Guide
          </h3>
          <p className="text-gray-600">
            Master search and filtering techniques
          </p>
        </Link>
      </div>
    </div>
  );
}
