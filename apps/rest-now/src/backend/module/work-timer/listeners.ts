import { ipcMain } from 'electron'
import Work_Timer_Channels from './channels'
import { WorkTimer } from './work-timer'

const registerWorkTimerListeners = (workTimer: WorkTimer) => {
  const { Get_Worked_Duration, Start, Rest, EndWork } = Work_Timer_Channels

  const handleGetWorkedDuration = () => workTimer.getAllWorkedTime()

  const handleStartWorkTimer = () => {
    workTimer.start()
  }

  const handleRest = () => {
    workTimer.rest()
  }

  const handleEndWork = () => {
    workTimer.endWork()
  }

  const listeners = new Map([
    [Get_Worked_Duration, handleGetWorkedDuration],
    [Start, handleStartWorkTimer],
    [Rest, handleRest],
    [EndWork, handleEndWork],
  ])

  listeners.forEach((handler, channel) => {
    ipcMain.handle(channel, handler)
  })
}

export default registerWorkTimerListeners
