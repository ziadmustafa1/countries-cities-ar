import { allCountries } from './dist/index.js';

const noCities = allCountries.filter(c => c.cities.length === 0);
const withCities = allCountries.filter(c => c.cities.length > 0);
const totalCities = allCountries.reduce((sum, c) => sum + c.cities.length, 0);

console.log('📊 Statistics After Update:');
console.log(`Total countries: ${allCountries.length}`);
console.log(`With cities: ${withCities.length}`);
console.log(`Without cities: ${noCities.length}`);
console.log(`Total cities: ${totalCities}`);

if (noCities.length > 0) {
  console.log('\n❌ Still missing cities:');
  noCities.slice(0, 20).forEach(c => console.log(`  ${c.code} - ${c.name}`));
} else {
  console.log('\n✅ All countries now have at least one city!');
}
