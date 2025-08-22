import { LucideIcon } from 'lucide-react';
import { TranslationKey } from '../lib/i18n';

export interface ProphetStory {
  id: string;
  nameKey: TranslationKey;
  icon: LucideIcon;
  verses: string[];
}
