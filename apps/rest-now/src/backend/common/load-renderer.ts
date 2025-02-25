import { devServerUrl, indexPath } from '@/backend/common/paths'
import { BrowserWindow } from 'electron'

const loadRenderer = (winodw: BrowserWindow, hash?: string) => {
  if (devServerUrl) {
    winodw.loadURL(hash ? `${devServerUrl}/#/${hash}` : devServerUrl)
  } else {
    winodw.loadFile(indexPath, { hash: hash })
  }
}

export default loadRenderer
