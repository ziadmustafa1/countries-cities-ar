import fs from 'fs';

// قراءة البيانات الحالية من المكتبة المبنية
const { allCountries } = await import('../dist/index.js');

// قراءة البيانات من countries-states-cities-database
const dbStates = JSON.parse(
  fs.readFileSync('countries-states-cities-database/json/states.json', 'utf-8')
);

const dbCountries = JSON.parse(
  fs.readFileSync('countries-states-cities-database/json/countries.json', 'utf-8')
);

console.log('🔍 مقارنة شاملة بين المكتبة وقاعدة البيانات:\n');
console.log('===============================================\n');

console.log(`📊 الإحصائيات الأساسية:`);
console.log(`   المكتبة الحالية: ${allCountries.length} دولة`);
console.log(`   قاعدة البيانات: ${dbCountries.length} دولة`);
console.log(`   المحافظات في قاعدة البيانات: ${dbStates.length} محافظة\n`);

// تجميع المحافظات حسب الدولة من قاعدة البيانات
const statesByCountry = {};
dbStates.forEach(state => {
  const code = state.country_code;
  if (!statesByCountry[code]) {
    statesByCountry[code] = [];
  }
  statesByCountry[code].push({
    name: state.name,
    nameNative: state.name_native || state.name,
    id: state.id
  });
});

// البحث عن الدول الناقصة أو التي تحتاج تحديث
const missingInLibrary = [];
const needsMoreStates = [];
const perfectMatch = [];

dbCountries.forEach(dbCountry => {
  const libCountry = allCountries.find(c => c.code === dbCountry.iso2);
  const dbStatesCount = statesByCountry[dbCountry.iso2]?.length || 0;
  
  if (!libCountry) {
    if (dbStatesCount > 0) {
      missingInLibrary.push({
        code: dbCountry.iso2,
        name: dbCountry.name,
        nameNative: dbCountry.native,
        states: dbStatesCount
      });
    }
  } else {
    const libStatesCount = libCountry.cities.length;
    
    if (libStatesCount === 0 && dbStatesCount > 0) {
      needsMoreStates.push({
        code: dbCountry.iso2,
        name: dbCountry.name,
        nameAr: libCountry.nameAr,
        currentStates: 0,
        dbStates: dbStatesCount
      });
    } else if (libStatesCount < dbStatesCount) {
      needsMoreStates.push({
        code: dbCountry.iso2,
        name: dbCountry.name,
        nameAr: libCountry.nameAr,
        currentStates: libStatesCount,
        dbStates: dbStatesCount
      });
    } else if (libStatesCount === dbStatesCount && dbStatesCount > 0) {
      perfectMatch.push({
        code: dbCountry.iso2,
        name: dbCountry.name,
        states: libStatesCount
      });
    }
  }
});

console.log('🔴 دول موجودة في قاعدة البيانات وغير موجودة في المكتبة:');
if (missingInLibrary.length === 0) {
  console.log('   ✅ لا توجد');
} else {
  console.log(`   (${missingInLibrary.length} دولة)`);
  missingInLibrary.slice(0, 10).forEach(c => {
    console.log(`   - ${c.name} (${c.code}) - ${c.states} محافظة`);
  });
  if (missingInLibrary.length > 10) {
    console.log(`   ... و ${missingInLibrary.length - 10} دولة أخرى`);
  }
}

console.log('\n🟡 دول تحتاج محافظات إضافية:');
if (needsMoreStates.length === 0) {
  console.log('   ✅ لا توجد');
} else {
  console.log(`   (${needsMoreStates.length} دولة)`);
  needsMoreStates.slice(0, 15).forEach(c => {
    console.log(`   - ${c.name} (${c.code}): ${c.currentStates} → ${c.dbStates} محافظة`);
  });
  if (needsMoreStates.length > 15) {
    console.log(`   ... و ${needsMoreStates.length - 15} دولة أخرى`);
  }
}

console.log('\n✅ دول بعدد محافظات صحيح:');
console.log(`   ${perfectMatch.length} دولة`);

// الدول العربية - تحليل مفصل
console.log('\n🌍 تحليل الدول العربية:');
console.log('================================');

const arabCountries = [
  { code: 'EG', nameAr: 'مصر' },
  { code: 'SA', nameAr: 'السعودية' },
  { code: 'AE', nameAr: 'الإمارات' },
  { code: 'IQ', nameAr: 'العراق' },
  { code: 'SY', nameAr: 'سوريا' },
  { code: 'JO', nameAr: 'الأردن' },
  { code: 'LB', nameAr: 'لبنان' },
  { code: 'KW', nameAr: 'الكويت' },
  { code: 'OM', nameAr: 'عُمان' },
  { code: 'QA', nameAr: 'قطر' },
  { code: 'YE', nameAr: 'اليمن' },
  { code: 'BH', nameAr: 'البحرين' },
  { code: 'PS', nameAr: 'فلسطين' },
  { code: 'DZ', nameAr: 'الجزائر' },
  { code: 'TN', nameAr: 'تونس' },
  { code: 'MA', nameAr: 'المغرب' },
  { code: 'LY', nameAr: 'ليبيا' },
  { code: 'SD', nameAr: 'السودان' },
  { code: 'MR', nameAr: 'موريتانيا' },
  { code: 'SO', nameAr: 'الصومال' },
  { code: 'DJ', nameAr: 'جيبوتي' },
  { code: 'KM', nameAr: 'جزر القمر' }
];

arabCountries.forEach(({ code, nameAr }) => {
  const libCountry = allCountries.find(c => c.code === code);
  const dbStatesCount = statesByCountry[code]?.length || 0;
  
  if (libCountry) {
    const status = libCountry.cities.length === dbStatesCount ? '✅' : 
                   libCountry.cities.length > 0 ? '🟡' : '🔴';
    console.log(`   ${status} ${nameAr} (${code}): ${libCountry.cities.length}/${dbStatesCount} محافظة`);
    
    // عرض أمثلة من المحافظات
    if (libCountry.cities.length > 0) {
      const samples = libCountry.cities.slice(0, 3);
      samples.forEach(city => {
        const hasArabic = city.nameAr && city.nameAr !== city.name && !city.nameAr.match(/[a-zA-Z]/);
        const arabicStatus = hasArabic ? '✓' : '✗';
        console.log(`      ${arabicStatus} ${city.nameAr || '❌'} (${city.name})`);
      });
    }
  } else {
    console.log(`   ❌ ${nameAr} (${code}): غير موجود في المكتبة (قاعدة البيانات: ${dbStatesCount})`);
  }
});

// تحليل جودة الترجمات العربية
console.log('\n📈 جودة الترجمات العربية:');
let perfectArabic = 0;
let partialArabic = 0;
let noArabic = 0;
let totalCities = 0;

allCountries.forEach(country => {
  country.cities.forEach(city => {
    totalCities++;
    if (city.nameAr && city.nameAr !== city.name && !city.nameAr.match(/[a-zA-Z]/)) {
      perfectArabic++;
    } else if (city.nameAr && city.nameAr !== city.name) {
      partialArabic++;
    } else {
      noArabic++;
    }
  });
});

const arabicPercentage = ((perfectArabic / totalCities) * 100).toFixed(1);
console.log(`   ✅ ترجمات عربية صحيحة: ${perfectArabic} (${arabicPercentage}%)`);
console.log(`   ⚠️ ترجمات غير مكتملة: ${partialArabic}`);
console.log(`   ❌ بدون ترجمة عربية: ${noArabic}`);
console.log(`   📊 الإجمالي: ${totalCities} محافظة/مدينة`);

// الدول التي لديها محافظات في المكتبة وليس في قاعدة البيانات
console.log('\n🔵 دول لديها بيانات في المكتبة فقط:');
const onlyInLibrary = allCountries.filter(c => 
  c.cities.length > 0 && (!statesByCountry[c.code] || statesByCountry[c.code].length === 0)
);

if (onlyInLibrary.length > 0) {
  console.log(`   (${onlyInLibrary.length} دولة)`);
  onlyInLibrary.slice(0, 10).forEach(c => {
    console.log(`   - ${c.name} (${c.code}): ${c.cities.length} محافظة`);
  });
}

// ملخص نهائي
console.log('\n📊 الملخص النهائي:');
console.log('================');
const libTotalStates = allCountries.reduce((sum, c) => sum + c.cities.length, 0);
const dbTotalStates = dbStates.length;

console.log(`   المحافظات في المكتبة: ${libTotalStates}`);
console.log(`   المحافظات في قاعدة البيانات: ${dbTotalStates}`);
console.log(`   الفرق: ${dbTotalStates - libTotalStates} محافظة`);
console.log(`   نسبة التغطية: ${((libTotalStates / dbTotalStates) * 100).toFixed(1)}%`);
console.log(`   الدول بدون بيانات: ${allCountries.filter(c => c.cities.length === 0).length} دولة`);
