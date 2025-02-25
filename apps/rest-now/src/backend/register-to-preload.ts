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
  }
}

export const registerApis = () => {
  registerWorkTimerApi()
  registerRestApi()
  registerMenuApi()
}

const registerToPreloads = () => {
  registerApis()
}

export default registerToPreloads
