import fs from 'fs';

console.log('🔧 إصلاح المصفوفات المتداخلة...\n');

const continents = ['africa', 'americas', 'asia', 'europe', 'oceania'];

continents.forEach(continent => {
  const filename = `src/data/${continent}.ts`;
  console.log(`📝 معالجة ${continent}...`);
  
  let content = fs.readFileSync(filename, 'utf-8');
  
  // البحث عن "cities": [[
  const nestedPattern = /"cities":\s*\[\s*\[/g;
  const matches = content.match(nestedPattern);
  
  if (matches) {
    console.log(`  وجدت ${matches.length} مصفوفة متداخلة`);
    
    // إصلاح: إزالة المصفوفة الداخلية الزائدة
    // تحويل "cities": [[ إلى "cities": [
    content = content.replace(/"cities":\s*\[\s*\[/g, '"cities": [');
    
    // إزالة الأقواس المغلقة الزائدة
    // تحويل ]\n    ] إلى ]
    content = content.replace(/\]\s*\n\s*\]/g, ']');
    
    fs.writeFileSync(filename, content, 'utf-8');
    console.log(`  ✅ تم الإصلاح\n`);
  } else {
    console.log(`  ⏭️  لا توجد مشاكل\n`);
  }
});

console.log('✅ تم إصلاح كل المصفوفات المتداخلة!');
