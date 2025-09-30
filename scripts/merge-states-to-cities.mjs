import fs from 'fs';

console.log('🔄 Merging States into Cities Array...\n');

const continents = ['africa', 'americas', 'asia', 'europe', 'oceania'];

continents.forEach(continent => {
  const filename = `src/data/${continent}.ts`;
  console.log(`📝 Processing ${continent}...`);
  
  let content = fs.readFileSync(filename, 'utf-8');
  let updated = 0;
  let totalMerged = 0;
  
  // Find all countries with states
  const countryPattern = /"code":\s*"([A-Z]{2})"[\s\S]*?"cities":\s*(\[[^\]]*\])[\s\S]*?"states":\s*(\[[^\]]*?\n\s*\])/g;
  
  let newContent = content;
  let match;
  
  while ((match = countryPattern.exec(content)) !== null) {
    const countryCode = match[1];
    const citiesJson = match[2];
    const statesJson = match[3];
    
    try {
      // Parse cities and states
      const cities = JSON.parse(citiesJson);
      const states = JSON.parse(statesJson);
      
      // Merge states into cities (remove duplicates by name)
      const existingCityNames = new Set(cities.map(c => c.name.toLowerCase()));
      const newCities = states.filter(s => !existingCityNames.has(s.name.toLowerCase()));
      
      const mergedCities = [...cities, ...newCities];
      
      // Format the merged array
      const mergedJson = JSON.stringify(mergedCities, null, 6)
        .split('\n')
        .map(line => '    ' + line)
        .join('\n')
        .trim();
      
      // Replace in content
      const oldBlock = `"cities": ${citiesJson},\n    "states": ${statesJson}`;
      const newBlock = `"cities": ${mergedJson}`;
      
      newContent = newContent.replace(oldBlock, newBlock);
      
      updated++;
      totalMerged += newCities.length;
      
      console.log(`  ✅ ${countryCode}: merged ${newCities.length} states into cities (${cities.length} → ${mergedCities.length})`);
    } catch (e) {
      console.log(`  ⚠️  ${countryCode}: couldn't parse JSON, skipping`);
    }
  }
  
  if (updated > 0) {
    fs.writeFileSync(filename, newContent, 'utf-8');
    console.log(`  📊 Updated ${updated} countries, merged ${totalMerged} states\n`);
  } else {
    console.log(`  ⏭️  No updates needed\n`);
  }
});

console.log('✅ Done! States merged into cities');
console.log('\n🔍 Next step: Remove states field from types.ts');
