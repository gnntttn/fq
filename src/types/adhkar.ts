export interface Dhikr {
  id: number;
  category: 'morning' | 'evening';
  arabic: string;
  transliteration: string;
  translation_en: string;
  translation_fr: string;
  translation_ar: string;
  count: number;
  virtue_en?: string;
  virtue_fr?: string;
  virtue_ar?: string;
}
