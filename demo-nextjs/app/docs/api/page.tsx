import Link from 'next/link';

export default function APIPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
        ⚙️ API Reference
      </h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-8">
        Complete reference for all types, functions, and exports in the Countries Cities AR library.
      </p>

      {/* Quick Navigation */}
      <div className="grid md:grid-cols-3 gap-4 mb-12 not-prose">
        <a href="#types" className="p-4 border-2 border-purple-200 rounded-lg hover:shadow-lg transition-all bg-purple-50">
          <div className="text-2xl mb-2">📝</div>
          <div className="font-bold text-gray-900">Types</div>
          <div className="text-sm text-gray-600">TypeScript interfaces</div>
        </a>
        <a href="#functions" className="p-4 border-2 border-indigo-200 rounded-lg hover:shadow-lg transition-all bg-indigo-50">
          <div className="text-2xl mb-2">⚡</div>
          <div className="font-bold text-gray-900">Functions</div>
          <div className="text-sm text-gray-600">Available methods</div>
        </a>
        <a href="#exports" className="p-4 border-2 border-pink-200 rounded-lg hover:shadow-lg transition-all bg-pink-50">
          <div className="text-2xl mb-2">📦</div>
          <div className="font-bold text-gray-900">Data Exports</div>
          <div className="text-sm text-gray-600">Pre-built datasets</div>
        </a>
      </div>

      {/* Types Section */}
      <h2 id="types" className="text-3xl font-bold text-gray-900 mt-12 mb-6">📝 TypeScript Types</h2>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Country Interface</h3>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6 not-prose">
        <pre className="text-sm overflow-x-auto"><code className="language-typescript">{`interface Country {
  code: string;      // ISO country code (e.g., "EG", "SA", "US")
  name: string;      // English name (e.g., "Egypt")
  nameAr: string;    // Arabic name (e.g., "مصر")
  nameFr: string;    // French name (e.g., "Égypte")
  cities: City[];    // Array of cities/states/provinces
}`}</code></pre>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">City Interface</h3>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6 not-prose">
        <pre className="text-sm overflow-x-auto"><code className="language-typescript">{`interface City {
  name: string;      // English name (e.g., "Cairo")
  nameAr: string;    // Arabic name (e.g., "القاهرة")
  nameFr: string;    // French name (e.g., "Le Caire")
}`}</code></pre>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Language Type</h3>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8 not-prose">
        <pre className="text-sm overflow-x-auto"><code className="language-typescript">{`type Language = 'en' | 'ar' | 'fr';`}</code></pre>
      </div>

      {/* Functions Section */}
      <h2 id="functions" className="text-3xl font-bold text-gray-900 mt-12 mb-6">⚡ Functions</h2>

      {/* getCountryByCode */}
      <div className="bg-white border-2 border-purple-200 rounded-xl p-6 mb-6 not-prose">
        <h3 className="text-xl font-bold text-purple-600 mb-3">getCountryByCode()</h3>
        <p className="text-gray-700 mb-4">Get a country by its ISO code.</p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <pre className="text-sm"><code className="language-typescript">{`getCountryByCode(code: string): Country | undefined`}</code></pre>
        </div>

        <div className="mb-3">
          <div className="text-sm font-semibold text-gray-700 mb-2">Example:</div>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-green-400"><code>{`const egypt = getCountryByCode('EG');
console.log(egypt?.nameAr); // "مصر"
console.log(egypt?.cities.length); // 27`}</code></pre>
          </div>
        </div>
      </div>

      {/* getCitiesByCountryCode */}
      <div className="bg-white border-2 border-indigo-200 rounded-xl p-6 mb-6 not-prose">
        <h3 className="text-xl font-bold text-indigo-600 mb-3">getCitiesByCountryCode()</h3>
        <p className="text-gray-700 mb-4">Get all cities/states for a specific country.</p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <pre className="text-sm"><code className="language-typescript">{`getCitiesByCountryCode(code: string): City[]`}</code></pre>
        </div>

        <div className="mb-3">
          <div className="text-sm font-semibold text-gray-700 mb-2">Example:</div>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-green-400"><code>{`const saudiCities = getCitiesByCountryCode('SA');
console.log(saudiCities.length); // 13
console.log(saudiCities[0].nameAr); // "الرياض"`}</code></pre>
          </div>
        </div>
      </div>

      {/* getCountryName */}
      <div className="bg-white border-2 border-pink-200 rounded-xl p-6 mb-6 not-prose">
        <h3 className="text-xl font-bold text-pink-600 mb-3">getCountryName()</h3>
        <p className="text-gray-700 mb-4">Get the country name in a specific language.</p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <pre className="text-sm"><code className="language-typescript">{`getCountryName(code: string, lang?: Language): string | undefined`}</code></pre>
        </div>

        <div className="mb-3">
          <div className="text-sm font-semibold text-gray-700 mb-2">Example:</div>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-green-400"><code>{`const nameEn = getCountryName('EG', 'en'); // "Egypt"
const nameAr = getCountryName('EG', 'ar'); // "مصر"
const nameFr = getCountryName('EG', 'fr'); // "Égypte"`}</code></pre>
          </div>
        </div>
      </div>

      {/* searchCountries */}
      <div className="bg-white border-2 border-purple-200 rounded-xl p-6 mb-6 not-prose">
        <h3 className="text-xl font-bold text-purple-600 mb-3">searchCountries()</h3>
        <p className="text-gray-700 mb-4">Search for countries by name in any language.</p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <pre className="text-sm"><code className="language-typescript">{`searchCountries(query: string, lang?: Language): Country[]`}</code></pre>
        </div>

        <div className="mb-3">
          <div className="text-sm font-semibold text-gray-700 mb-2">Example:</div>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-green-400"><code>{`// Search in Arabic
const arabCountries = searchCountries('عرب', 'ar');

// Search in English
const unitedCountries = searchCountries('united', 'en');`}</code></pre>
          </div>
        </div>
      </div>

      {/* searchCities */}
      <div className="bg-white border-2 border-indigo-200 rounded-xl p-6 mb-8 not-prose">
        <h3 className="text-xl font-bold text-indigo-600 mb-3">searchCities()</h3>
        <p className="text-gray-700 mb-4">Search for cities globally or within a specific country.</p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <pre className="text-sm"><code className="language-typescript">{`searchCities(
  query: string,
  countryCode?: string,
  lang?: Language
): Array<{ city: City; country: Country }>`}</code></pre>
        </div>

        <div className="mb-3">
          <div className="text-sm font-semibold text-gray-700 mb-2">Example:</div>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-green-400"><code>{`// Search all cities
const cairoResults = searchCities('cairo', undefined, 'en');

// Search in specific country
const egyptCities = searchCities('القاهرة', 'EG', 'ar');

console.log(egyptCities[0].city.nameAr); // "القاهرة"
console.log(egyptCities[0].country.name); // "Egypt"`}</code></pre>
          </div>
        </div>
      </div>

      {/* Data Exports */}
      <h2 id="exports" className="text-3xl font-bold text-gray-900 mt-12 mb-6">📦 Data Exports</h2>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200 mb-6 not-prose">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Available Datasets</h3>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4">
            <code className="text-purple-600 font-semibold">allCountries</code>
            <p className="text-sm text-gray-600 mt-1">All 250 world countries</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <code className="text-indigo-600 font-semibold">africaCountries</code>
            <p className="text-sm text-gray-600 mt-1">54 African countries</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <code className="text-pink-600 font-semibold">asiaCountries</code>
            <p className="text-sm text-gray-600 mt-1">49 Asian countries</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <code className="text-purple-600 font-semibold">europeCountries</code>
            <p className="text-sm text-gray-600 mt-1">50 European countries</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <code className="text-indigo-600 font-semibold">americasCountries</code>
            <p className="text-sm text-gray-600 mt-1">48 American countries</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <code className="text-pink-600 font-semibold">oceaniaCountries</code>
            <p className="text-sm text-gray-600 mt-1">19 Oceanian countries</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold text-gray-700 mb-2">Example Usage:</div>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-green-400"><code>{`import { 
  allCountries, 
  africaCountries, 
  asiaCountries 
} from 'countries-cities-ar';

console.log(allCountries.length); // 250
console.log(africaCountries.length); // 54
console.log(asiaCountries.length); // 49`}</code></pre>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Next Steps</h2>
      <div className="grid md:grid-cols-2 gap-6 not-prose">
        <Link
          href="/docs/examples"
          className="p-6 border-2 border-purple-200 rounded-xl hover:shadow-lg transition-all group bg-white"
        >
          <div className="text-3xl mb-3">💡</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
            View Examples
          </h3>
          <p className="text-gray-600 mb-4">
            See real-world code examples using these functions
          </p>
          <div className="text-purple-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
            Explore Examples →
          </div>
        </Link>

        <Link
          href="/docs/guides"
          className="p-6 border-2 border-indigo-200 rounded-xl hover:shadow-lg transition-all group bg-white"
        >
          <div className="text-3xl mb-3">📖</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
            Read Guides
          </h3>
          <p className="text-gray-600 mb-4">
            Learn best practices and advanced techniques
          </p>
          <div className="text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
            View Guides →
          </div>
        </Link>
      </div>
    </div>
  );
}
