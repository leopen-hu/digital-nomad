import { BrowserWindow, BrowserWindowConstructorOptions } from "electron"
import { devServerUrl, productionRendererRootPath, proloadPath } from "./consts"
import createTray from "./tray-creater"
import addCountDownListener from "./count-down/listeners"

const createWindow = () => {
  const createBrowserWindow = () => {
    // Create the browser window.
    const baseOptions = {
      width: 800,
      height: 600,
      webPreferences: {
        preload: proloadPath,
      },
    }
    const devOptions = {}
    const productionOptions = {
      titleBarStyle: 'hidden',
      titleBarOverlay: {
        color: '#ffffff',
        symbolColor: '#000000',
        height: 35,
      },
    }
    const browserWindow = new BrowserWindow({
      ...baseOptions,
      ...(devServerUrl
        ? devOptions
        : (productionOptions as BrowserWindowConstructorOptions)),
    })

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
  addCountDownListener(mainWindow)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('close', (event) => {
    event.preventDefault()
    mainWindow.hide()
  })
}

export default createWindow
