import fs from 'fs';

console.log('🌍 دمج كل بيانات دول العالم (250 دولة، 5099 محافظة)...\n');

// قراءة البيانات من قاعدة البيانات
const dbCountries = JSON.parse(
  fs.readFileSync('countries-states-cities-database/json/countries.json', 'utf-8')
);

const dbStates = JSON.parse(
  fs.readFileSync('countries-states-cities-database/json/states.json', 'utf-8')
);

// تجميع المحافظات حسب الدولة
const statesByCountry = {};
dbStates.forEach(state => {
  const code = state.country_code;
  if (!statesByCountry[code]) {
    statesByCountry[code] = [];
  }
  statesByCountry[code].push({
    name: state.name,
    nameAr: "",  // سيتم إضافتها لاحقاً
    nameFr: state.name
  });
});

// الترجمات العربية للدول
const arabicCountryNames = {
  'AF': 'أفغانستان',
  'AL': 'ألبانيا', 
  'DZ': 'الجزائر',
  'AS': 'ساموا الأمريكية',
  'AD': 'أندورا',
  'AO': 'أنغولا',
  'AI': 'أنغيلا',
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
  'CK': 'جزر كوك',
  'CR': 'كوستاريكا',
  'CI': 'ساحل العاج',
  'HR': 'كرواتيا',
  'CU': 'كوبا',
  'CW': 'كوراساو',
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
  'FK': 'جزر فوكلاند',
  'FO': 'جزر فارو',
  'FJ': 'فيجي',
  'FI': 'فنلندا',
  'FR': 'فرنسا',
  'GF': 'غيانا الفرنسية',
  'PF': 'بولينيزيا الفرنسية',
  'GA': 'الغابون',
  'GM': 'غامبيا',
  'GE': 'جورجيا',
  'DE': 'ألمانيا',
  'GH': 'غانا',
  'GI': 'جبل طارق',
  'GR': 'اليونان',
  'GL': 'غرينلاند',
  'GD': 'غرينادا',
  'GP': 'غوادلوب',
  'GU': 'غوام',
  'GT': 'غواتيمالا',
  'GG': 'غيرنزي',
  'GN': 'غينيا',
  'GW': 'غينيا بيساو',
  'GY': 'غيانا',
  'HT': 'هايتي',
  'HN': 'هندوراس',
  'HK': 'هونغ كونغ',
  'HU': 'المجر',
  'IS': 'آيسلندا',
  'IN': 'الهند',
  'ID': 'إندونيسيا',
  'IR': 'إيران',
  'IQ': 'العراق',
  'IE': 'أيرلندا',
  'IM': 'جزيرة مان',
  'IL': 'إسرائيل',
  'IT': 'إيطاليا',
  'JM': 'جامايكا',
  'JP': 'اليابان',
  'JE': 'جيرسي',
  'JO': 'الأردن',
  'KZ': 'كازاخستان',
  'KE': 'كينيا',
  'KI': 'كيريباتي',
  'KP': 'كوريا الشمالية',
  'KR': 'كوريا الجنوبية',
  'XK': 'كوسوفو',
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
  'MO': 'ماكاو',
  'MK': 'مقدونيا الشمالية',
  'MG': 'مدغشقر',
  'MW': 'مالاوي',
  'MY': 'ماليزيا',
  'MV': 'جزر المالديف',
  'ML': 'مالي',
  'MT': 'مالطا',
  'MH': 'جزر مارشال',
  'MQ': 'مارتينيك',
  'MR': 'موريتانيا',
  'MU': 'موريشيوس',
  'YT': 'مايوت',
  'MX': 'المكسيك',
  'FM': 'ميكرونيزيا',
  'MD': 'مولدوفا',
  'MC': 'موناكو',
  'MN': 'منغوليا',
  'ME': 'الجبل الأسود',
  'MS': 'مونتسيرات',
  'MA': 'المغرب',
  'MZ': 'موزمبيق',
  'MM': 'ميانمار',
  'NA': 'ناميبيا',
  'NR': 'ناورو',
  'NP': 'نيبال',
  'NL': 'هولندا',
  'NC': 'كاليدونيا الجديدة',
  'NZ': 'نيوزيلندا',
  'NI': 'نيكاراغوا',
  'NE': 'النيجر',
  'NG': 'نيجيريا',
  'NU': 'نيوي',
  'NF': 'جزيرة نورفولك',
  'MP': 'جزر ماريانا الشمالية',
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
  'PN': 'جزر بيتكيرن',
  'PL': 'بولندا',
  'PT': 'البرتغال',
  'PR': 'بورتوريكو',
  'QA': 'قطر',
  'RE': 'ريونيون',
  'RO': 'رومانيا',
  'RU': 'روسيا',
  'RW': 'رواندا',
  'BL': 'سان بارتيلمي',
  'SH': 'سانت هيلينا',
  'KN': 'سانت كيتس ونيفيس',
  'LC': 'سانت لوسيا',
  'MF': 'سان مارتن',
  'PM': 'سان بيير وميكلون',
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
  'SX': 'سانت مارتن',
  'SK': 'سلوفاكيا',
  'SI': 'سلوفينيا',
  'SB': 'جزر سليمان',
  'SO': 'الصومال',
  'ZA': 'جنوب أفريقيا',
  'GS': 'جورجيا الجنوبية وجزر ساندويتش الجنوبية',
  'SS': 'جنوب السودان',
  'ES': 'إسبانيا',
  'LK': 'سريلانكا',
  'SD': 'السودان',
  'SR': 'سورينام',
  'SJ': 'سفالبارد وجان ماين',
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
  'TK': 'توكيلاو',
  'TO': 'تونغا',
  'TT': 'ترينيداد وتوباغو',
  'TN': 'تونس',
  'TR': 'تركيا',
  'TM': 'تركمانستان',
  'TC': 'جزر توركس وكايكوس',
  'TV': 'توفالو',
  'UG': 'أوغندا',
  'UA': 'أوكرانيا',
  'AE': 'الإمارات العربية المتحدة',
  'GB': 'المملكة المتحدة',
  'US': 'الولايات المتحدة',
  'UM': 'جزر الولايات المتحدة النائية',
  'UY': 'الأوروغواي',
  'UZ': 'أوزبكستان',
  'VU': 'فانواتو',
  'VA': 'الفاتيكان',
  'VE': 'فنزويلا',
  'VN': 'فيتنام',
  'VG': 'جزر العذراء البريطانية',
  'VI': 'جزر العذراء الأمريكية',
  'WF': 'واليس وفوتونا',
  'EH': 'الصحراء الغربية',
  'YE': 'اليمن',
  'ZM': 'زامبيا',
  'ZW': 'زيمبابوي',
  'AX': 'جزر أولاند',
  'BQ': 'بونير وسانت أوستاتيوس وسابا'
};

// تحضير البيانات حسب القارات
const continents = {
  africa: [],
  americas: [],
  asia: [],
  europe: [],
  oceania: []
};

// معالجة كل دولة
dbCountries.forEach(country => {
  const code = country.iso2;
  const states = statesByCountry[code] || [];
  
  const countryData = {
    code: code,
    name: country.name,
    nameAr: arabicCountryNames[code] || country.name,
    nameFr: country.name,
    cities: states
  };
  
  // تحديد القارة
  const region = country.region?.toLowerCase() || '';
  if (region.includes('africa')) {
    continents.africa.push(countryData);
  } else if (region.includes('america') || region === 'americas') {
    continents.americas.push(countryData);
  } else if (region.includes('asia')) {
    continents.asia.push(countryData);
  } else if (region.includes('europe')) {
    continents.europe.push(countryData);
  } else if (region.includes('ocean')) {
    continents.oceania.push(countryData);
  } else {
    // وضعها في القارة الأقرب
    if (country.subregion?.includes('Caribbean')) {
      continents.americas.push(countryData);
    } else {
      // افتراضياً في آسيا
      continents.asia.push(countryData);
    }
  }
});

// إنشاء الملفات الجديدة
Object.keys(continents).forEach(continent => {
  const data = continents[continent];
  const tsContent = `import { Country } from '../types';

export const ${continent}Data: Country[] = ${JSON.stringify(data, null, 2)};
`;

  fs.writeFileSync(
    `src/data/${continent}-complete.ts`,
    tsContent,
    'utf-8'
  );
  
  console.log(`✅ ${continent}: ${data.length} دولة، ${data.reduce((sum, c) => sum + c.cities.length, 0)} محافظة`);
});

// إحصائيات نهائية
const totalCountries = Object.values(continents).reduce((sum, arr) => sum + arr.length, 0);
const totalStates = Object.values(continents).reduce((sum, arr) => 
  sum + arr.reduce((s, c) => s + c.cities.length, 0), 0
);

console.log('\n📊 الإجمالي:');
console.log(`   ${totalCountries} دولة`);
console.log(`   ${totalStates} محافظة`);

console.log('\n✅ تم إنشاء الملفات:');
console.log('   src/data/africa-complete.ts');
console.log('   src/data/americas-complete.ts');
console.log('   src/data/asia-complete.ts');
console.log('   src/data/europe-complete.ts');
console.log('   src/data/oceania-complete.ts');

console.log('\n⚠️ ملاحظة: الترجمات العربية للمحافظات تحتاج إضافة يدوية أو من مصدر آخر');
