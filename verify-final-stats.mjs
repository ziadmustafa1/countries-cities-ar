import { allCountries } from './dist/index.js';

console.log('🌍 الإحصائيات النهائية للمكتبة:\n');
console.log('===============================================\n');

// الإحصائيات الأساسية
const totalCountries = allCountries.length;
const totalStates = allCountries.reduce((sum, c) => sum + c.cities.length, 0);
const countriesWithStates = allCountries.filter(c => c.cities.length > 0).length;
const countriesWithoutStates = allCountries.filter(c => c.cities.length === 0).length;

console.log('📊 الأرقام:');
console.log(`   إجمالي الدول: ${totalCountries}`);
console.log(`   دول فيها محافظات: ${countriesWithStates}`);
console.log(`   دول بدون محافظات: ${countriesWithoutStates}`);
console.log(`   إجمالي المحافظات/الولايات: ${totalStates}\n`);

// تحليل الترجمات العربية
let perfectArabic = 0;
let partialArabic = 0;
let noArabic = 0;

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

console.log('🔤 الترجمات العربية للمحافظات:');
console.log(`   ✅ ترجمات عربية صحيحة: ${perfectArabic} (${((perfectArabic/totalStates)*100).toFixed(1)}%)`);
console.log(`   ⚠️ ترجمات جزئية: ${partialArabic}`);
console.log(`   ❌ بدون ترجمة: ${noArabic}\n`);

// الدول العربية
const arabCountries = [
  'EG', 'SA', 'AE', 'IQ', 'SY', 'JO', 'LB', 'KW', 'OM', 'QA', 'YE',
  'BH', 'PS', 'DZ', 'TN', 'MA', 'LY', 'SD', 'MR', 'SO', 'DJ', 'KM'
];

console.log('🌍 الدول العربية (22 دولة):');
console.log('================================');

arabCountries.forEach(code => {
  const country = allCountries.find(c => c.code === code);
  if (country) {
    const arabicStates = country.cities.filter(c => 
      c.nameAr && c.nameAr !== "" && c.nameAr !== c.name && !c.nameAr.match(/[a-zA-Z]/)
    ).length;
    
    const percentage = country.cities.length > 0 ? 
      ((arabicStates / country.cities.length) * 100).toFixed(0) : 0;
    
    const status = arabicStates === country.cities.length ? '✅' : 
                   arabicStates > 0 ? '🟡' : '🔴';
    
    console.log(`   ${status} ${country.nameAr} (${code}): ${arabicStates}/${country.cities.length} محافظة (${percentage}%)`);
  }
});

// أكبر الدول
console.log('\n🏆 أكبر 10 دول (عدد المحافظات):');
const sorted = [...allCountries].sort((a, b) => b.cities.length - a.cities.length);
sorted.slice(0, 10).forEach((country, i) => {
  console.log(`   ${i+1}. ${country.nameAr} (${country.code}): ${country.cities.length} محافظة`);
});

// القارات
const byContinent = {
  africa: 0,
  americas: 0,
  asia: 0,
  europe: 0,
  oceania: 0
};

// تحديد القارة بناءً على الكود (تقريبي)
const continentMapping = {
  // Africa
  DZ:1, AO:1, BJ:1, BW:1, BF:1, BI:1, CM:1, CV:1, CF:1, TD:1, KM:1, CG:1, CD:1, CI:1, DJ:1, EG:1, GQ:1, ER:1, ET:1, GA:1, GM:1, GH:1, GN:1, GW:1, KE:1, LS:1, LR:1, LY:1, MG:1, MW:1, ML:1, MR:1, MU:1, MA:1, MZ:1, NA:1, NE:1, NG:1, RE:1, RW:1, ST:1, SN:1, SC:1, SL:1, SO:1, ZA:1, SS:1, SD:1, SZ:1, TZ:1, TG:1, TN:1, UG:1, ZM:1, ZW:1, YT:1,
  // Americas
  AI:2, AG:2, AR:2, AW:2, BS:2, BB:2, BZ:2, BM:2, BO:2, BR:2, VG:2, CA:2, KY:2, CL:2, CO:2, CR:2, CU:2, CW:2, DM:2, DO:2, EC:2, SV:2, FK:2, GF:2, GL:2, GD:2, GP:2, GT:2, GY:2, HT:2, HN:2, JM:2, MQ:2, MX:2, MS:2, NI:2, PA:2, PY:2, PE:2, PR:2, BL:2, KN:2, LC:2, MF:2, PM:2, VC:2, SX:2, SR:2, TT:2, TC:2, US:2, UY:2, VI:2, VE:2,
  // Asia
  AF:3, AM:3, AZ:3, BH:3, BD:3, BT:3, BN:3, KH:3, CN:3, CY:3, GE:3, HK:3, IN:3, ID:3, IR:3, IQ:3, IL:3, JP:3, JO:3, KZ:3, KW:3, KG:3, LA:3, LB:3, MO:3, MY:3, MV:3, MN:3, MM:3, NP:3, KP:3, OM:3, PK:3, PS:3, PH:3, QA:3, SA:3, SG:3, KR:3, LK:3, SY:3, TW:3, TJ:3, TH:3, TL:3, TR:3, TM:3, AE:3, UZ:3, VN:3, YE:3,
  // Europe
  AL:4, AD:4, AT:4, BY:4, BE:4, BA:4, BG:4, HR:4, CZ:4, DK:4, EE:4, FO:4, FI:4, FR:4, DE:4, GI:4, GR:4, GG:4, VA:4, HU:4, IS:4, IE:4, IM:4, IT:4, JE:4, XK:4, LV:4, LI:4, LT:4, LU:4, MK:4, MT:4, MD:4, MC:4, ME:4, NL:4, NO:4, PL:4, PT:4, RO:4, RU:4, SM:4, RS:4, SK:4, SI:4, ES:4, SJ:4, SE:4, CH:4, UA:4, GB:4, AX:4,
  // Oceania
  AS:5, AU:5, CK:5, FJ:5, PF:5, GU:5, KI:5, MH:5, FM:5, NR:5, NC:5, NZ:5, NU:5, NF:5, MP:5, PW:5, PG:5, PN:5, WS:5, SB:5, TK:5, TO:5, TV:5, VU:5, WF:5
};

allCountries.forEach(country => {
  const continent = continentMapping[country.code];
  if (continent === 1) byContinent.africa += country.cities.length;
  else if (continent === 2) byContinent.americas += country.cities.length;
  else if (continent === 3) byContinent.asia += country.cities.length;
  else if (continent === 4) byContinent.europe += country.cities.length;
  else if (continent === 5) byContinent.oceania += country.cities.length;
});

console.log('\n🌍 توزيع المحافظات حسب القارات:');
console.log(`   أفريقيا: ${byContinent.africa}`);
console.log(`   الأمريكتين: ${byContinent.americas}`);
console.log(`   آسيا: ${byContinent.asia}`);
console.log(`   أوروبا: ${byContinent.europe}`);
console.log(`   أوقيانوسيا: ${byContinent.oceania}`);

console.log('\n✅ المكتبة جاهزة!');
console.log(`   📦 الحجم: ~540KB`);
console.log(`   🌍 ${totalCountries} دولة`);
console.log(`   🏛️ ${totalStates} محافظة/ولاية/إقليم`);
console.log(`   🔤 3 لغات (عربي، إنجليزي، فرنسي)`);
