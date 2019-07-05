import { DateTime } from 'luxon';

export function formatDateString(date) {
  if (date === null) {
    return 'Present';
  }
  return DateTime.fromISO(date).toLocaleString();
}
