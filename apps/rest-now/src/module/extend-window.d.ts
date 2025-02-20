import { IAppTimerApi } from './app-timer/api'

declare global {
  interface Window {
    appTimerApi: IAppTimerApi
  }
}
