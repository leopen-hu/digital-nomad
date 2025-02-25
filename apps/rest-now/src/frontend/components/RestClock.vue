<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Dot } from 'lucide-vue-next'
import {formatTimeForClock} from '@/common/format'

let timer: NodeJS.Timeout
const formattedTime = ref(formatTimeForClock(0))

onMounted(() => {
  const startAt = Date.now()
  timer = setInterval(() => {
    formattedTime.value = formatTimeForClock(Date.now() - startAt)
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="flex flex-row flex-nowrap select-none">
    <div class="flex items-center justify-center">
      <span class="text-digital-clock text-6xl">{{ formattedTime.hours }}</span>
    </div>
    <div class="flex flex-col items-center justify-center">
      <Dot :strokeWidth="4" class="digital-clock-dot w-6 h-6 mx-1" />
      <Dot :strokeWidth="4" class="digital-clock-dot w-6 h-6 mx-1" />
    </div>
    <div class="flex items-center justify-center">
      <span class="text-digital-clock text-6xl">{{ formattedTime.minutes }}</span>
    </div>
    <div class="flex flex-col items-center justify-center">
      <Dot :strokeWidth="4" class="digital-clock-dot w-6 h-6 mx-1" />
      <Dot :strokeWidth="4" class="digital-clock-dot w-6 h-6 mx-1" />
    </div>
    <div class="flex items-center justify-center">
      <span class="text-digital-clock text-6xl">{{ formattedTime.seconds }}</span>
    </div>
  </div>
</template>
