import { Navigation } from '../src'

const App = () => {
  return <Navigation
    activeStartDate={new Date()}
    drillUp={console.log}
    view={'year'}
  />
}

export default App;