import { ipcRenderer } from 'electron'
import registerApi from './common/register-api'
import registerMenuApi, { IMenuApi } from './module/menu/api'
import registerRestApi, { IRest } from './module/rest/api'
import registerWorkTimerApi, {
  IWorkTimerApi,
} from './module/work-timer/api'

declare global {
  interface Window {
    workTimerApi: IWorkTimerApi
    restApi: IRest
    menuApi: IMenuApi
    themeApi: {
      getTheme: () => Promise<string>
    }
  }
}

export const registerApis = () => {
  registerWorkTimerApi()
  registerRestApi()
  registerMenuApi()
  registerApi('themeApi', {
    getTheme: () => ipcRenderer.invoke('get-theme'),
  })
}

const registerToPreloads = () => {
  registerApis()
}

export default registerToPreloads
