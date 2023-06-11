import { View, sortedViews } from './common/constants';
import { Action } from './common/types';
import { formatYear, formatMonthYear, formatDecade } from './common/date-formatter';
import {
  getStartDatePrevious,
  getStartDatePrevious2,
  getStartDateNext,
  getStartDateNext2,
  getDecadeFromDate,
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
  navigationLabel?: NavigationLabelFunc;
  next2Label?: React.ReactNode;
  nextLabel?: React.ReactNode;
  prev2Label?: React.ReactNode;
  prevLabel?: React.ReactNode;
  setActiveStartDate: (nextActiveStartDate: Date, action: Action) => void;
  view: View;
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
}: NavigationProps) {
  function onClickPrevious() {
    const previousActiveStartDate = getStartDatePrevious(view, activeStartDate);
    console.log('onClickPrevious');
    setActiveStartDate(previousActiveStartDate, 'prev');
  }

  function onClickPrevious2() {
    const previousActiveStartDate2 = getStartDatePrevious2(view, activeStartDate);
    console.log('onClickPrevious2');
    setActiveStartDate(previousActiveStartDate2, 'prev2');
  }

  function onClickNext() {
    const nextActiveStartDate = getStartDateNext(view, activeStartDate);
    console.log('onClickNext', nextActiveStartDate);
    setActiveStartDate(nextActiveStartDate, 'next');
  }

  function onClickNext2() {
    const nextActiveStartDate2 = getStartDateNext2(view, activeStartDate);
    console.log('onClickNext2');
    setActiveStartDate(nextActiveStartDate2, 'next2');
  }

  function renderLabel(date: Date) {
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
      >
        {prev2Label}
      </button>

      <button
        className={`${className}__arrow ${className}__prev-button`}
        onClick={onClickPrevious}
        type="button"
      >
        {prevLabel}
      </button>
      {renderCenterButton()}

      <button
        className={`${className}__arrow ${className}__next-button`}
        onClick={onClickNext}
        type="button"
      >
        {nextLabel}
      </button>

      <button
        className={`${className}__arrow ${className}__next2-button`}
        onClick={onClickNext2}
        type="button"
      >
        {next2Label}
      </button>
    </div>
  );
}
