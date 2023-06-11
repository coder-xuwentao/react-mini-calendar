import Navigation from './Navigation';
import MonthView from './MonthView';
import YearView from './YearView';
import DecadeView from './DecadeView';
import { useState, useCallback, useMemo } from 'react';
import { View, sortedViews } from './common/constants';
import { getMonthStart, areDatesEqual, getDateBySetMonth, getDateBySetYear } from './common/date-utils';
import { onActiveStartDateChangeArgs, Action, OnChangeFunc, Value } from './common/types';
import classNames from 'classnames';

const baseClassName = 'mini-calendar';

export type CalendarProps = {
  defaultValue?: Value;
  value?: Value;
  showNavigation?: boolean;
  locale?: string;
  selectRangeEnable?: boolean;
  className?: string;
  onChange?: (value: Value) => void;
  onClickDay?: OnChangeFunc;
  onClickMonth?: OnChangeFunc;
  onClickYear?: OnChangeFunc;
  onActiveStartDateChange?: (args: onActiveStartDateChangeArgs) => void;
  calendarRef?: React.Ref<HTMLDivElement>;
  [key: string]: any;
};

function getInitActiveStartDate(defaultValue?: Value, valueProp?: Value) {
  let value = defaultValue || valueProp || new Date();
  if (value instanceof Array) {
    value = value[0];
  }
  if (value == undefined) {
    value = new Date();
  }
  return getMonthStart(value);
}

export default function Calendar(props: CalendarProps) {
  const {
    defaultValue,
    value: valueProp,
    showNavigation = true,
    locale,
    selectRangeEnable,
    onChange,
    onClickDay,
    onClickMonth,
    onClickYear,
    onActiveStartDateChange,
    className: classNameProp,
    calendarRef,
    ...otherProps
  } = props;
  const [activeStartDateState, setActiveStartDateState] = useState<Date>(getInitActiveStartDate(defaultValue, valueProp));
  const [viewState, setViewState] = useState<View>(View.Month);
  const [valueState, setValueState] = useState<Value>(defaultValue);
  const value = useMemo<Value>(() => {
    if (valueProp !== undefined) {
      return valueProp;
    }
    return valueState;
  }, [valueProp, valueState]);
  const setValue = useCallback((newValue: Value) => {
    if (valueProp === undefined) {
      setValueState(newValue);
    }
    onChange?.(newValue);
  }, [valueProp, onChange]);

  const setActiveStartDate = useCallback(
    (nextActiveStartDate: Date, action: Action) => {
      const args = {
        action,
        activeStartDate: nextActiveStartDate,
        value,
        view: viewState,
      };

      if (onActiveStartDateChange && !areDatesEqual(activeStartDateState, nextActiveStartDate)) {
        onActiveStartDateChange(args);
      }
      setActiveStartDateState(nextActiveStartDate);
    },
    [activeStartDateState, onActiveStartDateChange, value, viewState],
  );

  const haddleDrillDownToMonth = useCallback((monthIdx: number, event: React.MouseEvent) => {
    setViewState(View.Month);
    const nextStartDate = getDateBySetMonth(activeStartDateState, monthIdx);
    setActiveStartDate(nextStartDate, 'drillDown');
    onClickMonth?.(nextStartDate, event);
  }, [activeStartDateState, setActiveStartDate, onClickMonth]);

  const haddleDrillDownToYear = useCallback((year: number, event: React.MouseEvent) => {
    setViewState(View.Year);
    const nextStartDate = getDateBySetYear(activeStartDateState, year);
    setActiveStartDate(nextStartDate, 'drillDown');
    onClickYear?.(nextStartDate, event);
  }, [activeStartDateState, setActiveStartDate, onClickYear]);

  const handleClickDay = useCallback((date: Date, event: React.MouseEvent) => {
    onClickDay?.(date, event);
    if (selectRangeEnable && value instanceof Date) {
      if (value.getTime() ===  date.getTime()) {
        return;
      } else {
        setValue([value, date].sort((a, b) => a.getTime() - b.getTime()) as [Date, Date]);
      }
    } else {
      setValue(date);
    }
  }, [value, setValue, onClickDay, selectRangeEnable]);

  const handleDrillUp = useCallback(() => {
    const drillUpAvailable = sortedViews.indexOf(viewState) > 0;
    if (drillUpAvailable) {
      setViewState(sortedViews[sortedViews.indexOf(viewState) - 1]);
    }

  }, [viewState]);

  function renderNavigation() {
    if (!showNavigation) {
      return;
    }
    return (
      <Navigation
        activeStartDate={activeStartDateState}
        setActiveStartDate={setActiveStartDate}
        onDrillUp={handleDrillUp}
        view={viewState}
        locale={locale}
      />
    );
  }

  function renderContent() {
    switch (viewState) {
      case View.Decade:
        return (
          <DecadeView
            value={value}
            locale={locale}
            activeStartDate={activeStartDateState}
            onClickYear={haddleDrillDownToYear}
          />
        );
      case View.Year:
        return (
          <YearView
            value={value}
            locale={locale}
            activeStartDate={activeStartDateState}
            onClickMonth={haddleDrillDownToMonth}
          />
        );
      case View.Month:
        return (
          <MonthView
            value={value}
            locale={locale}
            activeStartDate={activeStartDateState}
            onClickDay={handleClickDay}
            selectRangeEnable={selectRangeEnable}
          />
        );
    }
  }

  return (
    <div className={classNames(baseClassName, classNameProp)} ref={calendarRef} {...otherProps}>
      {renderNavigation()}
      <div
        className={`${baseClassName}__view-container`}
      >
        {renderContent()}
      </div>
    </div>
  );
}