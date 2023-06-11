import { useCallback, useEffect, useState } from 'react';
import './style.less';

function formatTimeNum(num: number) {
  if (num < 10) {
    return '0' + num;
  }
  return '' + num;
}

function makeArr(length: number) {
  return Array.from({ length }).map((_, index) => index);
}

export interface onChangeArgs {
  hour: string,
  minute: string,
  second: string
}

interface TimePickerProps {
  optionSize?: number;
  showConfirm?: boolean;
  defaultDate?: Date;
  onChange?: (args: onChangeArgs) => void;
  onConfirm?: (args: onChangeArgs) => void;
}

export default function TimePicker(props: TimePickerProps) {
  const { optionSize = 12, onChange, showConfirm, onConfirm, defaultDate } = props;
  const [hourValue, setHourValue] = useState((defaultDate && formatTimeNum(defaultDate.getHours())) ||'00');
  const [minuteValue, setMinuteValue] = useState(defaultDate && formatTimeNum(defaultDate.getMinutes()) ||'00');
  const [secondValue, setSecondValue] = useState(defaultDate && formatTimeNum(defaultDate.getSeconds()) ||'00');

  const handleHourChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setHourValue(event.target.value);
  }, []);

  const handleMinuteChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setMinuteValue(event.target.value);
  }, []);

  const handleSecondChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSecondValue(event.target.value);
  }, []);


  useEffect(function handleChange() {
    onChange?.({hour: hourValue, minute: minuteValue, second: secondValue});
  }, [onChange, hourValue, minuteValue, secondValue]);

  return (
    <div className="mini-time-picker">
      <div className='mini-time-picker__result'>
        <div className='mini-time-picker__result__desc'>
          {`${hourValue} : ${minuteValue} : ${secondValue}`}
        </div>
        {showConfirm && <button
          onClick={() => onConfirm?.({
            hour: hourValue, minute: minuteValue, second: secondValue
          })}
          className='mini-time-picker__result__button'
        >✔</button>}
      </div>
      <select className="mini-time-picker__hours"
        size={optionSize}
        value={hourValue}
        onChange={handleHourChange}
      >
        {makeArr(24).map(num => (
          <option value={formatTimeNum(num)}>{formatTimeNum(num)}</option>
        ))}
      </select>
      <select className="mini-time-picker__minute"
        size={optionSize}
        value={minuteValue}
        onChange={handleMinuteChange}
      >
        {makeArr(60).map(num => (
          <option value={formatTimeNum(num)}>{formatTimeNum(num)}</option>
        ))}
      </select>
      <select className="mini-time-picker__seconds"
        size={optionSize}
        value={secondValue}
        onChange={handleSecondChange}
      >
        {makeArr(60).map(num => (
          <option value={formatTimeNum(num)}>{formatTimeNum(num)}</option>
        ))}
      </select>
    </div>
  );
}