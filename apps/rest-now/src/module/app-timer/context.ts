import { contextBridge, ipcRenderer } from 'electron'
import APP_TIMER_CHANNELS from './channels'

const registerAppTimerContext = () =>
  contextBridge.exposeInMainWorld('appTimerApi', {
    getSeconds: () => ipcRenderer.invoke(APP_TIMER_CHANNELS.GET_SECONDS),
    start: () => ipcRenderer.invoke(APP_TIMER_CHANNELS.START),
    stop: () => ipcRenderer.invoke(APP_TIMER_CHANNELS.STOP),
    reset: () => ipcRenderer.invoke(APP_TIMER_CHANNELS.RESET),
    onUpdated: (callback: (seconds: number) => void) =>
      ipcRenderer.on(APP_TIMER_CHANNELS.UPDATED, (_event, value) =>
        callback(value),
      ),
  })

export default registerAppTimerContext
