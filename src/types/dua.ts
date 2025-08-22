export interface Dua {
  id: number;
  category_id: number;
  arabic: string;
  translation_en: string;
  translation_fr: string;
  source: string;
}

export interface DuaCategory {
  id: number;
  title_key: string;
}
