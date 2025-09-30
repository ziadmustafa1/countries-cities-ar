import { CodeBlock } from '@/components/code-block';

export default function MultilangGuidePage() {
  return (
    <div className="max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Multi-language Support</h1>
      <p className="text-lg text-gray-400 mb-8">
        How to implement multi-language features in your application
      </p>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Available Languages</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-blue-500/10 to-transparent border border-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🇬🇧</span>
                <h3 className="font-semibold text-gray-200">English</h3>
              </div>
              <p className="text-sm text-gray-400">Default language for all countries</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-500/10 to-transparent border border-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🇸🇦</span>
                <h3 className="font-semibold text-gray-200">Arabic</h3>
              </div>
              <p className="text-sm text-gray-400">Complete for Arab countries</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-red-500/10 to-transparent border border-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🇫��</span>
                <h3 className="font-semibold text-gray-200">French</h3>
              </div>
              <p className="text-sm text-gray-400">Available for all countries</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Language Detection</h2>
          <p className="text-gray-400 mb-4">Detect and set language based on user preferences:</p>
          <CodeBlock 
            code={`// Detect browser language
const detectUserLanguage = () => {
  const browserLang = navigator.language.split('-')[0];
  
  // Map to supported languages
  if (browserLang === 'ar') return 'ar';
  if (browserLang === 'fr') return 'fr';
  return 'en'; // Default to English
};

// Use with localStorage for persistence
const getPreferredLanguage = () => {
  const saved = localStorage.getItem('preferredLang');
  if (saved && ['en', 'ar', 'fr'].includes(saved)) {
    return saved;
  }
  return detectUserLanguage();
};`}
            language="typescript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Implementation Example</h2>
          <CodeBlock 
            code={`import { useState } from 'react';
import { allCountries } from 'countries-cities-ar';

function MultiLangApp() {
  const [lang, setLang] = useState('en');
  
  const getCountryName = (country) => {
    switch(lang) {
      case 'ar': return country.nameAr;
      case 'fr': return country.nameFr;
      default: return country.name;
    }
  };
  
  return (
    <div>
      {/* Language Switcher */}
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value)}
        className="mb-4 px-3 py-2 border rounded"
      >
        <option value="en">English</option>
        <option value="ar">العربية</option>
        <option value="fr">Français</option>
      </select>
      
      {/* Display countries in selected language */}
      <div className="grid gap-2">
        {allCountries.slice(0, 10).map(country => (
          <div key={country.code} className="p-2 border rounded">
            {getCountryName(country)}
          </div>
        ))}
      </div>
    </div>
  );
}`}
            language="tsx"
            filename="MultiLangApp.tsx"
          />
        </div>
      </section>
    </div>
  );
}