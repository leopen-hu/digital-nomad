import { BrowserWindow } from 'electron'
import { proloadPath } from '@/backend/common/paths'
import createTray from './main-tray'
import initWorkTimer from '@/backend/module/work-timer/init'
import loadRenderer from '@/backend/common/load-renderer'
import windowManager from '../manager'

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

  windowManager.set('mainWindow', mainWindow)

  // init before renderer loaded
  mainWindow.setMenu(null)

  createTray(mainWindow)
  initWorkTimer()

  loadRenderer(mainWindow)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('close', (event) => {
    event.preventDefault()
    mainWindow.hide()
  })

  return mainWindow
}

export default createMainWindow
