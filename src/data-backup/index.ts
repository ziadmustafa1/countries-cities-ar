import type { Country } from '../types';
import { africaData } from './africa';
import { asiaData } from './asia';
import { europeData } from './europe';
import { americasData } from './americas';
import { oceaniaData } from './oceania';

/**
 * All countries from all continents (250 countries total with 5099 states/provinces)
 */
export const allCountries: Country[] = [
  ...africaData,
  ...asiaData,
  ...europeData,
  ...americasData,
  ...oceaniaData,
];

// Keep old names for backward compatibility
export const africaCountries = africaData;
export const asiaCountries = asiaData;
export const europeCountries = europeData;
export const americasCountries = americasData;
export const oceaniaCountries = oceaniaData;

export { africaData, asiaData, europeData, americasData, oceaniaData };
