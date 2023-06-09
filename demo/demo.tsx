import { useState } from 'react';
import Calendar from '../src/Calendar';
import type { Value } from '../src/Calendar/common/types';
import { View } from '../src/Calendar/common/constants';
import { formatTime } from '../src/Calendar/common/date-formatter';

import TimePicker from '../src/TimePicker';
import DateTimePicker from '../src/DateTimePicker';

import './demo.css';

interface Prop {
  locale?: string;
}

function CalendarDemo({ locale }: Prop) {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <Calendar value={value} onChange={onChange} locale={locale} selectRangeEnable ></Calendar>
  );
}

function DateTimePickerDemo({ locale }: Prop) {
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

function LimitedDemo({ locale }: Prop) {
  const minDate = new Date(2022, 2, 3, 1, 2, 3);
  const maxDate = new Date(2025, 5, 2, 2, 3, 4);
  const [formatedValue, handleChange] = useState<Value>();
  return (
    <>
      <div style={{ height: '2em' }}>
        {'最小值: ' + formatTime(minDate as Date, locale)}
        <br />
        {'最大值: ' + formatTime(maxDate as Date, locale)}
        <br />
        {'选择结果: ' + formatTime(formatedValue as Date, locale)}
      </div>
      <br />
      <br />
      <DateTimePicker
        onChange={handleChange}
        minDate={minDate}
        maxDate={maxDate}
        locale={locale}
        defaultView={View.Decade} />
    </>
  );
}

export function Demo() {
  const [locale, setLocale] = useState('zh-CN');

  const Brs = () => (<><br /><br /><br /></>);
  function renderLangSelect() {
    return (
      <div>
        <label>选择语言：</label>
        <select onChange={(event) => setLocale(event.target.value)}>
          <option value="zh-CN">{'zh-CN'}</option>
          <option value="en-US">{'en-US'}</option>
          <option value="ja-JP">{'ja-JP'}</option>
          <option value="es-ES">{'es-ES'}</option>
          <option value="zh-HK">{'zh-HK'}</option>
        </select>
      </div>
    );
  }
  return (
    <div className='demo'>
      {renderLangSelect()}
      <Brs />
      <label className='label'>日历</label>
      <CalendarDemo locale={locale} />
      <Brs />
      <label className='label'>时间选择器</label>
      <TimePicker />
      <Brs />
      <label className='label'>日期选择器</label>
      <DateTimePickerDemo locale={locale} />
      <Brs />
      <label className='label'>设置最大/最小</label>
      <LimitedDemo locale={locale} />
    </div>
  );
}

export default Demo;