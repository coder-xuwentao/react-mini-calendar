import { useCallback, useState } from 'react';
import { getDaysInMonth, areDatesEqual, isInDatesRange } from '../common/date-utils';
import { OnChangeFunc, Value } from '../common/types';
import Day from './Day';

const className = 'react-mini-calendar__month-view__days';

interface DaysProps {
  activeStartDate: Date;
  locale?: string;
  onClickDay?: OnChangeFunc;
  value: Value,
  selectRangeEnable?: boolean;
}

export default function Days(props: DaysProps) {
  const {
    activeStartDate,
    locale,
    onClickDay,
    value,
    selectRangeEnable,
  } = props;

  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const year = activeStartDate.getFullYear();
  const monthIndex = activeStartDate.getMonth();
  const dayOfWeek = activeStartDate.getDay() || 7; // 周几。getDay为0，即周日
  const daysInMonth = getDaysInMonth(activeStartDate);

  // start和end，标记当前月份下的日期范围。
  // 会考虑临近的省份, 所以start大概率是负数, end大概率大于30
  const start = -dayOfWeek + 2; // 比如2023.6.1是周四，start = -4 + 2 = -2。所以需要往前一月推测3天: -2、-1、0
  const end = (() => {
    const activeEndDate = new Date(year, monthIndex, daysInMonth);
    const daysUntilEndOfTheWeek = 7 - activeEndDate.getDay(); // 计算原理类似start
    if (daysUntilEndOfTheWeek === 7) {
      return daysInMonth;
    }
    return daysInMonth + daysUntilEndOfTheWeek;
  })();

  // 用了事件委托
  const handleClickDay = useCallback((event: React.MouseEvent) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    const { date: dateStr } = event.target.dataset;
    const clickedDate = new Date(dateStr!);
    onClickDay?.(new Date(clickedDate), event);
  }, [onClickDay]);

  // 不需要debounce: 用户鼠标移动速度都很快
  const handleHoverIn = useCallback((event: React.MouseEvent) => {
    if (!selectRangeEnable) {
      return;
    }
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    const { date: dateStr } = event.target.dataset;
    const hoveredDate = new Date(dateStr!);
    setHoverDate(hoveredDate)
  }, [selectRangeEnable]);

  const handleHoverOut = useCallback(() => {
    if (!selectRangeEnable) {
      return;
    }
    setHoverDate(null)
  }, [selectRangeEnable]);

  const isActiveDate = useCallback((date: Date) => {
    if (value instanceof Array) {
      return isInDatesRange(date, value)
    }
    return areDatesEqual(date, 
      value && new Date(value.getFullYear(), value.getMonth(), value.getDate())
    )
  }, [value])

  const isHover = useCallback((date: Date) => {
    // console.log('hoverDate', hoverDate)
    if (!hoverDate) {
      return false;
    }
    if (value instanceof Array || value === undefined) {
      return false;
    }
    return isInDatesRange(date, [hoverDate, value].sort((a, b) => a.getTime() - b.getTime()))
  }, [hoverDate, value])

  function renderDays() {
    const dayTiles = [];
    for (let dayPoint = start; dayPoint <= end; dayPoint += 1) {
      const date = new Date(year, monthIndex, dayPoint);
      dayTiles.push(
        <Day
          key={dayPoint}
          date={date}
          dayPoint={dayPoint}
          locale={locale}
          isActive={isActiveDate(date)}
          isHover={isHover(date)}
        />
      );
    }
    return dayTiles;
  }

  return (
    <div className={className} onClick={handleClickDay} onMouseMove={handleHoverIn} onMouseLeave={handleHoverOut}>
      {renderDays()}
    </div>
  );
}