import { allCountries } from './dist/index.js';

console.log('🔍 اختبار البيانات الكاملة:\n');

if (!allCountries) {
  console.log('❌ لا توجد بيانات!');
  process.exit(1);
}

console.log(`✅ عدد الدول: ${allCountries.length}`);
console.log(`✅ عدد المحافظات: ${allCountries.reduce((s,c) => s + c.cities.length, 0)}`);

// عينة من البيانات
console.log('\n📊 عينة من الدول:');

// مصر
const egypt = allCountries.find(c => c.code === 'EG');
if (egypt) {
  console.log(`\n🇪🇬 مصر: ${egypt.cities.length} محافظة`);
  egypt.cities.slice(0, 3).forEach(c => {
    console.log(`   - ${c.nameAr || c.name}`);
  });
}

// السعودية  
const saudi = allCountries.find(c => c.code === 'SA');
if (saudi) {
  console.log(`\n🇸🇦 السعودية: ${saudi.cities.length} منطقة`);
  saudi.cities.slice(0, 3).forEach(c => {
    console.log(`   - ${c.nameAr || c.name}`);
  });
}

// الصين (للتأكد من البيانات الجديدة)
const china = allCountries.find(c => c.code === 'CN');
if (china) {
  console.log(`\n🇨🇳 الصين: ${china.cities.length} مقاطعة`);
  china.cities.slice(0, 3).forEach(c => {
    console.log(`   - ${c.name}`);
  });
}

// إسرائيل (من الدول الجديدة المضافة)
const israel = allCountries.find(c => c.code === 'IL');
if (israel) {
  console.log(`\n🇮🇱 إسرائيل: ${israel?.cities?.length || 0} منطقة`);
}

// أفغانستان (من الدول الجديدة)
const afghan = allCountries.find(c => c.code === 'AF');
if (afghan) {
  console.log(`\n🇦🇫 أفغانستان: ${afghan?.cities?.length || 0} ولاية`);
}
