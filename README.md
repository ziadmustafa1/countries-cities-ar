# countries-cities-ar 🌍

A comprehensive TypeScript library providing all world countries and their cities with **English, Arabic, and French** names. Perfect for building localized applications that need country and city data.

[![npm version](https://img.shields.io/npm/v/countries-cities-ar.svg)](https://www.npmjs.com/package/countries-cities-ar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🌐 **Complete Data**: 215 world countries with their ISO codes
- 🏛️ **Comprehensive**: 4,246 cities, governorates, states, and provinces
- 🔤 **Trilingual**: English, Arabic, and French names for all data
- 📦 **Optimized**: 542KB bundle - Data split by continent for optimal loading
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

### ESM (ES Modules)

```typescript
import { 
  getCountryByCode, 
  getCitiesByCountryCode, 
  searchCountries,
  searchCities,
  allCountries 
} from 'countries-cities-ar';

// Get a specific country
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

// Get all cities for a country
const cities = getCitiesByCountryCode('SA');
console.log(cities[0]);
// { name: 'Riyadh', nameAr: 'الرياض', nameFr: 'Riyad' }

// Search for countries
const results = searchCountries('arab', 'en');
console.log(results); // All countries with 'arab' in name

// Search for cities
const cairoResults = searchCities('cairo', undefined, 'en');
console.log(cairoResults[0]);
// {
//   city: { name: 'Cairo', nameAr: 'القاهرة' },
//   country: { code: 'EG', name: 'Egypt', ... }
// }

// Search cities in specific country
const egyptCities = searchCities('alex', 'EG', 'en');
console.log(egyptCities); // Cities in Egypt matching 'alex'
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

### React Component

```tsx
import React, { useState } from 'react';
import { searchCities, searchCountries } from 'countries-cities-ar';

function CountrySelector() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (value: string) => {
    setQuery(value);
    const countries = searchCountries(value, 'en');
    setResults(countries);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search countries..."
      />
      <ul>
        {results.map((country) => (
          <li key={country.code}>
            {country.name} - {country.nameAr}
          </li>
        ))}
      </ul>
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

**Total: 215 countries with 4,246 cities/governorates/states/provinces** in **3 languages** (English, Arabic, French)

### Coverage Details
- 🇪🇬 Egypt: 27 governorates with accurate Arabic names
- 🇸🇦 Saudi Arabia: 13 regions (مناطق) with correct Arabic
- 🇦🇪 UAE: 7 emirates with verified names
- 🌍 205 countries with complete administrative divisions
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

### 2.0.0 (Major Update - Complete Coverage)
- 🏛️ **Complete data**: 215 countries with 4,246 administrative divisions
- 🇪🇬 All 27 Egyptian governorates with correct Arabic names
- 🇸🇦 All 13 Saudi regions with verified Arabic translations
- 🌍 205 countries with states/provinces/governorates data
- 🔤 Trilingual support: English, Arabic, and French
- 📦 TypeScript support with full type definitions
- 🔍 Advanced search functionality
- 📘 Complete documentation with examples

### 1.0.0 (Initial Release)
- ✨ Complete world countries and cities data
- 🔤 Trilingual support: English, Arabic, and French
- 🔍 Advanced search functionality
- 📦 TypeScript support

---

Made with ❤️ for the Arabic-speaking community
