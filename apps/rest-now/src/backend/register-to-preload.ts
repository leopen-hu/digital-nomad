import registerRestApi, { IRest } from './module/rest/api'
import registerWorkTimerApi, {
  IWorkTimerApi,
} from './module/work-timer/api'

declare global {
  interface Window {
    workTimerApi: IWorkTimerApi
    restApi: IRest
  }
}

export const registerApis = () => {
  registerWorkTimerApi()
  registerRestApi()
}

const registerToPreloads = () => {
  registerApis()
}

export default registerToPreloads
