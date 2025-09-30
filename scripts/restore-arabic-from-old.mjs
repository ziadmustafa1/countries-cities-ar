import fs from 'fs';

console.log('🔄 استرجاع كل الترجمات العربية من الملفات القديمة...\n');

// قراءة الملفات القديمة والجديدة
const files = ['africa', 'americas', 'asia', 'europe', 'oceania'];

files.forEach(continent => {
  const oldFile = `src/data/${continent}-old.ts`;
  const newFile = `src/data/${continent}.ts`;
  
  // تحقق من وجود الملف القديم
  if (!fs.existsSync(oldFile)) {
    console.log(`⚠️ ${continent}: لا يوجد ملف قديم`);
    return;
  }
  
  // قراءة المحتوى
  const oldContent = fs.readFileSync(oldFile, 'utf-8');
  let newContent = fs.readFileSync(newFile, 'utf-8');
  
  // استخراج كل الدول من الملف القديم
  const countryPattern = /"code":\s*"([^"]+)"[\s\S]*?"cities":\s*\[[\s\S]*?\]\s*}/g;
  let match;
  let updatedCount = 0;
  
  while ((match = countryPattern.exec(oldContent)) !== null) {
    const countryCode = match[1];
    const countryData = match[0];
    
    // استخراج المدن من البيانات القديمة
    const citiesMatch = countryData.match(/"cities":\s*(\[[\s\S]*?\])\s*}/);
    if (citiesMatch && citiesMatch[1]) {
      const oldCities = citiesMatch[1];
      
      // تحقق من وجود ترجمات عربية
      if (oldCities.includes('nameAr') && !oldCities.includes('nameAr": ""')) {
        // استبدال في الملف الجديد
        const newCountryRegex = new RegExp(
          `("code":\\s*"${countryCode}"[\\s\\S]*?"cities":\\s*)\\[[\\s\\S]*?\\]`,
          'g'
        );
        
        if (newContent.includes(`"code": "${countryCode}"`)) {
          newContent = newContent.replace(newCountryRegex, `$1${oldCities}`);
          updatedCount++;
        }
      }
    }
  }
  
  // حفظ الملف المحدث
  if (updatedCount > 0) {
    fs.writeFileSync(newFile, newContent, 'utf-8');
    console.log(`✅ ${continent}: تم استرجاع ${updatedCount} دولة`);
  } else {
    console.log(`⏭️ ${continent}: لا توجد تحديثات`);
  }
});

console.log('\n✅ اكتمل استرجاع البيانات العربية!');
