import fs from 'fs';

console.log('🔄 استرجاع البيانات العربية المصححة...\n');

// قراءة البيانات القديمة المصححة
const oldAfrica = fs.readFileSync('src/data/africa-old.ts', 'utf-8');
const oldAsia = fs.readFileSync('src/data/asia-old.ts', 'utf-8');

// استخراج الدول العربية المصححة
const correctedCountries = {};

// مصر
const egyptMatch = oldAfrica.match(/"code": "EG"[\s\S]*?"cities": \[[\s\S]*?\]\s*\}/);
if (egyptMatch) {
  eval(`correctedCountries.EG = {${egyptMatch[0]}}`);
}

// الدول العربية من آسيا
const arabAsianCountries = ['SA', 'AE', 'IQ', 'SY', 'JO', 'LB', 'KW', 'OM', 'QA', 'YE', 'BH', 'PS'];
arabAsianCountries.forEach(code => {
  const regex = new RegExp(`"code": "${code}"[\\s\\S]*?"cities": \\[[\\s\\S]*?\\]\\s*\\}`, 'g');
  const match = oldAsia.match(regex);
  if (match) {
    eval(`correctedCountries.${code} = {${match[0]}}`);
  }
});

// الدول العربية من أفريقيا
const arabAfricanCountries = ['DZ', 'TN', 'MA', 'LY', 'SD', 'MR', 'SO', 'DJ', 'KM'];
arabAfricanCountries.forEach(code => {
  const regex = new RegExp(`"code": "${code}"[\\s\\S]*?"cities": \\[[\\s\\S]*?\\]\\s*\\}`, 'g');
  const match = oldAfrica.match(regex);
  if (match) {
    eval(`correctedCountries.${code} = {${match[0]}}`);
  }
});

console.log(`✅ تم استخراج ${Object.keys(correctedCountries).length} دولة عربية مصححة`);

// قراءة البيانات الحالية
const currentAfrica = fs.readFileSync('src/data/africa.ts', 'utf-8');
const currentAsia = fs.readFileSync('src/data/asia.ts', 'utf-8');

// دمج البيانات المصححة
function mergeCorrectData(fileContent, continentName) {
  let updated = fileContent;
  
  Object.keys(correctedCountries).forEach(code => {
    const country = correctedCountries[code];
    if (!country || !country.cities) return;
    
    // البحث عن الدولة في الملف
    if (fileContent.includes(`"code": "${code}"`)) {
      const regex = new RegExp(
        `(\\s*{\\s*"code":\\s*"${code}"[\\s\\S]*?"cities":\\s*\\[)[\\s\\S]*?(\\]\\s*})`,
        'g'
      );
      
      const citiesJson = JSON.stringify(country.cities, null, 6)
        .split('\n')
        .map((line, i) => i === 0 ? line : '      ' + line)
        .join('\n');
      
      updated = updated.replace(regex, `$1\n      ${citiesJson}\n    $2`);
      console.log(`   ✅ ${code} في ${continentName}`);
    }
  });
  
  return updated;
}

const updatedAfrica = mergeCorrectData(currentAfrica, 'africa');
const updatedAsia = mergeCorrectData(currentAsia, 'asia');

fs.writeFileSync('src/data/africa.ts', updatedAfrica, 'utf-8');
fs.writeFileSync('src/data/asia.ts', updatedAsia, 'utf-8');

console.log('\n✅ تم استرجاع البيانات العربية المصححة!');
