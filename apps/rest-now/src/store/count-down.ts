import { defineStore } from 'pinia'

export const useAppTimer = defineStore('appTimer', {
  state: () => ({
    appTimer: 0,
    isCountingDown: false,
    isAppTimerPaused: false,
    isAppTimerFinished: true,
    interval: null as NodeJS.Timeout | null,
  }),
  actions: {
    startAppTimer(duration: number = 3600) {
      this.appTimer = duration
      this.isCountingDown = true
      this.isAppTimerPaused = false
      this.isAppTimerFinished = false
      this.createInterval()
    },
    pauseAppTimer() {
      this.isAppTimerPaused = true
      this.destroyInterval()
    },
    continueAppTimer() {
      this.startAppTimer(this.appTimer)
    },
    resetAppTimer(duration: number = 3600) {
      this.appTimer = duration
      this.isCountingDown = false
      this.isAppTimerPaused = false
      this.isAppTimerFinished = true
      this.destroyInterval()
    },
    finishAppTimer() {
      this.resetAppTimer(0)
    },
    createInterval() {
      this.interval = setInterval(() => {
        this.appTimer--
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
            return format(Math.floor(state.appTimer / 3600))
          case 'minutes':
            return format(Math.floor((state.appTimer % 3600) / 60))
          case 'seconds':
            return format(Math.floor(state.appTimer % 60))
          default:
            return {
              hours: format(Math.floor(state.appTimer / 3600)),
              minutes: format(Math.floor((state.appTimer % 3600) / 60)),
              seconds: format(Math.floor(state.appTimer % 60)),
            }
        }
      }
    },
  },
})
