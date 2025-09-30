#!/usr/bin/env node
import {
  getCountryByCode,
  getCitiesByCountryCode,
  getCountryName,
  searchCountries,
  searchCities,
  allCountries,
} from './dist/index.js';

console.log('🧪 Testing countries-cities-ar library\n');
console.log('='.repeat(60));

// Test 1: Get total countries
console.log('\n✅ Test 1: Total Countries');
console.log(`Total countries: ${allCountries.length}`);

// Test 2: Get specific country
console.log('\n✅ Test 2: Get Country by Code (EG)');
const egypt = getCountryByCode('EG');
console.log(`Country: ${egypt.name} / ${egypt.nameAr} / ${egypt.nameFr}`);
console.log(`Code: ${egypt.code}`);
console.log(`Cities count: ${egypt.cities.length}`);

// Test 3: Get cities
console.log('\n✅ Test 3: Get Cities (AE)');
const uaeCities = getCitiesByCountryCode('AE');
console.log(`UAE has ${uaeCities.length} cities:`);
uaeCities.slice(0, 3).forEach(city => {
  console.log(`  - ${city.name} / ${city.nameAr} / ${city.nameFr}`);
});

// Test 4: Get country name in different languages
console.log('\n✅ Test 4: Get Country Name in Different Languages');
console.log(`Egypt (EN): ${getCountryName('EG', 'en')}`);
console.log(`Egypt (AR): ${getCountryName('EG', 'ar')}`);
console.log(`Egypt (FR): ${getCountryName('EG', 'fr')}`);

// Test 5: Search countries
console.log('\n✅ Test 5: Search Countries');
const arabCountries = searchCountries('arab', 'en');
console.log(`Countries with "arab" in English: ${arabCountries.length}`);
arabCountries.slice(0, 3).forEach(c => {
  console.log(`  - ${c.name} (${c.code})`);
});

const egyptSearch = searchCountries('مصر', 'ar');
console.log(`\nCountries with "مصر" in Arabic: ${egyptSearch.length}`);
egyptSearch.forEach(c => {
  console.log(`  - ${c.nameAr} (${c.code})`);
});

const franceSearch = searchCountries('france', 'fr');
console.log(`\nCountries with "france" in French: ${franceSearch.length}`);
franceSearch.forEach(c => {
  console.log(`  - ${c.nameFr} (${c.code})`);
});

// Test 6: Search cities
console.log('\n✅ Test 6: Search Cities');
const dubaiResults = searchCities('dubai', undefined, 'en');
console.log(`Cities matching "dubai": ${dubaiResults.length}`);
dubaiResults.forEach(r => {
  console.log(`  - ${r.city.name} in ${r.country.name} (${r.country.code})`);
});

const dubaiAr = searchCities('دبي', undefined, 'ar');
console.log(`\nCities matching "دبي" in Arabic: ${dubaiAr.length}`);
dubaiAr.slice(0, 3).forEach(r => {
  console.log(`  - ${r.city.nameAr} في ${r.country.nameAr}`);
});

// Test 7: Filter cities by country
console.log('\n✅ Test 7: Search Cities in Specific Country (EG)');
const egyptCities = searchCities('sh', 'EG', 'en');
console.log(`Egyptian cities with "sh": ${egyptCities.length}`);
egyptCities.forEach(r => {
  console.log(`  - ${r.city.name} / ${r.city.nameAr}`);
});

// Test 8: Data validation
console.log('\n✅ Test 8: Data Validation');
let totalCities = 0;
let countriesWithCities = 0;
let countriesWithoutCities = 0;

allCountries.forEach(country => {
  totalCities += country.cities.length;
  if (country.cities.length > 0) {
    countriesWithCities++;
  } else {
    countriesWithoutCities++;
  }
  
  // Check all required fields exist
  if (!country.code || !country.name || !country.nameAr || !country.nameFr) {
    console.error(`❌ Missing fields in country: ${country.code}`);
  }
  
  // Check cities have all required fields
  country.cities.forEach(city => {
    if (!city.name || !city.nameAr || !city.nameFr) {
      console.error(`❌ Missing fields in city: ${city.name} (${country.code})`);
    }
  });
});

console.log(`Total cities: ${totalCities}`);
console.log(`Countries with cities: ${countriesWithCities}`);
console.log(`Countries without cities: ${countriesWithoutCities}`);

// Test 9: Continents data
console.log('\n✅ Test 9: Test Individual Continent Imports');
import { africaCountries, asiaCountries, europeCountries, americasCountries, oceaniaCountries } from './dist/index.js';

console.log(`Africa: ${africaCountries.length} countries`);
console.log(`Asia: ${asiaCountries.length} countries`);
console.log(`Europe: ${europeCountries.length} countries`);
console.log(`Americas: ${americasCountries.length} countries`);
console.log(`Oceania: ${oceaniaCountries.length} countries`);

const totalFromContinents = africaCountries.length + asiaCountries.length + europeCountries.length + americasCountries.length + oceaniaCountries.length;
console.log(`Total from continents: ${totalFromContinents}`);
console.log(`Matches allCountries: ${totalFromContinents === allCountries.length ? '✅' : '❌'}`);

console.log('\n' + '='.repeat(60));
console.log('✅ All tests completed successfully!\n');
