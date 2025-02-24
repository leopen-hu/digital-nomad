import { defineStore } from 'pinia'

interface State {
  isWorking: boolean
  workedTime: number
  todayWorkedTime: number
}

export const useWorkStore = defineStore('work', {
  state: (): State => ({
    isWorking: false,
    workedTime: 0,
    todayWorkedTime: 0,
  }),
  actions: {
    async initWork() {
      this.todayWorkedTime = await window.workTimerApi.getWorkedDuration()
      window.workTimerApi.onWorkTimerUpdated((todayWorkedTime: number) => {
        this.isWorking = true
        this.todayWorkedTime = todayWorkedTime
      })
    },
    async startWork() {
      console.log('startWork')
      await window.workTimerApi.start()
      this.isWorking = true
    },
    async rest() {
      await window.workTimerApi.rest()
      this.isWorking = false
    },

    async endWork() {
      await window.workTimerApi.endWork()
      this.isWorking = false
    },
  },
})
