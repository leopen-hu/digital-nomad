import { BrowserWindow, screen } from 'electron'
import loadRenderer from '@/backend/common/load-renderer'
import initRest from '@/backend/module/rest/init'
import { proloadPath } from '@/backend/common/paths'
import { WorkTimer } from '@/backend/module/work-timer/work-timer'
import windowManager from '../manager'

const createRestWindows = (workTimer: WorkTimer) => {
  const parentWindow = windowManager.get('mainWindow')
  const displays = screen.getAllDisplays()

  displays.forEach((display, index) => {
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

    windowManager.set(`restWindow${index}`, restWindow)
  })

  initRest(workTimer)
  windowManager.forEach((window, key) => {
    if (key.includes('restWindow')) {
      loadRenderer(window, 'rest')
    }
  })
}

export default createRestWindows
