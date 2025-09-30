import { allCountries } from './dist/index.js';

console.log('🧪 Testing States Integration...\n');

// Test Egypt
const egypt = allCountries.find(c => c.code === 'EG');
console.log('🇪🇬 Egypt:');
console.log('  Name:', egypt.name);
console.log('  Arabic:', egypt.nameAr);
console.log('  Cities:', egypt.cities.length);
console.log('  States:', egypt.states?.length || 0);
if (egypt.states && egypt.states.length > 0) {
  console.log('  First 5 states:');
  egypt.states.slice(0, 5).forEach(s => {
    console.log(`    - ${s.nameAr} (${s.name}) [${s.type}]`);
  });
}

// Test Saudi Arabia
console.log('\n🇸🇦 Saudi Arabia:');
const saudi = allCountries.find(c => c.code === 'SA');
console.log('  Name:', saudi.name);
console.log('  Arabic:', saudi.nameAr);
console.log('  Cities:', saudi.cities.length);
console.log('  States:', saudi.states?.length || 0);
if (saudi.states && saudi.states.length > 0) {
  console.log('  All states:');
  saudi.states.forEach(s => {
    console.log(`    - ${s.nameAr} (${s.name}) [${s.type}]`);
  });
}

// Statistics
const countriesWithStates = allCountries.filter(c => c.states && c.states.length > 0);
const totalStates = allCountries.reduce((sum, c) => sum + (c.states?.length || 0), 0);

console.log('\n📊 Statistics:');
console.log('  Total countries:', allCountries.length);
console.log('  Countries with states:', countriesWithStates.length);
console.log('  Total states:', totalStates);
console.log('  Total cities:', allCountries.reduce((sum, c) => sum + c.cities.length, 0));

console.log('\n✅ States successfully integrated!');
