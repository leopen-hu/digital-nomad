import { BrowserWindow } from 'electron'
import registerRestListeners from './listeners'
import { WorkTimer } from '../work-timer/service'

const initRest = (
  window: BrowserWindow | BrowserWindow[],
  workTimer: WorkTimer,
) => {
  registerRestListeners(window, workTimer)
}

export default initRest
