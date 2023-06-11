import { useRef, useState, useLayoutEffect } from 'react';
import Calendar from '../Calendar';
import type { Value } from '../Calendar/common/types';

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
}

export default function DateTimePicker({
  locale,
  onChange,
  selectRangeEnable
}: DateTimePickerProps) {
  const [value, setValue] = useState<Value>();
  const [calendarActive, setCalendarActive] = useState(true);
  const calendarRef = useRef<HTMLDivElement>(null);
  const coverStyle = useRef({});

  function handleCalendarChange(value: Value) {
    setValue(value);
    setCalendarActive(false);
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
    coverStyle.current = { height, width };
  }, []);

  return (
    <div className='date-time-picker'>
      <Calendar
        value={value}
        onChange={handleCalendarChange}
        selectRangeEnable={selectRangeEnable}
        calendarRef={calendarRef}
        locale={locale}
      />

      {!calendarActive && <>
        <div className='date-time-picker__calendar-cover' style={coverStyle.current}></div>
        <TimePicker showConfirm onConfirm={handleTimeConfirm} />
      </>}
    </div>
  );
}