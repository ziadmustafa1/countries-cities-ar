import fs from 'fs';

console.log('📊 Exploring States Database...\n');

// Read states data
const statesData = fs.readFileSync('countries-states-cities-database/json/states.json', 'utf-8');
const states = JSON.parse(statesData);

console.log('Total states:', states.length);

// Find Egypt's states
const egyptStates = states.filter(s => s.country_code === 'EG');
console.log('\n🇪🇬 Egypt States:', egyptStates.length);
console.log('\nSample Egypt State:');
console.log(JSON.stringify(egyptStates[0], null, 2));

// Find Saudi Arabia's states
const saudiStates = states.filter(s => s.country_code === 'SA');
console.log('\n🇸🇦 Saudi Arabia States:', saudiStates.length);
console.log('\nSample Saudi State:');
console.log(JSON.stringify(saudiStates[0], null, 2));

// Check for Arabic names
console.log('\n✅ Checking Arabic support in states...');
console.log('Egypt state has native name?', egyptStates[0]?.name);
console.log('Saudi state has native name?', saudiStates[0]?.name);

// Count countries with states
const countriesWithStates = new Set(states.map(s => s.country_code));
console.log('\n📍 Countries with states/governorates:', countriesWithStates.size);
