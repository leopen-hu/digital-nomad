import { BrowserWindow, ipcMain } from 'electron'
import Rest_Channels from './channels'
import { WorkTimer } from '../work-timer/service'

const registerRestListeners = (
  window: BrowserWindow | BrowserWindow[],
  workTimer: WorkTimer,
) => {
  const windows = Array.isArray(window) ? window : [window]
  const { Close } = Rest_Channels

  const handleCloseWindow = () => {
    workTimer.start()
    windows.forEach((w) => w.close())
  }

  const listeners = new Map([[Close, handleCloseWindow]])

  listeners.forEach((handler, channel) => {
    ipcMain.handleOnce(channel, handler)
  })
}

export default registerRestListeners
