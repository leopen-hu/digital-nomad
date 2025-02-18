import { defineStore } from 'pinia'

type CountDownState = {
  seconds: number
  status: 'started' | 'stoped' | 'finished'
}

type formatEnum = 'hours' | 'minutes' | 'seconds' | 'all'

export const useServerCountDown = defineStore('countDown', {
  state: () => {
    const state: CountDownState = {
      seconds: 0,
      status: 'stoped',
    }
    return state
  },
  actions: {
    setSeconds(seconds: number) {
      this.seconds = seconds
      if (seconds <= 0) {
        this.status = 'finished'
      }
    },
    start: async function () {
      this.status = 'started'
      await window.countDownApi.start()
    },

    stop: async function () {
      this.status = 'stoped'
      await window.countDownApi.stop()
    },

    reset: async function () {
      this.status = 'stoped'
      await window.countDownApi.reset()
    },
  },
  getters: {
    getFormattedTime: (state) => {
      return (name: formatEnum = 'all') => {
        const format = (n: number) => (n < 10 ? `0${n}` : n)
        switch (name) {
          case 'hours':
            return format(Math.floor(state.seconds / 3600))
          case 'minutes':
            return format(Math.floor((state.seconds % 3600) / 60))
          case 'seconds':
            return format(Math.floor(state.seconds % 60))
          default:
            return {
              hours: format(Math.floor(state.seconds / 3600)),
              minutes: format(Math.floor((state.seconds % 3600) / 60)),
              seconds: format(Math.floor(state.seconds % 60)),
            }
        }
      }
    }
  },
})
