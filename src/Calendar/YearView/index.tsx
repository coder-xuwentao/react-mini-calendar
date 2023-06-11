import { tileClassName } from '../common/constants';
import { getForeMonth, getDateBySetMonth, areDatesEqual, getMonthStart, isInDatesRange } from '../common/date-utils';
import { formatMonth } from '../common/date-formatter';
import classNames from 'classnames';
import { useCallback } from 'react';
import type { Value } from '../common/types';

const className = 'mini-calendar__year-view__months';

const anyDecember = getDateBySetMonth(new Date(), -1);

interface YearViewProps {
  locale?: string;
  value: Value;
  activeStartDate: Date;
  onClickMonth?: (month: number, event: React.MouseEvent) => void;
}

export default function YearView({
  locale,
  value,
  activeStartDate,
  onClickMonth,
}: YearViewProps) {
  const handleClickMonth = useCallback((event: React.MouseEvent) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    const { month } = event.target.dataset;
    onClickMonth?.(Number(month), event);
  }, [onClickMonth]);

  const isActiveMonth = useCallback((month: number) => {
    const startYear = activeStartDate.getFullYear();
    const date = new Date(startYear, month, 1);
    if (value instanceof Array) {
      const inRange = () => {
        const start = getMonthStart(value[0]);
        const end = getMonthStart(value[1]);
        return isInDatesRange(date, [start, end]);
      };
      const inBoundary = () => {
        return (
          (startYear === value[0].getFullYear() && month === value[0].getMonth())
          || (startYear === value[0].getFullYear() && month === value[0].getMonth())
        );
      };
      return inBoundary() || inRange();
    }
    return areDatesEqual(date,
      value && getMonthStart(value)
    );
  }, [value, activeStartDate]);

  function renderMonths() {
    const monthBtns = [];
    let currentMonth = anyDecember;
    for (let month = 1; month <= 12; month += 1) {
      currentMonth = getForeMonth(currentMonth, 1);
      const month = currentMonth.getMonth();
      monthBtns.push(
        <button
          key={month}
          data-month={month}
          className={classNames(`${className}__month`, tileClassName, {
            [`${tileClassName}--active`]: isActiveMonth(month),
          })}>
          {formatMonth(currentMonth, locale)}
        </button>
      );
    }
    return monthBtns;
  }


  return (
    <div className={className} onClick={handleClickMonth}>
      {renderMonths()}
    </div>
  );
}