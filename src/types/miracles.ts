import { LucideIcon } from 'lucide-react';
import { TranslationKey } from '../lib/i18n';

export interface MiracleTopic {
  id: string;
  titleKey: TranslationKey;
  icon: LucideIcon;
  summaryKey: TranslationKey;
  verseKeys: string[];
}
