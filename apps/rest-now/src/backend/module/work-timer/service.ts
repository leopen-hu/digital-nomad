export class WorkTimer {
  private timer?: NodeJS.Timeout
  private stopAt?: Date
  constructor(
    private duration = 0,
    private durationBeforeRest = 3600000,
    private previousDuration = 0,
    private startAt = new Date(),
    private updateCallback?: (workTimer: WorkTimer) => void,
    private startCallback?: (workTimer: WorkTimer) => void,
    private stopCallback?: (workTimer: WorkTimer) => void,
  ) {}

  getWorkedDuration() {
    return this.duration + this.previousDuration
  }

  start(startCallback?: (workTimer: WorkTimer) => void) {
    if (this.timer) {
      return
    }
    this.startAt = new Date()
    this.timer = setInterval(() => {
      this.duration = new Date().getTime() - this.startAt.getTime()
      this.updateCallback?.(this)
      if (this.duration >= this.durationBeforeRest) {
        this.stop(this.stopCallback)
      }
    }, 1000)
    this.startCallback = startCallback || this.startCallback
    this.startCallback?.(this)
  }

  stop(stopCallback?: (workTimer: WorkTimer) => void) {
    this.stopAt = new Date()
    clearInterval(this.timer)
    this.timer = undefined
    this.previousDuration += this.stopAt.getTime() - this.startAt.getTime()
    stopCallback?.(this)
  }
}

const createWorkTimer = (
  duration?: number,
  durationBeforeRest?: number,
  previousDuration?: number,
  updateCallback?: (workTimer: WorkTimer) => void,
  startCallback?: (workTimer: WorkTimer) => void,
  stopCallback?: (workTimer: WorkTimer) => void,
) => new WorkTimer(duration, durationBeforeRest, previousDuration, new Date(), updateCallback, startCallback, stopCallback)

export default createWorkTimer
