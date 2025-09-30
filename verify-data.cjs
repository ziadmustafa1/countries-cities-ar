const { allCountries } = require('./dist/index.cjs');

const totalCities = allCountries.reduce((sum, c) => sum + c.cities.length, 0);

console.log('📊 إحصائيات المكتبة:\n');
console.log('إجمالي الدول:', allCountries.length);
console.log('إجمالي المدن:', totalCities);

console.log('\n🇪🇬 مصر:');
const eg = allCountries.find(c => c.code === 'EG');
console.log('عدد المدن:', eg?.cities.length);
if (eg) {
  console.log('أول 5 مدن:');
  eg.cities.slice(0, 5).forEach(c => {
    console.log(`  ✓ ${c.name} - ${c.nameAr} - ${c.nameFr}`);
  });
}

console.log('\n🇸🇦 السعودية:');
const sa = allCountries.find(c => c.code === 'SA');
console.log('عدد المدن:', sa?.cities.length);
if (sa) {
  console.log('أول 5 مدن:');
  sa.cities.slice(0, 5).forEach(c => {
    console.log(`  ✓ ${c.name} - ${c.nameAr} - ${c.nameFr}`);
  });
}

console.log('\n🇦🇪 الإمارات:');
const ae = allCountries.find(c => c.code === 'AE');
console.log('عدد المدن:', ae?.cities.length);
if (ae) {
  console.log('كل المدن:');
  ae.cities.forEach(c => {
    console.log(`  ✓ ${c.name} - ${c.nameAr} - ${c.nameFr}`);
  });
}
