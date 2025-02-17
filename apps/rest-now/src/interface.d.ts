import { ICountDownApi } from './module/count-down/interface'

declare global {
  interface Window {
    countDownApi: ICountDownApi
  }
}
