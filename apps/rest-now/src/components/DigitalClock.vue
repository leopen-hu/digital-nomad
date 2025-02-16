<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useCountDown } from '@/store/count-down'
import { storeToRefs } from 'pinia'

declare const counter: NodeJS.Timeout
const countDown = useCountDown()

const { getFormattedTime } = storeToRefs(countDown)

onMounted(() => {
  countDown.startCountDown()
})

onUnmounted(() => {
  countDown.finishCountDown()
})
</script>

<template>
  <div class="flex flex-nowrap h-full items-center justify-center">
    <div class="flex size-40 items-center justify-center bg-muted">
      <span class="text-8xl text-primary">{{ getFormattedTime('hours') }}</span>
    </div>
    <div class="p-4">
      <span class="text-8xl text-primary">:</span>
    </div>
    <div class="flex size-40 items-center justify-center bg-muted">
      <span class="text-8xl text-primary">{{ getFormattedTime('minutes') }}</span>
    </div>
    <div class="p-4">
      <span class="text-8xl text-primary">:</span>
    </div>
    <div class="flex size-40 items-center justify-center bg-muted">
      <span class="text-8xl text-primary">{{ getFormattedTime('seconds') }}</span>
    </div>
  </div>
</template>
