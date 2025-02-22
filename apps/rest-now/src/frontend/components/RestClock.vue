<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { DotFilledIcon } from '@radix-icons/vue'
import formatSeconds from '@/common/format-seconds'

let timer: NodeJS.Timeout
const time = ref(0)
const formattedTime = ref(formatSeconds(0))

onMounted(() => {
  timer = setInterval(() => {
    time.value++
    formattedTime.value = formatSeconds(time.value)
    if (time.value >= 3600) {
      clearInterval(timer)
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="flex flex-row flex-nowrap select-none">
    <div class="flex items-center justify-center">
      <span class="text-digital-clock text-6xl">{{ formattedTime.minutes }}</span>
    </div>
    <div class="flex flex-col items-center justify-center">
      <DotFilledIcon class="digital-clock-dot w-6 h-6 mx-1" />
      <DotFilledIcon class="digital-clock-dot w-6 h-6 mx-1" />
    </div>
    <div class="flex items-center justify-center">
      <span class="text-digital-clock text-6xl">{{ formattedTime.seconds }}</span>
    </div>
  </div>
</template>
