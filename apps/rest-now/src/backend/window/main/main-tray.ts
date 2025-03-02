import { BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import { iconPath } from '@/backend/common/paths'

const createTray = (mainWindow: BrowserWindow) => {
  const tray = new Tray(nativeImage.createFromPath(iconPath))
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click: () => {
        mainWindow.destroy()
      },
    },
  ])
  tray.setContextMenu(trayMenu)
  tray.setToolTip('Rest Now')

  tray.on('click', () => {
    mainWindow.show()
  })
}

export default createTray
