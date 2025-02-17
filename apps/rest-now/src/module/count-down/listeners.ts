import { BrowserWindow, ipcMain } from 'electron'
import createCountDown from './service'
import COUNT_DOWN_CHANNELS from './channels'

const addCountDownListener = (
  mainWindow: BrowserWindow,
  seconds: number = 3600,
) => {
  const noticeRenderer = (seconds: number) => {
    mainWindow.webContents.send(COUNT_DOWN_CHANNELS.UPDATED, seconds)
  }
  const countDown = createCountDown(seconds, noticeRenderer)

  ipcMain.handle(COUNT_DOWN_CHANNELS.GET_SECONDS, () => {
    return countDown.getSeconds()
    console.log(countDown.getSeconds())
  })

  ipcMain.handle(COUNT_DOWN_CHANNELS.START, () => {
    countDown.start()
  })

  ipcMain.handle(COUNT_DOWN_CHANNELS.STOP, () => {
    countDown.stop()
  })

  ipcMain.handle(COUNT_DOWN_CHANNELS.RESET, () => {
    countDown.reset()
  })

  ipcMain.handle(COUNT_DOWN_CHANNELS.FINISH, () => {
    countDown.finish()
  })
}

export default addCountDownListener
