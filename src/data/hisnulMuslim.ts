import { HisnulMuslimCategory, HisnulMuslimDhikr } from '../types/hisnulMuslim';

export const hisnulMuslimCategories: HisnulMuslimCategory[] = [
  { id: 1, title_en: 'When waking up', title_fr: 'Au réveil', title_ar: 'أذكار الاستيقاظ من النوم' },
  { id: 2, title_en: 'When wearing a garment', title_fr: 'En portant un vêtement', title_ar: 'دعاء لبس الثوب' },
  { id: 3, title_en: 'Entering & Leaving the Toilet', title_fr: 'Entrée et Sortie des Toilettes', title_ar: 'دعاء دخول الخلاء والخروج منه' },
  { id: 4, title_en: 'Before & After Ablution', title_fr: 'Avant et Après les Ablutions', title_ar: 'الذكر قبل الوضوء وبعده' },
  { id: 5, title_en: 'Entering & Leaving the Home', title_fr: 'Entrée et Sortie de la Maison', title_ar: 'الذكر عند دخول المنزل والخروج منه' },
  { id: 6, title_en: 'Going to the Mosque', title_fr: 'En allant à la Mosquée', title_ar: 'دعاء الذهاب إلى المسجد' },
  { id: 7, title_en: 'Entering & Leaving the Mosque', title_fr: 'Entrée et Sortie de la Mosquée', title_ar: 'دعاء دخول المسجد والخروج منه' },
  { id: 8, title_en: 'Adhan & Iqamah', title_fr: 'Adhan & Iqamah', title_ar: 'أذكار الأذان والإقامة' },
  { id: 9, title_en: 'After Prayer', title_fr: 'Après la Prière', title_ar: 'الأذكار بعد السلام من الصلاة' },
  { id: 10, title_en: 'Before & After Eating', title_fr: 'Avant et Après Manger', title_ar: 'أذكار الطعام' },
  { id: 11, title_en: 'When it Rains', title_fr: 'Quand il pleut', title_ar: 'دعاء نزول المطر' },
  { id: 12, title_en: 'Before Sleeping', title_fr: 'Avant de Dormir', title_ar: 'أذكار النوم' },
];

export const hisnulMuslimDhikr: HisnulMuslimDhikr[] = [
  // Waking up
  {
    id: 1, category_id: 1,
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا، وَإِلَيْهِ النُّشُورُ',
    translation_en: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
    translation_fr: 'Louange à Allah qui nous a fait revivre après nous avoir fait mourir, et c\'est vers Lui que se fera la résurrection.',
    translation_ar: 'الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور.',
    transliteration: 'Alhamdu lillahil-lathee ahyana baAAda ma amatana wa-ilayhin-nushoor.',
    count: 1,
  },
  // Wearing a garment
  {
    id: 2, category_id: 2,
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    translation_en: 'All Praise is for Allah who has clothed me with this (garment) and provided it for me without any strength or power on my part.',
    translation_fr: 'Louange à Allah qui m\'a vêtu de cet (habit) et me l\'a accordé sans force ni puissance de ma part.',
    translation_ar: 'الحمد لله الذي كساني هذا (الثوب) ورزقنيه من غير حول مني ولا قوة.',
    transliteration: 'Alhamdu lillahil-lathee kasanee hatha (aththawba) warazaqaneehi min ghayri hawlin minnee wala quwwatin.',
    count: 1,
  },
  // Toilet
  {
    id: 3, category_id: 3,
    arabic: '[بِسْمِ اللَّهِ] اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    translation_en: '[In the name of Allah]. O Allah, I seek protection in You from the male and female unclean spirits.',
    translation_fr: '[Au nom d\'Allah]. Ô Allah, je cherche refuge auprès de Toi contre les démons mâles et femelles.',
    translation_ar: '[بسم الله] اللهم إني أعوذ بك من الخبث والخبائث.',
    transliteration: '[Bismil-lah] allahumma innee aAAoothu bika minal-khubthi wal-khaba-ith.',
    count: 1,
  },
  {
    id: 4, category_id: 3,
    arabic: 'غُفْرَانَكَ',
    translation_en: 'I seek your forgiveness.',
    translation_fr: 'Je cherche Ton pardon.',
    translation_ar: 'غفرانك',
    transliteration: 'Ghufranak.',
    count: 1,
  },
  // Ablution
  {
    id: 10, category_id: 4,
    arabic: 'بِسْمِ اللَّهِ',
    translation_en: 'In the name of Allah.',
    translation_fr: 'Au nom d\'Allah.',
    translation_ar: 'بسم الله',
    transliteration: 'Bismillah.',
    count: 1,
  },
  {
    id: 11, category_id: 4,
    arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    translation_en: 'I bear witness that none has the right to be worshipped except Allah, alone, without partner, and I bear witness that Muhammad is His slave and His Messenger.',
    translation_fr: 'Je témoigne que nul n\'a le droit d\'être adoré sauf Allah, seul, sans partenaire, et je témoigne que Muhammad est Son esclave et Son Messager.',
    translation_ar: 'أشهد أن لا إله إلا الله وحده لا شريك له، وأشهد أن محمداً عبده ورسوله',
    transliteration: 'Ashhadu an la ilaha illal-lahu wahdahu la shareeka lah, wa-ashhadu anna Muhammadan AAabduhu warasooluh.',
    count: 1,
  },
  // Home
  {
    id: 12, category_id: 5,
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
    translation_en: 'In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we depend [then say As-Salāmu `Alaykum to those present].',
    translation_fr: 'Au nom d\'Allah nous entrons, au nom d\'Allah nous sortons, et en notre Seigneur nous plaçons notre confiance [puis dire As-Salāmu `Alaykum à ceux qui sont présents].',
    translation_ar: 'بسم الله ولجنا، وبسم الله خرجنا، وعلى الله ربنا توكلنا',
    transliteration: 'Bismillahi walajna, wabismillahi kharajna, waAAala Allahi rabbina tawakkalna.',
    count: 1,
  },
  // Mosque
  {
    id: 13, category_id: 6,
    arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا...',
    translation_en: 'O Allah, place light in my heart, and on my tongue light, and in my hearing light, and in my sight light...',
    translation_fr: 'Ô Allah, place de la lumière dans mon cœur, et sur ma langue de la lumière, et dans mon ouïe de la lumière, et dans ma vue de la lumière...',
    translation_ar: 'اللهم اجعل في قلبي نوراً، وفي لساني نوراً، وفي سمعي نوراً، وفي بصري نوراً، ومن فوقي نوراً، ومن تحتي نوراً، وعن يميني نوراً، وعن شمالي نوراً، ومن أمامي نوراً، ومن خلفي نوراً، واجعل في نفسي نوراً، وأعظم لي نوراً، وعظم لي نوراً، واجعل لي نوراً، واجعلني نوراً، اللهم أعطني نوراً، واجعل في عصبي نوراً، وفي لحمي نوراً، وفي دمي نوراً، وفي شعري نوراً، وفي بشري نوراً',
    transliteration: 'AllahummajAAal fee qalbee noora...',
    count: 1,
  },
  {
    id: 6, category_id: 7,
    arabic: 'بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    translation_en: 'In the name of Allah, and prayers and peace be upon the Messenger of Allah. O Allah, open the gates of your mercy for me.',
    translation_fr: 'Au nom d\'Allah, et que la prière et le salut soient sur le Messager d\'Allah. Ô Allah, ouvre-moi les portes de Ta miséricorde.',
    translation_ar: 'بسم الله، والصلاة والسلام على رسول الله، اللهم افتح لي أبواب رحمتك',
    transliteration: 'Bismillahi, wassalatu wassalamu AAala rasoolillahi, allahumma iftah lee abwaba rahmatik.',
    count: 1,
  },
  // Adhan
  {
    id: 5, category_id: 8,
    arabic: 'يَقُولُ مِثْلَ مَا يَقُولُ الْمُؤَذِّنُ إِلَّا فِي "حَيَّ عَلَى الصَّلَاةِ" و "حَيَّ عَلَى الْفَلَاحِ" فَيَقُولُ: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ".',
    translation_en: 'Repeat what the Mu\'adhin says, except for "Hayya \'alas-Salah" and "Hayya \'alal-Falah", for which one should say: "There is no might nor power except with Allah."',
    translation_fr: 'Répéter ce que dit le Muezzin, sauf pour "Hayya \'alas-Salah" et "Hayya \'alal-Falah", pour lesquels on doit dire : "Il n\'y a de force ni de puissance qu\'en Allah."',
    translation_ar: 'يقول مثل ما يقول المؤذن إلا في "حي على الصلاة" و "حي على الفلاح" فيقول: "لا حول ولا قوة إلا بالله".',
    transliteration: 'La hawla wala quwwata illa billah.',
    count: 1,
  },
  // After Prayer
  {
    id: 14, category_id: 9,
    arabic: 'أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    translation_en: 'I seek the forgiveness of Allah (three times). O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honor.',
    translation_fr: 'Je demande pardon à Allah (trois fois). Ô Allah, Tu es la Paix et de Toi vient la paix. Béni sois-Tu, Ô Détenteur de la majesté et de l\'honneur.',
    translation_ar: 'أستغفر الله (ثلاثاً) اللهم أنت السلام ومنك السلام، تباركت يا ذا الجلال والإكرام',
    transliteration: 'Astaghfirul-lah (thrice) Allahumma antas-salamu waminkas-salam, tabarakta ya thal-jalali wal-ikram.',
    count: 1,
  },
  // Eating
  {
    id: 7, category_id: 10,
    arabic: 'بِسْمِ اللَّهِ',
    translation_en: 'In the name of Allah.',
    translation_fr: 'Au nom d\'Allah.',
    translation_ar: 'بسم الله',
    transliteration: 'Bismillah.',
    count: 1,
  },
  {
    id: 8, category_id: 10,
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    translation_en: 'All praise is for Allah who fed me this and provided it for me without any might nor power from myself.',
    translation_fr: 'Louange à Allah qui m\'a nourri de ceci et me l\'a accordé sans force ni puissance de ma part.',
    translation_ar: 'الحمد لله الذي أطعمني هذا، ورزقنيه من غير حول مني ولا قوة',
    transliteration: 'Alhamdu lillahil-lathee atAAamanee hatha, warazaqaneehi min ghayri hawlin minnee wala quwwatin.',
    count: 1,
  },
  // Rain
  {
    id: 9, category_id: 11,
    arabic: 'اللَّهُمَّ صَيِّبًا نَافِعًا',
    translation_en: 'O Allah, may it be a beneficial rain.',
    translation_fr: 'Ô Allah, que ce soit une pluie bénéfique.',
    translation_ar: 'اللهم صيباً نافعاً',
    transliteration: 'Allahumma sayyiban nafiAAan.',
    count: 1,
  },
  // Sleeping
  {
    id: 15, category_id: 12,
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
    translation_en: 'In Your name my Lord, I lie down and in Your name I rise, so if You should take my soul then have mercy upon it, and if You should return my soul then protect it as You protect Your righteous slaves.',
    translation_fr: 'En Ton nom, mon Seigneur, je me couche et en Ton nom je me lève. Si Tu retiens mon âme, fais-lui miséricorde, et si Tu la laisses, protège-la comme Tu protèges Tes serviteurs vertueux.',
    translation_ar: 'باسمك ربي وضعت جنبي، وبك أرفعه، فإن أمسكت نفسي فارحمها، وإن أرسلتها فاحفظها بما تحفظ به عبادك الصالحين',
    transliteration: 'Bismika rabbee wadaAAtu janbee, wabika arfaAAuh, fa-in amsakta nafsee farhamha, wa-in arsaltaha fahfathha bima tahfathu bihi AAibadakas-saliheen.',
    count: 1,
  },
];
