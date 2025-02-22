import { devServerUrl, indexPath } from '@/backend/common/paths'
import { BrowserWindow } from 'electron'

const loadRenderer = (mainWindow: BrowserWindow, hash?: string) => {
  if (devServerUrl) {
    mainWindow.loadURL(hash ? `${devServerUrl}/#/${hash}` : devServerUrl)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(indexPath, { hash: hash })
  }
}

export default loadRenderer
