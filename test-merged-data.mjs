import { allCountries } from './dist/index.js';

console.log('🧪 Testing Merged Data...\n');

// Test Egypt
const egypt = allCountries.find(c => c.code === 'EG');
console.log('🇪🇬 Egypt:');
console.log('  Name:', egypt.name);
console.log('  Arabic:', egypt.nameAr);
console.log('  Cities:', egypt.cities.length);
console.log('  Sample cities:');
egypt.cities.slice(0, 10).forEach(c => {
  console.log(`    - ${c.nameAr} (${c.name})`);
});

// Test Saudi Arabia
console.log('\n🇸🇦 Saudi Arabia:');
const saudi = allCountries.find(c => c.code === 'SA');
console.log('  Name:', saudi.name);
console.log('  Arabic:', saudi.nameAr);
console.log('  Cities:', saudi.cities.length);
console.log('  All cities:');
saudi.cities.forEach(c => {
  console.log(`    - ${c.nameAr} (${c.name})`);
});

// Statistics
const totalCities = allCountries.reduce((sum, c) => sum + c.cities.length, 0);

console.log('\n📊 Final Statistics:');
console.log('  Total countries:', allCountries.length);
console.log('  Total cities (including governorates/states):', totalCities);
console.log('  Average cities per country:', Math.round(totalCities / allCountries.length));

// Top 10 countries with most cities
const top10 = allCountries
  .map(c => ({ code: c.code, name: c.name, nameAr: c.nameAr, cities: c.cities.length }))
  .sort((a, b) => b.cities - a.cities)
  .slice(0, 10);

console.log('\n🏆 Top 10 Countries with Most Cities:');
top10.forEach((c, idx) => {
  console.log(`  ${idx + 1}. ${c.name} (${c.code}): ${c.cities} cities`);
});

console.log('\n✅ Data merged successfully!');
