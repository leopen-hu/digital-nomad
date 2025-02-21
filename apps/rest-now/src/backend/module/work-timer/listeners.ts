import { BrowserWindow, ipcMain } from 'electron'
import Work_Timer_Channels from './channels'
import { WorkTimer } from './service'
import { IWorkTimerTriggers } from './triggers'

const registerWorkTimerListeners = (
  workTimer: WorkTimer,
  triggers: IWorkTimerTriggers,
  window?: BrowserWindow,
) => {
  const { Get_Worked_Duration, Start, Stop } = Work_Timer_Channels

  const handleGetWorkedDuration = () => workTimer.getWorkedDuration()

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
    console.log(`registering ${channel}`)
    ipcMain.handle(channel, handler)
  })
}

export default registerWorkTimerListeners
