import Weekdays from './Weekdays';
import Days from './Days';
import { OnChangeFunc, Value } from '../common/types';

interface MonthViewProps {
  activeStartDate: Date,
  locale?: string;
  onClickDay?: OnChangeFunc;
  value: Value,
  selectRangeEnable?: boolean;
  maxDate?: Date;
  minDate?: Date;
}

const className = 'mini-calendar__month-view';

export default function MonthView(props: MonthViewProps) {
  return (
    <div className={className}>
      <Weekdays locale={props.locale} />
      <Days {...props} />
    </div>
  );
}
