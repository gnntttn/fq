import { DuaCategory, Dua } from '../types/dua';

export const duaCategories: DuaCategory[] = [
  { id: 1, title_key: 'dua_category_forgiveness' },
  { id: 2, title_key: 'dua_category_parents' },
  { id: 3, title_key: 'dua_category_guidance' },
  { id: 4, title_key: 'dua_category_protection' },
  { id: 5, title_key: 'dua_category_distress' },
  { id: 6, title_key: 'dua_category_knowledge' },
];

export const allDuas: Dua[] = [
  // Forgiveness
  {
    id: 1, category_id: 1,
    arabic: 'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ',
    translation_en: 'I seek the forgiveness of Allah, whom there is none worthy of worship except Him, the Living, the Eternal, and I repent unto Him.',
    translation_fr: 'Je demande pardon à Allah, en dehors de qui il n\'y a point de divinité, le Vivant, Celui qui subsiste par Lui-même, et je me repens à Lui.',
    source: 'Sunan Abi Dawud',
  },
  {
    id: 2, category_id: 1,
    arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    translation_en: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',
    translation_fr: 'Ô notre Seigneur, nous avons fait du tort à nous-mêmes. Et si Tu ne nous pardonnes pas et ne nous fais pas miséricorde, nous serons très certainement du nombre des perdants.',
    source: 'Qur\'an 7:23',
  },
  // Parents
  {
    id: 3, category_id: 2,
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    translation_en: 'My Lord, have mercy upon them as they brought me up [when I was] small.',
    translation_fr: 'Ô mon Seigneur, fais-leur à tous deux miséricorde comme ils m\'ont élevé tout petit.',
    source: 'Qur\'an 17:24',
  },
  {
    id: 10, category_id: 2,
    arabic: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    translation_en: 'Our Lord, forgive me and my parents and the believers the Day the account is established.',
    translation_fr: 'Ô notre Seigneur, pardonne-moi, ainsi qu\'à mes père et mère et aux croyants, le jour de la reddition des comptes.',
    source: 'Qur\'an 14:41',
  },
  // Guidance
  {
    id: 4, category_id: 3,
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
    translation_en: 'O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.',
    translation_fr: 'Ô Allah, je Te demande la guidée, la piété, la chasteté et la richesse (du cœur).',
    source: 'Sahih Muslim',
  },
  {
    id: 11, category_id: 3,
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ',
    translation_en: 'Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.',
    translation_fr: 'Seigneur ! Ne laisse pas dévier nos cœurs après que Tu nous aies guidés ; et accorde-nous Ta miséricorde. C\'est Toi, certes, le Grand Donateur !',
    source: 'Qur\'an 3:8',
  },
  // Protection
  {
    id: 5, category_id: 4,
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    translation_en: 'I seek refuge in the perfect words of Allah from the evil of that which He has created.',
    translation_fr: 'Je cherche refuge dans les paroles parfaites d\'Allah contre le mal de ce qu\'Il a créé.',
    source: 'Sahih Muslim',
  },
  // Distress
  {
    id: 12, category_id: 5,
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    translation_en: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    translation_fr: 'Pas de divinité à part Toi ! Pureté à Toi ! J\'ai été vraiment du nombre des injustes.',
    source: 'Qur\'an 21:87',
  },
  // Knowledge
  {
    id: 13, category_id: 6,
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    translation_en: 'My Lord, increase me in knowledge.',
    translation_fr: 'Ô mon Seigneur, accrois mes connaissances !',
    source: 'Qur\'an 20:114',
  },
];
