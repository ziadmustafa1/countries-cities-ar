import fs from 'fs';

// Read a small sample of the countries data
const countriesData = fs.readFileSync('countries-states-cities-database/json/countries.json', 'utf-8');
const countries = JSON.parse(countriesData);

console.log('📊 Countries Database Structure:\n');
console.log('Total countries:', countries.length);
console.log('\n🔍 Sample Country (Egypt):');
const egypt = countries.find(c => c.iso2 === 'EG');
console.log(JSON.stringify(egypt, null, 2));

console.log('\n🔍 Sample Country (Saudi Arabia):');
const saudi = countries.find(c => c.iso2 === 'SA');
console.log(JSON.stringify(saudi, null, 2));

console.log('\n🔍 Checking if translations exist:');
console.log('Does country have translations?', egypt?.translations ? 'Yes' : 'No');
if (egypt?.translations) {
  console.log('Available languages:', Object.keys(egypt.translations));
  console.log('Arabic translation:', egypt.translations.ar);
}
