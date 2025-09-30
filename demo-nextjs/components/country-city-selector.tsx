'use client';

import { useState, useMemo } from 'react';
import type { Country, City, Language } from '@/lib/countries-data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    if (language === 'ar') return city.nameAr && city.nameAr !== '' && city.nameAr !== city.name ? city.nameAr : city.name;
    if (language === 'fr') return city.nameFr && city.nameFr !== '' ? city.nameFr : city.name;
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
    <div className="min-h-screen relative overflow-hidden bg-[#0d1117] p-4 sm:p-8 pt-2">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-10 space-y-6 pt-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 backdrop-blur-md rounded-full border border-blue-500/30 shadow-lg">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-white text-sm font-semibold">250 دولة • 4,642 محافظة • 3 لغات</span>
          </div>
          
          <div className="space-y-3">
            <div className="text-8xl mb-4 filter drop-shadow-lg" style={{textShadow: '0 4px 20px rgba(99, 102, 241, 0.3)'}}>
              🌍
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3 tracking-tight px-4">
              دول ومدن العالم
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-medium px-6 leading-relaxed">
              مكتبة شاملة بـ 250 دولة و 4,642 محافظة
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg shadow-sm backdrop-blur-sm border border-gray-700">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-gray-200">سريع وآمن</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg shadow-sm backdrop-blur-sm border border-gray-700">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-gray-200">TypeScript</span>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 overflow-hidden">
          <CardHeader className="text-center space-y-6 pb-8 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
            <div className="flex justify-center gap-2">
              <Button
                variant={language === 'ar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('ar')}
                className={`transition-all duration-300 ${language === 'ar' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md scale-105' : 'hover:scale-105 border-gray-700 text-gray-300 hover:bg-gray-800'}`}
              >
                🇸🇦 العربية
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('en')}
                className={`transition-all duration-300 ${language === 'en' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md scale-105' : 'hover:scale-105 border-gray-700 text-gray-300 hover:bg-gray-800'}`}
              >
                🇬🇧 English
              </Button>
              <Button
                variant={language === 'fr' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('fr')}
                className={`transition-all duration-300 ${language === 'fr' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md scale-105' : 'hover:scale-105 border-gray-700 text-gray-300 hover:bg-gray-800'}`}
              >
                🇫🇷 Français
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            {/* Country Select */}
            <div className="space-y-3 group">
              <label className="text-sm font-semibold flex items-center gap-2 text-gray-200 transition-colors group-hover:text-blue-400">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg shadow-sm">
                  <Globe2 className="w-4 h-4 text-white" />
                </div>
                {labels.country}
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <Input
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  onFocus={() => setShowCountryDropdown(true)}
                  placeholder={labels.searchCountry}
                  className="pl-12 h-12 border-2 border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-300 text-base shadow-sm hover:shadow-md bg-gray-800 text-white"
                />
                {showCountryDropdown && (
                  <div className="absolute z-50 w-full mt-2 bg-gray-900 border-2 border-gray-700 rounded-xl shadow-xl max-h-80 overflow-auto animate-in slide-in-from-top-2 duration-300">
                    {filteredCountries.length === 0 ? (
                      <div className="p-6 text-center">
                        <div className="text-4xl mb-2">🔍</div>
                        <div className="text-sm font-medium text-gray-400">
                          {language === 'ar' ? 'لا توجد نتائج' : language === 'en' ? 'No results' : 'Aucun résultat'}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2">
                        {filteredCountries.slice(0, 50).map((country, idx) => (
                          <button
                            key={country.code}
                            onClick={() => handleSelectCountry(country)}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-500/10 transition-all duration-200 group mb-1 border border-transparent hover:border-blue-500/30 hover:shadow-sm"
                            style={{ animationDelay: `${idx * 20}ms` }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{country.code === 'EG' ? '🇪🇬' : country.code === 'SA' ? '🇸🇦' : country.code === 'AE' ? '🇦🇪' : country.code === 'US' ? '🇺🇸' : country.code === 'GB' ? '🇬🇧' : country.code === 'FR' ? '🇫🇷' : '🌍'}</div>
                              <div className="flex-1">
                                <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">{getCountryName(country)}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{country.name} • {country.nameAr} • {country.nameFr}</div>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="text-blue-400">→</div>
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
              <label className="text-sm font-semibold flex items-center gap-2 text-gray-200 transition-colors group-hover:text-cyan-400">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-sm">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                {labels.city}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <Input
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  onFocus={() => selectedCountry && setShowCityDropdown(true)}
                  placeholder={selectedCountry ? labels.searchCity : labels.selectCountryFirst}
                  disabled={!selectedCountry}
                  className="pl-12 h-12 border-2 border-gray-700 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 rounded-xl transition-all duration-300 text-base shadow-sm hover:shadow-md disabled:bg-gray-800/50 disabled:cursor-not-allowed bg-gray-800 text-white"
                />
                {showCityDropdown && selectedCountry && (
                  <div className="absolute z-50 w-full mt-2 bg-gray-900 border-2 border-gray-700 rounded-xl shadow-xl max-h-80 overflow-auto animate-in slide-in-from-top-2 duration-300">
                    {filteredCities.length === 0 ? (
                      <div className="p-6 text-center">
                        <div className="text-4xl mb-2">🏙️</div>
                        <div className="text-sm font-medium text-gray-400">
                          {language === 'ar' ? 'لا توجد مدن' : language === 'en' ? 'No cities' : 'Aucune ville'}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2">
                        {filteredCities.map((city, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSelectCity(city)}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-cyan-500/10 transition-all duration-200 group mb-1 border border-transparent hover:border-cyan-500/30 hover:shadow-sm"
                            style={{ animationDelay: `${idx * 20}ms` }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">🏙️</div>
                              <div className="flex-1">
                                <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{getCityName(city)}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{city.name} • {city.nameAr} • {city.nameFr}</div>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="text-cyan-400">→</div>
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
              <div className="mt-6 p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-800 rounded-xl shadow-sm border border-blue-500/30">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-bold text-lg text-white">{labels.info}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-700 shadow-sm">
                        <Globe2 className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold text-gray-300">
                          {language === 'ar' ? 'الدولة' : language === 'en' ? 'Country' : 'Pays'}:
                        </span>
                        <span className="text-white font-medium">
                          {getCountryName(selectedCountry)} ({selectedCountry.code})
                        </span>
                        <span className="ml-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {selectedCountry.cities.length} {language === 'ar' ? 'مدينة' : language === 'en' ? 'cities' : 'villes'}
                        </span>
                      </div>
                      
                      {selectedCity && (
                        <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-700 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <MapPin className="w-4 h-4 text-cyan-400" />
                          <span className="font-semibold text-gray-300">
                            {language === 'ar' ? 'المدينة' : language === 'en' ? 'City' : 'Ville'}:
                          </span>
                          <span className="text-white font-medium">{getCityName(selectedCity)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-gray-800">
              <div className="text-center group cursor-default">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-md mb-3 transform transition-transform group-hover:scale-105 group-hover:shadow-lg">
                  <div className="text-4xl font-black text-white">250</div>
                </div>
                <div className="text-sm font-semibold text-gray-400">{labels.countries}</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-md mb-3 transform transition-transform group-hover:scale-105 group-hover:shadow-lg">
                  <div className="text-4xl font-black text-white">4.6K</div>
                </div>
                <div className="text-sm font-semibold text-gray-400">{labels.cities}</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-md mb-3 transform transition-transform group-hover:scale-105 group-hover:shadow-lg">
                  <div className="text-4xl font-black text-white">3</div>
                </div>
                <div className="text-sm font-semibold text-gray-400">{labels.languages}</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">Ready to use this library? 🚀</h3>
              <p className="text-white/90">Install now with npm and start building amazing apps!</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-4">
                <code className="px-6 py-3 bg-black/30 backdrop-blur-sm text-white rounded-lg font-mono text-sm border border-white/30">
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
