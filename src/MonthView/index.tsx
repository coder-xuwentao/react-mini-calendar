import Weekdays from './Weekdays';
import Days from './Days';
import { OnChangeFunc, Value } from '../common/types';

interface MonthViewProps {
  activeStartDate: Date,
  locale?: string;
  onClickDay?: OnChangeFunc;
  value: Value,
  selectRangeEnable?: boolean;
}

const className = 'react-mini-calendar__month-view';

export default function MonthView(porps: MonthViewProps) {
  return (
    <div className={className}>
      <Weekdays locale={porps.locale} />
      <Days {...porps} />
    </div>
  );
}
