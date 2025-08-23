import { WorshipTopic } from '../types/worshipGuide';

export const worshipTopics: WorshipTopic[] = [
  {
    id: 'wudu',
    titleKey: 'worship_wudu_title',
    subtitleKey: 'worship_wudu_subtitle',
    sections: [
      {
        titleKey: 'worship_wudu_steps_title',
        steps: [
          { step: 1, titleKey: 'wudu_step_1_title', descriptionKey: 'wudu_step_1_desc' },
          { step: 2, titleKey: 'wudu_step_2_title', descriptionKey: 'wudu_step_2_desc' },
          { step: 3, titleKey: 'wudu_step_3_title', descriptionKey: 'wudu_step_3_desc' },
          { step: 4, titleKey: 'wudu_step_4_title', descriptionKey: 'wudu_step_4_desc' },
          { step: 5, titleKey: 'wudu_step_5_title', descriptionKey: 'wudu_step_5_desc' },
          { step: 6, titleKey: 'wudu_step_6_title', descriptionKey: 'wudu_step_6_desc' },
          { step: 7, titleKey: 'wudu_step_7_title', descriptionKey: 'wudu_step_7_desc' },
          { step: 8, titleKey: 'wudu_step_8_title', descriptionKey: 'wudu_step_8_desc' },
        ],
      },
    ],
  },
  {
    id: 'salah',
    titleKey: 'worship_salah_title',
    subtitleKey: 'worship_salah_subtitle',
    sections: [
      {
        titleKey: 'worship_salah_pillars_title',
        steps: [
          { step: 1, titleKey: 'salah_pillar_1_title', descriptionKey: 'salah_pillar_1_desc' },
          { step: 2, titleKey: 'salah_pillar_2_title', descriptionKey: 'salah_pillar_2_desc' },
          { step: 3, titleKey: 'salah_pillar_3_title', descriptionKey: 'salah_pillar_3_desc' },
          { step: 4, titleKey: 'salah_pillar_4_title', descriptionKey: 'salah_pillar_4_desc' },
        ],
      },
    ],
  },
];
