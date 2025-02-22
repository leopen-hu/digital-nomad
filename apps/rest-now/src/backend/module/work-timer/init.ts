import { BrowserWindow } from 'electron'
import createWorkTimer, { WorkTimer } from './service'
import registerWorkTimerListeners from './listeners'
import registerWorkTimerTriggers from './triggers'

const initWorkTimer = (window: BrowserWindow) => {
  const triggers = registerWorkTimerTriggers(window)
  const onWorkTimerUpdated = (workTimer: WorkTimer) => {
    triggers.sendWorkTimerUpdated(workTimer.getWorkedDuration())
  }

  const workTimer = createWorkTimer(0, 3600000, 0, onWorkTimerUpdated)

  registerWorkTimerListeners(workTimer, triggers, window)
  return workTimer
}

export default initWorkTimer
