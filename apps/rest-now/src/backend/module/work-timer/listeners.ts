import { BrowserWindow, ipcMain } from 'electron'
import Work_Timer_Channels from './channels'
import { WorkTimer } from './service'
import { IWorkTimerTriggers } from './triggers'
import createRestWindow from '@/backend/window/rest/rest-window'

const registerWorkTimerListeners = (
  workTimer: WorkTimer,
  triggers: IWorkTimerTriggers,
  window: BrowserWindow,
) => {
  const { Get_Worked_Duration, Start, Stop } = Work_Timer_Channels

  const handleGetWorkedDuration = () => workTimer.getWorkedDuration()

  const handleStartWorkTimer = () => {
    workTimer.start()
  }

  const handleStopWorkTimer = () => {
    workTimer.stop()
    createRestWindow(window)
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
