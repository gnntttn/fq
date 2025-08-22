import { TajweedRule } from "../types/tajweed";

export const tajweedRules: TajweedRule[] = [
  {
    id: 'noon-sakinah',
    titleKey: 'tajweed_noon_sakinah_title',
    explanationKey: 'tajweed_noon_sakinah_desc',
  },
  {
    id: 'idhaar',
    titleKey: 'tajweed_idhaar_title',
    explanationKey: 'tajweed_idhaar_desc',
    example_ar: 'مَنْ آمَنَ - مِنْهُمْ - أَنْعَمْتَ',
    example_explanation_key: 'tajweed_idhaar_example',
  },
  {
    id: 'idghaam',
    titleKey: 'tajweed_idghaam_title',
    explanationKey: 'tajweed_idghaam_desc',
    example_ar: 'مَن يَقُولُ - مِن رَّبِّهِمْ',
    example_explanation_key: 'tajweed_idghaam_example',
  },
  {
    id: 'iqlab',
    titleKey: 'tajweed_iqlab_title',
    explanationKey: 'tajweed_iqlab_desc',
    example_ar: 'مِن بَعْدِ',
    example_explanation_key: 'tajweed_iqlab_example',
  },
  {
    id: 'ikhfa',
    titleKey: 'tajweed_ikhfa_title',
    explanationKey: 'tajweed_ikhfa_desc',
    example_ar: 'الإِنسَانُ - أَنصَارًا',
    example_explanation_key: 'tajweed_ikhfa_example',
  },
];
