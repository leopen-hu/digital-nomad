import showNotification from '@/backend/common/create-notification'
import { tellRendererWorkTimerUpdated } from './triggers'
import createRestWindows from '@/backend/window/rest/rest-window'
import { devServerUrl } from '@/backend/common/paths'

export type WorkTimerConstructorOptions = {
  restIntervals?: number
  todayWorkedTime?: number
  restDelay?: number
  maxDelayTimes?: number
}

const devOptions = {
  restIntervals: 10000,
  todayWorkedTime: 0,
  restDelay: 10000,
  maxDelayTimes: 2,
}

// const defaultOptions = devServerUrl ? devOptions : {
//   restIntervals: 3600000,
//   todayWorkedTime: 0,
//   restDelay: 300000,
//   maxDelayTimes: 2,
// }

// test for make
const defaultOptions = devOptions

export class WorkTimer {
  private restIntervals: number
  private todayWorkedTime: number
  private restDelay: number
  private maxDelayTimes: number
  private workedTime: number = 0
  private startAt: Date = new Date()
  private stopAt?: Date
  private timer?: NodeJS.Timeout

  constructor(options: WorkTimerConstructorOptions = defaultOptions) {
    const { restIntervals, todayWorkedTime, restDelay, maxDelayTimes } = {
      ...defaultOptions,
      ...options,
    }
    this.restIntervals = restIntervals
    this.todayWorkedTime = todayWorkedTime
    this.restDelay = restDelay
    this.maxDelayTimes = maxDelayTimes
  }

  getAllWorkedTime() {
    return this.workedTime + this.todayWorkedTime
  }

  start() {
    if (this.timer) {
      return
    }
    this.workedTime = 0
    this.startAt = new Date()
    let times = 0
    this.timer = setInterval(() => {
      this.workedTime = new Date().getTime() - this.startAt.getTime()
      // 通知前端更新工作时长
      tellRendererWorkTimerUpdated(this.workedTime + this.todayWorkedTime)
      if (this.workedTime >= this.restIntervals + this.restDelay * times) {
        // 可以延时maxDelayTimes次
        if (times >= this.maxDelayTimes) {
          // 超过2次延时后强制停止
          this.stop()
        } else {
          // 系统通知
          showNotification({ body: 'Take a break now!' })
          times++
        }
      }
    }, 1000)
  }

  stop() {
    clearInterval(this.timer)
    this.stopAt = new Date()
    this.timer = undefined
    // 更新 workedTime 减少计时器的误差
    this.todayWorkedTime += this.stopAt.getTime() - this.startAt.getTime()
    // 打开休息界面
    createRestWindows(this)
    // 记录 startTime, stopTime, todayWorkedTime
  }

  // TODO:后台运行时 计时器挂起 前台运行时 计时器恢复
}

const createWorkTimer = (options?: WorkTimerConstructorOptions) =>
  new WorkTimer(options)

export default createWorkTimer
