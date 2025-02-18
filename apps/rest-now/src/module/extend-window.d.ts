import { ICountDownApi } from './count-down/api'

declare global {
  interface Window {
    countDownApi: ICountDownApi
  }
}
