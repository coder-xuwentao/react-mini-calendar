import classnames from 'classnames';
import { formatDay } from '../common/date-formatter';
import { tileClassName } from '../common/constants';

interface DayProps {
  date: Date;
  dayPoint: number;
  isActive: boolean;
  isHover: boolean;
  locale?: string;
  disabled?: boolean;
}

const className = 'mini-calendar__month-view__days_day';

export default function Day({ date, dayPoint, locale, isActive, isHover, disabled }: DayProps) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.getDay();

  const dateStr = `${year}-${month}-${dayOfMonth}`;

  const isWeekEnd = (dayOfWeek % 6 === 0) || (dayOfWeek % 7 === 0);
  const isNeighboringMonth = dayOfMonth !== dayPoint;
  return (
    <button
      className={classnames(className, tileClassName, {
        [`${tileClassName}--active`]: isActive,
        [`${className}--neighboringMonth`]: isNeighboringMonth,
        [`${className}--weekend`]: isWeekEnd,
        [`${className}--hover`]: isHover,
      })}
      data-date={dateStr}
      disabled={disabled}
    >
      {formatDay(date, locale)}
    </button>
  );
}