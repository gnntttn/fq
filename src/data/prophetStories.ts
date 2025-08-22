import { User, Milestone, Ship, Building2, Users, Heart, Shield, Wind, Bed, Fish } from 'lucide-react';
import { ProphetStory } from '../types/prophetStory';

export const prophetStories: ProphetStory[] = [
  {
    id: 'adam',
    nameKey: 'prophet_adam',
    icon: User,
    verses: ['2:30-38', '7:11-25', '20:115-123'],
  },
  {
    id: 'nuh',
    nameKey: 'prophet_nuh',
    icon: Ship,
    verses: ['7:59-64', '11:25-49', '71:1-28'],
  },
  {
    id: 'ibrahim',
    nameKey: 'prophet_ibrahim',
    icon: Milestone,
    verses: ['2:124-132', '14:35-41', '19:41-50', '21:51-70', '37:83-113'],
  },
  {
    id: 'yusuf',
    nameKey: 'prophet_yusuf',
    icon: Building2,
    verses: ['12:4-101'],
  },
  {
    id: 'musa',
    nameKey: 'prophet_musa',
    icon: Users,
    verses: ['7:103-162', '20:9-98', '28:3-43'],
  },
  {
    id: 'isa',
    nameKey: 'prophet_isa',
    icon: Heart,
    verses: ['3:42-59', '5:110-120', '19:16-36'],
  },
  {
    id: 'dawood-sulaiman',
    nameKey: 'prophet_dawood_sulaiman',
    icon: Wind,
    verses: ['21:78-82', '27:15-44', '34:10-14'],
  },
  {
    id: 'ayyub',
    nameKey: 'prophet_ayyub',
    icon: Bed,
    verses: ['21:83-84', '38:41-44'],
  },
  {
    id: 'yunus',
    nameKey: 'prophet_yunus',
    icon: Fish,
    verses: ['21:87-88', '37:139-148', '68:48-50'],
  },
];
