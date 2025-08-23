import { TranslationKey } from "../lib/i18n";

export type InsightType = 'pie' | 'bar' | 'fact';

export interface Insight {
  type: InsightType;
  titleKey: TranslationKey;
  data: any;
}

export const insights: Insight[] = [
  { 
    type: 'pie', 
    titleKey: 'meccan_vs_medinan', 
    data: { 
      meccan: { labelKey: 'meccan', value: 86, color: '#3182ce' },
      medinan: { labelKey: 'medinan', value: 28, color: '#66fcf1' } 
    } 
  },
  {
    type: 'bar',
    titleKey: 'word_frequency',
    data: [
      { label: 'الله', value: 2699 },
      { label: 'رب', value: 970 },
      { label: 'آمنوا', value: 500 },
      { label: 'يوم', value: 475 },
    ]
  },
  {
    type: 'fact',
    titleKey: 'did_you_know',
    data: {
      factKey: 'did_you_know_yawm'
    }
  },
  {
    type: 'fact',
    titleKey: 'did_you_know',
    data: {
      factKey: 'did_you_know_shahr'
    }
  },
  {
    type: 'bar',
    titleKey: 'prophet_mentions',
    data: [
        { label: 'موسى', value: 136 },
        { label: 'إبراهيم', value: 69 },
        { label: 'نوح', value: 43 },
        { label: 'عيسى', value: 25 },
        { label: 'آدم', value: 25 },
    ]
  },
  {
    type: 'fact',
    titleKey: 'did_you_know',
    data: {
      factKey: 'did_you_know_dunya_akhirah'
    }
  },
  {
    type: 'pie',
    titleKey: 'surah_name_categories',
    data: {
        prophets: { labelKey: 'surah_named_prophet', value: 6, color: '#3182ce' },
        other: { labelKey: 'surah_named_other', value: 108, color: '#66fcf1' }
    }
  },
  {
    type: 'fact',
    titleKey: 'did_you_know',
    data: {
      factKey: 'did_you_know_sajdah'
    }
  },
];
