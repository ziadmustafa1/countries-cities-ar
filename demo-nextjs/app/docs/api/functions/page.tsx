import { CodeBlock } from '@/components/code-block';

export default function FunctionsPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Functions</h1>
      <p className="text-lg text-gray-400 mb-8">
        Complete API reference for all available functions
      </p>

      <section className="space-y-8">
        {/* getCountryByCode */}
        <div className="border-l-2 border-blue-500 pl-6">
          <h2 className="text-2xl font-mono font-semibold text-gray-100 mb-2">getCountryByCode</h2>
          <p className="text-gray-400 mb-4">Get a country by its ISO country code.</p>
          
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Signature</h3>
            <CodeBlock code="getCountryByCode(code: string): Country | undefined" language="typescript" />
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Parameters</h3>
            <ul className="text-sm space-y-1 text-gray-400">
              <li><code className="bg-gray-800 px-2 py-0.5 rounded text-blue-300">code</code> - Country ISO code (e.g., {"EG"}, {"SA"})</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Example</h3>
            <CodeBlock 
              code={`const egypt = getCountryByCode('EG');
console.log(egypt?.nameAr); // "مصر"
console.log(egypt?.cities.length); // 27`}
              language="typescript"
            />
          </div>
        </div>

        {/* searchCountries */}
        <div className="border-l-2 border-blue-500 pl-6">
          <h2 className="text-2xl font-mono font-semibold text-gray-100 mb-2">searchCountries</h2>
          <p className="text-gray-400 mb-4">Search for countries by name in any language.</p>
          
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Signature</h3>
            <CodeBlock code="searchCountries(query: string, lang?: Language): Country[]" language="typescript" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Example</h3>
            <CodeBlock 
              code={`const results = searchCountries('egy');
// Returns: [{ code: 'EG', name: 'Egypt', ... }]

const arabicResults = searchCountries('مصر', 'ar');
// Returns Egypt when searching in Arabic`}
              language="typescript"
            />
          </div>
        </div>

        {/* getAllArabCountries */}
        <div className="border-l-2 border-blue-500 pl-6">
          <h2 className="text-2xl font-mono font-semibold text-gray-100 mb-2">getAllArabCountries</h2>
          <p className="text-gray-400 mb-4">Get all Arab countries with complete Arabic translations.</p>
          
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Signature</h3>
            <CodeBlock code="getAllArabCountries(): Country[]" language="typescript" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Example</h3>
            <CodeBlock 
              code={`const arabCountries = getAllArabCountries();
console.log(arabCountries.length); // 22 countries
// Includes: EG, SA, AE, IQ, SY, JO, LB, KW, OM, QA, YE, etc.`}
              language="typescript"
            />
          </div>
        </div>
      </section>
    </div>
  );
}