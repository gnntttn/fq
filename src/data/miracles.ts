import { Atom, Beaker, Telescope } from 'lucide-react';
import { MiracleTopic } from '../types/miracles';

export const miracleTopics: MiracleTopic[] = [
  {
    id: 'embryology',
    titleKey: 'miracles_embryology_title',
    icon: Beaker,
    summaryKey: 'miracles_embryology_desc',
    verseKeys: ['23:12-14', '75:37-39'],
  },
  {
    id: 'universe',
    titleKey: 'miracles_universe_title',
    icon: Telescope,
    summaryKey: 'miracles_universe_desc',
    verseKeys: ['51:47', '21:30'],
  },
  {
    id: 'iron',
    titleKey: 'miracles_iron_title',
    icon: Atom,
    summaryKey: 'miracles_iron_desc',
    verseKeys: ['57:25'],
  },
];
