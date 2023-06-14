import { useState } from 'react';
import Calendar from '../src/Calendar';
import type { Value } from '../src/Calendar/common/types';
import { View } from '../src/Calendar/common/constants';
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

function LimitedDemo () {
  const minDate = new Date(2022, 2, 3, 1, 2, 3);
  const maxDate = new Date(2025, 5, 2, 2, 3, 4);
  const [formatedValue, handleChange] = useState<Value>();
  return (
    <>
      <DateTimePicker onChange={handleChange}
       minDate={minDate}
       maxDate={maxDate}
       defaultView={View.Decade} />
        <div style={{ height: '2em' }}>
        {'最小值: ' + formatTime(minDate as Date, locale)}
        <br />
        {'最大值: ' + formatTime(maxDate as Date, locale)}
        <br />
        {'选择结果: ' + formatTime(formatedValue as Date, locale)}
      </div>
    </>
  )
}

export function Demo() {
  const Brs = () => (<><br /><br /><br /></>)
  return (
    <div className='demo'>
      <label className='label'>日历</label>
      <CalendarDemo />
      <Brs />
      <Brs />
      <Brs />
      <label className='label'>时间选择器</label>
      <TimePicker />
      <Brs />
      <label className='label'>日期选择器</label>
      <DateTimePickerDemo />
      <Brs />
      <label className='label'>设置最大/最小</label>
      <LimitedDemo />
    </div>
  );
}

export default Demo;