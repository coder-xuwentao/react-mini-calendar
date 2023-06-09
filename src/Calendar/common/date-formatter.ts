type Options = Intl.DateTimeFormatOptions;

const localeToFormatterCache = new Map(); // key是locale, value是formatterCache

function getFormatter(options: Options) {
  return function formatter(date: Date, locale = 'en-US') {
    if (!localeToFormatterCache.has(locale)) {
      localeToFormatterCache.set(locale, new Map());
    }

    const formatterCache = localeToFormatterCache.get(locale); // key是 options, value是Intl的format方法

    if (!formatterCache.has(options)) {
      formatterCache.set(
        options,
        new Intl.DateTimeFormat(locale, options).format,
      );
    }

    return formatterCache.get(options)(date);
  };
}

const formatDayOptions: Options = { day: 'numeric' };
const formatMonthOptions: Options = { month: 'long' };
const formatMonthYearOptions: Options = {
  month: 'long',
  year: 'numeric',
};
const formatShortWeekdayOptions: Options = { weekday: 'short' };
const formatYearOptions: Options = { year: 'numeric' };
const formatTimeOptions: Options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export const formatDay = getFormatter(formatDayOptions);
export const formatMonth = getFormatter(formatMonthOptions);
export const formatMonthYear = getFormatter(formatMonthYearOptions);
export const formatShortWeekday = getFormatter(formatShortWeekdayOptions);
export const formatYear = getFormatter(formatYearOptions);
export const formatTime = getFormatter(formatTimeOptions);
export function formatDecade ([start, end]: [Date, Date], locale?: string) {
  return `${formatYear(start, locale)} - ${formatYear(end, locale)}`
}