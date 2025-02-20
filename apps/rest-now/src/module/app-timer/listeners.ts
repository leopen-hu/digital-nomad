import { BrowserWindow, ipcMain, Notification } from 'electron'
import createAppTimer from './service'
import APP_TIMER_CHANNELS from './channels'

const addAppTimerListener = (
  mainWindow: BrowserWindow,
  seconds: number = 10,
) => {
  const noticeRenderer = (seconds: number) => {
    mainWindow.webContents.send(APP_TIMER_CHANNELS.UPDATED, seconds)
  }
  const onFinished = () => {
    const title = 'Rest Now'
    const body = 'You need take a break now!'

    new Notification({
      title,
      body,
    }).show()
  }
  const appTimer = createAppTimer(seconds, noticeRenderer, onFinished)

  ipcMain.handle(APP_TIMER_CHANNELS.GET_SECONDS, () => {
    return appTimer.getSeconds()
  })

  ipcMain.handle(APP_TIMER_CHANNELS.START, () => {
    appTimer.start()
  })

  ipcMain.handle(APP_TIMER_CHANNELS.STOP, () => {
    appTimer.stop()
  })

  ipcMain.handle(APP_TIMER_CHANNELS.RESET, () => {
    appTimer.reset()
    noticeRenderer(appTimer.getSeconds())
  })
}

export default addAppTimerListener
