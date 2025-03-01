import { app, BrowserWindow, ipcMain } from 'electron'
import started from 'electron-squirrel-startup'
import createMainWindow from './backend/window/main/main-window'
import { APP_BOUND_ID } from './backend/common/consts'
import { DataService } from './backend/services/data-service'
import { runMigrations } from './database/client'

const dataService = new DataService()

async function initializeApp() {
  await runMigrations()
  console.log('runMigrations end')

  // avoid windows notofication not working in production
  if (process.platform === 'win32') app.setAppUserModelId(APP_BOUND_ID)

  createMainWindow()

  // IPC 通信
  ipcMain.handle('get-theme', () => dataService.getTheme())
  ipcMain.handle('set-theme', (_, theme: string) =>
    dataService.setTheme(theme),
  )
}
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

app.on('ready', () => {
  initializeApp()
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
    createMainWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
