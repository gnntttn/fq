export interface HisnulMuslimDhikr {
  id: number;
  category_id: number;
  arabic: string;
  translation_en: string;
  translation_fr: string;
  translation_ar: string;
  transliteration: string;
  count: number;
  virtue_en?: string;
  virtue_fr?: string;
  virtue_ar?: string;
}

export interface HisnulMuslimCategory {
  id: number;
  title_en: string;
  title_fr: string;
  title_ar: string;
}
