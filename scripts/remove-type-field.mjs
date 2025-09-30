import fs from 'fs';

console.log('🧹 Removing "type" field from cities...\n');

const continents = ['africa', 'americas', 'asia', 'europe', 'oceania'];

continents.forEach(continent => {
  const filename = `src/data/${continent}.ts`;
  console.log(`📝 Processing ${continent}...`);
  
  let content = fs.readFileSync(filename, 'utf-8');
  
  // Remove "type": "..." from all city objects
  const typePattern = /,?\s*"type":\s*"[^"]*"/g;
  const matches = content.match(typePattern);
  
  if (matches) {
    content = content.replace(typePattern, '');
    fs.writeFileSync(filename, content, 'utf-8');
    console.log(`  ✅ Removed ${matches.length} type fields\n`);
  } else {
    console.log(`  ⏭️  No type fields found\n`);
  }
});

console.log('✅ Done! All type fields removed');
