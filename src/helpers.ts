import { allCountries } from './data';
import type { Country, City, Language } from './types';

/**
 * Get a country by its ISO code
 * @param code - ISO country code (e.g., "EG", "SA", "US")
 * @returns The country object or undefined if not found
 * @example
 * ```ts
 * const egypt = getCountryByCode('EG');
 * console.log(egypt?.name); // "Egypt"
 * console.log(egypt?.nameAr); // "مصر"
 * ```
 */
export const getCountryByCode = (code: string): Country | undefined => {
  const upperCode = code.toUpperCase();
  return allCountries.find((country) => country.code === upperCode);
};

/**
 * Get all cities for a specific country by its ISO code
 * @param code - ISO country code (e.g., "EG", "SA", "US")
 * @returns Array of cities or empty array if country not found
 * @example
 * ```ts
 * const cities = getCitiesByCountryCode('EG');
 * console.log(cities[0]); // { name: "Cairo", nameAr: "القاهرة" }
 * ```
 */
export const getCitiesByCountryCode = (code: string): City[] => {
  const country = getCountryByCode(code);
  return country?.cities || [];
};

/**
 * Get the country name in the specified language
 * @param code - ISO country code (e.g., "EG", "SA", "US")
 * @param lang - Language code: "en" for English, "ar" for Arabic, "fr" for French (default: "en")
 * @returns Country name in the specified language or undefined if not found
 * @example
 * ```ts
 * const nameEn = getCountryName('EG', 'en'); // "Egypt"
 * const nameAr = getCountryName('EG', 'ar'); // "مصر"
 * const nameFr = getCountryName('EG', 'fr'); // "Égypte"
 * ```
 */
export const getCountryName = (code: string, lang: Language = 'en'): string | undefined => {
  const country = getCountryByCode(code);
  if (!country) return undefined;
  if (lang === 'ar') return country.nameAr;
  if (lang === 'fr') return country.nameFr;
  return country.name;
};

/**
 * Search for countries by name in the specified language
 * @param query - Search query string
 * @param lang - Language to search in: "en", "ar", or "fr" (default: "en")
 * @returns Array of matching countries
 * @example
 * ```ts
 * const results = searchCountries('egypt', 'en');
 * const resultsAr = searchCountries('مصر', 'ar');
 * const resultsFr = searchCountries('égypte', 'fr');
 * ```
 */
export const searchCountries = (query: string, lang: Language = 'en'): Country[] => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();

  return allCountries.filter((country) => {
    let searchField: string;
    if (lang === 'ar') {
      searchField = country.nameAr;
    } else if (lang === 'fr') {
      searchField = country.nameFr;
    } else {
      searchField = country.name;
    }
    return searchField.toLowerCase().includes(lowerQuery);
  });
};

/**
 * Search for cities by name in the specified language, optionally filtered by country
 * @param query - Search query string
 * @param countryCode - Optional ISO country code to limit search to specific country
 * @param lang - Language to search in: "en", "ar", or "fr" (default: "en")
 * @returns Array of objects containing city and its country information
 * @example
 * ```ts
 * // Search all cities
 * const allCities = searchCities('alex', undefined, 'en');
 * 
 * // Search cities in Egypt only
 * const egyptCities = searchCities('alex', 'EG', 'en');
 * 
 * // Search in Arabic
 * const citiesAr = searchCities('القاهرة', undefined, 'ar');
 * 
 * // Search in French
 * const citiesFr = searchCities('le caire', undefined, 'fr');
 * ```
 */
export const searchCities = (
  query: string,
  countryCode?: string,
  lang: Language = 'en',
): Array<{ city: City; country: Country }> => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  const results: Array<{ city: City; country: Country }> = [];

  // Filter countries based on countryCode if provided
  const countriesToSearch = countryCode
    ? allCountries.filter((c) => c.code === countryCode.toUpperCase())
    : allCountries;

  countriesToSearch.forEach((country) => {
    country.cities.forEach((city) => {
      let searchField: string;
      if (lang === 'ar') {
        searchField = city.nameAr;
      } else if (lang === 'fr') {
        searchField = city.nameFr;
      } else {
        searchField = city.name;
      }
      if (searchField.toLowerCase().includes(lowerQuery)) {
        results.push({ city, country });
      }
    });
  });

  return results;
}
