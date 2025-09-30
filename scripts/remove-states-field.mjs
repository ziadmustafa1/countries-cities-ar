import fs from 'fs';

console.log('🧹 Removing states field from data files...\n');

const continents = ['africa', 'americas', 'asia', 'europe', 'oceania'];

continents.forEach(continent => {
  const filename = `src/data/${continent}.ts`;
  console.log(`📝 Processing ${continent}...`);
  
  let content = fs.readFileSync(filename, 'utf-8');
  
  // Remove all ,\n    "states": [...] patterns
  const statesPattern = /,\s*"states":\s*\[[^\]]*?\]/gs;
  const matches = content.match(statesPattern);
  
  if (matches) {
    content = content.replace(statesPattern, '');
    fs.writeFileSync(filename, content, 'utf-8');
    console.log(`  ✅ Removed ${matches.length} states fields\n`);
  } else {
    console.log(`  ⏭️  No states fields found\n`);
  }
});

console.log('✅ Done! All states fields removed');
