import fs from 'fs';
import path from 'path';

// قائمة العواصم للدول الناقصة
const capitals = {
  // Africa
  'ER': { en: 'Asmara', ar: 'أسمرة', fr: 'Asmara' },
  'ET': { en: 'Addis Ababa', ar: 'أديس أبابا', fr: 'Addis-Abeba' },
  'GH': { en: 'Accra', ar: 'أكرا', fr: 'Accra' },
  'GM': { en: 'Banjul', ar: 'بانجول', fr: 'Banjul' },
  'GN': { en: 'Conakry', ar: 'كوناكري', fr: 'Conakry' },
  'GQ': { en: 'Malabo', ar: 'مالابو', fr: 'Malabo' },
  'GW': { en: 'Bissau', ar: 'بيساو', fr: 'Bissau' },
  'KE': { en: 'Nairobi', ar: 'نيروبي', fr: 'Nairobi' },
  'KM': { en: 'Moroni', ar: 'موروني', fr: 'Moroni' },
  'LR': { en: 'Monrovia', ar: 'مونروفيا', fr: 'Monrovia' },
  'LS': { en: 'Maseru', ar: 'ماسيرو', fr: 'Maseru' },
  'LY': { en: 'Tripoli', ar: 'طرابلس', fr: 'Tripoli' },
  'MA': { en: 'Rabat', ar: 'الرباط', fr: 'Rabat' },
  'MG': { en: 'Antananarivo', ar: 'أنتاناناريفو', fr: 'Antananarivo' },
  'ML': { en: 'Bamako', ar: 'باماكو', fr: 'Bamako' },
  'MR': { en: 'Nouakchott', ar: 'نواكشوط', fr: 'Nouakchott' },
  'MU': { en: 'Port Louis', ar: 'بورت لويس', fr: 'Port Louis' },
  'MW': { en: 'Lilongwe', ar: 'ليلونغوي', fr: 'Lilongwe' },
  'MZ': { en: 'Maputo', ar: 'مابوتو', fr: 'Maputo' },
  'NA': { en: 'Windhoek', ar: 'ويندهوك', fr: 'Windhoek' },
  'NE': { en: 'Niamey', ar: 'نيامي', fr: 'Niamey' },
  'NG': { en: 'Abuja', ar: 'أبوجا', fr: 'Abuja' },
  'RW': { en: 'Kigali', ar: 'كيغالي', fr: 'Kigali' },
  'SC': { en: 'Victoria', ar: 'فيكتوريا', fr: 'Victoria' },
  'SD': { en: 'Khartoum', ar: 'الخرطوم', fr: 'Khartoum' },
  'SL': { en: 'Freetown', ar: 'فريتاون', fr: 'Freetown' },
  'SN': { en: 'Dakar', ar: 'داكار', fr: 'Dakar' },
  'SO': { en: 'Mogadishu', ar: 'مقديشو', fr: 'Mogadiscio' },
  'ST': { en: 'Sao Tome', ar: 'ساو تومي', fr: 'Sao Tomé' },
  'SZ': { en: 'Mbabane', ar: 'مبابان', fr: 'Mbabane' },
  'TD': { en: 'N\'Djamena', ar: 'نجامينا', fr: 'N\'Djamena' },
  'TG': { en: 'Lome', ar: 'لومي', fr: 'Lomé' },
  'TN': { en: 'Tunis', ar: 'تونس', fr: 'Tunis' },
  'TZ': { en: 'Dodoma', ar: 'دودوما', fr: 'Dodoma' },
  'UG': { en: 'Kampala', ar: 'كمبالا', fr: 'Kampala' },
  'ZA': { en: 'Pretoria', ar: 'بريتوريا', fr: 'Pretoria' },
  'ZM': { en: 'Lusaka', ar: 'لوساكا', fr: 'Lusaka' },
  'ZW': { en: 'Harare', ar: 'هراري', fr: 'Harare' },
  
  // Asia
  'BN': { en: 'Bandar Seri Begawan', ar: 'بندر سري بكاوان', fr: 'Bandar Seri Begawan' },
  'GE': { en: 'Tbilisi', ar: 'تبليسي', fr: 'Tbilissi' },
  'HK': { en: 'Hong Kong', ar: 'هونغ كونغ', fr: 'Hong Kong' },
  'ID': { en: 'Jakarta', ar: 'جاكرتا', fr: 'Jakarta' },
  'IN': { en: 'New Delhi', ar: 'نيودلهي', fr: 'New Delhi' },
  'IQ': { en: 'Baghdad', ar: 'بغداد', fr: 'Bagdad' },
  'IR': { en: 'Tehran', ar: 'طهران', fr: 'Téhéran' },
  'JO': { en: 'Amman', ar: 'عمان', fr: 'Amman' },
  'JP': { en: 'Tokyo', ar: 'طوكيو', fr: 'Tokyo' },
  'KG': { en: 'Bishkek', ar: 'بيشكيك', fr: 'Bichkek' },
  'KH': { en: 'Phnom Penh', ar: 'بنوم بنه', fr: 'Phnom Penh' },
  'KP': { en: 'Pyongyang', ar: 'بيونغيانغ', fr: 'Pyongyang' },
  'KR': { en: 'Seoul', ar: 'سيول', fr: 'Séoul' },
  'KW': { en: 'Kuwait City', ar: 'مدينة الكويت', fr: 'Koweït' },
  'KZ': { en: 'Astana', ar: 'أستانا', fr: 'Astana' },
  'LA': { en: 'Vientiane', ar: 'فيينتيان', fr: 'Vientiane' },
  'LB': { en: 'Beirut', ar: 'بيروت', fr: 'Beyrouth' },
  'LK': { en: 'Colombo', ar: 'كولومبو', fr: 'Colombo' },
  'MM': { en: 'Naypyidaw', ar: 'نايبيداو', fr: 'Naypyidaw' },
  'MN': { en: 'Ulaanbaatar', ar: 'أولان باتور', fr: 'Oulan-Bator' },
  'MO': { en: 'Macau', ar: 'ماكاو', fr: 'Macao' },
  'MV': { en: 'Male', ar: 'ماليه', fr: 'Malé' },
  'MY': { en: 'Kuala Lumpur', ar: 'كوالالمبور', fr: 'Kuala Lumpur' },
  'NP': { en: 'Kathmandu', ar: 'كاتماندو', fr: 'Katmandou' },
  'OM': { en: 'Muscat', ar: 'مسقط', fr: 'Mascate' },
  'PH': { en: 'Manila', ar: 'مانيلا', fr: 'Manille' },
  'PK': { en: 'Islamabad', ar: 'إسلام آباد', fr: 'Islamabad' },
  'PS': { en: 'Ramallah', ar: 'رام الله', fr: 'Ramallah' },
  'QA': { en: 'Doha', ar: 'الدوحة', fr: 'Doha' },
  'SA': { en: 'Riyadh', ar: 'الرياض', fr: 'Riyad' },
  'SG': { en: 'Singapore', ar: 'سنغافورة', fr: 'Singapour' },
  'SY': { en: 'Damascus', ar: 'دمشق', fr: 'Damas' },
  'TH': { en: 'Bangkok', ar: 'بانكوك', fr: 'Bangkok' },
  'TJ': { en: 'Dushanbe', ar: 'دوشانبي', fr: 'Douchanbé' },
  'TM': { en: 'Ashgabat', ar: 'عشق آباد', fr: 'Achgabat' },
  'TR': { en: 'Ankara', ar: 'أنقرة', fr: 'Ankara' },
  'TW': { en: 'Taipei', ar: 'تايبيه', fr: 'Taipei' },
  'UZ': { en: 'Tashkent', ar: 'طشقند', fr: 'Tachkent' },
  'VN': { en: 'Hanoi', ar: 'هانوي', fr: 'Hanoï' },
  'YE': { en: 'Sanaa', ar: 'صنعاء', fr: 'Sanaa' },
  
  // Europe
  'GR': { en: 'Athens', ar: 'أثينا', fr: 'Athènes' },
  'HR': { en: 'Zagreb', ar: 'زغرب', fr: 'Zagreb' },
  'HU': { en: 'Budapest', ar: 'بودابست', fr: 'Budapest' },
  'IE': { en: 'Dublin', ar: 'دبلن', fr: 'Dublin' },
  'IS': { en: 'Reykjavik', ar: 'ريكيافيك', fr: 'Reykjavik' },
  'IT': { en: 'Rome', ar: 'روما', fr: 'Rome' },
  'LI': { en: 'Vaduz', ar: 'فادوز', fr: 'Vaduz' },
  'LT': { en: 'Vilnius', ar: 'فيلنيوس', fr: 'Vilnius' },
  'LU': { en: 'Luxembourg', ar: 'لوكسمبورغ', fr: 'Luxembourg' },
  'LV': { en: 'Riga', ar: 'ريغا', fr: 'Riga' },
  'MC': { en: 'Monaco', ar: 'موناكو', fr: 'Monaco' },
  'MD': { en: 'Chisinau', ar: 'كيشيناو', fr: 'Chisinau' },
  'MK': { en: 'Skopje', ar: 'سكوبيه', fr: 'Skopje' },
  'MT': { en: 'Valletta', ar: 'فاليتا', fr: 'La Valette' },
  'NL': { en: 'Amsterdam', ar: 'أمستردام', fr: 'Amsterdam' },
  'NO': { en: 'Oslo', ar: 'أوسلو', fr: 'Oslo' },
  'PL': { en: 'Warsaw', ar: 'وارسو', fr: 'Varsovie' },
  'PT': { en: 'Lisbon', ar: 'لشبونة', fr: 'Lisbonne' },
  'RO': { en: 'Bucharest', ar: 'بوخارست', fr: 'Bucarest' },
  'RU': { en: 'Moscow', ar: 'موسكو', fr: 'Moscou' },
  'SE': { en: 'Stockholm', ar: 'ستوكهولم', fr: 'Stockholm' },
  'SI': { en: 'Ljubljana', ar: 'ليوبليانا', fr: 'Ljubljana' },
  'SK': { en: 'Bratislava', ar: 'براتيسلافا', fr: 'Bratislava' },
  'SM': { en: 'San Marino', ar: 'سان مارينو', fr: 'Saint-Marin' },
  'UA': { en: 'Kyiv', ar: 'كييف', fr: 'Kiev' },
  
  // Americas
  'CA': { en: 'Ottawa', ar: 'أوتاوا', fr: 'Ottawa' },
  'GT': { en: 'Guatemala City', ar: 'مدينة غواتيمالا', fr: 'Guatemala' },
  'GY': { en: 'Georgetown', ar: 'جورج تاون', fr: 'Georgetown' },
  'HN': { en: 'Tegucigalpa', ar: 'تيغوسيغالبا', fr: 'Tegucigalpa' },
  'HT': { en: 'Port-au-Prince', ar: 'بورت أو برنس', fr: 'Port-au-Prince' },
  'JM': { en: 'Kingston', ar: 'كينغستون', fr: 'Kingston' },
  'MX': { en: 'Mexico City', ar: 'مكسيكو سيتي', fr: 'Mexico' },
  'NI': { en: 'Managua', ar: 'ماناغوا', fr: 'Managua' },
  'PA': { en: 'Panama City', ar: 'مدينة بنما', fr: 'Panama' },
  'PE': { en: 'Lima', ar: 'ليما', fr: 'Lima' },
  'PY': { en: 'Asuncion', ar: 'أسونسيون', fr: 'Asuncion' },
  'SR': { en: 'Paramaribo', ar: 'باراماريبو', fr: 'Paramaribo' },
  'SV': { en: 'San Salvador', ar: 'سان سلفادور', fr: 'San Salvador' },
  'TT': { en: 'Port of Spain', ar: 'بورت أوف سبين', fr: 'Port-d\'Espagne' },
  'UY': { en: 'Montevideo', ar: 'مونتيفيديو', fr: 'Montevideo' },
  'VE': { en: 'Caracas', ar: 'كاراكاس', fr: 'Caracas' },
  
  // Oceania
  'NZ': { en: 'Wellington', ar: 'ويلينغتون', fr: 'Wellington' },
  'PG': { en: 'Port Moresby', ar: 'بورت مورسبي', fr: 'Port Moresby' },
};

const continents = {
  africa: ['ER', 'ET', 'GH', 'GM', 'GN', 'GQ', 'GW', 'KE', 'KM', 'LR', 'LS', 'LY', 'MA', 'MG', 'ML', 'MR', 'MU', 'MW', 'MZ', 'NA', 'NE', 'NG', 'RE', 'RW', 'SC', 'SD', 'SL', 'SN', 'SO', 'ST', 'SZ', 'TD', 'TG', 'TN', 'TZ', 'UG', 'YT', 'ZA', 'ZM', 'ZW'],
  asia: ['BN', 'GE', 'HK', 'ID', 'IN', 'IQ', 'IR', 'JO', 'JP', 'KG', 'KH', 'KP', 'KR', 'KW', 'KZ', 'LA', 'LB', 'LK', 'MM', 'MN', 'MO', 'MV', 'MY', 'NP', 'OM', 'PH', 'PK', 'PS', 'QA', 'SA', 'SG', 'SY', 'TH', 'TJ', 'TM', 'TR', 'TW', 'UZ', 'VN', 'YE'],
  europe: ['FO', 'GG', 'GI', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'MD', 'MK', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'RU', 'SE', 'SI', 'SJ', 'SK', 'SM', 'UA'],
  americas: ['AI', 'AW', 'CA', 'FK', 'GD', 'GF', 'GL', 'GP', 'GT', 'GY', 'HN', 'HT', 'JM', 'KN', 'KY', 'LC', 'MQ', 'MS', 'MX', 'NI', 'PA', 'PE', 'PM', 'PY', 'SR', 'SV', 'TC', 'TT', 'UY', 'VC', 'VE', 'VG', 'VI'],
  oceania: ['CK', 'KI', 'MH', 'MP', 'NC', 'NR', 'NU', 'NZ', 'PF', 'PG', 'PN', 'PW', 'SB', 'TK', 'TO', 'TV', 'VU', 'WF', 'WS']
};

function updateContinentFile(continent, codes) {
  const filename = `src/data/${continent}.ts`;
  let content = fs.readFileSync(filename, 'utf-8');
  
  let updated = 0;
  codes.forEach(code => {
    if (!capitals[code]) return;
    
    const capital = capitals[code];
    const cityData = `      {\n        "name": "${capital.en}",\n        "nameAr": "${capital.ar}",\n        "nameFr": "${capital.fr}"\n      }`;
    
    // Find the country and add city if cities array is empty
    const countryPattern = new RegExp(`"code":\\s*"${code}",[\\s\\S]*?"cities":\\s*\\[\\s*\\]`, 'g');
    if (countryPattern.test(content)) {
      content = content.replace(
        new RegExp(`("code":\\s*"${code}",[\\s\\S]*?"cities":\\s*)\\[\\s*\\]`),
        `$1[\n${cityData}\n    ]`
      );
      updated++;
      console.log(`✅ Added ${capital.en} to ${code}`);
    }
  });
  
  if (updated > 0) {
    fs.writeFileSync(filename, content, 'utf-8');
    console.log(`📝 Updated ${filename} with ${updated} cities\n`);
  }
}

console.log('🚀 Adding capitals to countries without cities...\n');

Object.entries(continents).forEach(([continent, codes]) => {
  console.log(`\n📍 Processing ${continent}...`);
  updateContinentFile(continent, codes);
});

console.log('\n✅ Done! Rebuild the library with: npm run build');
