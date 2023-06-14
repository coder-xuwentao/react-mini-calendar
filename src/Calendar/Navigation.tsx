import { View, sortedViews } from './common/constants';
import { Action } from './common/types';
import { formatYear, formatMonthYear, formatDecade } from './common/date-formatter';
import {
  getDatePrevious,
  getDatePrevious2,
  getDateNext,
  getDateNext2,
  getDecadeFromDate,
  getBeginDate,
  getEndDate,
} from './common/date-utils';

export type NavigationLabelArgs = {
  date: Date;
  defaultLabel: string;
  locale: string | undefined;
  view: View;
};
export type NavigationLabelFunc = (args: NavigationLabelArgs) => React.ReactNode;

interface NavigationProps {
  activeStartDate: Date;
  locale?: string;
  onDrillUp: () => void;
  navigationLabel?: NavigationLabelFunc; // todo: 暂时采用默认的
  next2Label?: React.ReactNode; // todo: 暂时采用默认的
  nextLabel?: React.ReactNode; // todo: 暂时采用默认的
  prev2Label?: React.ReactNode; // todo: 暂时采用默认的
  prevLabel?: React.ReactNode; // todo: 暂时采用默认的
  setActiveStartDate: (nextActiveStartDate: Date, action: Action) => void;
  view: View;
  maxDate?: Date;
  minDate?: Date;
}

const className = 'mini-calendar__navigation';

export default function Navigation({
  activeStartDate,
  onDrillUp,
  navigationLabel,
  next2Label = '»',
  nextLabel = '›',
  prev2Label = '«',
  prevLabel = '‹',
  setActiveStartDate,
  locale,
  view,
  minDate,
  maxDate,
}: NavigationProps) {
  // new start date:
  const previousActiveStartDate = getBeginDate(view, getDatePrevious(view, activeStartDate));
  const previousActiveStartDate2 = getBeginDate(view, getDatePrevious2(view, activeStartDate));
  const nextActiveStartDate = getBeginDate(view, getDateNext(view, activeStartDate));
  const nextActiveStartDate2 = getBeginDate(view, getDateNext2(view, activeStartDate));

  const prevButtonDisabled = (() => {
    const endDate = getEndDate(view, previousActiveStartDate);
    return minDate && minDate >= endDate;
  }) ()
  const prev2ButtonDisabled = (() => {
    const endDate = getEndDate(view, previousActiveStartDate2);
    return minDate && minDate >= endDate;
  }) ()

  const nextButtonDisabled = maxDate && maxDate < nextActiveStartDate;

  const next2ButtonDisabled = maxDate && maxDate < nextActiveStartDate2;
  
  
  function onClickPrevious() {
    console.log('onClickPrevious');
    setActiveStartDate(previousActiveStartDate, 'prev');
  }

  function onClickPrevious2() {
    console.log('onClickPrevious2');
    setActiveStartDate(previousActiveStartDate2, 'prev2');
  }

  function onClickNext() {
    console.log('onClickNext', nextActiveStartDate);
    setActiveStartDate(nextActiveStartDate, 'next');
  }

  function onClickNext2() {
    console.log('onClickNext2');
    setActiveStartDate(nextActiveStartDate2, 'next2');
  }

  function renderLabel(date: Date) {
    // 中间标签展示的内容
    const defaultLabel = (() => {
      switch (view) {
        case View.Decade: 
          return formatDecade(getDecadeFromDate(date), locale);
        case View.Year:
          return formatYear(date, locale);
        case View.Month:
          return formatMonthYear(date, locale);
        default:
          throw new Error(`Invalid view: ${view}.`);
      }
    })();

    return navigationLabel
      ? navigationLabel({
        date,
        defaultLabel,
        locale: locale || undefined,
        view,
      })
      : defaultLabel;
  }

  function renderCenterButton() {
    const labelClassName = `${className}__label`;
    const drillUpAvailable = sortedViews.indexOf(view) > 0;

    return (
      <button
        className={labelClassName}
        onClick={onDrillUp}
        style={{ flexGrow: 1 }}
        disabled={!drillUpAvailable}
        type="button"
      >
        <span className={`${labelClassName}__labelText`}>
          {renderLabel(activeStartDate)}
        </span>
      </button>
    );
  }

  return (
    <div className={className}>
      <button
        className={`${className}__arrow ${className}__prev2-button`}
        onClick={onClickPrevious2}
        type="button"
        disabled={prev2ButtonDisabled}
      >
        {prev2Label}
      </button>

      <button
        className={`${className}__arrow ${className}__prev-button`}
        onClick={onClickPrevious}
        type="button"
        disabled={prevButtonDisabled}
      >
        {prevLabel}
      </button>
      {renderCenterButton()}

      <button
        className={`${className}__arrow ${className}__next-button`}
        onClick={onClickNext}
        type="button"
        disabled={nextButtonDisabled}
      >
        {nextLabel}
      </button>

      <button
        className={`${className}__arrow ${className}__next2-button`}
        onClick={onClickNext2}
        type="button"
        disabled={next2ButtonDisabled}
      >
        {next2Label}
      </button>
    </div>
  );
}
