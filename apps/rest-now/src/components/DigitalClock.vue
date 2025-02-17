<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useCountDown } from '@/store/count-down'
import { storeToRefs } from 'pinia'

let formattedTime = ref({
  hours: '00',
  minutes: '00',
  seconds: '00',
})
const setFormattedTime = (seconds: number) => {
  const format = (time: number) => {
    return time < 10 ? `0${time}` : `${time}`
  }
  formattedTime.value.hours = format(Math.floor(seconds / 3600))
  formattedTime.value.minutes = format(Math.floor((seconds % 3600) / 60))
  formattedTime.value.seconds = format(Math.floor(seconds % 60))
}

const setInitialTime = async () => {
  const seconds = await window.countDownApi.getSeconds()
  console.log(seconds)
  setFormattedTime(seconds)
}

onMounted(() => {
  setInitialTime()
  window.countDownApi.onUpdated(setFormattedTime)
})
</script>

<template>
  <div class="flex flex-nowrap h-full items-center justify-center">
    <div class="flex size-40 items-center justify-center bg-muted">
      <span class="text-8xl text-primary">{{ formattedTime.hours }}</span>
    </div>
    <div class="p-4">
      <span class="text-8xl text-primary">:</span>
    </div>
    <div class="flex size-40 items-center justify-center bg-muted">
      <span class="text-8xl text-primary">{{
        formattedTime.minutes
      }}</span>
    </div>
    <div class="p-4">
      <span class="text-8xl text-primary">:</span>
    </div>
    <div class="flex size-40 items-center justify-center bg-muted">
      <span class="text-8xl text-primary">{{
        formattedTime.seconds
      }}</span>
    </div>
  </div>
</template>
