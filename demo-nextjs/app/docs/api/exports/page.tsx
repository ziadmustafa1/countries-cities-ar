import { CodeBlock } from '@/components/code-block';

export default function ExportsPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Data Exports</h1>
      <p className="text-lg text-gray-400 mb-8">
        Pre-filtered datasets for different regions and use cases
      </p>

      <section className="space-y-8">
        {/* All Countries */}
        <div className="border-l-2 border-green-500 pl-6">
          <h2 className="text-2xl font-mono font-semibold text-gray-100 mb-2">allCountries</h2>
          <p className="text-gray-400 mb-4">Complete dataset of all 250 world countries.</p>
          
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Import</h3>
            <div className="bg-neutral-900 text-neutral-100 rounded-lg p-4">
              <pre className="text-sm"><code>{`import { allCountries } from 'countries-cities-ar';

console.log(allCountries.length); // 250
console.log(allCountries[0].name); // "Afghanistan"`}</code></pre>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
              <div className="text-2xl font-bold text-neutral-900">250</div>
              <div className="text-xs text-neutral-600">Countries</div>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
              <div className="text-2xl font-bold text-neutral-900">4,642</div>
              <div className="text-xs text-neutral-600">States</div>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
              <div className="text-2xl font-bold text-neutral-900">3</div>
              <div className="text-xs text-neutral-600">Languages</div>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
              <div className="text-2xl font-bold text-neutral-900">586KB</div>
              <div className="text-xs text-neutral-600">Size</div>
            </div>
          </div>
        </div>

        {/* Regional Exports */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Regional Datasets</h2>
          <p className="text-gray-400 mb-4">Import only the regions you need for optimal bundle size.</p>
          
          <div className="space-y-4">
            {/* Africa */}
            <div className="border-l-2 border-orange-500 pl-6">
              <h3 className="text-xl font-mono font-semibold text-gray-100 mb-2">africaCountries</h3>
              <p className="text-sm text-neutral-600 mb-2">54 African countries</p>
              <div className="bg-neutral-900 text-neutral-100 rounded-lg p-3">
                <pre className="text-sm"><code>{`import { africaCountries } from 'countries-cities-ar';
// Egypt, Nigeria, South Africa, Kenya, Morocco...`}</code></pre>
              </div>
            </div>

            {/* Asia */}
            <div className="border-l-2 border-yellow-500 pl-6">
              <h3 className="text-xl font-mono font-semibold text-gray-100 mb-2">asiaCountries</h3>
              <p className="text-sm text-neutral-600 mb-2">49 Asian countries</p>
              <div className="bg-neutral-900 text-neutral-100 rounded-lg p-3">
                <pre className="text-sm"><code>{`import { asiaCountries } from 'countries-cities-ar';
// China, India, Saudi Arabia, UAE, Japan...`}</code></pre>
              </div>
            </div>

            {/* Europe */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-xl font-mono font-semibold text-gray-100 mb-2">europeCountries</h3>
              <p className="text-sm text-neutral-600 mb-2">50 European countries</p>
              <div className="bg-neutral-900 text-neutral-100 rounded-lg p-3">
                <pre className="text-sm"><code>{`import { europeCountries } from 'countries-cities-ar';
// Germany, France, United Kingdom, Italy, Spain...`}</code></pre>
              </div>
            </div>

            {/* Americas */}
            <div className="border-l-2 border-purple-500 pl-6">
              <h3 className="text-xl font-mono font-semibold text-gray-100 mb-2">americasCountries</h3>
              <p className="text-sm text-neutral-600 mb-2">48 countries in the Americas</p>
              <div className="bg-neutral-900 text-neutral-100 rounded-lg p-3">
                <pre className="text-sm"><code>{`import { americasCountries } from 'countries-cities-ar';
// USA, Canada, Brazil, Mexico, Argentina...`}</code></pre>
              </div>
            </div>

            {/* Oceania */}
            <div className="border-l-2 border-teal-500 pl-6">
              <h3 className="text-xl font-mono font-semibold text-gray-100 mb-2">oceaniaCountries</h3>
              <p className="text-sm text-neutral-600 mb-2">19 Oceanian countries</p>
              <div className="bg-neutral-900 text-neutral-100 rounded-lg p-3">
                <pre className="text-sm"><code>{`import { oceaniaCountries } from 'countries-cities-ar';
// Australia, New Zealand, Fiji, Papua New Guinea...`}</code></pre>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Optimized Import Strategy</h2>
          <CodeBlock 
            code={`// ❌ Avoid: Importing everything when you only need specific regions
import { allCountries } from 'countries-cities-ar';
const arabCountries = allCountries.filter(c => /* ... */);

// ✅ Better: Import only what you need
import { 
  africaCountries,
  asiaCountries 
} from 'countries-cities-ar';

// Combine regions if needed
const myCountries = [...africaCountries, ...asiaCountries];

// ✅ Best: Use specific functions for operations
import { getCountryByCode, searchCountries } from 'countries-cities-ar';`}
            language="typescript"
          />
        </div>

        <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <h3 className="font-semibold text-green-300 mb-2">Tree Shaking</h3>
          <p className="text-sm text-green-400">
            The library is fully tree-shakeable. Modern bundlers will automatically remove unused exports,
            so importing specific regions or functions will reduce your final bundle size.
          </p>
        </div>
      </section>
    </div>
  );
}
