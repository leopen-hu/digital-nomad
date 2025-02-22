import createWorkTimer from './work-timer'
import registerWorkTimerListeners from './listeners'

const initWorkTimer = () => {
  const workTimer = createWorkTimer()
  registerWorkTimerListeners(workTimer)
  return workTimer
}

export default initWorkTimer
