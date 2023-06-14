import { useRef, useState, useLayoutEffect } from 'react';
import Calendar from '../Calendar';
import type { Value } from '../Calendar/common/types';
import { View } from '../Calendar/common/constants';
import { getDayStart, areDatesEqual } from '../Calendar/common/date-utils';

import TimePicker from '../TimePicker';
import type { onChangeArgs } from '../TimePicker';
import './style.less';

function getDateFromTimePickerValue(date: Date, times: onChangeArgs) {
  const newDate = new Date(date);
  const { hour, minute, second } = times;
  newDate.setHours(Number(hour));
  newDate.setMinutes(Number(minute));
  newDate.setSeconds(Number(second));
  return newDate;
}

interface DateTimePickerProps {
  locale?: string;
  onChange?: (date: Value) => void;
  selectRangeEnable?: boolean;
  maxDate?: Date;
  minDate?: Date;
  defaultView?: View;
}

export default function DateTimePicker({
  locale,
  onChange,
  selectRangeEnable,
  maxDate,
  minDate,
  defaultView,
}: DateTimePickerProps) {
  const [value, setValue] = useState<Value>();
  const [calendarActive, setCalendarActive] = useState(true);
  const [minDateForTime, setMinDateForTime] = useState<Date | undefined>();
  const [maxDateForTime, setMaxDateForTime] = useState<Date | undefined>();
  const calendarRef = useRef<HTMLDivElement>(null);
  const [coverStyle, setCoverStyle] = useState<{ width: number; height: number } | undefined>()

  function setMinOrMaxForTime(date?: Date)  {
    minDate && setMinDateForTime(undefined)
    maxDate && setMaxDateForTime(undefined)
    if (!date) {
      return;
    }
    if (minDate && areDatesEqual(date, getDayStart(minDate))) {
      setMinDateForTime(minDate)
    }
    if (maxDate && areDatesEqual(date, getDayStart(maxDate))) {
      setMaxDateForTime(maxDate) 
    }
  }

  function handleCalendarChange(value: Value) {
    setValue(value);
    setCalendarActive(false);
    setMinOrMaxForTime(value instanceof Array ? value[1] : value);

    onChange?.(value);
  }

  function handleTimeConfirm(timePickerValue: onChangeArgs) {
    let tempValue = value;
    if (tempValue === undefined) {
      return;
    }
    if (tempValue instanceof Array) {
      tempValue[1] = getDateFromTimePickerValue(tempValue[1], timePickerValue);
    } else {
      tempValue = getDateFromTimePickerValue(tempValue, timePickerValue);
    }
    setValue(tempValue);
    onChange?.(tempValue);
    setCalendarActive(true);
  }

  useLayoutEffect(() => {
    if (!calendarRef.current) {
      return;
    }
    const { height, width } = calendarRef.current.getBoundingClientRect();
    setCoverStyle({ height, width });
  }, [value]);

  return (
    <div className='date-time-picker'>
      <Calendar
        value={value}
        onChange={handleCalendarChange}
        selectRangeEnable={selectRangeEnable}
        calendarRef={calendarRef}
        locale={locale}
        maxDate={maxDate}
        minDate={minDate}
        defaultView={defaultView}
      />

      {!calendarActive && <>
        <div className='date-time-picker__calendar-cover' style={coverStyle}></div>
        <TimePicker 
          showConfirm
          onConfirm={handleTimeConfirm}
          minDate={minDateForTime}
          maxDate={maxDateForTime}
        />
      </>}
    </div>
  );
}