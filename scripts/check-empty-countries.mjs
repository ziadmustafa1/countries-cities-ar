import { allCountries } from '../dist/index.js';

const noCities = allCountries.filter(c => c.cities.length === 0);
const withCities = allCountries.filter(c => c.cities.length > 0);

console.log('\n📊 Statistics:');
console.log(`Total countries: ${allCountries.length}`);
console.log(`With cities: ${withCities.length}`);
console.log(`Without cities: ${noCities.length}`);

console.log('\n❌ Countries without cities:');
noCities.forEach(c => {
  console.log(`  ${c.code} - ${c.name} / ${c.nameAr} / ${c.nameFr}`);
});
