/**
 * Represents a city with English, Arabic, and French names
 */
export interface City {
  name: string;
  nameAr: string;
  nameFr: string;
}

/**
 * Represents a country with its code, names, and cities
 */
export interface Country {
  code: string;
  name: string;
  nameAr: string;
  nameFr: string;
  cities: City[];
}

/**
 * Language type for queries
 */
export type Language = 'en' | 'ar' | 'fr';
