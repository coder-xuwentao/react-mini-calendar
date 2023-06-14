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
  minDate?: Date;
  maxDate?: Date;
}

export default function TimePicker(props: TimePickerProps) {
  const { optionSize = 12, onChange, showConfirm, onConfirm, defaultDate, minDate, maxDate } = props;
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

  function renderResult() {
    return (
      <div className='mini-time-picker__result'>
        <div className='mini-time-picker__result__desc'>
          {`${hourValue} : ${minuteValue} : ${secondValue}`}
        </div>
        <button
          hidden={!showConfirm}
          onClick={() => onConfirm?.({
            hour: hourValue, minute: minuteValue, second: secondValue
          })}
          className='mini-time-picker__result__button'
        >✔</button>
      </div>
    )
  }

  function renderSelectWheel() {
    const gethourDisabled = (hour: number) => {
      return (minDate && hour < minDate.getHours()) || (maxDate && hour > maxDate.getHours())
    }
    const getMinuteDisabled = (minute: number) => {
      return (minDate && minute < minDate.getMinutes()) || (maxDate && minute > maxDate.getMinutes())
    }
    const getSecondDisabled = (second: number) => {
      return (minDate && second < minDate.getSeconds()) || (maxDate && second > maxDate.getSeconds())
    }
    return (
      <div className='mini-time-picker__scrollboxs'>
        {/* 时 */}
        <select className="mini-time-picker__scrollboxs__scrollbox"
          size={optionSize}
          value={hourValue}
          onChange={handleHourChange}
        >
          {makeArr(24).map(hour => (
            <option key={hour} value={formatTimeNum(hour)} 
              disabled={gethourDisabled(hour)}
            >{formatTimeNum(hour)}</option>
          ))}
        </select>
        {/* 分 */}
        <select className="mini-time-picker__scrollboxs__scrollbox"
          size={optionSize}
          value={minuteValue}
          onChange={handleMinuteChange}
        >
          {makeArr(60).map(minute => (
            <option key={minute} value={formatTimeNum(minute)}
              disabled={getMinuteDisabled(minute)}
            >{formatTimeNum(minute)}</option>
          ))}
        </select>
        {/* 秒 */}
        <select className="mini-time-picker__scrollboxs__scrollbox"
          size={optionSize}
          value={secondValue}
          onChange={handleSecondChange}
        >
          {makeArr(60).map(second => (
            <option key={second} value={formatTimeNum(second)} 
            disabled={getSecondDisabled(second)}
            >{formatTimeNum(second)}</option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className="mini-time-picker">
      {renderResult()}
      {renderSelectWheel()}
    </div>
  );
}