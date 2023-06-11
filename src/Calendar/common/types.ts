import { View } from './constants';

export type RangeType = 'year' | 'month' | 'day';

export type Action = 'prev' | 'prev2' | 'next' | 'next2' | 'drillUp' | 'drillDown';

export type OnChangeFunc = (value: Date, event: React.MouseEvent) => void;

export type Value = Date | [Date, Date] | undefined;

export type onActiveStartDateChangeArgs = {
  action: Action;
  activeStartDate: Date | null;
  value: Value;
  view: View;
};