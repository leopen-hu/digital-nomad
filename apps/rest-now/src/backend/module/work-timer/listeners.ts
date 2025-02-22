import { ipcMain } from 'electron'
import Work_Timer_Channels from './channels'
import { WorkTimer } from './work-timer'

const registerWorkTimerListeners = (workTimer: WorkTimer) => {
  const { Get_Worked_Duration, Start, Stop } = Work_Timer_Channels

  const handleGetWorkedDuration = () => workTimer.getAllWorkedTime()

  const handleStartWorkTimer = () => {
    workTimer.start()
  }

  const handleStopWorkTimer = () => {
    workTimer.stop()
  }

  const listeners = new Map([
    [Get_Worked_Duration, handleGetWorkedDuration],
    [Start, handleStartWorkTimer],
    [Stop, handleStopWorkTimer],
  ])

  listeners.forEach((handler, channel) => {
    ipcMain.handle(channel, handler)
  })
}

export default registerWorkTimerListeners
