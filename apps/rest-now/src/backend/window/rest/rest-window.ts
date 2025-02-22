import { BrowserWindow, screen } from 'electron'
import loadRenderer from '@/backend/common/load-renderer'

const createRestWindow = (parentWindow: BrowserWindow) => {
  const displays = screen.getAllDisplays()

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
        nodeIntegration: true,
        contextIsolation: false,
      },
      fullscreenable: true,
      fullscreen: true,
      simpleFullscreen: true,
      frame: false,
      resizable: false,
    })

    loadRenderer(restWindow, 'rest')
  })
}

export default createRestWindow
