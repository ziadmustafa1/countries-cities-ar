import fs from 'fs';

console.log('🌍 دمج كل بيانات العالم من قاعدة البيانات...\n');

// قراءة البيانات من قاعدة البيانات
const dbCountries = JSON.parse(
  fs.readFileSync('countries-states-cities-database/json/countries.json', 'utf-8')
);

const dbStates = JSON.parse(
  fs.readFileSync('countries-states-cities-database/json/states.json', 'utf-8')
);

// قراءة البيانات الحالية
const africaData = fs.readFileSync('src/data/africa.ts', 'utf-8');
const americasData = fs.readFileSync('src/data/americas.ts', 'utf-8');
const asiaData = fs.readFileSync('src/data/asia.ts', 'utf-8');
const europeData = fs.readFileSync('src/data/europe.ts', 'utf-8');
const oceaniaData = fs.readFileSync('src/data/oceania.ts', 'utf-8');

// تجميع المحافظات حسب الدولة
const statesByCountry = {};
dbStates.forEach(state => {
  const code = state.country_code;
  if (!statesByCountry[code]) {
    statesByCountry[code] = [];
  }
  statesByCountry[code].push({
    name: state.name,
    nameAr: state.name_native || state.name,
    nameFr: state.name // سنحتاج لإضافة الترجمة الفرنسية لاحقاً
  });
});

// الترجمات العربية المعروفة للدول
const arabicCountryNames = {
  'AF': 'أفغانستان',
  'AL': 'ألبانيا',
  'DZ': 'الجزائر',
  'AS': 'ساموا الأمريكية',
  'AD': 'أندورا',
  'AO': 'أنغولا',
  'AI': 'أنغيلا',
  'AQ': 'القارة القطبية الجنوبية',
  'AG': 'أنتيغوا وباربودا',
  'AR': 'الأرجنتين',
  'AM': 'أرمينيا',
  'AW': 'أروبا',
  'AU': 'أستراليا',
  'AT': 'النمسا',
  'AZ': 'أذربيجان',
  'BS': 'الباهاما',
  'BH': 'البحرين',
  'BD': 'بنغلاديش',
  'BB': 'بربادوس',
  'BY': 'روسيا البيضاء',
  'BE': 'بلجيكا',
  'BZ': 'بليز',
  'BJ': 'بنين',
  'BM': 'برمودا',
  'BT': 'بوتان',
  'BO': 'بوليفيا',
  'BA': 'البوسنة والهرسك',
  'BW': 'بوتسوانا',
  'BR': 'البرازيل',
  'BN': 'بروناي',
  'BG': 'بلغاريا',
  'BF': 'بوركينا فاسو',
  'BI': 'بوروندي',
  'KH': 'كمبوديا',
  'CM': 'الكاميرون',
  'CA': 'كندا',
  'CV': 'الرأس الأخضر',
  'KY': 'جزر كايمان',
  'CF': 'جمهورية أفريقيا الوسطى',
  'TD': 'تشاد',
  'CL': 'تشيلي',
  'CN': 'الصين',
  'CO': 'كولومبيا',
  'KM': 'جزر القمر',
  'CG': 'الكونغو',
  'CD': 'جمهورية الكونغو الديمقراطية',
  'CR': 'كوستاريكا',
  'CI': 'ساحل العاج',
  'HR': 'كرواتيا',
  'CU': 'كوبا',
  'CY': 'قبرص',
  'CZ': 'التشيك',
  'DK': 'الدنمارك',
  'DJ': 'جيبوتي',
  'DM': 'دومينيكا',
  'DO': 'جمهورية الدومينيكان',
  'EC': 'الإكوادور',
  'EG': 'مصر',
  'SV': 'السلفادور',
  'GQ': 'غينيا الاستوائية',
  'ER': 'إريتريا',
  'EE': 'إستونيا',
  'ET': 'إثيوبيا',
  'FJ': 'فيجي',
  'FI': 'فنلندا',
  'FR': 'فرنسا',
  'GA': 'الغابون',
  'GM': 'غامبيا',
  'GE': 'جورجيا',
  'DE': 'ألمانيا',
  'GH': 'غانا',
  'GR': 'اليونان',
  'GD': 'غرينادا',
  'GT': 'غواتيمالا',
  'GN': 'غينيا',
  'GW': 'غينيا بيساو',
  'GY': 'غيانا',
  'HT': 'هايتي',
  'HN': 'هندوراس',
  'HU': 'المجر',
  'IS': 'آيسلندا',
  'IN': 'الهند',
  'ID': 'إندونيسيا',
  'IR': 'إيران',
  'IQ': 'العراق',
  'IE': 'أيرلندا',
  'IL': 'إسرائيل',
  'IT': 'إيطاليا',
  'JM': 'جامايكا',
  'JP': 'اليابان',
  'JO': 'الأردن',
  'KZ': 'كازاخستان',
  'KE': 'كينيا',
  'KI': 'كيريباتي',
  'KP': 'كوريا الشمالية',
  'KR': 'كوريا الجنوبية',
  'KW': 'الكويت',
  'KG': 'قيرغيزستان',
  'LA': 'لاوس',
  'LV': 'لاتفيا',
  'LB': 'لبنان',
  'LS': 'ليسوتو',
  'LR': 'ليبيريا',
  'LY': 'ليبيا',
  'LI': 'ليختنشتاين',
  'LT': 'ليتوانيا',
  'LU': 'لوكسمبورغ',
  'MK': 'مقدونيا الشمالية',
  'MG': 'مدغشقر',
  'MW': 'مالاوي',
  'MY': 'ماليزيا',
  'MV': 'جزر المالديف',
  'ML': 'مالي',
  'MT': 'مالطا',
  'MH': 'جزر مارشال',
  'MR': 'موريتانيا',
  'MU': 'موريشيوس',
  'MX': 'المكسيك',
  'FM': 'ميكرونيزيا',
  'MD': 'مولدوفا',
  'MC': 'موناكو',
  'MN': 'منغوليا',
  'ME': 'الجبل الأسود',
  'MA': 'المغرب',
  'MZ': 'موزمبيق',
  'MM': 'ميانمار',
  'NA': 'ناميبيا',
  'NR': 'ناورو',
  'NP': 'نيبال',
  'NL': 'هولندا',
  'NZ': 'نيوزيلندا',
  'NI': 'نيكاراغوا',
  'NE': 'النيجر',
  'NG': 'نيجيريا',
  'NO': 'النرويج',
  'OM': 'سلطنة عُمان',
  'PK': 'باكستان',
  'PW': 'بالاو',
  'PS': 'فلسطين',
  'PA': 'بنما',
  'PG': 'بابوا غينيا الجديدة',
  'PY': 'باراغواي',
  'PE': 'بيرو',
  'PH': 'الفلبين',
  'PL': 'بولندا',
  'PT': 'البرتغال',
  'QA': 'قطر',
  'RO': 'رومانيا',
  'RU': 'روسيا',
  'RW': 'رواندا',
  'KN': 'سانت كيتس ونيفيس',
  'LC': 'سانت لوسيا',
  'VC': 'سانت فنسنت والغرينادين',
  'WS': 'ساموا',
  'SM': 'سان مارينو',
  'ST': 'ساو تومي وبرينسيبي',
  'SA': 'المملكة العربية السعودية',
  'SN': 'السنغال',
  'RS': 'صربيا',
  'SC': 'سيشل',
  'SL': 'سيراليون',
  'SG': 'سنغافورة',
  'SK': 'سلوفاكيا',
  'SI': 'سلوفينيا',
  'SB': 'جزر سليمان',
  'SO': 'الصومال',
  'ZA': 'جنوب أفريقيا',
  'SS': 'جنوب السودان',
  'ES': 'إسبانيا',
  'LK': 'سريلانكا',
  'SD': 'السودان',
  'SR': 'سورينام',
  'SZ': 'إسواتيني',
  'SE': 'السويد',
  'CH': 'سويسرا',
  'SY': 'سوريا',
  'TW': 'تايوان',
  'TJ': 'طاجيكستان',
  'TZ': 'تنزانيا',
  'TH': 'تايلاند',
  'TL': 'تيمور الشرقية',
  'TG': 'توغو',
  'TO': 'تونغا',
  'TT': 'ترينيداد وتوباغو',
  'TN': 'تونس',
  'TR': 'تركيا',
  'TM': 'تركمانستان',
  'TV': 'توفالو',
  'UG': 'أوغندا',
  'UA': 'أوكرانيا',
  'AE': 'الإمارات العربية المتحدة',
  'GB': 'المملكة المتحدة',
  'US': 'الولايات المتحدة',
  'UY': 'الأوروغواي',
  'UZ': 'أوزبكستان',
  'VU': 'فانواتو',
  'VA': 'الفاتيكان',
  'VE': 'فنزويلا',
  'VN': 'فيتنام',
  'YE': 'اليمن',
  'ZM': 'زامبيا',
  'ZW': 'زيمبابوي',
  // إضافات
  'AX': 'جزر أولاند',
  'BQ': 'بونير وسانت أوستاتيوس وسابا',
  'CW': 'كوراساو',
  'GU': 'غوام',
  'JE': 'جيرسي',
  'XK': 'كوسوفو',
  'RE': 'ريونيون',
  'BL': 'سان بارتيلمي',
  'SX': 'سانت مارتن',
  'TC': 'جزر توركس وكايكوس',
  'VI': 'جزر العذراء الأمريكية'
};

// تحضير البيانات الكاملة
const completeWorldData = {
  missingCountries: [],
  updatedCountries: [],
  totalStates: 0
};

// معالجة كل دولة من قاعدة البيانات
dbCountries.forEach(dbCountry => {
  const code = dbCountry.iso2;
  const states = statesByCountry[code] || [];
  
  if (states.length > 0) {
    const countryData = {
      code: code,
      name: dbCountry.name,
      nameAr: arabicCountryNames[code] || dbCountry.native || dbCountry.name,
      nameFr: dbCountry.name, // يمكن تحسينها لاحقاً
      region: dbCountry.region,
      subregion: dbCountry.subregion,
      statesCount: states.length,
      states: states
    };
    
    // تحديد إذا كانت الدولة موجودة في أي ملف
    const isInAfrica = africaData.includes(`"code": "${code}"`);
    const isInAmericas = americasData.includes(`"code": "${code}"`);
    const isInAsia = asiaData.includes(`"code": "${code}"`);
    const isInEurope = europeData.includes(`"code": "${code}"`);
    const isInOceania = oceaniaData.includes(`"code": "${code}"`);
    
    if (!isInAfrica && !isInAmericas && !isInAsia && !isInEurope && !isInOceania) {
      completeWorldData.missingCountries.push(countryData);
    } else {
      completeWorldData.updatedCountries.push(countryData);
    }
    
    completeWorldData.totalStates += states.length;
  }
});

// حفظ البيانات الكاملة
fs.writeFileSync(
  'output/complete-world-data.json',
  JSON.stringify(completeWorldData, null, 2),
  'utf-8'
);

console.log('📊 النتائج:');
console.log(`   دول مفقودة: ${completeWorldData.missingCountries.length}`);
console.log(`   دول للتحديث: ${completeWorldData.updatedCountries.length}`);
console.log(`   إجمالي المحافظات: ${completeWorldData.totalStates}`);

// إنشاء سكريبت لإضافة الدول المفقودة
const missingByRegion = {
  'Africa': [],
  'Americas': [],
  'Asia': [],
  'Europe': [],
  'Oceania': []
};

completeWorldData.missingCountries.forEach(country => {
  const region = country.region || 'Other';
  if (missingByRegion[region]) {
    missingByRegion[region].push(country);
  }
});

console.log('\n📍 الدول المفقودة حسب المنطقة:');
Object.keys(missingByRegion).forEach(region => {
  if (missingByRegion[region].length > 0) {
    console.log(`\n${region}:`);
    missingByRegion[region].forEach(c => {
      console.log(`   - ${c.nameAr} (${c.code}): ${c.statesCount} محافظة`);
    });
  }
});

// إنشاء ملف للدول المفقودة مع محافظاتها
fs.writeFileSync(
  'output/missing-countries.json',
  JSON.stringify(missingByRegion, null, 2),
  'utf-8'
);

console.log('\n✅ تم حفظ البيانات في:');
console.log('   - output/complete-world-data.json');
console.log('   - output/missing-countries.json');
