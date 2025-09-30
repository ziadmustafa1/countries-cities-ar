const fs = require('fs');
const path = require('path');

// Read SQL file
const sqlPath = path.join(__dirname, '../countries-and-cities-list-with-three-language/countries_db.sql');
const sqlContent = fs.readFileSync(sqlPath, 'utf8');

// Extract countries data
const countriesMatch = sqlContent.match(/INSERT INTO `countries`[^;]+;/s);
if (!countriesMatch) {
  console.error('Could not find countries data');
  process.exit(1);
}

const countriesData = countriesMatch[0];
const countryRegex = /\((\d+),\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'\)/g;
const countries = [];
let match;

while ((match = countryRegex.exec(countriesData)) !== null) {
  countries.push({
    id: parseInt(match[1]),
    nameAr: match[2].replace(/\\\'/g, "'"),
    nameFr: match[3].replace(/\\\'/g, "'"),
    nameEn: match[4].replace(/\\\'/g, "'"),
    code: match[5].toUpperCase()
  });
}

console.log(`Found ${countries.length} countries`);

// Extract cities data
const citiesMatch = sqlContent.match(/INSERT INTO `cities`[^;]+;/s);
if (!citiesMatch) {
  console.error('Could not find cities data');
  process.exit(1);
}

const citiesData = citiesMatch[0];
const cityRegex = /\((\d+),\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*(\d+)\)/g;
const cities = [];

while ((match = cityRegex.exec(citiesData)) !== null) {
  cities.push({
    id: parseInt(match[1]),
    nameEn: match[2].replace(/\\\'/g, "'"),
    nameAr: match[3].replace(/\\\'/g, "'"),
    nameFr: match[4].replace(/\\\'/g, "'"),
    code: match[5],
    countryId: parseInt(match[6])
  });
}

console.log(`Found ${cities.length} cities`);

// Group cities by country
const countriesWithCities = countries.map(country => {
  const countryCities = cities
    .filter(city => city.countryId === country.id)
    .map(city => ({
      name: city.nameEn,
      nameAr: city.nameAr,
      nameFr: city.nameFr
    }));
  
  return {
    code: country.code,
    name: country.nameEn,
    nameAr: country.nameAr,
    nameFr: country.nameFr,
    cities: countryCities
  };
});

// Group by continent (basic geographical grouping)
const africaCodes = ['dz', 'ao', 'bj', 'bw', 'bf', 'bi', 'cm', 'cv', 'cf', 'td', 'km', 'cg', 'cd', 'ci', 'dj', 'eg', 'gq', 'er', 'et', 'ga', 'gm', 'gh', 'gn', 'gw', 'ke', 'ls', 'lr', 'ly', 'mg', 'mw', 'ml', 'mr', 'mu', 'yt', 'ma', 'mz', 'na', 'ne', 'ng', 'rw', 're', 'st', 'sn', 'sc', 'sl', 'so', 'za', 'ss', 'sd', 'sz', 'tz', 'tg', 'tn', 'ug', 'zm', 'zw'];

const asiaCodes = ['af', 'am', 'az', 'bh', 'bd', 'bt', 'bn', 'kh', 'cn', 'ge', 'hk', 'in', 'id', 'ir', 'iq', 'il', 'jp', 'jo', 'kz', 'kw', 'kg', 'la', 'lb', 'mo', 'my', 'mv', 'mn', 'mm', 'np', 'kp', 'om', 'pk', 'ps', 'ph', 'qa', 'sa', 'sg', 'kr', 'lk', 'sy', 'tw', 'tj', 'th', 'tl', 'tr', 'tm', 'ae', 'uz', 'vn', 'ye'];

const europeCodes = ['al', 'ad', 'at', 'by', 'be', 'ba', 'bg', 'hr', 'cy', 'cz', 'dk', 'ee', 'fo', 'fi', 'fr', 'de', 'gi', 'gr', 'gg', 'hu', 'is', 'ie', 'im', 'it', 'je', 'xk', 'lv', 'li', 'lt', 'lu', 'mk', 'mt', 'md', 'mc', 'me', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sm', 'rs', 'sk', 'si', 'es', 'sj', 'se', 'ch', 'ua', 'gb', 'va'];

const americasCodes = ['ai', 'ag', 'ar', 'aw', 'bs', 'bb', 'bz', 'bm', 'bo', 'br', 'ca', 'ky', 'cl', 'co', 'cr', 'cu', 'dm', 'do', 'ec', 'sv', 'fk', 'gf', 'gl', 'gd', 'gp', 'gt', 'gy', 'ht', 'hn', 'jm', 'mq', 'mx', 'ms', 'ni', 'pa', 'py', 'pe', 'pr', 'bl', 'kn', 'lc', 'mf', 'pm', 'vc', 'sr', 'tt', 'tc', 'us', 'uy', 've', 'vg', 'vi'];

const oceaniaCodes = ['as', 'au', 'ck', 'fj', 'pf', 'gu', 'ki', 'mh', 'fm', 'nr', 'nc', 'nz', 'nu', 'nf', 'mp', 'pw', 'pg', 'pn', 'ws', 'sb', 'tk', 'to', 'tv', 'vu', 'wf'];

function groupByContinent(countries) {
  const continents = {
    africa: [],
    asia: [],
    europe: [],
    americas: [],
    oceania: []
  };

  countries.forEach(country => {
    const code = country.code.toLowerCase();
    if (africaCodes.includes(code)) {
      continents.africa.push(country);
    } else if (asiaCodes.includes(code)) {
      continents.asia.push(country);
    } else if (europeCodes.includes(code)) {
      continents.europe.push(country);
    } else if (americasCodes.includes(code)) {
      continents.americas.push(country);
    } else if (oceaniaCodes.includes(code)) {
      continents.oceania.push(country);
    }
  });

  return continents;
}

const continents = groupByContinent(countriesWithCities);

// Write to TypeScript files
function generateTSFile(continentName, countries) {
  const content = `import type { Country } from '../types';

export const ${continentName}Countries: Country[] = ${JSON.stringify(countries, null, 2)};
`;
  
  const filePath = path.join(__dirname, '../src/data', `${continentName}.ts`);
  fs.writeFileSync(filePath, content);
  console.log(`✓ Generated ${continentName}.ts with ${countries.length} countries`);
}

// Generate files for each continent
Object.entries(continents).forEach(([name, countries]) => {
  if (countries.length > 0) {
    generateTSFile(name, countries);
  }
});

// Update data/index.ts
const indexContent = `import type { Country } from '../types';
import { africaCountries } from './africa';
import { asiaCountries } from './asia';
import { europeCountries } from './europe';
import { americasCountries } from './americas';
import { oceaniaCountries } from './oceania';

/**
 * All countries from all continents (${countries.length} countries total)
 */
export const allCountries: Country[] = [
  ...africaCountries,
  ...asiaCountries,
  ...europeCountries,
  ...americasCountries,
  ...oceaniaCountries,
];

export { africaCountries, asiaCountries, europeCountries, americasCountries, oceaniaCountries };
`;

fs.writeFileSync(path.join(__dirname, '../src/data/index.ts'), indexContent);
console.log('✓ Updated data/index.ts');

console.log('\n✅ Conversion complete!');
console.log(`Total: ${countries.length} countries, ${cities.length} cities`);
