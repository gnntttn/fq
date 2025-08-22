import { IslamicEvent } from '../types/islamicCalendar';

export const islamicEvents: IslamicEvent[] = [
  { day: 1, month: 1, name_key: 'event_islamic_new_year', description_key: 'event_islamic_new_year_desc' },
  { day: 10, month: 1, name_key: 'event_ashura', description_key: 'event_ashura_desc' },
  { day: 12, month: 3, name_key: 'event_mawlid', description_key: 'event_mawlid_desc' },
  { day: 27, month: 7, name_key: 'event_isra_miraj', description_key: 'event_isra_miraj_desc' },
  { day: 1, month: 9, name_key: 'event_ramadan', description_key: 'event_ramadan_desc' },
  { day: 1, month: 10, name_key: 'event_eid_fitr', description_key: 'event_eid_fitr_desc' },
  { day: 9, month: 12, name_key: 'event_arafah', description_key: 'event_arafah_desc' },
  { day: 10, month: 12, name_key: 'event_eid_adha', description_key: 'event_eid_adha_desc' },
];
