import { Shield, HandHeart, Sparkles, LucideIcon } from 'lucide-react';
import { TranslationKey } from '../lib/i18n';

export interface ThemedCollection {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  icon: LucideIcon;
  verses: string[];
}

export const themedAyatCollections: ThemedCollection[] = [
  {
    id: 'patience',
    titleKey: 'theme_patience',
    descriptionKey: 'theme_patience_desc',
    icon: Shield,
    verses: ['2:153', '2:155', '3:200', '39:10', '94:5'],
  },
  {
    id: 'gratitude',
    titleKey: 'theme_gratitude',
    descriptionKey: 'theme_gratitude_desc',
    icon: HandHeart,
    verses: ['14:7', '2:152', '16:114', '27:19', '31:12'],
  },
  {
    id: 'forgiveness',
    titleKey: 'theme_forgiveness',
    descriptionKey: 'theme_forgiveness_desc',
    icon: Sparkles,
    verses: ['39:53', '3:135', '8:33', '11:3', '66:8'],
  },
];
