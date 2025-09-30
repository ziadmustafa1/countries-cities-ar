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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-8">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-10 space-y-6 pt-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full border-2 border-purple-300/50 shadow-lg">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-indigo-900 text-sm font-semibold">250 دولة • 4,642 محافظة • 3 لغات</span>
          </div>
          
          <div className="space-y-3">
            <div className="text-8xl mb-4 filter drop-shadow-lg" style={{textShadow: '0 4px 20px rgba(99, 102, 241, 0.3)'}}>
              🌍
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-900 mb-3 tracking-tight px-4">
              دول ومدن العالم
            </h1>
            <p className="text-lg sm:text-xl text-indigo-700 max-w-2xl mx-auto font-medium px-6 leading-relaxed">
              مكتبة شاملة بـ 250 دولة و 4,642 محافظة
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-lg shadow-sm backdrop-blur-sm">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-indigo-800">سريع وآمن</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-lg shadow-sm backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-pink-600" />
              <span className="text-sm font-semibold text-indigo-800">TypeScript</span>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl bg-white/95 backdrop-blur-xl border-2 border-purple-200 overflow-hidden">
          <CardHeader className="text-center space-y-6 pb-8 bg-gradient-to-b from-white to-purple-50">
            <div className="flex justify-center gap-2">
              <Button
                variant={language === 'ar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('ar')}
                className={`transition-all duration-300 ${language === 'ar' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md scale-105' : 'hover:scale-105 border-purple-300'}`}
              >
                🇸🇦 العربية
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('en')}
                className={`transition-all duration-300 ${language === 'en' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md scale-105' : 'hover:scale-105 border-purple-300'}`}
              >
                🇬🇧 English
              </Button>
              <Button
                variant={language === 'fr' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('fr')}
                className={`transition-all duration-300 ${language === 'fr' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md scale-105' : 'hover:scale-105 border-purple-300'}`}
              >
                🇫🇷 Français
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            {/* Country Select */}
            <div className="space-y-3 group">
              <label className="text-sm font-semibold flex items-center gap-2 text-indigo-800 transition-colors group-hover:text-purple-900">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-sm">
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
                  className="pl-12 h-12 border-2 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 rounded-xl transition-all duration-300 text-base shadow-sm hover:shadow-md bg-white text-indigo-900"
                />
                {showCountryDropdown && (
                  <div className="absolute z-50 w-full mt-2 bg-white border-2 border-purple-200 rounded-xl shadow-xl max-h-80 overflow-auto animate-in slide-in-from-top-2 duration-300">
                    {filteredCountries.length === 0 ? (
                      <div className="p-6 text-center">
                        <div className="text-4xl mb-2">🔍</div>
                        <div className="text-sm font-medium text-slate-500">
                          {language === 'ar' ? 'لا توجد نتائج' : language === 'en' ? 'No results' : 'Aucun résultat'}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2">
                        {filteredCountries.slice(0, 50).map((country, idx) => (
                          <button
                            key={country.code}
                            onClick={() => handleSelectCountry(country)}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 transition-all duration-200 group mb-1 border border-transparent hover:border-purple-200 hover:shadow-sm"
                            style={{ animationDelay: `${idx * 20}ms` }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{country.code === 'EG' ? '🇪🇬' : country.code === 'SA' ? '🇸🇦' : country.code === 'AE' ? '🇦🇪' : country.code === 'US' ? '🇺🇸' : country.code === 'GB' ? '🇬🇧' : country.code === 'FR' ? '🇫🇷' : '🌍'}</div>
                              <div className="flex-1">
                                <div className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">{getCountryName(country)}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{country.name} • {country.nameAr} • {country.nameFr}</div>
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
              <label className="text-sm font-semibold flex items-center gap-2 text-indigo-800 transition-colors group-hover:text-purple-900">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-sm">
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
                  className="pl-12 h-12 border-2 border-purple-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 rounded-xl transition-all duration-300 text-base shadow-sm hover:shadow-md disabled:bg-purple-50 disabled:cursor-not-allowed bg-white text-indigo-900"
                />
                {showCityDropdown && selectedCountry && (
                  <div className="absolute z-50 w-full mt-2 bg-white border-2 border-purple-200 rounded-xl shadow-xl max-h-80 overflow-auto animate-in slide-in-from-top-2 duration-300">
                    {filteredCities.length === 0 ? (
                      <div className="p-6 text-center">
                        <div className="text-4xl mb-2">🏙️</div>
                        <div className="text-sm font-medium text-slate-500">
                          {language === 'ar' ? 'لا توجد مدن' : language === 'en' ? 'No cities' : 'Aucune ville'}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2">
                        {filteredCities.map((city, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSelectCity(city)}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-pink-50 transition-all duration-200 group mb-1 border border-transparent hover:border-pink-200 hover:shadow-sm"
                            style={{ animationDelay: `${idx * 20}ms` }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">🏙️</div>
                              <div className="flex-1">
                                <div className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">{getCityName(city)}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{city.name} • {city.nameAr} • {city.nameFr}</div>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="text-pink-600">→</div>
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
              <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-purple-200">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-bold text-lg text-slate-800">{labels.info}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg border border-purple-200 shadow-sm">
                        <Globe2 className="w-4 h-4 text-purple-600" />
                        <span className="font-semibold text-slate-700">
                          {language === 'ar' ? 'الدولة' : language === 'en' ? 'Country' : 'Pays'}:
                        </span>
                        <span className="text-slate-900 font-medium">
                          {getCountryName(selectedCountry)} ({selectedCountry.code})
                        </span>
                        <span className="ml-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {selectedCountry.cities.length} {language === 'ar' ? 'مدينة' : language === 'en' ? 'cities' : 'villes'}
                        </span>
                      </div>
                      
                      {selectedCity && (
                        <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg border border-purple-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <MapPin className="w-4 h-4 text-pink-600" />
                          <span className="font-semibold text-slate-700">
                            {language === 'ar' ? 'المدينة' : language === 'en' ? 'City' : 'Ville'}:
                          </span>
                          <span className="text-slate-900 font-medium">{getCityName(selectedCity)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t-2 border-purple-200">
              <div className="text-center group cursor-default">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-md mb-3 transform transition-transform group-hover:scale-105 group-hover:shadow-lg">
                  <div className="text-4xl font-black text-white">250</div>
                </div>
                <div className="text-sm font-semibold text-slate-600">{labels.countries}</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="p-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-md mb-3 transform transition-transform group-hover:scale-105 group-hover:shadow-lg">
                  <div className="text-4xl font-black text-white">4.6K</div>
                </div>
                <div className="text-sm font-semibold text-slate-600">{labels.cities}</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="p-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-md mb-3 transform transition-transform group-hover:scale-105 group-hover:shadow-lg">
                  <div className="text-4xl font-black text-white">3</div>
                </div>
                <div className="text-sm font-semibold text-slate-600">{labels.languages}</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-2xl text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">Ready to use this library? 🚀</h3>
              <p className="text-white/90">Install now with npm and start building amazing apps!</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-4">
                <code className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-mono text-sm border border-white/30">
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
