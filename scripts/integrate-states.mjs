import fs from 'fs';
import path from 'path';

console.log('🚀 Integrating States into Library...\n');

// Read extracted states data
const statesData = JSON.parse(fs.readFileSync('countries-with-states.json', 'utf-8'));

// Create lookup map
const statesMap = {};
statesData.forEach(country => {
  statesMap[country.code] = country.states;
});

console.log('📊 States loaded:', Object.keys(statesMap).length, 'countries\n');

// Update each continent file
const continents = ['africa', 'americas', 'asia', 'europe', 'oceania'];

continents.forEach(continent => {
  const filename = `src/data/${continent}.ts`;
  console.log(`📝 Processing ${continent}...`);
  
  let content = fs.readFileSync(filename, 'utf-8');
  let updated = 0;
  
  // Parse the file to find countries
  const countryPattern = /"code":\s*"([A-Z]{2})"/g;
  let match;
  const countryCodes = [];
  
  while ((match = countryPattern.exec(content)) !== null) {
    countryCodes.push(match[1]);
  }
  
  // Add states to each country
  countryCodes.forEach(code => {
    if (statesMap[code] && statesMap[code].length > 0) {
      const states = statesMap[code];
      
      // Build states JSON
      const statesJson = JSON.stringify(states, null, 6).split('\n').map(line => '    ' + line).join('\n');
      
      // Find the country block and add states
      const countryRegex = new RegExp(
        `("code":\\s*"${code}",[\\s\\S]*?"cities":\\s*\\[[\\s\\S]*?\\])`,
        'g'
      );
      
      if (countryRegex.test(content)) {
        content = content.replace(
          new RegExp(`("code":\\s*"${code}",[\\s\\S]*?"cities":\\s*\\[[\\s\\S]*?\\])`),
          `$1,\n    "states": ${statesJson.trim()}`
        );
        updated++;
      }
    }
  });
  
  if (updated > 0) {
    fs.writeFileSync(filename, content, 'utf-8');
    console.log(`  ✅ Updated ${updated} countries with states\n`);
  } else {
    console.log(`  ⏭️  No updates needed\n`);
  }
});

console.log('✅ Done! States integrated into library');
console.log('\n📊 Summary:');
console.log('Total countries with states:', Object.keys(statesMap).length);
console.log('Total states:', Object.values(statesMap).reduce((sum, arr) => sum + arr.length, 0));

// Show some examples
console.log('\n🔍 Examples:');
const examples = [
  { code: 'EG', name: 'Egypt' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'US', name: 'United States' },
  { code: 'FR', name: 'France' }
];

examples.forEach(({ code, name }) => {
  if (statesMap[code]) {
    console.log(`  ${name} (${code}): ${statesMap[code].length} states`);
  }
});
