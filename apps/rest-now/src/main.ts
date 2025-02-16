import {
  app,
  BrowserWindow,
  Menu,
  NativeImage,
  nativeImage,
  Tray,
} from 'electron'
import path from 'node:path'
import started from 'electron-squirrel-startup'

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined
declare const MAIN_WINDOW_VITE_NAME: string

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

const getDevServerUrl = () => MAIN_WINDOW_VITE_DEV_SERVER_URL
const getProductionPathPrefix = () =>
  path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}`)
const createTray = (iconPath: string) => {
  const tray = new Tray(nativeImage.createFromPath(iconPath))
  tray.setToolTip('test Tray')
}

const createWindow = () => {
  // Create the browser window.

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    // titleBarStyle: 'hidden',
    // titleBarOverlay: {
    //   color: '#ffffff',
    //   symbolColor: '#000000',
    //   height: 35,
    // },
  })

  const devServerUrl = MAIN_WINDOW_VITE_DEV_SERVER_URL
  const productionPathPrefix = getProductionPathPrefix()
  if (devServerUrl) {
    mainWindow.loadURL(devServerUrl)
  } else {
    mainWindow.loadFile(`${productionPathPrefix}/index.html`)
  }

  const iconPath = path.join(
    devServerUrl ? __dirname : productionPathPrefix,
    'icons/icon2.ico',
  )
  createTray(iconPath)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
