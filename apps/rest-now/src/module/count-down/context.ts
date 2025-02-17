import { contextBridge, ipcRenderer } from 'electron'
import COUNT_DOWN_CHANNELS from './channels'

const registerCountDownContext = () =>
  contextBridge.exposeInMainWorld('countDownApi', {
    getSeconds: () => ipcRenderer.invoke(COUNT_DOWN_CHANNELS.GET_SECONDS),
    start: () => ipcRenderer.invoke(COUNT_DOWN_CHANNELS.START),
    stop: () => ipcRenderer.invoke(COUNT_DOWN_CHANNELS.STOP),
    reset: () => ipcRenderer.invoke(COUNT_DOWN_CHANNELS.RESET),
    finish: () => ipcRenderer.invoke(COUNT_DOWN_CHANNELS.FINISH),
    onUpdated: (callback: (seconds: number) => void) =>
      ipcRenderer.on(COUNT_DOWN_CHANNELS.UPDATED, (_event, value) =>
        callback(value),
      ),
  })

export default registerCountDownContext
