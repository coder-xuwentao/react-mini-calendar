const weekdayToDesc: {[key: string]: string} = {
  '1': '周一',
  '2': '周二',
  '3': '周三',
  '4': '周四',
  '5': '周五',
  '6': '周六',
  '7': '周日',
}

export default function Weekdays() {
  // todo: 翻译  
  const weekdays = []
  for (const weekday in weekdayToDesc) {
    weekdays.push(
      <div key={weekday}>
        {weekdayToDesc[weekday]}
      </div>
    )
  }

  return (
    <div className="react-mini-calendar__month-view__weekdays">
      {weekdays}
    </div>
  )
}