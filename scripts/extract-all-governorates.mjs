import fs from 'fs';

console.log('🔍 استخراج كل المحافظات/الولايات من Database...\n');

// قراءة البيانات
const countriesData = JSON.parse(fs.readFileSync('countries-states-cities-database/json/countries.json', 'utf-8'));
const statesData = JSON.parse(fs.readFileSync('countries-states-cities-database/json/states.json', 'utf-8'));

console.log('📊 البيانات:');
console.log('  الدول:', countriesData.length);
console.log('  المحافظات/الولايات:', statesData.length);

// تجميع الولايات حسب الدولة
const statesByCountry = {};
statesData.forEach(state => {
  if (!statesByCountry[state.country_code]) {
    statesByCountry[state.country_code] = [];
  }
  statesByCountry[state.country_code].push(state);
});

// إنشاء البيانات النهائية
const output = {};

countriesData.forEach(country => {
  const states = statesByCountry[country.iso2] || [];
  
  if (states.length > 0) {
    output[country.iso2] = {
      code: country.iso2,
      name: country.name,
      nameAr: country.native || country.name,
      nameFr: country.translations?.fr || country.name,
      type: states[0]?.type || 'state', // نوع التقسيم (governorate, state, province, etc.)
      cities: states.map(state => ({
        name: state.name,
        nameAr: state.native || state.name,
        nameFr: state.name,
        type: state.type
      }))
    };
  }
});

// حفظ البيانات
fs.writeFileSync('all-governorates-states.json', JSON.stringify(output, null, 2));

console.log('\n✅ تم الاستخراج بنجاح!');
console.log('📝 تم الحفظ في: all-governorates-states.json');

// إحصائيات
const countriesWithStates = Object.keys(output).length;
const totalStates = Object.values(output).reduce((sum, c) => sum + c.cities.length, 0);

console.log('\n📊 الإحصائيات:');
console.log('  دول فيها محافظات/ولايات:', countriesWithStates);
console.log('  إجمالي المحافظات/الولايات:', totalStates);

// أمثلة
console.log('\n🔍 أمثلة:\n');

// مصر
if (output.EG) {
  console.log(`🇪🇬 مصر - ${output.EG.type}:`);
  console.log(`  العدد: ${output.EG.cities.length}`);
  console.log('  أول 5:');
  output.EG.cities.slice(0, 5).forEach(c => {
    console.log(`    - ${c.nameAr} (${c.name})`);
  });
  console.log('');
}

// السعودية
if (output.SA) {
  console.log(`🇸🇦 السعودية - ${output.SA.type}:`);
  console.log(`  العدد: ${output.SA.cities.length}`);
  console.log('  الكل:');
  output.SA.cities.forEach(c => {
    console.log(`    - ${c.nameAr} (${c.name})`);
  });
  console.log('');
}

// الإمارات
if (output.AE) {
  console.log(`🇦🇪 الإمارات - ${output.AE.type}:`);
  console.log(`  العدد: ${output.AE.cities.length}`);
  output.AE.cities.forEach(c => {
    console.log(`    - ${c.nameAr} (${c.name})`);
  });
}
