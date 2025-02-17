import { app, BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import path from 'node:path'
import started from 'electron-squirrel-startup'
import addCountDownListener from './module/count-down/listeners'

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined
declare const MAIN_WINDOW_VITE_NAME: string

let isQutingFromTrat = false

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

const createWindow = () => {
  const devServerUrl = MAIN_WINDOW_VITE_DEV_SERVER_URL
  const productionPathPrefix = path.join(
    __dirname,
    `../renderer/${MAIN_WINDOW_VITE_NAME}`,
  )
  const iconPath = path.join(
    devServerUrl ? __dirname : productionPathPrefix,
    'icons/icon.ico',
  )

  const createTray = (iconPath: string, mainWindow: BrowserWindow) => {
    const tray = new Tray(nativeImage.createFromPath(iconPath))
    const trayMenu = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => {
          isQutingFromTrat = true
          app.quit()
        },
      },
    ])
    tray.setContextMenu(trayMenu)
    tray.setToolTip('Rest Now')

    tray.on('click', () => {
      mainWindow.show()
    })
  }

  const createBrowserWindow = () => {
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

    if (devServerUrl) {
      mainWindow.loadURL(devServerUrl)
      mainWindow.webContents.openDevTools()
    } else {
      mainWindow.loadFile(`${productionPathPrefix}/index.html`)
    }

    mainWindow.on('close', (event) => {
      if (!isQutingFromTrat) {
        event.preventDefault()
        mainWindow.hide()
      }
    })

    return mainWindow
  }

  const mainWindow = createBrowserWindow()
  createTray(iconPath, mainWindow)
  addCountDownListener(mainWindow)

  // init countDown timer with local config
  // initCountDownTimer()
  // tell mainWindow to render countDown timer with config
  // mainWindow.webContents.send('countDownTimer', config)

  // on start message from renderer and start countDown
  // inform renderer to render current countDown

  // once countDown timer is done
  // inform renderer to render countDown timer with config
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
