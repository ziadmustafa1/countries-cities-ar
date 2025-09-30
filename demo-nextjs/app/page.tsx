import { allCountries } from '@/lib/countries-data';
import { CountryCitySelector } from '@/components/country-city-selector';
import { TopNav } from '@/components/docs/TopNav';

export default function Home() {
  return (
    <>
      <TopNav />
      <CountryCitySelector allCountries={allCountries} />
    </>
  );
}
