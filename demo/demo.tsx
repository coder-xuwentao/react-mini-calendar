import { useState } from 'react';
import Calendar from '../src/Calendar';
import type { Value } from '../src/Calendar/common/types';
import { formatTime } from '../src/Calendar/common/date-formatter';

import TimePicker from '../src/TimePicker';
import DateTimePicker from '../src/DateTimePicker';

import './demo.css';

const locale = 'zh-CN';

function CalendarDemo() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <Calendar value={value} onChange={onChange} locale={locale} selectRangeEnable ></Calendar>
  );
}

function DateTimePickerDemo() {
  const [formatedValue, setFormatedValue] = useState<string>();
  function handleChange(value: Value) {
    if (!value) {
      return;
    }
    if (value instanceof Array) {
      setFormatedValue(`${formatTime(value[0], locale)} -> ${formatTime(value[1], locale)}`);
      return;
    }
    setFormatedValue(formatTime(value, locale));
  }

  return (
    <>
      <DateTimePicker onChange={handleChange} locale={locale} selectRangeEnable />
      <div style={{ height: '2em' }}>
        {'选择结果: ' + formatedValue}
      </div>
    </>
  );
}

export function Demo() {
  return (
    <div className='demo'>
      <label className='label'>日历</label>
      <CalendarDemo />
      <br />
      <br />
      <label className='label'>时间选择器</label>
      <TimePicker />
      <br />
      <br />
      <label className='label'>日期选择器</label>
      <DateTimePickerDemo />
    </div>
  );
}

export default Demo;