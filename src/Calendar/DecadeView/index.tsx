import { tileClassName } from '../common/constants';
import { getForeYear, getDecadeFromDate } from '../common/date-utils';
import { formatYear } from '../common/date-formatter';
import classNames from 'classnames';
import { useCallback } from 'react';
import type { Value } from '../common/types';

const className = 'mini-calendar__year-view__years';

interface YearViewProps {
  locale?: string;
  activeStartDate: Date;
  value: Value;
  onClickYear?: (year: number, event: React.MouseEvent) => void;
}

export default function YearView({
  locale,
  activeStartDate,
  value,
  onClickYear,
}: YearViewProps) {
  const handleClickYear = useCallback((event: React.MouseEvent) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    const { year } = event.target.dataset;
    onClickYear?.(Number(year), event);
  }, [onClickYear]);

  const isActiveYear = useCallback((year: number) => {
    if (value instanceof Array) {
      const startYear = value[0].getFullYear()
      const endYear = value[1].getFullYear()
      const inRange = startYear < year && endYear > year
      return startYear === year || endYear === year || inRange
    }
    return year === value?.getFullYear()
  }, [value]);

  function renderYears() {
    const yearBtns = [];
    let currentYear = getDecadeFromDate(activeStartDate)[0];
    for (let year = 1; year <= 10; year += 1) {
      const year = currentYear.getFullYear()
      yearBtns.push(
        <button
          key={year}
          data-year={year}
          className={classNames(`${className}__year`, tileClassName, {
            [`${tileClassName}--active`]: isActiveYear(year),
          })}>
          {formatYear(currentYear, locale)}
        </button>
      );
      currentYear = getForeYear(currentYear, 1);
    }
    return yearBtns;
  }


  return (
    <div className={className} onClick={handleClickYear}>
      {renderYears()}
    </div>
  );
}