export interface ICountDownApi {
  getSeconds: () => Promise<number>
  start: () => Promise<void>
  stop: () => Promise<void>
  reset: () => Promise<void>
  finish: () => Promise<void>
  onUpdated: (callback: (seconds: number) => void) => Promise<void>
}
