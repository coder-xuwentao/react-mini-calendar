import { useState } from 'react';
import Calendar from '../src';
import { Value } from '../src/common/types';
import './demo.css';

const CalendarDemo = () => {
  const [value, onChange] = useState<Value>(new Date());
  console.log('123' ,value)

  return (
    <Calendar value={value} onChange={onChange} locale={'zh-CN'} selectRangeEnable ></Calendar>
  );
};

export default CalendarDemo;