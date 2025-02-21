import { devServerUrl, indexPath } from "@/backend/common/paths"
import { BrowserWindow } from "electron"

const loadRenderer = (mainWindow: BrowserWindow) => {
  if (devServerUrl) {
    mainWindow.loadURL(devServerUrl)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(indexPath)
  }
}

export default loadRenderer
