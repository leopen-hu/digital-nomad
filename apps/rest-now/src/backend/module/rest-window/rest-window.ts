import { BrowserWindow, screen } from 'electron'
import loadRenderer from '@/backend/common/load-renderer'

const createRestWindow = (parentWindow: BrowserWindow) => {
  const displays = screen.getAllDisplays()

  displays.forEach((display) => {
    const { x, y } = display.bounds

    const restWindow = new BrowserWindow({
      x,
      y,
      parent: parentWindow,
      modal: true,
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      fullscreenable:true,
      fullscreen: true,
      simpleFullscreen:true,
      frame:false
    })
  
    loadRenderer(restWindow, 'rest')
  })
}

export default createRestWindow
