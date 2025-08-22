import { DuaCategory, Dua } from '../types/dua';

export const duaCategories: DuaCategory[] = [
  { id: 1, title_key: 'dua_category_forgiveness' },
  { id: 2, title_key: 'dua_category_parents' },
  { id: 3, title_key: 'dua_category_guidance' },
];

export const allDuas: Dua[] = [
  // Forgiveness
  {
    id: 1,
    category_id: 1,
    arabic: 'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ',
    translation_en: 'I seek the forgiveness of Allah, whom there is none worthy of worship except Him, the Living, the Eternal, and I repent unto Him.',
    translation_fr: 'Je demande pardon à Allah, en dehors de qui il n\'y a point de divinité, le Vivant, Celui qui subsiste par Lui-même, et je me repens à Lui.',
    source: 'Sunan Abi Dawud',
  },
  // Parents
  {
    id: 2,
    category_id: 2,
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    translation_en: 'My Lord, have mercy upon them as they brought me up [when I was] small.',
    translation_fr: 'Ô mon Seigneur, fais-leur à tous deux miséricorde comme ils m\'ont élevé tout petit.',
    source: 'Qur\'an 17:24',
  },
  // Guidance
  {
    id: 3,
    category_id: 3,
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
    translation_en: 'O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.',
    translation_fr: 'Ô Allah, je Te demande la guidée, la piété, la chasteté et la richesse (du cœur).',
    source: 'Sahih Muslim',
  },
];
