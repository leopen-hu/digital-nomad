import { BrowserWindow } from 'electron'
import registerRestListeners from './listeners'
import { WorkTimer } from '../work-timer/work-timer'

const initRest = (workTimer: WorkTimer) => {
  registerRestListeners(workTimer)
}

export default initRest
