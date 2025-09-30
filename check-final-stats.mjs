const { allCountries } = require('./dist/index.cjs');

const totalCities = allCountries.reduce((sum, c) => sum + c.cities.length, 0);
const eg = allCountries.find(c => c.code === 'EG');
const sa = allCountries.find(c => c.code === 'SA');
const us = allCountries.find(c => c.code === 'US');
const fr = allCountries.find(c => c.code === 'FR');

console.log('📊 Final Statistics:\n');
console.log('Countries:', allCountries.length);
console.log('Total cities:', totalCities);
console.log('\n🔍 Examples:');
console.log('Egypt:', eg.cities.length, 'cities');
console.log('Saudi Arabia:', sa.cities.length, 'cities');
console.log('United States:', us.cities.length, 'cities');
console.log('France:', fr.cities.length, 'cities');

console.log('\n📍 Sample Egypt cities:');
eg.cities.slice(0, 5).forEach(c => console.log(`  - ${c.nameAr} (${c.name})`));

console.log('\n✅ All states merged into cities successfully!');
