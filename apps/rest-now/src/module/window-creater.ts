import { BrowserWindow, BrowserWindowConstructorOptions } from "electron"
import { devServerUrl, productionRendererRootPath, proloadPath } from "./consts"
import createTray from "./tray-creater"
import addAppTimerListener from './app-timer/listeners'

const createWindow = () => {
  const createBrowserWindow = () => {
    // Create the browser window.
    const windowOptions: BrowserWindowConstructorOptions = {
      width: 800,
      height: 600,
      webPreferences: {
        preload: proloadPath,
      },
      titleBarStyle: 'hidden',
      titleBarOverlay: {
        color: 'rgba(0,0,0,0)',
        height: 35,
        symbolColor: 'black',
      },
      resizable: false,
    }
    const browserWindow = new BrowserWindow(windowOptions)

    browserWindow.setMenu(null)
    browserWindow.setMaximizable(false)
    browserWindow.setResizable(false)

    if (devServerUrl) {
      browserWindow.loadURL(devServerUrl)
      browserWindow.webContents.openDevTools()
    } else {
      browserWindow.loadFile(`${productionRendererRootPath}/index.html`)
    }

    return browserWindow
  }

  const mainWindow = createBrowserWindow()
  createTray(mainWindow)
  addAppTimerListener(mainWindow)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('close', (event) => {
    event.preventDefault()
    mainWindow.hide()
  })
}

export default createWindow
