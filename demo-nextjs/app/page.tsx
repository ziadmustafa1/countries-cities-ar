import { allCountries } from '@/lib/countries-data';
import { CountryCitySelector } from '@/components/country-city-selector';

export default function Home() {
  return <CountryCitySelector allCountries={allCountries} />;

}
