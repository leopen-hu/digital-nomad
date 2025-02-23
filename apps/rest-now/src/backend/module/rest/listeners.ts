import { ipcMain } from 'electron'
import Rest_Channels from './channels'
import { WorkTimer } from '../work-timer/work-timer'
import windowManager from '@/backend/window/manager'
import { REST_WINDOW } from '@/common/consts'

const registerRestListeners = (workTimer: WorkTimer) => {
  const { Close } = Rest_Channels

  const handleCloseWindow = () => {
    workTimer.start()
    windowManager.forEach((window, key) => {
      if (key.includes(REST_WINDOW)) {
        window.close()
      } else {
        window.isVisible() ? window.focus() : window.show()
      }
    })
  }

  const listeners = new Map([[Close, handleCloseWindow]])

  listeners.forEach((handler, channel) => {
    ipcMain.handleOnce(channel, handler)
  })
}

export default registerRestListeners
