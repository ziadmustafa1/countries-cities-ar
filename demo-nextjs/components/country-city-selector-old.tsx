'use client';

import { useState, useMemo } from 'react';
import type { Country, City, Language } from '@/lib/countries-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Globe2, MapPin, Search, Sparkles, TrendingUp, Zap } from 'lucide-react';

interface CountryCitySelectorProps {
  allCountries: Country[];
}

export function CountryCitySelector({ allCountries }: CountryCitySelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [countrySearch, setCountrySearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [language, setLanguage] = useState<Language>('ar');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const getCountryName = (country: Country) => {
    if (language === 'ar') return country.nameAr;
    if (language === 'fr') return country.nameFr;
    return country.name;
  };

  const getCityName = (city: City) => {
    if (language === 'ar') return city.nameAr;
    if (language === 'fr') return city.nameFr;
    return city.name;
  };

  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return allCountries;
    const query = countrySearch.toLowerCase();
    return allCountries.filter(country => {
      const searchText = language === 'ar' ? country.nameAr : 
                        language === 'fr' ? country.nameFr : 
                        country.name;
      return searchText.toLowerCase().includes(query);
    });
  }, [countrySearch, language, allCountries]);

  const filteredCities = useMemo(() => {
    if (!selectedCountry) return [];
    if (!citySearch.trim()) return selectedCountry.cities;
    const query = citySearch.toLowerCase();
    return selectedCountry.cities.filter(city => {
      const searchText = language === 'ar' ? city.nameAr : 
                        language === 'fr' ? city.nameFr : 
                        city.name;
      return searchText.toLowerCase().includes(query);
    });
  }, [selectedCountry, citySearch, language]);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setCountrySearch(getCountryName(country));
    setShowCountryDropdown(false);
    setSelectedCity(null);
    setCitySearch('');
  };

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    setCitySearch(getCityName(city));
    setShowCityDropdown(false);
  };

  const languageLabels = {
    ar: { country: 'اختر الدولة', city: 'اختر المدينة', searchCountry: 'ابحث عن دولة...', searchCity: 'ابحث عن مدينة...', selectCountryFirst: 'اختر دولة أولاً', info: 'معلومات الاختيار', stats: 'الإحصائيات', countries: 'دولة', cities: 'مدينة', languages: 'لغات' },
    en: { country: 'Select Country', city: 'Select City', searchCountry: 'Search for a country...', searchCity: 'Search for a city...', selectCountryFirst: 'Select country first', info: 'Selection Info', stats: 'Statistics', countries: 'Countries', cities: 'Cities', languages: 'Languages' },
    fr: { country: 'Sélectionner un pays', city: 'Sélectionner une ville', searchCountry: 'Rechercher un pays...', searchCity: 'Rechercher une ville...', selectCountryFirst: 'Sélectionner un pays d\'abord', info: 'Informations', stats: 'Statistiques', countries: 'Pays', cities: 'Villes', languages: 'Langues' }
  };

  const labels = languageLabels[language];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-4 sm:p-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white text-sm font-medium">215 Countries • 993 Cities • 3 Languages</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight">
            🌍 Countries & Cities
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            A comprehensive TypeScript library with multilingual support
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-white/80">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm">Type Safe</span>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl bg-white/95 backdrop-blur-xl border-white/20 overflow-hidden">
          <CardHeader className="text-center space-y-6 pb-8 bg-gradient-to-b from-white to-gray-50/50">
            <div className="flex justify-center gap-2">
              <Button
                variant={language === 'ar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('ar')}
                className={`transition-all duration-300 ${language === 'ar' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/50 scale-105' : 'hover:scale-105'}`}
              >
                🇸🇦 العربية
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('en')}
                className={`transition-all duration-300 ${language === 'en' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/50 scale-105' : 'hover:scale-105'}`}
              >
                🇬🇧 English
              </Button>
              <Button
                variant={language === 'fr' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('fr')}
                className={`transition-all duration-300 ${language === 'fr' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/50 scale-105' : 'hover:scale-105'}`}
              >
                🇫🇷 Français
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            {/* Country Select */}
            <div className="space-y-3 group">
              <label className="text-sm font-bold flex items-center gap-2 text-gray-700 transition-colors group-hover:text-purple-600">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg">
                  <Globe2 className="w-4 h-4 text-white" />
                </div>
                {labels.country}
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Search className="w-5 h-5 text-purple-500" />
                </div>
                <Input
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  onFocus={() => setShowCountryDropdown(true)}
                  placeholder={labels.searchCountry}
                  className="pl-12 h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 rounded-xl transition-all duration-300 text-base shadow-sm hover:shadow-md"
                />
                {showCountryDropdown && (
                  <div className="absolute z-50 w-full mt-2 bg-white border-2 border-purple-200 rounded-xl shadow-2xl max-h-80 overflow-auto backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
                    {filteredCountries.length === 0 ? (
                      <div className="p-6 text-center">
                        <div className="text-4xl mb-2">🔍</div>
                        <div className="text-sm font-medium text-gray-500">
                          {language === 'ar' ? 'لا توجد نتائج' : language === 'en' ? 'No results' : 'Aucun résultat'}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2">
                        {filteredCountries.slice(0, 50).map((country, idx) => (
                          <button
                            key={country.code}
                            onClick={() => handleSelectCountry(country)}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 group mb-1 border border-transparent hover:border-purple-200 hover:shadow-md"
                            style={{ animationDelay: `${idx * 20}ms` }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{country.code === 'EG' ? '🇪🇬' : country.code === 'SA' ? '🇸🇦' : country.code === 'AE' ? '🇦🇪' : country.code === 'US' ? '🇺🇸' : country.code === 'GB' ? '🇬🇧' : country.code === 'FR' ? '🇫🇷' : '🌍'}</div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">{getCountryName(country)}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{country.name} • {country.nameAr} • {country.nameFr}</div>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="text-purple-600">→</div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* City Select */}
            <div className="space-y-3 group">
              <label className="text-sm font-bold flex items-center gap-2 text-gray-700 transition-colors group-hover:text-indigo-600">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                {labels.city}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Search className="w-5 h-5 text-indigo-500" />
                </div>
                <Input
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  onFocus={() => selectedCountry && setShowCityDropdown(true)}
                  placeholder={selectedCountry ? labels.searchCity : labels.selectCountryFirst}
                  disabled={!selectedCountry}
                  className="pl-12 h-12 border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 text-base shadow-sm hover:shadow-md disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                {showCityDropdown && selectedCountry && (
                  <div className="absolute z-50 w-full mt-2 bg-white border-2 border-indigo-200 rounded-xl shadow-2xl max-h-80 overflow-auto backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
                    {filteredCities.length === 0 ? (
                      <div className="p-6 text-center">
                        <div className="text-4xl mb-2">🏙️</div>
                        <div className="text-sm font-medium text-gray-500">
                          {language === 'ar' ? 'لا توجد مدن' : language === 'en' ? 'No cities' : 'Aucune ville'}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2">
                        {filteredCities.map((city, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSelectCity(city)}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 group mb-1 border border-transparent hover:border-indigo-200 hover:shadow-md"
                            style={{ animationDelay: `${idx * 20}ms` }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">🏙️</div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">{getCityName(city)}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{city.name} • {city.nameAr} • {city.nameFr}</div>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="text-indigo-600">→</div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Info Box */}
            {selectedCountry && (
              <div className="mt-6 p-6 bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 border-2 border-purple-300 rounded-2xl shadow-lg animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-md">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-bold text-lg text-gray-800">{labels.info}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <Globe2 className="w-4 h-4 text-purple-600" />
                        <span className="font-semibold text-gray-700">
                          {language === 'ar' ? 'الدولة' : language === 'en' ? 'Country' : 'Pays'}:
                        </span>
                        <span className="text-gray-900 font-medium">
                          {getCountryName(selectedCountry)} ({selectedCountry.code})
                        </span>
                        <span className="ml-auto bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {selectedCountry.cities.length} {language === 'ar' ? 'مدينة' : language === 'en' ? 'cities' : 'villes'}
                        </span>
                      </div>
                      {selectedCity && (
                        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <MapPin className="w-4 h-4 text-indigo-600" />
                          <span className="font-semibold text-gray-700">
                            {language === 'ar' ? 'المدينة' : language === 'en' ? 'City' : 'Ville'}:
                          </span>
                          <span className="text-gray-900 font-medium">{getCityName(selectedCity)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t-2 border-gray-200">
              <div className="text-center group cursor-default">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg mb-3 transform transition-transform group-hover:scale-110 group-hover:shadow-xl">
                  <div className="text-4xl font-black text-white">215</div>
                </div>
                <div className="text-sm font-semibold text-gray-600">{labels.countries}</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-3 transform transition-transform group-hover:scale-110 group-hover:shadow-xl">
                  <div className="text-4xl font-black text-white">993</div>
                </div>
                <div className="text-sm font-semibold text-gray-600">{labels.cities}</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="p-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-lg mb-3 transform transition-transform group-hover:scale-110 group-hover:shadow-xl">
                  <div className="text-4xl font-black text-white">3</div>
                </div>
                <div className="text-sm font-semibold text-gray-600">{labels.languages}</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">Ready to use this library? 🚀</h3>
              <p className="text-white/90">Install now with npm and start building amazing apps!</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-4">
                <code className="px-6 py-3 bg-black/20 backdrop-blur-sm text-white rounded-lg font-mono text-sm border border-white/20">
                  npm install countries-cities-ar
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
