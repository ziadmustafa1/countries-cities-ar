import fs from 'fs';

console.log('🧹 إزالة حقل type من البيانات...\n');

const continents = ['africa', 'americas', 'asia', 'europe', 'oceania'];

continents.forEach(continent => {
  const filename = `src/data/${continent}.ts`;
  console.log(`📝 معالجة ${continent}...`);
  
  let content = fs.readFileSync(filename, 'utf-8');
  
  // حذف كل "type": "..." من البيانات
  const typePattern = /,?\s*"type":\s*"[^"]*"/g;
  const matches = content.match(typePattern);
  
  if (matches) {
    content = content.replace(typePattern, '');
    fs.writeFileSync(filename, content, 'utf-8');
    console.log(`  ✅ تم حذف ${matches.length} حقل type\n`);
  } else {
    console.log(`  ⏭️  لا يوجد حقول type\n`);
  }
});

console.log('✅ تم! كل حقول type محذوفة');
