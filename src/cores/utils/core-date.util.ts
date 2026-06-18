import { differenceInMinutes, endOfDay, format, subHours } from 'date-fns';

export type CoreDateType = Date | number | string | null;

export const CORE_DATE_FMT = {
  DATE_TIME: 'yyyy/MM/dd HH:mm:ss',
  DATE: 'yyyy/MM/dd',
  TIME: 'HH:mm:ss',

  DD_MM: 'dd/MM',
  HH_mm: 'HH:mm',

  DD_MM_YYYY_HH_MM: 'dd/MM/yyyy HH:mm',
  DD_MM_YYYY_HH_MM_SS: 'dd/MM/yyyy HH:mm:ss',
  DD_MM_YYYY: 'dd/MM/yyyy',

  KICKOFF_DATE: 'HH:mm dd/MM', // 14:30 05/12
  KICKOFF_DATE_TIME: 'HH:mm dd/MM/yyyy', // 14:30 05/12/2023
};

export const FROM_TIME_BEFORE_HOUR = 4;

// ? date có thể là unix timestamp (giây) hoặc kiểu Date Object
export const fmtDate = (date: CoreDateType, dateFormat = CORE_DATE_FMT.DATE_TIME, timezone = 'UTC'): string => {
  if (!date) return '';

  let parsedDate: Date;

  // ? Xử lý timestamp Unix (giây)
  if (typeof date === 'number' && date < 10000000000) {
    parsedDate = new Date(date * 1000); // ? Convert seconds to milliseconds
  } else if (typeof date === 'string' || typeof date === 'number') {
    parsedDate = new Date(date);
  } else {
    parsedDate = date;
  }

  if (isNaN(parsedDate.getTime())) return '';

  // ? Xử lý timezone
  if (timezone !== 'UTC') {
    return format(parsedDate, dateFormat);
  }

  // ? Sử dụng UTC date
  const utcDate = new Date(
    Date.UTC(
      parsedDate.getUTCFullYear(),
      parsedDate.getUTCMonth(),
      parsedDate.getUTCDate(),
      parsedDate.getUTCHours(),
      parsedDate.getUTCMinutes(),
      parsedDate.getUTCSeconds(),
    ),
  );

  return format(utcDate, dateFormat);
};

export const fmtDateTz =
  (dateFormat = CORE_DATE_FMT.DATE_TIME, timezone = 'UTC') =>
  (date?: CoreDateType) =>
    !date ? '' : fmtDate(date, dateFormat, timezone);

export const fmtKickoffDate = fmtDateTz(CORE_DATE_FMT.KICKOFF_DATE);
export const fmtKickoffDateTime = fmtDateTz(CORE_DATE_FMT.KICKOFF_DATE_TIME);
export const fmtSchedule24h = fmtDateTz(CORE_DATE_FMT.DD_MM_YYYY_HH_MM);
export const fmtDiffInMin = (unixTime: number): number => differenceInMinutes(new Date(), new Date(unixTime * 1000));

export function getTimeZoneByRegion(r: string): string {
  switch (r) {
    case 'vi':
      return 'Asia/Ho_Chi_Minh';
    default:
      return 'UTC';
  }
}

export function getFormatDateByRegion(region: string) {
  const timezone = getTimeZoneByRegion(region);

  const regionTimeString = new Date().toLocaleString('en-US', { timeZone: timezone });
  const regionDate = new Date(regionTimeString);

  // Dạng yyyy-MM-ddTHH:mm:00.000Z
  const fromDate = parseDateToZTime(regionDate);

  // Dạng Zulu chuẩn ISO
  const fromDateZ = parseDateToZTime(regionDate);

  return {
    timezone,
    dateLocal: regionDate,
    fromDate, // yyyy-MM-ddTHH:mm:00.000Z
    fromDateZ, // ISO Z time
  };
}

export function parseDateToZTime(date?: Date) {
  if (!date) return;

  const d = new Date(date);

  d.setSeconds(0, 0); // bỏ giây + milliseconds

  return new Date(
    Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), 0, 0),
  ).toISOString();
}
// parse ngược từ Z ra t region time
export function parseZTimeToRegionTime(
  zTime: string | null | undefined,
  region: string = 'vi',
  outputFormat: string = 'HH:mm:ss',
): string {
  if (!zTime) return '';

  const tz = getTimeZoneByRegion(region);

  // Convert UTC string → date tại region
  const regionTime = new Date(zTime).toLocaleString('en-US', { timeZone: tz });

  const d = new Date(regionTime);

  if (isNaN(d.getTime())) return '';

  return format(d, outputFormat);
}

export function getClientTimeRange(to: Date) {
  const now = new Date();

  const fromTimeDelay = subHours(now, FROM_TIME_BEFORE_HOUR);
  const end_day = format(endOfDay(new Date()), "yyyy-MM-dd'T'HH:mm:ssxxx");

  return {
    from_time: format(now, "yyyy-MM-dd'T'HH:mm:ssxxx"),
    from_time_delay: format(fromTimeDelay, "yyyy-MM-dd'T'HH:mm:ssxxx"),
    to_time: format(to, "yyyy-MM-dd'T'HH:mm:ssxxx"),
    end_day,
    time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}
