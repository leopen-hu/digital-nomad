import { BrowserWindow, screen } from 'electron'
import loadRenderer from '@/backend/common/load-renderer'
import initRest from '@/backend/module/rest/init'
import { proloadPath } from '@/backend/common/paths'

const createRestWindows = (parentWindow: BrowserWindow) => {
  const displays = screen.getAllDisplays()
  const windows: BrowserWindow[] = []

  displays.forEach((display) => {
    const { x, y, height, width } = display.bounds

    const restWindow = new BrowserWindow({
      x,
      y,
      parent: parentWindow,
      modal: true,
      width,
      height,
      webPreferences: {
        preload: proloadPath,
      },
      fullscreenable: true,
      fullscreen: true,
      simpleFullscreen: true,
      frame: false,
      resizable: false,
    })

    windows.push(restWindow)
  })

  initRest(windows)
  windows.forEach((w) => loadRenderer(w, 'rest'))

  return windows
}

export default createRestWindows
