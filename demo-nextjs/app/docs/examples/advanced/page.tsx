import { CodeBlock } from '@/components/code-block';

export default function AdvancedExamplesPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Advanced Patterns</h1>
      <p className="text-lg text-gray-400 mb-8">
        Advanced usage patterns and performance optimizations
      </p>

      <section className="space-y-8">
        {/* Virtual Scrolling */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Virtual Scrolling</h2>
          <p className="text-gray-400 mb-4">Handle large lists efficiently with react-window.</p>
          <CodeBlock 
            code={`import { FixedSizeList } from 'react-window';
import { allCountries } from 'countries-cities-ar';

function VirtualCountryList() {
  const Row = ({ index, style }) => (
    <div style={style} className="flex items-center p-2 border-b">
      <span className="font-medium">{allCountries[index].nameAr}</span>
      <span className="ml-2 text-gray-500">({allCountries[index].code})</span>
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={allCountries.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}`}
            language="typescript"
          />
        </div>

        {/* Dynamic Import */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Dynamic Imports</h2>
          <p className="text-gray-400 mb-4">Load data on demand to reduce initial bundle size.</p>
          <CodeBlock 
            code={`// Lazy load regions
const loadAfricaCountries = async () => {
  const { africaCountries } = await import('countries-cities-ar');
  return africaCountries;
};

// In component
function RegionSelector() {
  const [region, setRegion] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRegion = async (regionName) => {
    setLoading(true);
    
    let data = [];
    switch(regionName) {
      case 'africa':
        const { africaCountries } = await import('countries-cities-ar');
        data = africaCountries;
        break;
      case 'asia':
        const { asiaCountries } = await import('countries-cities-ar');
        data = asiaCountries;
        break;
      // ... other regions
    }
    
    setCountries(data);
    setLoading(false);
  };

  return (
    <div>
      <select onChange={(e) => loadRegion(e.target.value)}>
        <option value="">Select Region</option>
        <option value="africa">Africa</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
      </select>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-3 gap-2 mt-4">
          {countries.map(c => (
            <div key={c.code}>{c.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}`}
            language="typescript"
          />
        </div>

        {/* Memoization */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Performance Optimization</h2>
          <p className="text-gray-400 mb-4">Use memoization for expensive operations.</p>
          <CodeBlock 
            code={`import { useMemo, useCallback, memo } from 'react';
import { allCountries, searchCountries } from 'countries-cities-ar';

// Memoized component
const CountryItem = memo(({ country, onClick }) => (
  <div 
    onClick={() => onClick(country)}
    className="p-2 hover:bg-gray-100 cursor-pointer"
  >
    <div className="font-medium">{country.nameAr}</div>
    <div className="text-sm text-gray-600">{country.name}</div>
  </div>
));

function OptimizedCountryList() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  
  // Memoize filtered results
  const filteredCountries = useMemo(() => {
    if (!search) return allCountries;
    return searchCountries(search, 'ar');
  }, [search]);
  
  // Memoize callback
  const handleSelect = useCallback((country) => {
    setSelected(country);
    console.log('Selected:', country.name);
  }, []);
  
  // Memoize stats calculation
  const stats = useMemo(() => ({
    total: filteredCountries.length,
    totalCities: filteredCountries.reduce(
      (acc, c) => acc + c.cities.length, 0
    ),
  }), [filteredCountries]);
  
  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      
      <div className="text-sm text-gray-600 my-2">
        Showing {stats.total} countries with {stats.totalCities} cities
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {filteredCountries.map(country => (
          <CountryItem
            key={country.code}
            country={country}
            onClick={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}`}
            language="typescript"
          />
        </div>

        {/* Form Integration */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Form Integration</h2>
          <p className="text-gray-400 mb-4">Integrate with React Hook Form for complex forms.</p>
          <CodeBlock 
            code={`import { useForm, Controller } from 'react-hook-form';
import { allCountries } from 'countries-cities-ar';

function AddressForm() {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      country: '',
      city: '',
      address: '',
    }
  });
  
  const selectedCountryCode = watch('country');
  const selectedCountry = allCountries.find(c => c.code === selectedCountryCode);
  
  // Reset city when country changes
  useEffect(() => {
    setValue('city', '');
  }, [selectedCountryCode, setValue]);
  
  const onSubmit = (data) => {
    console.log('Form data:', data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="country"
        control={control}
        rules={{ required: 'Country is required' }}
        render={({ field, fieldState }) => (
          <div>
            <label>Country *</label>
            <select {...field} className="w-full p-2 border rounded">
              <option value="">Select Country</option>
              {allCountries.map(c => (
                <option key={c.code} value={c.code}>
                  {c.nameAr} - {c.name}
                </option>
              ))}
            </select>
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
      
      {selectedCountry && (
        <Controller
          name="city"
          control={control}
          rules={{ required: 'City is required' }}
          render={({ field, fieldState }) => (
            <div>
              <label>City/State *</label>
              <select {...field} className="w-full p-2 border rounded">
                <option value="">Select City</option>
                {selectedCountry.cities.map((city, idx) => (
                  <option key={idx} value={idx}>
                    {city.nameAr || city.name}
                  </option>
                ))}
              </select>
              {fieldState.error && (
                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      )}
      
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <div>
            <label>Street Address</label>
            <input
              {...field}
              type="text"
              className="w-full p-2 border rounded"
            />
          </div>
        )}
      />
      
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}`}
            language="typescript"
          />
        </div>
      </section>
    </div>
  );
}
