class CountDown {
  private defaultSeconds: number
  private seconds: number
  private timer?: NodeJS.Timeout
  private intervalCallback?: (seconds: number) => void

  constructor(
    seconds: number,
    intervalCallback?: (seconds: number) => void,
  ) {
    this.defaultSeconds = seconds
    this.seconds = seconds
    this.intervalCallback = intervalCallback
    this.timer = undefined
  }

  private createTimer(seconds: number) {
    return setInterval(() => {
      this.seconds = seconds
      seconds--
      this.intervalCallback && this.intervalCallback(this.seconds)
      if (seconds <= 0) {
        clearInterval(this.timer)
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

  finish() {
    this.seconds = 0
    clearInterval(this.timer)
  }
}

const createCountDown = (
  seconds: number,
  intervalCallback?: (seconds: number) => void,
) => {
  return new CountDown(seconds, intervalCallback)
}

export default createCountDown
