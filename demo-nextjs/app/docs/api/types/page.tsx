import { CodeBlock } from '@/components/code-block';

export default function TypesPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Type Definitions</h1>
      <p className="text-lg text-gray-400 mb-8">
        TypeScript interfaces and types available in the library
      </p>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Country</h2>
          <p className="text-gray-400 mb-3">Represents a country with all its properties and cities.</p>
          <CodeBlock 
            code={`interface Country {
  code: string;      // ISO 3166-1 alpha-2 code (e.g., "EG", "SA")
  name: string;      // English name
  nameAr: string;    // Arabic name (العربية)
  nameFr: string;    // French name (Français)
  cities: City[];    // Array of cities/states/provinces
}`}
            language="typescript"
          />

          <CodeBlock 
            code={`{
  code: "EG",
  name: "Egypt",
  nameAr: "مصر",
  nameFr: "Égypte",
  cities: [
    { name: "Cairo", nameAr: "القاهرة", nameFr: "Le Caire" },
    { name: "Alexandria", nameAr: "الإسكندرية", nameFr: "Alexandrie" },
    // ... 25 more governorates
  ]
}`}
            language="typescript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">City</h2>
          <p className="text-gray-400 mb-3">Represents a city, state, province, or governorate.</p>
          <CodeBlock 
            code={`interface City {
  name: string;      // English name
  nameAr: string;    // Arabic name (العربية)
  nameFr: string;    // French name (Français)
}`}
            language="typescript"
          />

          <CodeBlock 
            code={`{
  name: "Riyadh",
  nameAr: "الرياض",
  nameFr: "Riyad"
}`}
            language="typescript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Language</h2>
          <p className="text-gray-400 mb-3">Supported languages for search and display.</p>
          <CodeBlock 
            code={`type Language = 'en' | 'ar' | 'fr';

// Usage in functions
searchCountries(query: string, lang?: Language): Country[]
getCountryName(code: string, lang?: Language): string | undefined`}
            language="typescript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">SearchResult</h2>
          <p className="text-gray-400 mb-3">Returned when searching for cities globally.</p>
          <CodeBlock 
            code={`interface SearchResult {
  city: City;
  country: Country;
}

// Returned by searchCities function
searchCities(
  query: string,
  countryCode?: string,
  lang?: Language
): SearchResult[]`}
            language="typescript"
          />
        </div>

        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">TypeScript Benefits</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Full IntelliSense support in VS Code</li>
            <li>• Compile-time type checking</li>
            <li>• Auto-completion for all properties</li>
            <li>• Better refactoring capabilities</li>
            <li>• Self-documenting code</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Usage with TypeScript</h2>
          <CodeBlock 
            code={`import type { Country, City, Language } from 'countries-cities-ar';

// Type-safe function
function formatCountryName(country: Country, lang: Language = 'en'): string {
  switch (lang) {
    case 'ar': return country.nameAr;
    case 'fr': return country.nameFr;
    default: return country.name;
  }
}

// Type-safe component props
interface Props {
  country: Country;
  onCitySelect?: (city: City) => void;
}

function CountryCard({ country, onCitySelect }: Props) {
  // Component implementation
}`}
            language="typescript"
          />
        </div>
      </section>
    </div>
  );
}
