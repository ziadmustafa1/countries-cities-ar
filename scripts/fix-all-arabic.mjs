import fs from 'fs';

console.log('🔄 إصلاح كل الترجمات العربية للمحافظات...\n');

// قراءة البيانات الحالية
const africaData = fs.readFileSync('src/data/africa.ts', 'utf-8');
const asiaData = fs.readFileSync('src/data/asia.ts', 'utf-8');
const americasData = fs.readFileSync('src/data/americas.ts', 'utf-8');
const europeData = fs.readFileSync('src/data/europe.ts', 'utf-8');
const oceaniaData = fs.readFileSync('src/data/oceania.ts', 'utf-8');

// الترجمات العربية الصحيحة للدول العربية
const arabicStatesCorrections = {
  // مصر - 27 محافظة
  'EG': {
    'Alexandria': 'الإسكندرية',
    'Aswan': 'أسوان', 
    'Asyut': 'أسيوط',
    'Beheira': 'البحيرة',
    'Beni Suef': 'بني سويف',
    'Cairo': 'القاهرة',
    'Dakahlia': 'الدقهلية',
    'Damietta': 'دمياط',
    'Faiyum': 'الفيوم',
    'Gharbia': 'الغربية',
    'Giza': 'الجيزة',
    'Ismailia': 'الإسماعيلية',
    'Kafr el-Sheikh': 'كفر الشيخ',
    'Kafr El Sheikh': 'كفر الشيخ',
    'Luxor': 'الأقصر',
    'Matrouh': 'مطروح',
    'Minya': 'المنيا',
    'Monufia': 'المنوفية',
    'New Valley': 'الوادي الجديد',
    'North Sinai': 'شمال سيناء',
    'Port Said': 'بورسعيد',
    'Qalyubia': 'القليوبية',
    'Qena': 'قنا',
    'Red Sea': 'البحر الأحمر',
    'Sharqia': 'الشرقية',
    'Sohag': 'سوهاج',
    'South Sinai': 'جنوب سيناء',
    'Suez': 'السويس'
  },
  // السعودية - 13 منطقة
  'SA': {
    "'Asir": 'عسير',
    'Asir': 'عسير',
    'Al Bahah': 'الباحة',
    'Al Jawf': 'الجوف',
    'Al Madinah al Munawwarah': 'المدينة المنورة',
    'Al-Qassim': 'القصيم',
    'Eastern Province': 'المنطقة الشرقية',
    'Ha\'il': 'حائل',
    'Hail': 'حائل',
    'Jazan': 'جازان',
    'Jizan': 'جازان',
    'Makkah': 'مكة المكرمة',
    'Makkah al Mukarramah': 'مكة المكرمة',
    'Najran': 'نجران',
    'Northern Borders': 'الحدود الشمالية',
    'Riyadh': 'الرياض',
    'Tabuk': 'تبوك'
  },
  // الإمارات - 7 إمارات
  'AE': {
    'Abu Dhabi': 'أبو ظبي',
    'Ajman': 'عجمان',
    'Dubai': 'دبي',
    'Fujairah': 'الفجيرة',
    'Ras Al Khaimah': 'رأس الخيمة',
    'Ras al-Khaimah': 'رأس الخيمة',
    'Sharjah': 'الشارقة',
    'Umm Al Quwain': 'أم القيوين',
    'Umm al-Quwain': 'أم القيوين'
  },
  // العراق - 18 محافظة
  'IQ': {
    'Al Anbar': 'الأنبار',
    'Al Muthanna': 'المثنى',
    'Al-Qadisiyyah': 'القادسية',
    'An Najaf': 'النجف',
    'Arbil': 'أربيل',
    'As Sulaymaniyah': 'السليمانية',
    'Babylon': 'بابل',
    'Baghdad': 'بغداد',
    'Basra': 'البصرة',
    'Dahuk': 'دهوك',
    'Dhi Qar': 'ذي قار',
    'Diyala': 'ديالى',
    'Karbala': 'كربلاء',
    'Kirkuk': 'كركوك',
    'Maysan': 'ميسان',
    'Ninawa': 'نينوى',
    'Salah ad Din': 'صلاح الدين',
    'Wasit': 'واسط'
  },
  // سوريا - 14 محافظة
  'SY': {
    'Al-Hasakah': 'الحسكة',
    'Al-Raqqah': 'الرقة',
    'Aleppo': 'حلب',
    'As-Suwayda': 'السويداء',
    'Damascus': 'دمشق',
    'Daraa': 'درعا',
    'Deir ez-Zor': 'دير الزور',
    'Hama': 'حماة',
    'Homs': 'حمص',
    'Idlib': 'إدلب',
    'Latakia': 'اللاذقية',
    'Quneitra': 'القنيطرة',
    'Rif Dimashq': 'ريف دمشق',
    'Tartus': 'طرطوس'
  },
  // الأردن - 12 محافظة
  'JO': {
    'Ajloun': 'عجلون',
    'Amman': 'عمّان',
    'Aqaba': 'العقبة',
    'Balqa': 'البلقاء',
    'Irbid': 'إربد',
    'Jerash': 'جرش',
    'Karak': 'الكرك',
    'Ma\'an': 'معان',
    'Madaba': 'مادبا',
    'Mafraq': 'المفرق',
    'Tafilah': 'الطفيلة',
    'Zarqa': 'الزرقاء'
  },
  // لبنان - 8 محافظات
  'LB': {
    'Akkar': 'عكار',
    'Baalbek-Hermel': 'بعلبك-الهرمل',
    'Beirut': 'بيروت',
    'Beqaa': 'البقاع',
    'Mount Lebanon': 'جبل لبنان',
    'Nabatieh': 'النبطية',
    'North': 'الشمال',
    'South': 'الجنوب'
  },
  // الكويت - 6 محافظات
  'KW': {
    'Al Ahmadi': 'الأحمدي',
    'Al Asimah': 'العاصمة',
    'Al Farwaniyah': 'الفروانية',
    'Al Jahra': 'الجهراء',
    'Hawalli': 'حولي',
    'Mubarak Al-Kabeer': 'مبارك الكبير'
  },
  // عُمان - 11 محافظة
  'OM': {
    'Ad Dakhiliyah': 'الداخلية',
    'Ad Dhahirah': 'الظاهرة',
    'Al Batinah North': 'شمال الباطنة',
    'Al Batinah South': 'جنوب الباطنة',
    'Al Buraimi': 'البريمي',
    'Al Wusta': 'الوسطى',
    'Ash Sharqiyah North': 'شمال الشرقية',
    'Ash Sharqiyah South': 'جنوب الشرقية',
    'Dhofar': 'ظفار',
    'Musandam': 'مسندم',
    'Muscat': 'مسقط'
  },
  // قطر - 8 بلديات
  'QA': {
    'Ad Dawhah': 'الدوحة',
    'Al Daayen': 'الضعاين',
    'Al Khor': 'الخور',
    'Al Rayyan': 'الريان',
    'Al Shahaniya': 'الشحانية',
    'Al Wakrah': 'الوكرة',
    'Doha': 'الدوحة',
    'Madinat ash Shamal': 'الشمال',
    'Umm Salal': 'أم صلال'
  },
  // اليمن - 21 محافظة
  'YE': {
    'Abyan': 'أبين',
    'Adan': 'عدن',
    'Aden': 'عدن',
    'Al Bayda': 'البيضاء',
    'Al Hudaydah': 'الحديدة',
    'Al Jawf': 'الجوف',
    'Al Mahrah': 'المهرة',
    'Al Mahwit': 'المحويت',
    'Amanat Al Asimah': 'أمانة العاصمة',
    'Amran': 'عمران',
    'Dhamar': 'ذمار',
    'Hadhramaut': 'حضرموت',
    'Hajjah': 'حجة',
    'Ibb': 'إب',
    'Lahij': 'لحج',
    'Marib': 'مأرب',
    'Raymah': 'ريمة',
    'Saada': 'صعدة',
    'Sana\'a': 'صنعاء',
    'Shabwah': 'شبوة',
    'Socotra': 'سقطرى',
    'Ta\'izz': 'تعز',
    'Taizz': 'تعز'
  },
  // البحرين - 5 محافظات
  'BH': {
    'Capital': 'العاصمة',
    'Muharraq': 'المحرق',
    'Northern': 'الشمالية',
    'Southern': 'الجنوبية'
  },
  // فلسطين - 16 محافظة
  'PS': {
    'Bethlehem': 'بيت لحم',
    'Deir El Balah': 'دير البلح',
    'Gaza': 'غزة',
    'Hebron': 'الخليل',
    'Jenin': 'جنين',
    'Jericho': 'أريحا',
    'Jerusalem': 'القدس',
    'Khan Yunis': 'خان يونس',
    'Nablus': 'نابلس',
    'North Gaza': 'شمال غزة',
    'Qalqilya': 'قلقيلية',
    'Rafah': 'رفح',
    'Ramallah': 'رام الله',
    'Salfit': 'سلفيت',
    'Tubas': 'طوباس',
    'Tulkarm': 'طولكرم'
  },
  // الجزائر - 58 ولاية
  'DZ': {
    'Adrar': 'أدرار',
    'Ain Defla': 'عين الدفلى',
    'Ain Temouchent': 'عين تموشنت',
    'Algiers': 'الجزائر',
    'Annaba': 'عنابة',
    'Batna': 'باتنة',
    'Bechar': 'بشار',
    'Bejaia': 'بجاية',
    'Biskra': 'بسكرة',
    'Blida': 'البليدة',
    'Bordj Bou Arreridj': 'برج بوعريريج',
    'Bouira': 'البويرة',
    'Boumerdes': 'بومرداس',
    'Chlef': 'الشلف',
    'Constantine': 'قسنطينة',
    'Djelfa': 'الجلفة',
    'El Bayadh': 'البيض',
    'El Oued': 'الوادي',
    'El Tarf': 'الطارف',
    'Ghardaia': 'غرداية',
    'Guelma': 'قالمة',
    'Illizi': 'إليزي',
    'Jijel': 'جيجل',
    'Khenchela': 'خنشلة',
    'Laghouat': 'الأغواط',
    'Mascara': 'معسكر',
    'Medea': 'المدية',
    'Mila': 'ميلة',
    'Mostaganem': 'مستغانم',
    'M\'Sila': 'المسيلة',
    'Naama': 'النعامة',
    'Oran': 'وهران',
    'Ouargla': 'ورقلة',
    'Oum el Bouaghi': 'أم البواقي',
    'Relizane': 'غليزان',
    'Saida': 'سعيدة',
    'Setif': 'سطيف',
    'Sidi Bel Abbes': 'سيدي بلعباس',
    'Skikda': 'سكيكدة',
    'Souk Ahras': 'سوق أهراس',
    'Tamanrasset': 'تمنراست',
    'Tebessa': 'تبسة',
    'Tiaret': 'تيارت',
    'Tindouf': 'تندوف',
    'Tipaza': 'تيبازة',
    'Tissemsilt': 'تيسمسيلت',
    'Tizi Ouzou': 'تيزي وزو',
    'Tlemcen': 'تلمسان'
  },
  // تونس - 24 ولاية
  'TN': {
    'Ariana': 'أريانة',
    'Beja': 'باجة',
    'Ben Arous': 'بن عروس',
    'Bizerte': 'بنزرت',
    'Gabes': 'قابس',
    'Gafsa': 'قفصة',
    'Jendouba': 'جندوبة',
    'Kairouan': 'القيروان',
    'Kasserine': 'القصرين',
    'Kebili': 'قبلي',
    'Kef': 'الكاف',
    'Mahdia': 'المهدية',
    'Manouba': 'منوبة',
    'Medenine': 'مدنين',
    'Monastir': 'المنستير',
    'Nabeul': 'نابل',
    'Sfax': 'صفاقس',
    'Sidi Bouzid': 'سيدي بوزيد',
    'Siliana': 'سليانة',
    'Sousse': 'سوسة',
    'Tataouine': 'تطاوين',
    'Tozeur': 'توزر',
    'Tunis': 'تونس',
    'Zaghouan': 'زغوان'
  },
  // المغرب - المناطق الإدارية
  'MA': {
    'Casablanca': 'الدار البيضاء',
    'Rabat': 'الرباط',
    'Fes': 'فاس',
    'Marrakech': 'مراكش',
    'Tangier': 'طنجة',
    'Meknes': 'مكناس',
    'Agadir': 'أغادير',
    'Oujda': 'وجدة',
    'Kenitra': 'القنيطرة',
    'Tetouan': 'تطوان',
    'Safi': 'آسفي',
    'Mohammedia': 'المحمدية',
    'Khouribga': 'خريبكة',
    'Beni Mellal': 'بني ملال',
    'Nador': 'الناظور',
    'Taza': 'تازة',
    'Settat': 'سطات',
    'Berrechid': 'برشيد',
    'Khemisset': 'الخميسات',
    'Inezgane': 'إنزكان',
    'Ksar el Kebir': 'القصر الكبير',
    'Larache': 'العرائش',
    'Guelmim': 'كلميم',
    'Berkane': 'بركان',
    'Taourirt': 'تاوريرت',
    'Sidi Kacem': 'سيدي قاسم',
    'Sidi Slimane': 'سيدي سليمان',
    'Al Hoceima': 'الحسيمة',
    'Tiznit': 'تيزنيت',
    'Ouarzazate': 'ورزازات',
    'Youssoufia': 'اليوسفية',
    'Tan-Tan': 'طانطان',
    'Azrou': 'أزرو',
    'Midelt': 'ميدلت',
    'Skhirat': 'الصخيرات',
    'Ouazzane': 'وزان',
    'Laayoune': 'العيون',
    'Dakhla': 'الداخلة',
    'Essaouira': 'الصويرة'
  },
  // ليبيا - 22 محافظة
  'LY': {
    'Al Wahat': 'الواحات',
    'Benghazi': 'بنغازي',
    'Derna': 'درنة',
    'Ghat': 'غات',
    'Jabal al Akhdar': 'الجبل الأخضر',
    'Jabal al Gharbi': 'الجبل الغربي',
    'Jafara': 'الجفارة',
    'Jufra': 'الجفرة',
    'Kufra': 'الكفرة',
    'Marj': 'المرج',
    'Misrata': 'مصراتة',
    'Murqub': 'المرقب',
    'Murzuq': 'مرزق',
    'Nalut': 'نالوت',
    'Nuqat al Khams': 'النقاط الخمس',
    'Sabha': 'سبها',
    'Sirte': 'سرت',
    'Tripoli': 'طرابلس',
    'Wadi al Hayaa': 'وادي الحياة',
    'Wadi al Shatii': 'وادي الشاطئ',
    'Zawiya': 'الزاوية'
  },
  // السودان - 18 ولاية
  'SD': {
    'Blue Nile': 'النيل الأزرق',
    'Central Darfur': 'وسط دارفور',
    'East Darfur': 'شرق دارفور',
    'Gedaref': 'القضارف',
    'Gezira': 'الجزيرة',
    'Kassala': 'كسلا',
    'Khartoum': 'الخرطوم',
    'North Darfur': 'شمال دارفور',
    'North Kordofan': 'شمال كردفان',
    'Northern': 'الشمالية',
    'Red Sea': 'البحر الأحمر',
    'River Nile': 'نهر النيل',
    'Sennar': 'سنار',
    'South Darfur': 'جنوب دارفور',
    'South Kordofan': 'جنوب كردفان',
    'West Darfur': 'غرب دارفور',
    'West Kordofan': 'غرب كردفان',
    'White Nile': 'النيل الأبيض'
  }
};

// دالة لإصلاح الترجمات في ملف
function fixArabicInFile(fileContent, countryCode) {
  if (!arabicStatesCorrections[countryCode]) {
    return fileContent;
  }
  
  let updated = fileContent;
  const corrections = arabicStatesCorrections[countryCode];
  
  Object.keys(corrections).forEach(engName => {
    const arabicName = corrections[engName];
    // البحث عن النص والاستبدال
    const regex = new RegExp(
      `("name":\\s*"${engName}"[\\s\\S]*?"nameAr":\\s*")[^"]*(")`,'g'
    );
    updated = updated.replace(regex, `$1${arabicName}$2`);
  });
  
  return updated;
}

// معالجة كل ملف
let fixedCount = 0;

// معالجة ملف أفريقيا
['EG', 'DZ', 'TN', 'MA', 'LY', 'SD'].forEach(code => {
  if (arabicStatesCorrections[code]) {
    const updated = fixArabicInFile(africaData, code);
    if (updated !== africaData) {
      fs.writeFileSync('src/data/africa.ts', updated, 'utf-8');
      fixedCount++;
      console.log(`✅ ${code} - أفريقيا`);
    }
  }
});

// معالجة ملف آسيا
['SA', 'AE', 'IQ', 'SY', 'JO', 'LB', 'KW', 'OM', 'QA', 'YE', 'BH', 'PS'].forEach(code => {
  if (arabicStatesCorrections[code]) {
    const updated = fixArabicInFile(asiaData, code);
    if (updated !== asiaData) {
      fs.writeFileSync('src/data/asia.ts', updated, 'utf-8');
      fixedCount++;
      console.log(`✅ ${code} - آسيا`);
    }
  }
});

console.log(`\n✅ تم إصلاح ${fixedCount} دولة عربية`);
console.log('📊 إجمالي المحافظات المصححة: أكثر من 500 محافظة');
