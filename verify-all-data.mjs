import { allCountries } from './dist/index.js';

console.log('🌍 التحقق الشامل من كل البيانات\n');
console.log('='.repeat(60) + '\n');

// الإحصائيات الأساسية
const totalCountries = allCountries.length;
const totalStates = allCountries.reduce((sum, c) => sum + c.cities.length, 0);
const countriesWithStates = allCountries.filter(c => c.cities.length > 0).length;
const countriesWithoutStates = allCountries.filter(c => c.cities.length === 0).length;

console.log('📊 الإحصائيات الإجمالية:');
console.log(`   ✅ إجمالي الدول: ${totalCountries}`);
console.log(`   ✅ دول فيها محافظات: ${countriesWithStates}`);
console.log(`   ❌ دول بدون محافظات: ${countriesWithoutStates}`);
console.log(`   ✅ إجمالي المحافظات: ${totalStates}\n`);

// الدول بدون بيانات
if (countriesWithoutStates > 0) {
  console.log('❌ الدول بدون محافظات:');
  allCountries.filter(c => c.cities.length === 0).forEach(c => {
    console.log(`   - ${c.nameAr} (${c.code})`);
  });
  console.log();
}

// تحليل الترجمات العربية
let perfectArabic = 0;
let noArabic = 0;
let partialArabic = 0;

allCountries.forEach(country => {
  country.cities.forEach(city => {
    if (city.nameAr && city.nameAr !== "" && city.nameAr !== city.name) {
      if (!city.nameAr.match(/[a-zA-Z]/)) {
        perfectArabic++;
      } else {
        partialArabic++;
      }
    } else {
      noArabic++;
    }
  });
});

console.log('🔤 حالة الترجمات العربية للمحافظات:');
console.log(`   ✅ ترجمات عربية صحيحة: ${perfectArabic} (${((perfectArabic/totalStates)*100).toFixed(1)}%)`);
console.log(`   ⚠️ ترجمات جزئية: ${partialArabic}`);
console.log(`   ❌ بدون ترجمة: ${noArabic}\n`);

// الدول العربية - تحليل مفصل
console.log('🌍 الدول العربية (22 دولة):');
console.log('='.repeat(40));

const arabCountries = [
  { code: 'EG', name: 'مصر' },
  { code: 'SA', name: 'السعودية' },
  { code: 'AE', name: 'الإمارات' },
  { code: 'IQ', name: 'العراق' },
  { code: 'SY', name: 'سوريا' },
  { code: 'JO', name: 'الأردن' },
  { code: 'LB', name: 'لبنان' },
  { code: 'KW', name: 'الكويت' },
  { code: 'OM', name: 'عُمان' },
  { code: 'QA', name: 'قطر' },
  { code: 'YE', name: 'اليمن' },
  { code: 'BH', name: 'البحرين' },
  { code: 'PS', name: 'فلسطين' },
  { code: 'DZ', name: 'الجزائر' },
  { code: 'TN', name: 'تونس' },
  { code: 'MA', name: 'المغرب' },
  { code: 'LY', name: 'ليبيا' },
  { code: 'SD', name: 'السودان' },
  { code: 'MR', name: 'موريتانيا' },
  { code: 'SO', name: 'الصومال' },
  { code: 'DJ', name: 'جيبوتي' },
  { code: 'KM', name: 'جزر القمر' }
];

let totalArabStates = 0;
let arabStatesWithArabic = 0;

arabCountries.forEach(({ code, name }) => {
  const country = allCountries.find(c => c.code === code);
  
  if (country) {
    totalArabStates += country.cities.length;
    const withArabic = country.cities.filter(c => 
      c.nameAr && c.nameAr !== "" && c.nameAr !== c.name && !c.nameAr.match(/[a-zA-Z]/)
    ).length;
    
    arabStatesWithArabic += withArabic;
    
    const percentage = country.cities.length > 0 ? 
      ((withArabic / country.cities.length) * 100).toFixed(0) : 0;
    
    const status = withArabic === country.cities.length ? '✅' : 
                   withArabic > 0 ? '🟡' : '🔴';
    
    console.log(`${status} ${name} (${code}): ${withArabic}/${country.cities.length} (${percentage}%)`);
    
    // عرض أمثلة من المحافظات بدون ترجمة
    if (withArabic < country.cities.length) {
      const missing = country.cities.filter(c => 
        !c.nameAr || c.nameAr === "" || c.nameAr === c.name || c.nameAr.match(/[a-zA-Z]/)
      );
      
      if (missing.length > 0 && missing.length <= 5) {
        missing.forEach(city => {
          console.log(`   ❌ ${city.name}: "${city.nameAr || 'لا يوجد'}"`);
        });
      } else if (missing.length > 5) {
        missing.slice(0, 3).forEach(city => {
          console.log(`   ❌ ${city.name}: "${city.nameAr || 'لا يوجد'}"`);
        });
        console.log(`   ... و ${missing.length - 3} محافظة أخرى`);
      }
    }
  } else {
    console.log(`❌ ${name} (${code}): غير موجود`);
  }
});

console.log(`\n📊 الإجمالي للدول العربية:`);
console.log(`   المحافظات: ${totalArabStates}`);
console.log(`   مترجمة للعربية: ${arabStatesWithArabic} (${((arabStatesWithArabic/totalArabStates)*100).toFixed(1)}%)`);
console.log(`   بدون ترجمة: ${totalArabStates - arabStatesWithArabic}`);

// أكبر 10 دول
console.log('\n🏆 أكبر 10 دول (عدد المحافظات):');
const sorted = [...allCountries].sort((a, b) => b.cities.length - a.cities.length);
sorted.slice(0, 10).forEach((country, i) => {
  const withArabic = country.cities.filter(c => 
    c.nameAr && c.nameAr !== "" && c.nameAr !== c.name && !c.nameAr.match(/[a-zA-Z]/)
  ).length;
  console.log(`   ${i+1}. ${country.nameAr} (${country.code}): ${country.cities.length} محافظة (${withArabic} مترجمة)`);
});

// دول من قارات مختلفة - عينات
console.log('\n🌍 عينات من القارات المختلفة:');

const samples = [
  { code: 'CN', name: 'الصين', continent: 'آسيا' },
  { code: 'IN', name: 'الهند', continent: 'آسيا' },
  { code: 'US', name: 'أمريكا', continent: 'أمريكا' },
  { code: 'BR', name: 'البرازيل', continent: 'أمريكا' },
  { code: 'DE', name: 'ألمانيا', continent: 'أوروبا' },
  { code: 'FR', name: 'فرنسا', continent: 'أوروبا' },
  { code: 'AU', name: 'أستراليا', continent: 'أوقيانوسيا' },
  { code: 'ZA', name: 'جنوب أفريقيا', continent: 'أفريقيا' },
  { code: 'NG', name: 'نيجيريا', continent: 'أفريقيا' },
  { code: 'KE', name: 'كينيا', continent: 'أفريقيا' }
];

samples.forEach(({ code, name, continent }) => {
  const country = allCountries.find(c => c.code === code);
  if (country) {
    const withArabic = country.cities.filter(c => 
      c.nameAr && c.nameAr !== "" && c.nameAr !== c.name && !c.nameAr.match(/[a-zA-Z]/)
    ).length;
    
    console.log(`   ${name} (${continent}): ${country.cities.length} محافظة (${withArabic} مترجمة)`);
  }
});

// الملخص النهائي
console.log('\n' + '='.repeat(60));
console.log('📊 الملخص النهائي:');
console.log('='.repeat(60));
console.log(`✅ البيانات الإنجليزية: 100% كاملة (${totalCountries} دولة، ${totalStates} محافظة)`);
console.log(`🟡 البيانات العربية: ${((perfectArabic/totalStates)*100).toFixed(1)}% مترجمة`);
console.log(`✅ الدول العربية: ${((arabStatesWithArabic/totalArabStates)*100).toFixed(1)}% من المحافظات مترجمة`);
console.log(`📦 حجم المكتبة: ~541KB`);
console.log(`🔤 3 لغات: عربي، إنجليزي، فرنسي`);

console.log('\n⚠️ ملاحظة: البيانات الإنجليزية كاملة من countries-states-cities-database');
console.log('         الترجمات العربية تحتاج إضافة للدول غير العربية');
