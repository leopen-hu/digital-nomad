import registerWorkTimerApi, {
  IWorkTimerApi,
} from './module/work-timer/api'

declare global {
  interface Window {
    workTimerApi: IWorkTimerApi
  }
}

export const registerApis = () => {
  registerWorkTimerApi()
}

const registerToPreload = () => {
  registerApis()
}

export default registerToPreload
