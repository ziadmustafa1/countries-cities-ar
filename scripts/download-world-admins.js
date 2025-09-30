#!/usr/bin/env node
/**
 * download-world-admins.js
 * يجمع كل دول العالم + المحافظات (Admin1) من Geonames،
 * ويجيب الترجمات (عربي/فرنسي) من RestCountries + Wikipedia.
 * يحفظ النتائج في JSON
 */

import fs from 'fs';
import https from 'https';
import http from 'http';
import { URL } from 'url';

// روابط
const GEONAMES_ADMIN1_URL = "http://download.geonames.org/export/dump/admin1CodesASCII.txt";
const RESTCOUNTRIES_ALL_URL = "https://restcountries.com/v3.1/all";
const WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php";

const USER_AGENT = "WorldAdminDownloader/1.0";

// Helper: HTTP GET
function httpGet(url, timeout = 60000) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.get(url, {
      headers: { 'User-Agent': USER_AGENT },
      timeout
    }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// تحميل RestCountries
async function fetchRestCountries() {
  console.log('📥 Loading countries from RestCountries...');
  const data = await httpGet(RESTCOUNTRIES_ALL_URL);
  return JSON.parse(data);
}

// تحميل Geonames Admin1
async function fetchGeonamesAdmin1() {
  console.log('📥 Loading admin1 from Geonames...');
  return await httpGet(GEONAMES_ADMIN1_URL);
}

// تحليل Admin1
function parseAdmin1(text) {
  const data = {};
  const lines = text.split('\n');
  
  for (const line of lines) {
    if (!line || line.startsWith('#')) continue;
    
    const parts = line.split('\t');
    if (parts.length < 2) continue;
    
    const code = parts[0];
    const name = parts[1].trim();
    
    if (!code.includes('.')) continue;
    
    const countryCode = code.split('.')[0];
    if (!data[countryCode]) data[countryCode] = [];
    
    data[countryCode].push({
      admin_code: code,
      nameEn: name
    });
  }
  
  return data;
}

// Wikipedia Langlinks
async function getWikipediaLanglinks(title) {
  try {
    const url = new URL(WIKIPEDIA_API);
    url.searchParams.set('action', 'query');
    url.searchParams.set('format', 'json');
    url.searchParams.set('titles', title);
    url.searchParams.set('prop', 'langlinks');
    url.searchParams.set('lllimit', 'max');
    url.searchParams.set('redirects', '1');
    
    const data = await httpGet(url.toString(), 20000);
    const json = JSON.parse(data);
    const pages = json.query?.pages || {};
    
    const out = { ar: '', fr: '' };
    for (const page of Object.values(pages)) {
      const langlinks = page.langlinks || [];
      for (const ll of langlinks) {
        if (ll.lang === 'ar') out.ar = ll['*'];
        if (ll.lang === 'fr') out.fr = ll['*'];
      }
      break;
    }
    
    return out;
  } catch (err) {
    return { ar: '', fr: '' };
  }
}

// معالجة دولة واحدة
async function buildCountryEntry(country, adminList) {
  const cca2 = country.cca2;
  const nameEn = country.name?.common || '';
  const translations = country.translations || {};
  const nameAr = translations.ara?.common || '';
  const nameFr = translations.fra?.common || '';
  
  console.log(`  🌍 ${cca2}: ${nameEn} (${adminList.length} admins)`);
  
  // المحافظات مع الترجمات من Wikipedia
  const cities = [];
  for (const adm of adminList) {
    const links = await getWikipediaLanglinks(adm.nameEn);
    cities.push({
      name: adm.nameEn,
      nameAr: links.ar || '',
      nameFr: links.fr || ''
    });
    
    // تأخير صغير حتى ما نضغط على Wikipedia
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return {
    code: cca2,
    name: nameEn,
    nameAr: nameAr,
    nameFr: nameFr,
    cities: cities
  };
}

// Main
async function main() {
  try {
    // تحميل البيانات
    const countries = await fetchRestCountries();
    console.log(`✅ ${countries.length} countries loaded\n`);
    
    const admin1Text = await fetchGeonamesAdmin1();
    const admin1Data = parseAdmin1(admin1Text);
    console.log(`✅ Admin1 data parsed\n`);
    
    // معالجة كل دولة
    const results = [];
    for (const country of countries) {
      const code = country.cca2;
      const admins = admin1Data[code] || [];
      
      if (admins.length > 0) {
        const entry = await buildCountryEntry(country, admins);
        results.push(entry);
      }
    }
    
    // حفظ النتائج
    fs.mkdirSync('output', { recursive: true });
    fs.writeFileSync(
      'output/world-admins-wiki.json',
      JSON.stringify(results, null, 2),
      'utf-8'
    );
    
    console.log('\n✅ Saved to output/world-admins-wiki.json');
    console.log(`📊 Total: ${results.length} countries with admins`);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
