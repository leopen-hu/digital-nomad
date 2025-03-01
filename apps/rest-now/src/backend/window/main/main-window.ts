import { BrowserWindow } from 'electron'
import { proloadPath } from '@/backend/common/paths'
import createTray from './main-tray'
import initWorkTimer from '@/backend/module/work-timer/init'
import loadRenderer from '@/backend/common/load-renderer'
import windowManager from '../manager'
import { MAIN_WINDOW } from '@/backend/common/consts'
import initMenu from '@/backend/module/menu/init'

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: proloadPath,
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: 'white',
      height: 36,
      symbolColor: 'black',
    },
  })

  windowManager.set(MAIN_WINDOW, mainWindow)

  // init before renderer loaded
  mainWindow.setMenu(null)

  createTray(mainWindow)
  initWorkTimer()
  initMenu()
  loadRenderer(mainWindow)

  mainWindow.once('ready-to-show', () => {
    console.log('ready-to-show')
    mainWindow.show()
  })

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.alt && input.key.toLowerCase() === 'f4') {
      event.preventDefault()
      mainWindow.destroy()
    }
  })

  mainWindow.on('close', (event) => {
    event.preventDefault()
    mainWindow.hide()
  })

  return mainWindow
}

export default createMainWindow
