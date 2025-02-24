import { ipcRenderer } from 'electron'
import Work_Timer_Channels from './channels'
import registerApi from '@/backend/common/register-api'

export interface IWorkTimerApi {
  getWorkedDuration: () => Promise<number>
  start: () => Promise<void>
  rest: () => Promise<void>
  endWork: () => Promise<void>
  onWorkTimerUpdated: (callback: (duration: number) => void) => void
}

const registerWorkTimerApi = () =>
  registerApi<IWorkTimerApi>('workTimerApi', {
    getWorkedDuration: () =>
      ipcRenderer.invoke(Work_Timer_Channels.Get_Worked_Duration),
    start: () => ipcRenderer.invoke(Work_Timer_Channels.Start),
    rest: () => ipcRenderer.invoke(Work_Timer_Channels.Rest),
    endWork: () => ipcRenderer.invoke(Work_Timer_Channels.EndWork),
    onWorkTimerUpdated: (callback: (duration: number) => void) =>
      ipcRenderer.on(Work_Timer_Channels.Timer_Updated, (_event, value) =>
        callback(value),
      ),
  })

export default registerWorkTimerApi
