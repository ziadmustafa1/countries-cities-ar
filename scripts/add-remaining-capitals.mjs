import fs from 'fs';

// المدن الرئيسية للجزر والمناطق المتبقية
const remainingCapitals = {
  // Africa territories
  'RE': { en: 'Saint-Denis', ar: 'سان دوني', fr: 'Saint-Denis' },
  'YT': { en: 'Mamoudzou', ar: 'ماموتزو', fr: 'Mamoudzou' },
  
  // Europe territories
  'FO': { en: 'Torshavn', ar: 'تورسهافن', fr: 'Tórshavn' },
  'GG': { en: 'Saint Peter Port', ar: 'سانت بيتر بورت', fr: 'Saint-Pierre-Port' },
  'GI': { en: 'Gibraltar', ar: 'جبل طارق', fr: 'Gibraltar' },
  'SJ': { en: 'Longyearbyen', ar: 'لونجييربين', fr: 'Longyearbyen' },
  
  // Americas territories
  'AI': { en: 'The Valley', ar: 'ذا فالي', fr: 'The Valley' },
  'AW': { en: 'Oranjestad', ar: 'أورانييستاد', fr: 'Oranjestad' },
  'FK': { en: 'Stanley', ar: 'ستانلي', fr: 'Stanley' },
  'GD': { en: 'St. George\'s', ar: 'سانت جورج', fr: 'Saint-Georges' },
  'GF': { en: 'Cayenne', ar: 'كايين', fr: 'Cayenne' },
  'GL': { en: 'Nuuk', ar: 'نوك', fr: 'Nuuk' },
  'GP': { en: 'Basse-Terre', ar: 'باس تير', fr: 'Basse-Terre' },
  'KN': { en: 'Basseterre', ar: 'باستير', fr: 'Basseterre' },
  'KY': { en: 'George Town', ar: 'جورج تاون', fr: 'George Town' },
  'LC': { en: 'Castries', ar: 'كاستريس', fr: 'Castries' },
  'MQ': { en: 'Fort-de-France', ar: 'فور دو فرانس', fr: 'Fort-de-France' },
  'MS': { en: 'Plymouth', ar: 'بليموث', fr: 'Plymouth' },
  'PM': { en: 'Saint-Pierre', ar: 'سان بيير', fr: 'Saint-Pierre' },
  'TC': { en: 'Cockburn Town', ar: 'كوكبيرن تاون', fr: 'Cockburn Town' },
  'VC': { en: 'Kingstown', ar: 'كينغستاون', fr: 'Kingstown' },
  'VG': { en: 'Road Town', ar: 'رود تاون', fr: 'Road Town' },
  'VI': { en: 'Charlotte Amalie', ar: 'شارلوت أمالي', fr: 'Charlotte-Amélie' },
  
  // Oceania territories
  'CK': { en: 'Avarua', ar: 'أفاروا', fr: 'Avarua' },
  'KI': { en: 'Tarawa', ar: 'تاراوا', fr: 'Tarawa' },
  'MH': { en: 'Majuro', ar: 'ماجورو', fr: 'Majuro' },
  'MP': { en: 'Saipan', ar: 'سايبان', fr: 'Saipan' },
  'NC': { en: 'Noumea', ar: 'نوميا', fr: 'Nouméa' },
  'NR': { en: 'Yaren', ar: 'يارين', fr: 'Yaren' },
  'NU': { en: 'Alofi', ar: 'ألوفي', fr: 'Alofi' },
  'PF': { en: 'Papeete', ar: 'بابيتي', fr: 'Papeete' },
  'PN': { en: 'Adamstown', ar: 'آدمزتاون', fr: 'Adamstown' },
  'PW': { en: 'Ngerulmud', ar: 'نجيرولمود', fr: 'Ngerulmud' },
  'SB': { en: 'Honiara', ar: 'هونيارا', fr: 'Honiara' },
  'TK': { en: 'Nukunonu', ar: 'نوكونونو', fr: 'Nukunonu' },
  'TO': { en: 'Nuku\'alofa', ar: 'نوكو ألوفا', fr: 'Nuku\'alofa' },
  'TV': { en: 'Funafuti', ar: 'فونافوتي', fr: 'Funafuti' },
  'VU': { en: 'Port Vila', ar: 'بورت فيلا', fr: 'Port-Vila' },
  'WF': { en: 'Mata-Utu', ar: 'ماتا أوتو', fr: 'Mata-Utu' },
  'WS': { en: 'Apia', ar: 'آبيا', fr: 'Apia' }
};

const continentMap = {
  africa: ['RE', 'YT'],
  europe: ['FO', 'GG', 'GI', 'SJ'],
  americas: ['AI', 'AW', 'FK', 'GD', 'GF', 'GL', 'GP', 'KN', 'KY', 'LC', 'MQ', 'MS', 'PM', 'TC', 'VC', 'VG', 'VI'],
  oceania: ['CK', 'KI', 'MH', 'MP', 'NC', 'NR', 'NU', 'PF', 'PN', 'PW', 'SB', 'TK', 'TO', 'TV', 'VU', 'WF', 'WS']
};

function updateContinentFile(continent, codes) {
  const filename = `src/data/${continent}.ts`;
  let content = fs.readFileSync(filename, 'utf-8');
  
  let updated = 0;
  codes.forEach(code => {
    if (!remainingCapitals[code]) return;
    
    const capital = remainingCapitals[code];
    const cityData = `      {\n        "name": "${capital.en}",\n        "nameAr": "${capital.ar}",\n        "nameFr": "${capital.fr}"\n      }`;
    
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

console.log('🚀 Adding remaining capitals...\n');

Object.entries(continentMap).forEach(([continent, codes]) => {
  console.log(`\n📍 Processing ${continent}...`);
  updateContinentFile(continent, codes);
});

console.log('\n✅ Done! Rebuild with: npm run build');
