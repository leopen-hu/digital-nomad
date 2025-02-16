import { defineStore } from 'pinia'

export const useCountDown = defineStore('countDown', {
  state: () => ({
    countDown: 0,
    isCountingDown: false,
    isCountDownPaused: false,
    isCountDownFinished: true,
    interval: null as NodeJS.Timeout | null,
  }),
  actions: {
    startCountDown(duration: number = 3600) {
      this.countDown = duration
      this.isCountingDown = true
      this.isCountDownPaused = false
      this.isCountDownFinished = false
      this.createInterval()
    },
    pauseCountDown() {
      this.isCountDownPaused = true
      this.destroyInterval()
    },
    continueCountDown() {
      this.startCountDown(this.countDown)
    },
    resetCountDown(duration: number = 3600) {
      this.countDown = duration
      this.isCountingDown = false
      this.isCountDownPaused = false
      this.isCountDownFinished = true
      this.destroyInterval()
    },
    finishCountDown() {
      this.resetCountDown(0)
    },
    createInterval() {
      this.interval = setInterval(() => {
        this.countDown--
      }, 1000)
    },
    destroyInterval() {
      this.interval && clearInterval(this.interval)
    },
  },
  getters: {
    getFormattedTime: (state) => {
      return (name = 'all') => {
        const format = (n: number) => (n < 10 ? `0${n}` : n)
        switch (name) {
          case 'hours':
            return format(Math.floor(state.countDown / 3600))
          case 'minutes':
            return format(Math.floor((state.countDown % 3600) / 60))
          case 'seconds':
            return format(Math.floor(state.countDown % 60))
          default:
            return {
              hours: format(Math.floor(state.countDown / 3600)),
              minutes: format(Math.floor((state.countDown % 3600) / 60)),
              seconds: format(Math.floor(state.countDown % 60)),
            }
        }
      }
    },
  },
})
