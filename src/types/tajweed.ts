import { TranslationKey } from '../lib/i18n';

export interface TajweedRule {
  id: string;
  titleKey: TranslationKey;
  explanationKey: TranslationKey;
  example_ar?: string;
  example_explanation_key?: TranslationKey;
}
