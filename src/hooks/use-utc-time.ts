import type { UtcTimeInput } from './types';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function formatUtcTime(time: UtcTimeInput): string {
  if (!time) return '-';
  return dayjs.utc(time).local().format('YYYY-MM-DD HH:mm:ss');
}

export function useUtcTime() {
  return { formatUtcTime };
}
