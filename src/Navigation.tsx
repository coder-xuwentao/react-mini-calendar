import { View, RangeType, Action } from './common/types'

export type NavigationLabelArgs = {
  date: Date;
  label: string;
  locale: string | undefined;
  view: View;
};
export type NavigationLabelFunc = (args: NavigationLabelArgs) => React.ReactNode;

interface NavigationProps {
  activeStartDate: Date;
  locale?: string;
  drillUp: () => void;
  navigationLabel?: NavigationLabelFunc;
  next2Label?: React.ReactNode;
  nextLabel?: React.ReactNode;
  prev2Label?: React.ReactNode;
  prevLabel?: React.ReactNode;
  // setActiveStartDate: (nextActiveStartDate: Date, action: Action) => void;
  view: RangeType;
}

const className = 'react-calendar__navigation';

export default function Navigation({
  activeStartDate,
  drillUp,
  navigationLabel,
  next2Label = '»',
  nextLabel = '›',
  prev2Label = '«',
  prevLabel = '‹',
  // setActiveStartDate,
  locale,
  view,
}: NavigationProps) {
  function onClickPrevious() {
    console.log('onClickPrevious')
    // setActiveStartDate(previousActiveStartDate, 'prev');
  }

  function onClickPrevious2() {
    console.log('onClickPrevious2')
    // setActiveStartDate(previousActiveStartDate2, 'prev2');
  }

  function onClickNext() {
    console.log('onClickNext')
    // setActiveStartDate(nextActiveStartDate, 'next');
  }

  function onClickNext2() {
    console.log('onClickNext2')
    // setActiveStartDate(nextActiveStartDate2, 'next2');
  }

  function renderLabel(date: Date) {
    const label = (() => {
      switch (view) {
        case 'year':
          return 'year'
        case 'month':
          return 'mouth'
        default:
          throw new Error(`Invalid view: ${view}.`);
      }
    })();

    return navigationLabel
      ? navigationLabel({
        date,
        label,
        locale: locale || undefined,
        view,
      })
      : label;
  }

  function renderCenterButton() {
    const labelClassName = `${className}__label`;
    return (
      <button
        className={labelClassName}
        onClick={drillUp}
        style={{ flexGrow: 1 }}
        type="button"
      >
        <span className={`${labelClassName}__labelText`}>
          {renderLabel(activeStartDate)}
        </span>
      </button>
    )
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
