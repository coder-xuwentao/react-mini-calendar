import { Navigation } from '../src'
import Weekdays from '../src/MonthView/Weekdays'

const NavigationDemo = () => {
  return <Navigation
    activeStartDate={new Date()}
    drillUp={console.log}
    view={'year'}
  />
}


export default Weekdays;