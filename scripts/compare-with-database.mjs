import fs from 'fs';
import { africaData } from '../src/data/africa.js';
import { americasData } from '../src/data/americas.js';
import { asiaData } from '../src/data/asia.js';
import { europeData } from '../src/data/europe.js';
import { oceaniaData } from '../src/data/oceania.js';

// قراءة البيانات من countries-states-cities-database
const dbStates = JSON.parse(
  fs.readFileSync('/home/ziad/Desktop/countries-cities-ar/countries-states-cities-database/json/states.json', 'utf-8')
);

const dbCountries = JSON.parse(
  fs.readFileSync('/home/ziad/Desktop/countries-cities-ar/countries-states-cities-database/json/countries.json', 'utf-8')
);

// دمج كل البيانات الحالية
const currentData = [...africaData, ...americasData, ...asiaData, ...europeData, ...oceaniaData];

console.log('📊 مقارنة البيانات:\n');
console.log(`البيانات الحالية: ${currentData.length} دولة`);
console.log(`قاعدة البيانات: ${dbCountries.length} دولة`);
console.log(`المحافظات في قاعدة البيانات: ${dbStates.length} محافظة\n`);

// تجميع المحافظات حسب الدولة من قاعدة البيانات
const statesByCountry = {};
dbStates.forEach(state => {
  const code = state.country_code;
  if (!statesByCountry[code]) {
    statesByCountry[code] = [];
  }
  statesByCountry[code].push(state.name);
});

// البحث عن الدول الناقصة
const missingCountries = [];
const countriesNeedingStates = [];

dbCountries.forEach(dbCountry => {
  const currentCountry = currentData.find(c => c.code === dbCountry.iso2);
  const dbStatesCount = statesByCountry[dbCountry.iso2]?.length || 0;
  
  if (!currentCountry) {
    missingCountries.push({
      code: dbCountry.iso2,
      name: dbCountry.name,
      states: dbStatesCount
    });
  } else if (currentCountry.cities.length === 0 && dbStatesCount > 0) {
    countriesNeedingStates.push({
      code: dbCountry.iso2,
      name: dbCountry.name,
      currentStates: currentCountry.cities.length,
      dbStates: dbStatesCount
    });
  }
});

console.log('🔴 دول غير موجودة في المكتبة:');
if (missingCountries.length === 0) {
  console.log('   ✅ لا توجد دول ناقصة!');
} else {
  missingCountries.forEach(c => {
    console.log(`   - ${c.name} (${c.code}) - ${c.states} محافظة`);
  });
}

console.log('\n🟡 دول بدون محافظات (موجودة في قاعدة البيانات):');
if (countriesNeedingStates.length === 0) {
  console.log('   ✅ كل الدول فيها محافظات!');
} else {
  countriesNeedingStates.forEach(c => {
    console.log(`   - ${c.name} (${c.code}) - متاح ${c.dbStates} محافظة`);
  });
}

// إحصائيات
console.log('\n📈 إحصائيات المحافظات:');
const currentStatesTotal = currentData.reduce((sum, c) => sum + c.cities.length, 0);
console.log(`   المكتبة الحالية: ${currentStatesTotal} محافظة`);
console.log(`   قاعدة البيانات: ${dbStates.length} محافظة`);

// الدول العربية
const arabCountryCodes = ['EG', 'SA', 'AE', 'IQ', 'SY', 'JO', 'LB', 'KW', 'OM', 'QA', 'YE', 'DZ', 'TN', 'MA', 'LY', 'SD', 'PS', 'BH', 'MR', 'SO', 'DJ', 'KM'];

console.log('\n🌍 الدول العربية:');
arabCountryCodes.forEach(code => {
  const current = currentData.find(c => c.code === code);
  const dbStatesCount = statesByCountry[code]?.length || 0;
  
  if (current) {
    console.log(`   ${code}: ${current.cities.length} محافظة (قاعدة البيانات: ${dbStatesCount})`);
  } else {
    console.log(`   ${code}: ❌ غير موجود (قاعدة البيانات: ${dbStatesCount})`);
  }
});

// التحقق من البيانات العربية
console.log('\n🔍 جودة الترجمات العربية:');
let goodArabic = 0;
let missingArabic = 0;
let badArabic = 0;

currentData.forEach(country => {
  country.cities.forEach(city => {
    if (!city.nameAr || city.nameAr === city.name) {
      missingArabic++;
    } else if (city.nameAr.match(/[a-zA-Z]/)) {
      badArabic++;
    } else {
      goodArabic++;
    }
  });
});

console.log(`   ✅ ترجمات صحيحة: ${goodArabic}`);
console.log(`   ⚠️ ترجمات مشبوهة: ${badArabic}`);
console.log(`   ❌ بدون ترجمة: ${missingArabic}`);
