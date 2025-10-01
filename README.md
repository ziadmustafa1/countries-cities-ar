# 🌍 Countries Cities AR

Countries and cities dataset for the whole world with Arabic, English, and French names. Includes ISO country codes and administrative divisions (states/provinces/governorates). Optimized for React/Next.js/Vue and TypeScript projects.

<div align="center">

[![npm version](https://img.shields.io/npm/v/countries-cities-ar.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/countries-cities-ar)
[![npm downloads](https://img.shields.io/npm/dm/countries-cities-ar.svg?style=flat-square&color=green)](https://www.npmjs.com/package/countries-cities-ar)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/countries-cities-ar?style=flat-square&color=orange)](https://bundlephobia.com/package/countries-cities-ar)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/ziadmustafa1/countries-cities-ar?style=flat-square&color=gold)](https://github.com/ziadmustafa1/countries-cities-ar)

**Complete library of 250 world countries with 4,642 states/provinces in 3 languages (Arabic, English, French)**

[📖 Documentation](https://countries-cities-ar.vercel.app) • [🚀 Live Demo](https://countries-cities-ar.vercel.app) • [📦 npm Package](https://www.npmjs.com/package/countries-cities-ar) • [🐛 Report Bug](https://github.com/ziadmustafa1/countries-cities-ar/issues)

</div>

---

## 🔹 Quick Usage (TL;DR)

Works with both ESM and CommonJS.

### ESM
```ts
import {
  allCountries,
  getCountryByCode,
  getCitiesByCountryCode,
  getCountryName,
  searchCountries,
  searchCities,
  type Country,
  type City,
} from 'countries-cities-ar';

console.log(allCountries.length); // 250
const egypt = getCountryByCode('EG');
const egyptCities = getCitiesByCountryCode('EG');
```

### CommonJS
```js
const {
  allCountries,
  getCountryByCode,
  getCitiesByCountryCode,
  getCountryName,
  searchCountries,
  searchCities,
} = require('countries-cities-ar');
```

### Named Exports (complete list)
```ts
// Types
// Country, City, Language

// Data
// allCountries, africaCountries, asiaCountries, europeCountries, americasCountries, oceaniaCountries

// Helpers
// getCountryByCode, getCitiesByCountryCode, getCountryName, searchCountries, searchCities
```

## ✨ Features

<table>
  <tr>
    <td>🌐 <b>Complete Data</b></td>
    <td>250 world countries with ISO codes</td>
  </tr>
  <tr>
    <td>🏛️ <b>Comprehensive</b></td>
    <td>4,642 states, provinces, governorates</td>
  </tr>
  <tr>
    <td>🔤 <b>Trilingual</b></td>
    <td>English, Arabic & French support</td>
  </tr>
  <tr>
    <td>📦 <b>Lightweight</b></td>
    <td>Only 586KB - optimized bundle</td>
  </tr>
  <tr>
    <td>🎯 <b>TypeScript</b></td>
    <td>Full type definitions included</td>
  </tr>
  <tr>
    <td>🔍 <b>Smart Search</b></td>
    <td>Multi-language search functions</td>
  </tr>
  <tr>
    <td>⚛️ <b>Framework Ready</b></td>
    <td>React, Next.js, Vue compatible</td>
  </tr>
  <tr>
    <td>✅ <b>100% Arab Coverage</b></td>
    <td>Accurate Arabic translations</td>
  </tr>
</table>

## 📦 Installation

```bash
# npm
npm install countries-cities-ar

# yarn
yarn add countries-cities-ar

# pnpm
pnpm add countries-cities-ar

# bun
bun add countries-cities-ar
```

### Requirements

- Node.js 16+ or Bun 1.0+
- TypeScript 5+ (optional, but recommended)
- Works with: React, Next.js, Vue, Express, or any JavaScript project

## 🚀 Quick Start

### 1. Install the Package

```bash
npm install countries-cities-ar
```

### 2. Import and Use

```typescript
import { allCountries, getCountryByCode } from 'countries-cities-ar';

// Get all 250 countries
console.log(allCountries.length); // 250

// Get a specific country
const egypt = getCountryByCode('EG');
console.log(egypt.nameAr); // "مصر"
console.log(egypt.cities.length); // 27 governorates
```

---

## 📚 Complete Usage Guide

### Basic Usage

```typescript
import { allCountries, getCountryByCode, searchCountries } from 'countries-cities-ar';

// Access all 250 countries
console.log(allCountries.length); // 250

// Get a specific country with all its states/governorates
const egypt = getCountryByCode('EG');
console.log(egypt);
// {
//   code: 'EG',
//   name: 'Egypt',
//   nameAr: 'مصر',
//   nameFr: 'Égypte',
//   cities: [
//     { name: 'Cairo', nameAr: 'القاهرة', nameFr: 'Le Caire' },
//     { name: 'Alexandria', nameAr: 'الإسكندرية', nameFr: 'Alexandrie' },
//     { name: 'Giza', nameAr: 'الجيزة', nameFr: 'Gizeh' },
//     // ... 24 more governorates (27 total)
//   ]
// }

// Get Saudi Arabia with all 13 regions
const saudi = getCountryByCode('SA');
console.log(saudi.cities.length); // 13
console.log(saudi.cities[0]);
// { name: 'Riyadh', nameAr: 'الرياض', nameFr: 'Riyad' }

// Get UAE with all 7 emirates
const uae = getCountryByCode('AE');
console.log(uae.cities); // All 7 emirates with Arabic names

// Search for countries in any language
const arabCountries = searchCountries('عرب', 'ar'); // Search in Arabic
const europeCountries = searchCountries('united', 'en'); // Search in English
```

### Working with Cities/States

```typescript
import { getCitiesByCountryCode, searchCities } from 'countries-cities-ar';

// Get all states for a country
const usStates = getCitiesByCountryCode('US'); // 57 states
const chinaCities = getCitiesByCountryCode('CN'); // 31 provinces
const indiaStates = getCitiesByCountryCode('IN'); // 36 states

// Search for cities/states globally
const allCairo = searchCities('cairo', undefined, 'en');
// Finds Cairo in Egypt and other countries

// Search cities in a specific country
const egyptCities = searchCities('القاهرة', 'EG', 'ar');
console.log(egyptCities[0]);
// {
//   city: { name: 'Cairo', nameAr: 'القاهرة', nameFr: 'Le Caire' },
//   country: { code: 'EG', name: 'Egypt', nameAr: 'مصر', ... }
// }

// Search in French
const parisCities = searchCities('paris', 'FR', 'fr');
```

### CommonJS

```javascript
const { 
  getCountryByCode, 
  getCitiesByCountryCode,
  getCountryName,
  searchCountries,
  searchCities 
} = require('countries-cities-ar');

const uae = getCountryByCode('AE');
console.log(uae.name); // "United Arab Emirates"
console.log(uae.nameAr); // "الإمارات العربية المتحدة"

const cities = getCitiesByCountryCode('AE');
cities.forEach(city => {
  console.log(`${city.name} - ${city.nameAr}`);
});
```

## API Reference

### Types

```typescript
interface City {
  name: string;      // English name
  nameAr: string;    // Arabic name
  nameFr: string;    // French name
}

interface Country {
  code: string;      // ISO country code (e.g., "EG", "SA")
  name: string;      // English name
  nameAr: string;    // Arabic name
  nameFr: string;    // French name
  cities: City[];    // Array of cities, governorates, states, provinces
}

type Language = 'en' | 'ar' | 'fr';
```

### Functions

#### `getCountryByCode(code: string): Country | undefined`

Get a country by its ISO code.

```typescript
const country = getCountryByCode('EG');
// Returns: { code: 'EG', name: 'Egypt', nameAr: 'مصر', cities: [...] }
```

#### `getCitiesByCountryCode(code: string): City[]`

Get all cities for a specific country.

```typescript
const cities = getCitiesByCountryCode('SA');
// Returns: [{ name: 'Riyadh', nameAr: 'الرياض' }, ...]
```

#### `getCountryName(code: string, lang?: Language): string | undefined`

Get the country name in the specified language.

```typescript
const nameEn = getCountryName('EG', 'en'); // "Egypt"
const nameAr = getCountryName('EG', 'ar'); // "مصر"
const nameFr = getCountryName('EG', 'fr'); // "Égypte"
const nameDefault = getCountryName('EG');  // "Egypt" (defaults to 'en')
```

#### `searchCountries(query: string, lang?: Language): Country[]`

Search for countries by name.

```typescript
// Search in English
const results = searchCountries('united', 'en');

// Search in Arabic
const resultsAr = searchCountries('العربية', 'ar');

// Search in French
const resultsFr = searchCountries('france', 'fr');

// Default language is English
const defaultResults = searchCountries('states');
```

#### `searchCities(query: string, countryCode?: string, lang?: Language): Array<{ city: City; country: Country }>`

Search for cities by name, optionally filtered by country.

```typescript
// Search all cities
const allResults = searchCities('alex', undefined, 'en');

// Search cities in specific country
const egyptResults = searchCities('alex', 'EG', 'en');

// Search in Arabic
const arabicResults = searchCities('القاهرة', undefined, 'ar');

// Search in French
const frenchResults = searchCities('paris', undefined, 'fr');
```

### Data Exports

```typescript
import {
  allCountries,        // All countries from all continents
  africaCountries,     // African countries only
  asiaCountries,       // Asian countries only
  europeCountries,     // European countries only
  americasCountries,   // American countries only
  oceaniaCountries,    // Oceanian countries only
} from 'countries-cities-ar';
```

## Examples

### React Example - Country & City Selector

```tsx
import React, { useState, useMemo } from 'react';
import { allCountries, type Country, type City } from 'countries-cities-ar';

function CountryCitySelector() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [language, setLanguage] = useState<'ar' | 'en' | 'fr'>('ar');
  const [search, setSearch] = useState('');

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    if (!search) return allCountries;
    return allCountries.filter(country => {
      const name = language === 'ar' ? country.nameAr : 
                   language === 'fr' ? country.nameFr : country.name;
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, language]);

  const getCountryName = (country: Country) => {
    return language === 'ar' ? country.nameAr :
           language === 'fr' ? country.nameFr : country.name;
  };

  const getCityName = (city: City) => {
    return language === 'ar' && city.nameAr ? city.nameAr :
           language === 'fr' && city.nameFr ? city.nameFr : city.name;
  };

  return (
    <div className="p-6">
      {/* Language Selector */}
      <div className="mb-4">
        <button onClick={() => setLanguage('ar')}>🇸🇦 العربية</button>
        <button onClick={() => setLanguage('en')}>🇬🇧 English</button>
        <button onClick={() => setLanguage('fr')}>🇫🇷 Français</button>
      </div>

      {/* Country Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={language === 'ar' ? 'ابحث عن دولة...' : 'Search country...'}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Countries List */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {filteredCountries.slice(0, 20).map((country) => (
          <button
            key={country.code}
            onClick={() => {
              setSelectedCountry(country);
              setSelectedCity(null);
            }}
            className="p-3 border rounded hover:bg-blue-50"
          >
            {getCountryName(country)}
            <span className="text-xs text-gray-500 block">
              {country.cities.length} {language === 'ar' ? 'محافظة' : 'states'}
            </span>
          </button>
        ))}
      </div>

      {/* Cities/States List */}
      {selectedCountry && (
        <div>
          <h3 className="text-xl font-bold mb-3">
            {getCountryName(selectedCountry)} - {selectedCountry.cities.length} {language === 'ar' ? 'محافظة' : 'states'}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {selectedCountry.cities.map((city, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCity(city)}
                className="p-2 border rounded hover:bg-green-50 text-sm"
              >
                {getCityName(city)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Info */}
      {selectedCity && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <strong>{language === 'ar' ? 'الاختيار:' : 'Selected:'}</strong>
          <p>{getCountryName(selectedCountry!)} - {getCityName(selectedCity)}</p>
        </div>
      )}
    </div>
  );
}

export default CountryCitySelector;
```

### Next.js App Router Example

```tsx
// app/page.tsx
import { allCountries } from 'countries-cities-ar';
import CountrySelector from '@/components/CountrySelector';

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">🌍 دول ومدن العالم</h1>
      <p className="mb-4">250 دولة • 4,642 محافظة/ولاية • 3 لغات</p>
      <CountrySelector countries={allCountries} />
    </main>
  );
}

// components/CountrySelector.tsx (Client Component)
'use client';
import { useState } from 'react';
import type { Country } from 'countries-cities-ar';

interface Props {
  countries: Country[];
}

export default function CountrySelector({ countries }: Props) {
  const [selected, setSelected] = useState<Country | null>(null);
  
  return (
    <div>
      {/* Your UI here */}
      <p>Total countries: {countries.length}</p>
      {selected && (
        <div>
          <h2>{selected.nameAr} - {selected.name}</h2>
          <p>{selected.cities.length} محافظة</p>
        </div>
      )}
    </div>
  );
}
```

---

## 🛠️ Setup Guides

### Next.js Setup (Step-by-Step)

#### Step 1: Create Next.js Project

```bash
# Create a new Next.js project
npx create-next-app@latest my-countries-app

# Choose the following options:
# ✓ TypeScript: Yes
# ✓ ESLint: Yes
# ✓ Tailwind CSS: Yes (optional)
# ✓ App Router: Yes
# ✓ Turbopack: Yes (optional)

cd my-countries-app
```

#### Step 2: Install the Library

```bash
npm install countries-cities-ar
```

#### Step 3: Create a Server Component

Create `app/countries/page.tsx`:

```tsx
import { allCountries, getCountryByCode } from 'countries-cities-ar';

export default function CountriesPage() {
  // Server component - can directly use the data
  const egypt = getCountryByCode('EG');
  const saudi = getCountryByCode('SA');
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        🌍 Countries & Cities Library
      </h1>
      
      <div className="grid gap-4">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold">{egypt?.nameAr}</h2>
          <p>{egypt?.name}</p>
          <p className="text-sm text-gray-600">
            {egypt?.cities.length} governorates
          </p>
        </div>
        
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold">{saudi?.nameAr}</h2>
          <p>{saudi?.name}</p>
          <p className="text-sm text-gray-600">
            {saudi?.cities.length} regions
          </p>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">All Countries</h3>
        <p>Total: {allCountries.length} countries</p>
      </div>
    </div>
  );
}
```

#### Step 4: Create an Interactive Client Component

Create `components/CountryCitySelector.tsx`:

```tsx
'use client';

import { useState, useMemo } from 'react';
import { allCountries, type Country, type City } from 'countries-cities-ar';

export default function CountryCitySelector() {
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
    <div className="space-y-4">
      {/* Language Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setLanguage('ar')}
          className={`px-4 py-2 rounded ${
            language === 'ar' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          🇸🇦 العربية
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded ${
            language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          🇬🇧 English
        </button>
        <button
          onClick={() => setLanguage('fr')}
          className={`px-4 py-2 rounded ${
            language === 'fr' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          🇫🇷 Français
        </button>
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={language === 'ar' ? 'ابحث عن دولة...' : 'Search country...'}
        className="w-full p-3 border rounded-lg"
      />

      {/* Countries Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredCountries.slice(0, 20).map((country) => (
          <button
            key={country.code}
            onClick={() => setSelectedCountry(country)}
            className="p-3 border rounded-lg hover:bg-blue-50 text-left"
          >
            <div className="font-semibold">
              {language === 'ar' ? country.nameAr :
               language === 'fr' ? country.nameFr : country.name}
            </div>
            <div className="text-xs text-gray-500">
              {country.cities.length} {language === 'ar' ? 'محافظة' : 'states'}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Country Details */}
      {selectedCountry && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-3">
            {language === 'ar' ? selectedCountry.nameAr :
             language === 'fr' ? selectedCountry.nameFr : selectedCountry.name}
          </h3>
          <p className="mb-3">
            {selectedCountry.cities.length} {language === 'ar' ? 'محافظة/ولاية' : 'states/provinces'}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
```

#### Step 5: Use in Your Page

Update `app/page.tsx`:

```tsx
import CountryCitySelector from '@/components/CountryCitySelector';

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">🌍 دول ومدن العالم</h1>
      <p className="text-gray-600 mb-8">
        250 دولة • 4,642 محافظة • 3 لغات
      </p>
      <CountryCitySelector />
    </main>
  );
}
```

#### Step 6: Run Your App

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

---

### React Setup (Vite)

#### Step 1: Create React Project

```bash
npm create vite@latest my-countries-app -- --template react-ts
cd my-countries-app
```

#### Step 2: Install Dependencies

```bash
npm install
npm install countries-cities-ar
```

#### Step 3: Create Component

Create `src/CountrySelector.tsx`:

```tsx
import { useState } from 'react';
import { allCountries, searchCountries } from 'countries-cities-ar';

function CountrySelector() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(allCountries);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (!value) {
      setResults(allCountries);
    } else {
      setResults(searchCountries(value, 'ar'));
    }
  };

  return (
    <div>
      <h1>🌍 Countries & Cities</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="ابحث عن دولة..."
      />
      <p>Found: {results.length} countries</p>
      <ul>
        {results.slice(0, 10).map((country) => (
          <li key={country.code}>
            {country.nameAr} - {country.name}
            <span> ({country.cities.length} states)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountrySelector;
```

#### Step 4: Use in App

Update `src/App.tsx`:

```tsx
import CountrySelector from './CountrySelector';

function App() {
  return (
    <div className="App">
      <CountrySelector />
    </div>
  );
}

export default App;
```

#### Step 5: Run

```bash
npm run dev
```

### Vue Component

```vue
<template>
  <div>
    <input 
      v-model="query" 
      @input="handleSearch" 
      placeholder="ابحث عن مدينة..."
    />
    <ul>
      <li v-for="result in results" :key="result.city.name">
        {{ result.city.nameAr }} - {{ result.country.nameAr }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { searchCities } from 'countries-cities-ar';

const query = ref('');
const results = ref([]);

const handleSearch = () => {
  results.value = searchCities(query.value, undefined, 'ar');
};
</script>
```

---

## 🎯 Advanced Examples

### Autocomplete Search with Debounce

```typescript
import { useState, useEffect } from 'react';
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
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ابحث عن دولة..."
      />
      {loading && <p>جاري البحث...</p>}
      <ul>
        {results.map((country) => (
          <li key={country.code}>
            {country.nameAr} - {country.cities.length} محافظة
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Multi-language Dropdown

```tsx
import { useState } from 'react';
import { allCountries, type Country } from 'countries-cities-ar';

function MultiLanguageDropdown() {
  const [lang, setLang] = useState<'ar' | 'en' | 'fr'>('ar');
  const [selected, setSelected] = useState<Country | null>(null);

  const getName = (country: Country) => {
    return lang === 'ar' ? country.nameAr :
           lang === 'fr' ? country.nameFr : country.name;
  };

  return (
    <div>
      {/* Language Toggle */}
      <select value={lang} onChange={(e) => setLang(e.target.value as any)}>
        <option value="ar">العربية</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>

      {/* Country Dropdown */}
      <select onChange={(e) => {
        const country = allCountries.find(c => c.code === e.target.value);
        setSelected(country || null);
      }}>
        <option value="">اختر دولة...</option>
        {allCountries.map((country) => (
          <option key={country.code} value={country.code}>
            {getName(country)}
          </option>
        ))}
      </select>

      {/* Display Selected */}
      {selected && (
        <div>
          <h3>{getName(selected)}</h3>
          <p>{selected.cities.length} {lang === 'ar' ? 'محافظة' : 'states'}</p>
        </div>
      )}
    </div>
  );
}
```

### Form with Country & City Selection

```tsx
import { useState } from 'react';
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
    <form onSubmit={handleSubmit}>
      {/* Country Select */}
      <select onChange={(e) => {
        const selected = allCountries.find(c => c.code === e.target.value);
        setCountry(selected || null);
        setCity(null); // Reset city
      }}>
        <option value="">اختر الدولة</option>
        {allCountries.map((c) => (
          <option key={c.code} value={c.code}>{c.nameAr}</option>
        ))}
      </select>

      {/* City Select */}
      {country && (
        <select onChange={(e) => {
          const idx = parseInt(e.target.value);
          setCity(country.cities[idx] || null);
        }}>
          <option value="">اختر المحافظة</option>
          {country.cities.map((city, idx) => (
            <option key={idx} value={idx}>
              {city.nameAr || city.name}
            </option>
          ))}
        </select>
      )}

      <button type="submit" disabled={!country || !city}>
        إرسال
      </button>
    </form>
  );
}
```

### Filter by Region/Continent

```typescript
import { 
  africaCountries, 
  asiaCountries, 
  europeCountries,
  americasCountries,
  oceaniaCountries 
} from 'countries-cities-ar';

function RegionFilter() {
  const [region, setRegion] = useState('all');

  const getCountriesByRegion = () => {
    switch (region) {
      case 'africa': return africaCountries;
      case 'asia': return asiaCountries;
      case 'europe': return europeCountries;
      case 'americas': return americasCountries;
      case 'oceania': return oceaniaCountries;
      default: return allCountries;
    }
  };

  const countries = getCountriesByRegion();

  return (
    <div>
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="all">كل الدول ({allCountries.length})</option>
        <option value="africa">أفريقيا ({africaCountries.length})</option>
        <option value="asia">آسيا ({asiaCountries.length})</option>
        <option value="europe">أوروبا ({europeCountries.length})</option>
        <option value="americas">الأمريكتين ({americasCountries.length})</option>
        <option value="oceania">أوقيانوسيا ({oceaniaCountries.length})</option>
      </select>

      <div>
        {countries.map((country) => (
          <div key={country.code}>
            {country.nameAr} - {country.cities.length} محافظة
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### Express.js API

```javascript
const express = require('express');
const { getCountryByCode, getCitiesByCountryCode, searchCountries } = require('countries-cities-ar');

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
  const cities = getCitiesByCountryCode(req.params.code);
  res.json(cities);
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
```

## Data Coverage

The library includes carefully curated data for all world regions:

- **Africa**: 54 countries with major cities
- **Asia**: 49 countries with major cities
- **Europe**: 50 countries with major cities
- **Americas**: 48 countries with major cities
- **Oceania**: 19 countries with major cities

**Total: 250 countries with 4,642 cities/governorates/states/provinces** in **3 languages** (English, Arabic, French)

### Coverage Details
- 🇪🇬 Egypt: 27 governorates with accurate Arabic names
- 🇸🇦 Saudi Arabia: 13 regions (مناطق) with correct Arabic
- 🇦🇪 UAE: 7 emirates with verified names
- 🇮🇶 Iraq: 18 governorates with Arabic translations
- 🇸🇾 Syria: 14 governorates with Arabic names
- 🇯🇴 Jordan: 12 governorates
- 🇱🇧 Lebanon: 8 governorates
- 🇰🇼 Kuwait: 6 governorates
- 🇴🇲 Oman: 11 governorates
- 🇶🇦 Qatar: 8 municipalities
- 🇾🇪 Yemen: 21 governorates
- 🇩🇿 Algeria: 46 wilayas
- 🇹🇳 Tunisia: 24 governorates
- 🇲🇦 Morocco: 87 regions
- 🌍 All Arab countries with complete Arabic translations
- 🗺️ Includes states, provinces, governorates, and regions globally

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test

# Build the library
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

## Contributing

Contributions are welcome! Here's how you can help:

1. **Add missing countries or cities**: Submit a PR with updates to the data files
2. **Fix bugs**: Report issues or submit fixes
3. **Improve documentation**: Help make the docs clearer
4. **Add features**: Suggest or implement new helper functions

### Steps to Contribute

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

## 📜 License

MIT © [Ziad Mustafa](https://github.com/ziadmustafa1)

Free to use for personal and commercial projects.

## Support

If you find this library helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📝 Contributing to the documentation

## 🔧 Troubleshooting

### Common Issues

#### Module not found error in Next.js

```
Module not found: Can't resolve 'countries-cities-ar'
```

**Solution:**

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

#### TypeScript errors

If you see type errors, make sure you have the latest version:

```bash
npm install countries-cities-ar@latest
```

#### Build errors with exports

Make sure you're using version 3.0.1 or later:

```bash
npm install countries-cities-ar@^3.0.1
```

#### Server/Client component issues in Next.js

**Server Components** (can use directly):
```tsx
import { allCountries } from 'countries-cities-ar';

export default function Page() {
  return <div>{allCountries.length}</div>;
}
```

**Client Components** (need 'use client'):
```tsx
'use client';
import { useState } from 'react';
import { allCountries } from 'countries-cities-ar';

export default function Component() {
  const [data] = useState(allCountries);
  return <div>{data.length}</div>;
}
```

### Performance Tips

**1. Import only what you need:**
```typescript
// Good
import { getCountryByCode } from 'countries-cities-ar';

// Avoid if you don't need all countries
import { allCountries } from 'countries-cities-ar';
```

**2. Use memoization for filtering:**
```typescript
const filteredCountries = useMemo(() => {
  return allCountries.filter(/* your logic */);
}, [dependencies]);
```

**3. Lazy load data:**
```typescript
import dynamic from 'next/dynamic';

const CountrySelector = dynamic(() => import('./CountrySelector'), {
  loading: () => <p>Loading...</p>,
});
```

---

## 📝 Changelog

### 3.0.1 (Bug Fix - 2024)
- 🐛 **Fixed exports**: Corrected package.json exports to match actual build output
- 📦 **Fixed imports**: `import` now uses `index.js` and `require` uses `index.cjs`
- ✅ **Next.js compatibility**: Fixed "Module not found" errors in Next.js
- 📚 **Enhanced documentation**: Added comprehensive setup guides and troubleshooting

### 3.0.0 (Major Update - Complete World Coverage)
- 🌍 **Complete world data**: 250 countries with 4,642 administrative divisions
- 📊 **All countries from countries-states-cities-database**
- 🇪🇬 All Arab countries with 100% accurate Arabic translations:
  - Egypt: 27 governorates
  - Saudi Arabia: 13 regions
  - UAE: 7 emirates
  - Iraq: 18 governorates
  - Syria: 14 governorates
  - Jordan: 12 governorates
  - Lebanon: 8 governorates
  - Kuwait: 6 governorates
  - Oman: 11 governorates
  - Qatar: 8 municipalities
  - Yemen: 21 governorates
  - Algeria: 46 wilayas
  - Tunisia: 24 governorates
  - Morocco: 87 regions
  - And more...
- 🔤 Trilingual support: English, Arabic, and French
- 📦 TypeScript support with full type definitions
- 🔍 Advanced search functionality
- 📘 Complete documentation with examples
- 🎨 Beautiful demo site with Next.js

### 1.0.0 (Initial Release)
- ✨ Complete world countries and cities data
- 🔤 Trilingual support: English, Arabic, and French
- 🔍 Advanced search functionality
- 📦 TypeScript support

---

Made with ❤️ for the Arabic-speaking community
