import type { Country } from '../types';
import { africaCountries } from './africa';
import { asiaCountries } from './asia';
import { europeCountries } from './europe';
import { americasCountries } from './americas';
import { oceaniaCountries } from './oceania';

/**
 * All countries from all continents (222 countries total)
 */
export const allCountries: Country[] = [
  ...africaCountries,
  ...asiaCountries,
  ...europeCountries,
  ...americasCountries,
  ...oceaniaCountries,
];

export { africaCountries, asiaCountries, europeCountries, americasCountries, oceaniaCountries };
