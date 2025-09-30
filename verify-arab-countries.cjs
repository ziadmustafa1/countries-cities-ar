const { allCountries } = require('./dist/index.cjs');

console.log('✅ تم تصحيح الدول العربية:\n');

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
  { code: 'DZ', name: 'الجزائر' },
  { code: 'TN', name: 'تونس' },
  { code: 'MA', name: 'المغرب' },
  { code: 'LY', name: 'ليبيا' },
];

arabCountries.forEach(({ code, name }) => {
  const country = allCountries.find(c => c.code === code);
  if (country) {
    console.log(`\n🇦🇷 ${name} (${code}):`);
    console.log(`   المحافظات/الولايات: ${country.cities.length}`);
    console.log('   أمثلة:');
    country.cities.slice(0, 5).forEach(c => {
      console.log(`   ✓ ${c.nameAr} (${c.name})`);
    });
  }
});

console.log('\n📊 إجمالي المحافظات في الدول العربية:');
const totalArabCities = arabCountries.reduce((sum, { code }) => {
  const country = allCountries.find(c => c.code === code);
  return sum + (country?.cities.length || 0);
}, 0);
console.log(`   ${totalArabCities} محافظة/ولاية`);
