import { CodeBlock } from '@/components/code-block';

export default function SearchGuidePage() {
  return (
    <div className="max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Search & Filter</h1>
      <p className="text-lg text-gray-400 mb-8">
        Implement powerful search and filtering capabilities
      </p>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Basic Search</h2>
          <p className="text-gray-400 mb-4">Use the built-in search functions for countries and cities.</p>
          <CodeBlock 
            code={`import { searchCountries, searchCities } from 'countries-cities-ar';

// Search countries by name
const egyptResults = searchCountries('egypt', 'en');
const arabResults = searchCountries('مصر', 'ar');

// Search cities globally
const cairoResults = searchCities('cairo');
const cities = cairoResults.map(result => ({
  city: result.city.name,
  country: result.country.name
}));

// Search cities within a specific country
const egyptianCities = searchCities('alex', 'EG', 'en');`}
            language="typescript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Fuzzy Search</h2>
          <p className="text-gray-400 mb-4">Implement fuzzy search for better user experience.</p>
          <CodeBlock 
            code={`// Simple fuzzy search implementation
function fuzzySearch(query, text) {
  query = query.toLowerCase();
  text = text.toLowerCase();
  
  let queryIndex = 0;
  for (let i = 0; i < text.length && queryIndex < query.length; i++) {
    if (text[i] === query[queryIndex]) {
      queryIndex++;
    }
  }
  return queryIndex === query.length;
}

// Use with countries data
function searchCountriesFuzzy(query) {
  return allCountries.filter(country => 
    fuzzySearch(query, country.name) ||
    fuzzySearch(query, country.nameAr) ||
    fuzzySearch(query, country.nameFr)
  );
}

// Example: "egy" matches "Egypt"
const results = searchCountriesFuzzy('egy');`}
            language="typescript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Advanced Filtering</h2>
          <p className="text-gray-400 mb-4">Combine multiple filters for complex queries.</p>
          <CodeBlock 
            code={`// Filter builder pattern
class CountryFilter {
  constructor(countries = allCountries) {
    this.countries = countries;
    this.filters = [];
  }
  
  withMinCities(min) {
    this.filters.push(c => c.cities.length >= min);
    return this;
  }
  
  withMaxCities(max) {
    this.filters.push(c => c.cities.length <= max);
    return this;
  }
  
  withArabicName() {
    this.filters.push(c => c.nameAr && c.nameAr.trim() !== '');
    return this;
  }
  
  byRegion(region) {
    const regionMap = {
      'africa': africaCountries,
      'asia': asiaCountries,
      'europe': europeCountries,
    };
    const regionCountries = regionMap[region] || [];
    const codes = regionCountries.map(c => c.code);
    this.filters.push(c => codes.includes(c.code));
    return this;
  }
  
  search(query, lang = 'en') {
    if (query) {
      this.filters.push(c => {
        const name = lang === 'ar' ? c.nameAr : 
                     lang === 'fr' ? c.nameFr : c.name;
        return name.toLowerCase().includes(query.toLowerCase());
      });
    }
    return this;
  }
  
  apply() {
    return this.countries.filter(country =>
      this.filters.every(filter => filter(country))
    );
  }
}

// Usage
const filtered = new CountryFilter()
  .withMinCities(10)
  .withArabicName()
  .byRegion('asia')
  .search('saudi', 'en')
  .apply();`}
            language="typescript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Debounced Search Component</h2>
          <p className="text-gray-400 mb-4">Optimize search performance with debouncing.</p>
          <CodeBlock 
            code={`import { useState, useEffect, useCallback } from 'react';
import { searchCountries } from 'countries-cities-ar';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

function SearchableCountryList() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const debouncedQuery = useDebounce(query, 300);
  
  useEffect(() => {
    if (debouncedQuery) {
      setIsSearching(true);
      // Simulate async search
      setTimeout(() => {
        const searchResults = searchCountries(debouncedQuery, 'ar');
        setResults(searchResults);
        setIsSearching(false);
      }, 100);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [debouncedQuery]);
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search countries..."
        className="w-full p-2 border rounded"
      />
      
      {isSearching && <div>Searching...</div>}
      
      <div className="grid gap-2 mt-4">
        {results.map(country => (
          <div key={country.code} className="p-2 border rounded">
            {country.nameAr} - {country.name}
          </div>
        ))}
      </div>
    </div>
  );
}`}
            language="typescript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Sorting Results</h2>
          <p className="text-gray-400 mb-4">Sort search results by relevance or other criteria.</p>
          <CodeBlock 
            code={`// Sort by relevance score
function searchWithRelevance(query, lang = 'en') {
  const results = searchCountries(query, lang);
  
  return results.map(country => {
    const name = lang === 'ar' ? country.nameAr :
                 lang === 'fr' ? country.nameFr : country.name;
    
    // Calculate relevance score
    let score = 0;
    const lowerQuery = query.toLowerCase();
    const lowerName = name.toLowerCase();
    
    if (lowerName === lowerQuery) score = 100; // Exact match
    else if (lowerName.startsWith(lowerQuery)) score = 75; // Starts with
    else if (lowerName.includes(lowerQuery)) score = 50; // Contains
    
    // Bonus for shorter names (more likely to be relevant)
    score += Math.max(0, 20 - name.length);
    
    return { country, score };
  })
  .sort((a, b) => b.score - a.score)
  .map(item => item.country);
}

// Sort by multiple criteria
function sortCountries(countries, criteria) {
  return [...countries].sort((a, b) => {
    for (const { field, order = 'asc' } of criteria) {
      let aVal = a[field];
      let bVal = b[field];
      
      if (field === 'citiesCount') {
        aVal = a.cities.length;
        bVal = b.cities.length;
      }
      
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

// Usage
const sorted = sortCountries(allCountries, [
  { field: 'citiesCount', order: 'desc' }, // Most cities first
  { field: 'name', order: 'asc' }          // Then alphabetically
]);`}
            language="typescript"
          />
        </div>

        <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <h3 className="font-semibold text-green-300 mb-2">Performance Tips</h3>
          <ul className="space-y-1 text-sm text-green-400">
            <li>• Always debounce user input (300-500ms recommended)</li>
            <li>• Limit result sets to improve rendering performance</li>
            <li>• Use virtual scrolling for large result lists</li>
            <li>• Consider indexing data for faster searches in large datasets</li>
            <li>• Cache search results when appropriate</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
