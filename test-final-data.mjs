import { allCountries } from './dist/index.js';

console.log('📊 إحصائيات المكتبة النهائية:\n');

const totalCities = allCountries.reduce((sum, c) => sum + c.cities.length, 0);
console.log('✅ إجمالي الدول:', allCountries.length);
console.log('✅ إجمالي المدن:', totalCities);

console.log('\n🔍 عينة من الدول العربية:\n');

const arabCountries = [
  { code: 'EG', name: 'مصر' },
  { code: 'SA', name: 'السعودية' },
  { code: 'AE', name: 'الإمارات' },
  { code: 'DZ', name: 'الجزائر' },
  { code: 'MA', name: 'المغرب' },
  { code: 'IQ', name: 'العراق' },
  { code: 'SY', name: 'سوريا' },
  { code: 'JO', name: 'الأردن' },
  { code: 'LB', name: 'لبنان' }
];

arabCountries.forEach(({ code, name }) => {
  const country = allCountries.find(c => c.code === code);
  if (country) {
    console.log(`${name} (${country.nameAr}):`);
    console.log(`  عدد المدن: ${country.cities.length}`);
    if (country.cities.length > 0) {
      console.log('  أمثلة:', country.cities.slice(0, 3).map(c => c.nameAr).join('، '));
    }
    console.log('');
  }
});

console.log('✅ تم تصحيح البيانات!');
