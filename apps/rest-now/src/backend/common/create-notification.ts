import { Notification, NotificationConstructorOptions } from 'electron'
import { iconPath } from './paths'
import windowManager from '../window/manager'
import { MAIN_WINDOW } from '@/backend/common/consts'

const defaultOptions = {
  title: 'Rest Now',
  body: 'Take a break now!',
  icon: iconPath,
}
export const createNotification = (
  options?: NotificationConstructorOptions,
) => {
  const notification = new Notification({ ...defaultOptions, ...options })

  notification.on('click', () => {
    const mainWindow = windowManager.get(MAIN_WINDOW)
    if (!mainWindow) {
      return
    }
    if (mainWindow.isVisible()) {
      mainWindow.focus()
    } else {
      mainWindow.show()
    }
  })

  return notification
}

const showNotification = (options?: NotificationConstructorOptions) => {
  const notification = createNotification(options)
  notification.show()
}

export default showNotification
