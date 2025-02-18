import { BrowserWindow, ipcMain, Notification } from 'electron'
import createCountDown from './service'
import COUNT_DOWN_CHANNELS from './channels'

const addCountDownListener = (
  mainWindow: BrowserWindow,
  seconds: number = 10,
) => {
  const noticeRenderer = (seconds: number) => {
    mainWindow.webContents.send(COUNT_DOWN_CHANNELS.UPDATED, seconds)
  }
  const onFinished = () => {
    const title = 'Rest Now'
    const body = 'You need take a break now!'

    new Notification({
      title,
      body,
    }).show()
  }
  const countDown = createCountDown(seconds, noticeRenderer, onFinished)

  ipcMain.handle(COUNT_DOWN_CHANNELS.GET_SECONDS, () => {
    return countDown.getSeconds()
  })

  ipcMain.handle(COUNT_DOWN_CHANNELS.START, () => {
    countDown.start()
  })

  ipcMain.handle(COUNT_DOWN_CHANNELS.STOP, () => {
    countDown.stop()
  })

  ipcMain.handle(COUNT_DOWN_CHANNELS.RESET, () => {
    countDown.reset()
    noticeRenderer(countDown.getSeconds())
  })
}

export default addCountDownListener
