const { allCountries } = require('./dist/index.cjs');

const totalCities = allCountries.reduce((sum, c) => sum + c.cities.length, 0);
const withCities = allCountries.filter(c => c.cities.length > 0).length;
const withoutCities = allCountries.filter(c => c.cities.length === 0).length;

console.log('📊 الإحصائيات النهائية:\n');
console.log('إجمالي الدول:', allCountries.length);
console.log('دول فيها مدن/محافظات:', withCities);
console.log('دول بدون بيانات:', withoutCities);
console.log('إجمالي المدن/المحافظات:', totalCities);

console.log('\n🇪🇬 مصر:');
const eg = allCountries.find(c => c.code === 'EG');
console.log('عدد المحافظات:', eg.cities.length);
console.log('أول 5:');
eg.cities.slice(0, 5).forEach(c => {
  console.log(`  - ${c.nameAr} (${c.name})`);
});

console.log('\n🇸🇦 السعودية:');
const sa = allCountries.find(c => c.code === 'SA');
console.log('عدد المناطق:', sa.cities.length);
sa.cities.forEach(c => {
  console.log(`  - ${c.nameAr} (${c.name})`);
});

console.log('\n🇦🇪 الإمارات:');
const ae = allCountries.find(c => c.code === 'AE');
console.log('عدد الإمارات:', ae.cities.length);
ae.cities.forEach(c => {
  console.log(`  - ${c.nameAr} (${c.name})`);
});

console.log('\n🇮🇶 العراق:');
const iq = allCountries.find(c => c.code === 'IQ');
console.log('عدد المحافظات:', iq.cities.length);
iq.cities.slice(0, 5).forEach(c => {
  console.log(`  - ${c.nameAr} (${c.name})`);
});

console.log('\n📋 دول بدون بيانات:');
const empty = allCountries.filter(c => c.cities.length === 0);
empty.slice(0, 10).forEach(c => {
  console.log(`  - ${c.name} (${c.code})`);
});
