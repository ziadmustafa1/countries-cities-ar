import { describe, it, expect } from 'vitest';
import {
  getCountryByCode,
  getCitiesByCountryCode,
  getCountryName,
  searchCountries,
  searchCities,
} from '../src/helpers';

describe('getCountryByCode', () => {
  it('should return country for valid code', () => {
    const egypt = getCountryByCode('EG');
    expect(egypt).toBeDefined();
    expect(egypt?.code).toBe('EG');
    expect(egypt?.name).toBe('Egypt');
    expect(egypt?.nameAr).toBe('مصر');
  });

  it('should handle lowercase country codes', () => {
    const saudi = getCountryByCode('sa');
    expect(saudi).toBeDefined();
    expect(saudi?.code).toBe('SA');
    expect(saudi?.name).toBe('Saudi Arabia');
  });

  it('should return undefined for invalid code', () => {
    const result = getCountryByCode('XX');
    expect(result).toBeUndefined();
  });

  it('should return country with cities array', () => {
    const uae = getCountryByCode('AE');
    expect(uae?.cities).toBeDefined();
    expect(Array.isArray(uae?.cities)).toBe(true);
    expect(uae?.cities.length).toBeGreaterThan(0);
  });
});

describe('getCitiesByCountryCode', () => {
  it('should return cities for valid country code', () => {
    const cities = getCitiesByCountryCode('EG');
    expect(Array.isArray(cities)).toBe(true);
    expect(cities.length).toBeGreaterThanOrEqual(0);
    if (cities.length > 0) {
      expect(cities[0]).toHaveProperty('name');
      expect(cities[0]).toHaveProperty('nameAr');
      expect(cities[0]).toHaveProperty('nameFr');
    }
  });

  it('should return cities with correct structure', () => {
    const cities = getCitiesByCountryCode('AE');
    expect(Array.isArray(cities)).toBe(true);
    if (cities.length > 0) {
      const firstCity = cities[0];
      expect(firstCity.name).toBeDefined();
      expect(firstCity.nameAr).toBeDefined();
      expect(firstCity.nameFr).toBeDefined();
      expect(typeof firstCity.name).toBe('string');
      expect(typeof firstCity.nameAr).toBe('string');
      expect(typeof firstCity.nameFr).toBe('string');
    }
  });

  it('should return empty array for invalid country code', () => {
    const cities = getCitiesByCountryCode('XX');
    expect(cities).toEqual([]);
  });

  it('should handle lowercase country codes', () => {
    const cities = getCitiesByCountryCode('ae');
    expect(Array.isArray(cities)).toBe(true);
  });
});

describe('getCountryName', () => {
  it('should return English name by default', () => {
    const name = getCountryName('EG');
    expect(name).toBe('Egypt');
  });

  it('should return English name when explicitly requested', () => {
    const name = getCountryName('EG', 'en');
    expect(name).toBe('Egypt');
  });

  it('should return Arabic name when requested', () => {
    const name = getCountryName('EG', 'ar');
    expect(name).toBe('مصر');
  });

  it('should return undefined for invalid country code', () => {
    const name = getCountryName('XX');
    expect(name).toBeUndefined();
  });

  it('should handle lowercase country codes', () => {
    const nameEn = getCountryName('eg', 'en');
    const nameAr = getCountryName('eg', 'ar');
    expect(nameEn).toBeDefined();
    expect(nameAr).toBeDefined();
  });

  it('should return French name when requested', () => {
    const nameFr = getCountryName('EG', 'fr');
    expect(nameFr).toBeDefined();
    expect(typeof nameFr).toBe('string');
  });
});

describe('searchCountries', () => {
  it('should find countries by English name', () => {
    const results = searchCountries('egypt', 'en');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe('Egypt');
  });

  it('should find countries by Arabic name', () => {
    const results = searchCountries('مصر', 'ar');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].nameAr).toBe('مصر');
  });

  it('should find countries by French name', () => {
    const results = searchCountries('egypte', 'fr');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((c) => c.nameFr.toLowerCase().includes('egypte'))).toBe(true);
  });

  it('should be case insensitive', () => {
    const resultsLower = searchCountries('egypt', 'en');
    const resultsUpper = searchCountries('EGYPT', 'en');
    const resultsMixed = searchCountries('EgYpT', 'en');
    expect(resultsLower.length).toBe(resultsUpper.length);
    expect(resultsLower.length).toBe(resultsMixed.length);
  });

  it('should find partial matches', () => {
    const results = searchCountries('arab', 'en');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((c) => c.name.toLowerCase().includes('arab'))).toBe(true);
  });

  it('should return empty array for empty query', () => {
    const results = searchCountries('', 'en');
    expect(results).toEqual([]);
  });

  it('should return empty array for whitespace query', () => {
    const results = searchCountries('   ', 'en');
    expect(results).toEqual([]);
  });

  it('should return empty array for non-matching query', () => {
    const results = searchCountries('xyz123nonexistent', 'en');
    expect(results).toEqual([]);
  });

  it('should trim whitespace from query', () => {
    const results = searchCountries('  egypt  ', 'en');
    expect(results.length).toBeGreaterThan(0);
  });
});

describe('searchCities', () => {
  it('should find cities by English name across all countries', () => {
    const results = searchCities('dubai', undefined, 'en');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].city.name).toBe('Dubai');
    expect(results[0].country).toBeDefined();
  });

  it('should find cities by Arabic name', () => {
    const results = searchCities('دبي', undefined, 'ar');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].city.nameAr).toBe('دبي');
  });

  it('should find cities by French name', () => {
    const results = searchCities('dubai', undefined, 'fr');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.city.nameFr.toLowerCase().includes('dubai'))).toBe(true);
  });

  it('should filter by country code', () => {
    const results = searchCities('sha', 'EG', 'en');
    expect(results.length).toBeGreaterThanOrEqual(0);
    results.forEach((result) => {
      expect(result.country.code).toBe('EG');
    });
  });

  it('should handle lowercase country codes', () => {
    const results = searchCities('dubai', 'ae', 'en');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].country.code).toBe('AE');
  });

  it('should be case insensitive', () => {
    const resultsLower = searchCities('dubai', undefined, 'en');
    const resultsUpper = searchCities('DUBAI', undefined, 'en');
    expect(resultsLower.length).toBe(resultsUpper.length);
  });

  it('should find partial matches', () => {
    const results = searchCities('dub', undefined, 'en');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.city.name.toLowerCase().includes('dub'))).toBe(true);
  });

  it('should return empty array for empty query', () => {
    const results = searchCities('', undefined, 'en');
    expect(results).toEqual([]);
  });

  it('should return empty array for whitespace query', () => {
    const results = searchCities('   ', undefined, 'en');
    expect(results).toEqual([]);
  });

  it('should return empty array for non-matching query', () => {
    const results = searchCities('xyz123nonexistent', undefined, 'en');
    expect(results).toEqual([]);
  });

  it('should trim whitespace from query', () => {
    const results = searchCities('  dubai  ', undefined, 'en');
    expect(results.length).toBeGreaterThan(0);
  });

  it('should return results with both city and country info', () => {
    const results = searchCities('dubai', undefined, 'en');
    expect(results.length).toBeGreaterThan(0);
    const result = results[0];
    expect(result).toHaveProperty('city');
    expect(result).toHaveProperty('country');
    expect(result.city).toHaveProperty('name');
    expect(result.city).toHaveProperty('nameAr');
    expect(result.city).toHaveProperty('nameFr');
    expect(result.country).toHaveProperty('code');
    expect(result.country).toHaveProperty('name');
    expect(result.country).toHaveProperty('nameAr');
    expect(result.country).toHaveProperty('nameFr');
  });

  it('should return empty array for invalid country code', () => {
    const results = searchCities('cairo', 'XX', 'en');
    expect(results).toEqual([]);
  });
});
