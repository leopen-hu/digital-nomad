<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

declare const counter: NodeJS.Timeout
const countDown = ref({
  hours: 0,
  minutes: 0,
  seconds: 10,
})

const setCountDown = () => {
  if (countDown.value.seconds > 0) {
    countDown.value.seconds--
  } else if (countDown.value.minutes > 0) {
    countDown.value.minutes--
    countDown.value.seconds = 59
  } else if (countDown.value.hours > 0) {
    countDown.value.hours--
    countDown.value.minutes = 59
    countDown.value.seconds = 59
  } else {
    clearInterval(counter)
  }
}

const createCounter = () =>
  setInterval(() => {
    setCountDown()
  }, 1000)

const formatTime = (time: number) => {
  return time < 10 ? `0${time}` : time
}

onMounted(() => {
  createCounter()
})

onUnmounted(() => {
  clearInterval(counter)
})
</script>

<template>
  <div class="flex flex-nowrap h-full items-center justify-center">
    <div class="flex size-40 items-center justify-center bg-muted">
      <span class="text-8xl text-primary">{{ formatTime(countDown.hours) }}</span>
    </div>
    <div class="p-4">
      <span class="text-8xl text-primary">:</span>
    </div>
    <div class="flex size-40 items-center justify-center bg-muted">
      <span class="text-8xl text-primary">{{ formatTime(countDown.minutes) }}</span>
    </div>
    <div class="p-4">
      <span class="text-8xl text-primary">:</span>
    </div>
    <div class="flex size-40 items-center justify-center bg-muted">
      <span class="text-8xl text-primary">{{ formatTime(countDown.seconds) }}</span>
    </div>
  </div>
</template>
