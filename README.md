# countries-cities-ar 🌍

A comprehensive TypeScript library providing all world countries and their cities with **English, Arabic, and French** names. Perfect for building localized applications that need country and city data.

[![npm version](https://img.shields.io/npm/v/countries-cities-ar.svg)](https://www.npmjs.com/package/countries-cities-ar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🌐 **Complete Data**: 250 world countries with their ISO codes
- 🏛️ **Comprehensive**: 4,642 cities, governorates, states, and provinces
- 🔤 **Trilingual**: English, Arabic, and French names for all data
- 📦 **Optimized**: 586KB bundle - Data split by continent for optimal loading
- 🎯 **TypeScript**: Full TypeScript support with type definitions
- 🔍 **Search Functions**: Built-in search helpers with multi-language support
- 📘 **Well Documented**: JSDoc comments on all exported functions
- ✅ **Tested**: Comprehensive unit tests with Vitest

## Installation

```bash
# npm
npm install countries-cities-ar

# yarn
yarn add countries-cities-ar

# pnpm
pnpm add countries-cities-ar
```

## Usage

### Quick Start

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

### Express.js API

```javascript
const express = require('express');
const { getCountryByCode, getCitiesByCountryCode } = require('countries-cities-ar');

const app = express();

app.get('/api/countries/:code', (req, res) => {
  const country = getCountryByCode(req.params.code);
  if (!country) {
    return res.status(404).json({ error: 'Country not found' });
  }
  res.json(country);
});

app.get('/api/countries/:code/cities', (req, res) => {
  const cities = getCitiesByCountryCode(req.params.code);
  res.json(cities);
});

app.listen(3000);
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

## Project Structure

```
countries-cities-ar/
├── src/
│   ├── data/
│   │   ├── africa.ts      # African countries data
│   │   ├── asia.ts        # Asian countries data
│   │   ├── europe.ts      # European countries data
│   │   ├── americas.ts    # American countries data
│   │   ├── oceania.ts     # Oceanian countries data
│   │   └── index.ts       # Data aggregator
│   ├── helpers.ts         # Helper functions
│   ├── types.ts           # TypeScript type definitions
│   └── index.ts           # Main entry point
├── tests/
│   └── helpers.test.ts    # Unit tests
├── dist/                  # Build output (generated)
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md
```

## License

MIT © [Your Name]

## Support

If you find this library helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📝 Contributing to the documentation

## Changelog

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
