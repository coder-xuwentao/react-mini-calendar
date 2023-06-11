import { formatShortWeekday } from '../common/date-formatter';

const oneDayTime = 24 * 60 * 60 * 1000;

const anySunDay = (() => {
  const anyDate = new Date();
  const nowTime = anyDate.getTime();
  const weekday = anyDate.getDay();
  return nowTime - weekday * oneDayTime;
})();

interface WeekdaysProps {
  locale?: string;
}

const className = 'mini-calendar__month-view__weekdays';

export default function Weekdays({
  locale
}: WeekdaysProps) {
  const weekdays = [];

  for (let weekday = 1; weekday <= 7; weekday += 1) {
    const weekdayDate = new Date(anySunDay + weekday * oneDayTime);
    weekdays.push(
      <div key={weekday} className={`${className}__weekday`}>
        {formatShortWeekday(weekdayDate, locale)}
      </div>
    );
  }

  return (
    <div className={className}>
      {weekdays}
    </div>
  );
}