import { BrowserWindow, ipcMain } from 'electron'
import Rest_Channels from './channels'

const registerRestListeners = (window: BrowserWindow | BrowserWindow[]) => {
  const windows = Array.isArray(window) ? window : [window]
  const { Close } = Rest_Channels

  const handleCloseWindow = () => {
      windows.forEach(w => w.close())
  }

  const listeners = new Map([[Close, handleCloseWindow]])

  listeners.forEach((handler, channel) => {
    ipcMain.handleOnce(channel, handler)
  })
}

export default registerRestListeners
