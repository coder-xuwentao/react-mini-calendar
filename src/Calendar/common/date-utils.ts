import { View } from './constants';

// 某月有几天
export function getDaysInMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return new Date(year, month, 0).getDate();
}

export function getDayStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

// 某月第一天 Date
export function getMonthStart(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1);
}

// 获取某年开始一刻
export function getYearStart(date: Date) {
  const year = date.getFullYear();
  return new Date(year, 0, 1);
}

// 获取某月最后一刻
export function getMonthEnd(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(new Date(year, month + 1, 1).getTime() - 1);
}

// 获取某年最后一刻
export function getYearEnd(date: Date) {
  const year = date.getFullYear();
  return new Date(new Date(year + 1, 0, 1).getTime() - 1);
}

export function areDatesEqual(date1?: Date | null, date2?: Date | null) {
  return date1 instanceof Date && date2 instanceof Date && date1.getTime() === date2.getTime();
}

export function isInDatesRange(date: Date, range: Date[]) {
  return date.getTime() >= range[0].getTime() && date.getTime() <= range[1].getTime();
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
  return [new Date(start, 0, 1), getYearEnd(new Date(end, 0, 1))];
}

export function getDatePrevious(view: View, date: Date): Date {
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

export function getDatePrevious2(view: View, date: Date): Date {
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

export function getDateNext(view: View, date: Date): Date {
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

export function getDateNext2(view: View, date: Date): Date {
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

export function getEndDate(view: View, date: Date): Date {
  const newDate = new Date(date);
  switch (view) {
    case View.Decade: 
      return getDecadeFromDate(newDate)[1];
    case View.Year:
      return getYearEnd(newDate);
    case View.Month:
      return getMonthEnd(newDate);
    default:
      throw new Error(`Invalid view type: ${view}`);
  }
}

export function getBeginDate(view: View, date: Date): Date {
  const newDate = new Date(date);
  switch (view) {
    case View.Decade: 
      return getDecadeFromDate(newDate)[0];
    case View.Year:
      return getYearStart(newDate);
    case View.Month:
      return getMonthStart(newDate);
    default:
      throw new Error(`Invalid view type: ${view}`);
  }
}