import { ipcMain } from 'electron'
import { MENU_CHANNELS } from './channels'
import windowManager from '@/backend/window/manager'
import { MAIN_WINDOW } from '@/backend/common/consts'

export const registerMenuListeners = () => {
  const { CLOSE_APP, TOGGLE_DEVTOOLS, FORCE_RELOAD, RELOAD } =
    MENU_CHANNELS

  const listeners = new Map([
    [
      CLOSE_APP,
      () => {
        console.log(CLOSE_APP)
        windowManager.get(MAIN_WINDOW)?.destroy()
      },
    ],
    [
      TOGGLE_DEVTOOLS,
      () => {
        console.log(TOGGLE_DEVTOOLS)
        windowManager.get(MAIN_WINDOW)?.webContents.toggleDevTools()
      },
    ],
    [
      FORCE_RELOAD,
      () => {
        console.log(FORCE_RELOAD)
        windowManager.get(MAIN_WINDOW)?.webContents.reloadIgnoringCache()
      },
    ],
    [
      RELOAD,
      () => {
        console.log(RELOAD)
        windowManager.get(MAIN_WINDOW)?.webContents.reload()
      },
    ],
  ])

  listeners.forEach((handler, channel) => {
    ipcMain.handle(channel, handler)
  })
}
