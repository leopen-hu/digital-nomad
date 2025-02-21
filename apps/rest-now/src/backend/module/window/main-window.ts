import { BrowserWindow } from 'electron'
import { proloadPath } from '@/backend/common/paths'

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

  // init before renderer loaded
  mainWindow.setMenu(null)

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
