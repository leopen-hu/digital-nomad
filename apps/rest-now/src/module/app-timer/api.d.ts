export interface IAppTimerApi {
  getSeconds: () => Promise<number>
  start: () => Promise<void>
  stop: () => Promise<void>
  reset: () => Promise<void>
  onUpdated: (callback: (seconds: number) => void) => Promise<void>
}
