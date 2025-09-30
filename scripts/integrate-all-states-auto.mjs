import fs from 'fs';

console.log('🔄 دمج كل المحافظات/الولايات في المكتبة...\n');

// قراءة البيانات المستخرجة
const statesData = JSON.parse(fs.readFileSync('all-governorates-states.json', 'utf-8'));

console.log('📊 البيانات المستخرجة:', Object.keys(statesData).length, 'دولة');

// قراءة ملفات القارات
const continents = {
  africa: 'src/data/africa.ts',
  americas: 'src/data/americas.ts',
  asia: 'src/data/asia.ts',
  europe: 'src/data/europe.ts',
  oceania: 'src/data/oceania.ts'
};

let totalUpdated = 0;
let totalStatesAdded = 0;

Object.entries(continents).forEach(([continent, filePath]) => {
  console.log(`\n📝 معالجة ${continent}...`);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let updated = 0;
  
  // البحث عن كل دولة في الملف
  const countryPattern = /"code":\s*"([A-Z]{2})",[\s\S]*?"cities":\s*\[\]/g;
  let matches = [...content.matchAll(countryPattern)];
  
  console.log(`  وجدت ${matches.length} دولة بدون مدن`);
  
  matches.forEach(match => {
    const code = match[1];
    
    if (statesData[code]) {
      const cities = statesData[code].cities;
      
      // تنسيق المدن
      const citiesJson = JSON.stringify(cities, null, 6)
        .split('\n')
        .map(line => '      ' + line)
        .join('\n')
        .trim();
      
      // استبدال cities: []
      const oldPattern = `"code": "${code}",`;
      const countryBlock = content.match(new RegExp(`"code": "${code}",[\\s\\S]*?"cities": \\[\\]`, 'm'));
      
      if (countryBlock) {
        const newBlock = countryBlock[0].replace(
          '"cities": []',
          `"cities": [\n${citiesJson}\n    ]`
        );
        
        content = content.replace(countryBlock[0], newBlock);
        updated++;
        totalStatesAdded += cities.length;
        console.log(`    ✅ ${code}: أضيف ${cities.length} محافظة/ولاية`);
      }
    }
  });
  
  if (updated > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  📊 تم تحديث ${updated} دولة`);
    totalUpdated += updated;
  }
});

console.log('\n✅ اكتمل الدمج!');
console.log(`📊 الإحصائيات النهائية:`);
console.log(`  - دول محدثة: ${totalUpdated}`);
console.log(`  - محافظات/ولايات مضافة: ${totalStatesAdded}`);

console.log('\n⚠️  ملاحظة: بعض الترجمات العربية قد تحتاج مراجعة يدوية');
