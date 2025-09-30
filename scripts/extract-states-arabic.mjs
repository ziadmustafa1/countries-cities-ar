import fs from 'fs';

console.log('🚀 Extracting States with Arabic Names...\n');

// Read data
const countriesData = JSON.parse(fs.readFileSync('countries-states-cities-database/json/countries.json', 'utf-8'));
const statesData = JSON.parse(fs.readFileSync('countries-states-cities-database/json/states.json', 'utf-8'));

// Group states by country
const statesByCountry = {};
statesData.forEach(state => {
  if (!statesByCountry[state.country_code]) {
    statesByCountry[state.country_code] = [];
  }
  statesByCountry[state.country_code].push(state);
});

// Create output
const output = [];

countriesData.forEach(country => {
  const states = statesByCountry[country.iso2] || [];
  
  if (states.length > 0) {
    const countryData = {
      code: country.iso2,
      name: country.name,
      nameAr: country.native || country.name,
      nameFr: country.translations?.fr || country.name,
      emoji: country.emoji,
      states: states.map(state => ({
        name: state.name,
        nameAr: state.native || state.name,
        nameFr: state.name, // لا توجد ترجمة فرنسية متاحة
        type: state.type || 'state'
      }))
    };
    
    output.push(countryData);
  }
});

// Stats
console.log('📊 Statistics:');
console.log('Total countries with states:', output.length);
console.log('Total states:', output.reduce((sum, c) => sum + c.states.length, 0));

// Show samples
console.log('\n🔍 Sample - Egypt:');
const egypt = output.find(c => c.code === 'EG');
if (egypt) {
  console.log(`${egypt.emoji} ${egypt.nameAr} (${egypt.name})`);
  console.log(`States: ${egypt.states.length}`);
  console.log('First 5 states:');
  egypt.states.slice(0, 5).forEach(s => {
    console.log(`  - ${s.nameAr} (${s.name}) [${s.type}]`);
  });
}

console.log('\n🔍 Sample - Saudi Arabia:');
const saudi = output.find(c => c.code === 'SA');
if (saudi) {
  console.log(`${saudi.emoji} ${saudi.nameAr} (${saudi.name})`);
  console.log(`States: ${saudi.states.length}`);
  console.log('All states:');
  saudi.states.forEach(s => {
    console.log(`  - ${s.nameAr} (${s.name}) [${s.type}]`);
  });
}

// Save to file
fs.writeFileSync('countries-with-states.json', JSON.stringify(output, null, 2));
console.log('\n✅ Saved to countries-with-states.json');

// Show countries by region
const byRegion = {};
output.forEach(c => {
  const country = countriesData.find(ct => ct.iso2 === c.code);
  const region = country?.region || 'Unknown';
  if (!byRegion[region]) byRegion[region] = [];
  byRegion[region].push(c);
});

console.log('\n📍 Countries with states by region:');
Object.entries(byRegion).forEach(([region, countries]) => {
  console.log(`  ${region}: ${countries.length} countries, ${countries.reduce((sum, c) => sum + c.states.length, 0)} states`);
});
