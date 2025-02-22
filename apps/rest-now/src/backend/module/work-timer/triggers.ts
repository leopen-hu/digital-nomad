import Work_Timer_Channels from './channels'
import windowManager from '@/backend/window/manager'
export const tellRendererWorkTimerUpdated = (todayWorkedTime: number) => {
  const mainWindow = windowManager.get('mainWindow')
  mainWindow?.webContents.send(
    Work_Timer_Channels.Timer_Updated,
    todayWorkedTime,
  )
}
