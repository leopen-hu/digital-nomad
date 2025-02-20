class AppTimer {
  private defaultSeconds: number
  private seconds: number
  private timer?: NodeJS.Timeout
  private intervalCallback?: (seconds: number) => void
  private finishCallback?: () => void

  constructor(
    seconds: number,
    intervalCallback?: (seconds: number) => void,
    finishCallback?: () => void,
  ) {
    this.defaultSeconds = seconds
    this.seconds = seconds
    this.intervalCallback = intervalCallback
    this.finishCallback = finishCallback
    this.timer = undefined
  }

  private createTimer(seconds: number) {
    return setInterval(() => {
      seconds--
      this.seconds = seconds
      this.intervalCallback && this.intervalCallback(this.seconds)
      if (seconds <= 0) {
        this.finish()
      }
    }, 1000)
  }

  private destroyTimer() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  getSeconds() {
    return this.seconds
  }

  start() {
    this.destroyTimer()
    this.timer = this.createTimer(this.seconds)
  }

  stop() {
    this.destroyTimer()
  }

  reset() {
    this.destroyTimer()
    this.seconds = this.defaultSeconds
  }

  private finish() {
    clearInterval(this.timer)
    this.finishCallback && this.finishCallback()
  }
}

const createAppTimer = (
  seconds: number,
  intervalCallback?: (seconds: number) => void,
  finishCallback?: () => void,
) => {
  return new AppTimer(seconds, intervalCallback, finishCallback)
}

export default createAppTimer
