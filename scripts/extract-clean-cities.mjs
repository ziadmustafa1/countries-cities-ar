import fs from 'fs';

console.log('🧹 Extracting Clean Cities Data...\n');

// Read database
const countriesData = JSON.parse(fs.readFileSync('countries-states-cities-database/json/countries.json', 'utf-8'));
const citiesData = JSON.parse(fs.readFileSync('countries-states-cities-database/json/cities.json', 'utf-8'));

console.log('📊 Database loaded:');
console.log('  Countries:', countriesData.length);
console.log('  Cities:', citiesData.length);

// Group cities by country
const citiesByCountry = {};
citiesData.forEach(city => {
  if (!citiesByCountry[city.country_code]) {
    citiesByCountry[city.country_code] = [];
  }
  citiesByCountry[city.country_code].push(city);
});

// Get top cities for each country (by population or importance)
const output = {};

countriesData.forEach(country => {
  const cities = citiesByCountry[country.iso2] || [];
  
  if (cities.length > 0) {
    // Sort by name length (shorter names usually = bigger cities) or filter by capital
    const capitalCity = country.capital;
    
    // Get capital first
    let topCities = cities.filter(c => 
      c.name.toLowerCase() === capitalCity.toLowerCase()
    );
    
    // Add other major cities (limit to top 20)
    const otherCities = cities
      .filter(c => c.name.toLowerCase() !== capitalCity.toLowerCase())
      .sort((a, b) => a.name.length - b.name.length)
      .slice(0, 19);
    
    topCities = [...topCities, ...otherCities].slice(0, 20);
    
    output[country.iso2] = {
      code: country.iso2,
      name: country.name,
      nameAr: country.native || country.name,
      nameFr: country.translations?.fr || country.name,
      capital: country.capital,
      cities: topCities.map(c => ({
        name: c.name,
        nameAr: c.name, // Will need manual translation
        nameFr: c.name
      }))
    };
  }
});

// Save sample for review
fs.writeFileSync('clean-cities-sample.json', JSON.stringify(output, null, 2));

console.log('\n✅ Extracted clean cities data');
console.log('📝 Saved to clean-cities-sample.json for review');
console.log('\n🔍 Sample - Egypt:');
if (output.EG) {
  console.log(`  Capital: ${output.EG.capital}`);
  console.log(`  Cities: ${output.EG.cities.length}`);
  output.EG.cities.forEach(c => console.log(`    - ${c.name}`));
}

console.log('\n⚠️  Note: Arabic translations need manual review!');
