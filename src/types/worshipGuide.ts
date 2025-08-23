import { TranslationKey } from '../lib/i18n';

export interface WorshipTopic {
  id: string;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  sections: WorshipSection[];
}

export interface WorshipSection {
  titleKey: TranslationKey;
  steps: WorshipStep[];
}

export interface WorshipStep {
  step: number;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  image?: string;
}
