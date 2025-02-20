import { app, BrowserWindow } from 'electron'
import started from 'electron-squirrel-startup'
import createWindow from './backend/module/window/main-window'
import loadRenderer from './backend/module/window/load-renderer'
import createTray from './backend/module/window/main-tray'
import initWorkTimer from './backend/module/work-timer/init'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

app.on('ready', () => {
  const mainWindow = createWindow()
  const tray = createTray(mainWindow)
  const workTimer = initWorkTimer(mainWindow)

  loadRenderer(mainWindow)
})

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
