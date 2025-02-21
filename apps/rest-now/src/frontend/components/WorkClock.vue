<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  DotFilledIcon,
  PlayIcon,
  StopIcon,
} from '@radix-icons/vue'
import formatDuration from '@/common/format-duration'

const isWorking = ref(false)
let formattedDuration = ref(formatDuration(0))

const initClock = async () => {
  const duration = await window.workTimerApi.getWorkedDuration()
  formattedDuration.value = formatDuration(duration)
}

const start = async () => {
  await window.workTimerApi.start()
  isWorking.value = true
}

const stop = async () => {
  await window.workTimerApi.stop()
  isWorking.value = false
}

const clickButton = () => {
  isWorking.value ? stop() : start()
}

onMounted(() => {
  initClock()
  window.workTimerApi.onWorkTimerUpdated((duration) => {
    console.log('onWorkTimerUpdated', duration)
    formattedDuration.value = formatDuration(duration)
  })
})
</script>

<template>
  <div
    class="flex flex-col bg-gray-900 items-center justify-center shadow-lg rounded-3xl w-fit p-16"
  >
    <div class="flex flex-row flex-nowrap select-none">
      <div class="flex items-center justify-center">
        <span class="text-digital-clock">{{
          formattedDuration.hours
        }}</span>
      </div>
      <div class="flex flex-col items-center justify-center">
        <DotFilledIcon class="digital-clock-dot" />
        <DotFilledIcon class="digital-clock-dot" />
      </div>
      <div class="flex items-center justify-center">
        <span class="text-digital-clock">{{
          formattedDuration.minutes
        }}</span>
      </div>
      <div class="flex flex-col items-center justify-center">
        <DotFilledIcon class="digital-clock-dot" />
        <DotFilledIcon class="digital-clock-dot" />
      </div>
      <div class="flex items-center justify-center">
        <span class="text-digital-clock">{{
          formattedDuration.seconds
        }}</span>
      </div>
    </div>

    <div
      class="flex w-full mt-4 lg:mt-8 pt-10 lg:pt-14 border-t items-center text-gray-200 justify-center"
    >
      <button @click="clickButton" :class="`flex justify-center items-center w-12 h-12 lg:w-20 lg:h-20 rounded-full border-2 cursor-pointer ${isWorking ? 'hover:text-red-500' : 'hover:text-primary'}`">  
        <StopIcon v-if="isWorking" class="w-6 h-6 lg:w-10 lg:h-10" />
        <PlayIcon v-else class="w-8 h-8 ml-0.5 lg:w-12 lg:h-12 lg:ml-1 border-gray-200 hover:text-primary" />
      </button>
    </div>
  </div>
</template>
