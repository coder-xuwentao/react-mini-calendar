import { View } from '../common/constants';

// 某月有几天
export function getDaysInMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return new Date(year, month, 0).getDate();
}

// 某月第一天 Date
export function getMonthStart(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1);
}

export function areDatesEqual(date1?: Date | null, date2?: Date | null) {
  return date1 instanceof Date && date2 instanceof Date && date1.getTime() === date2.getTime();
}

export function isInDatesRange(date: Date, range: Date[]) {
  return date.getTime() >= range[0].getTime() && date.getTime() <= range[1].getTime();
}

export function getStartDatePrevious(view: View, date: Date): Date {
  const newDate = new Date(date);
  switch (view) {
    case View.Decade:
      return getForeYear(newDate, -10);
    case View.Year:
      return getForeYear(newDate, -1);
    case View.Month:
      return getForeMonth(newDate, -1);
    default:
      throw new Error(`Invalid view type: ${view}`);
  }
}

export function getStartDatePrevious2(view: View, date: Date): Date {
  const newDate = new Date(date);
  switch (view) {
    case View.Decade:
      return getForeYear(newDate, -100);
    case View.Year:
      return getForeYear(newDate, -10);
    case View.Month:
      return getForeYear(newDate, -1);
    default:
      throw new Error(`Invalid view type: ${view}`);
  }
}

export function getStartDateNext(view: View, date: Date): Date {
  const newDate = new Date(date);
  switch (view) {
    case View.Decade:
      return getForeYear(newDate, 10);
    case View.Year:
      return getForeYear(newDate, 1);
    case View.Month:
      return getForeMonth(newDate, 1);
    default:
      throw new Error(`Invalid view type: ${view}`);
  }
}

export function getStartDateNext2(view: View, date: Date): Date {
  const newDate = new Date(date);
  switch (view) {
    case View.Decade:
      return getForeYear(newDate, 100);
    case View.Year:
      return getForeYear(newDate, 10);
    case View.Month:
      return getForeYear(newDate, 1);
    default:
      throw new Error(`Invalid view type: ${view}`);
  }
}

export function getForeMonth(date: Date, num: number) {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + num);
  return newDate;
}
export function getForeYear(date: Date, num: number) {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + num);
  return newDate;
}

export function getDateBySetMonth(date: Date, monthIdx: number) {
  const newDate = new Date(date);
  newDate.setMonth(monthIdx);
  return newDate;
}

export function getDateBySetYear(date: Date, year: number) {
  const newDate = new Date(date);
  newDate.setFullYear(year);
  return newDate;
}

export function getDecadeFromDate(date: Date): [Date, Date] {
  const round = (n: number, to: number) => n - n % to;
  const start = round(date.getFullYear(), 10) + 1;
  const end = start + 9;
  return [new Date(start, 0, 1), new Date(end, 0, 1)];
}