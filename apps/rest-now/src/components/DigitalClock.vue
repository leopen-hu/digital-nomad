<script setup lang="ts">
import { onMounted } from 'vue'
import { useServerAppTimer } from '@/store/server-app-timer'

const serverAppTimer = useServerAppTimer()

const getInitialSeconds = async () => {
  const seconds = await window.appTimerApi.getSeconds()
  serverAppTimer.setSeconds(seconds)
}

const start = async () => {
  await serverAppTimer.start()
}

const stop = async () => {
  await serverAppTimer.stop()
}

const reset = async () => {
  await serverAppTimer.reset()
}

onMounted(() => {
  getInitialSeconds()
  window.appTimerApi.onUpdated(serverAppTimer.setSeconds)
})
</script>

<template>
  <div class="flex flex-col h-full items-center justify-start">
    <div class="flex flex-nowrap items-center justify-center">
      <div class="flex size-40 items-center justify-center">
        <span class="text-8xl text-gray-200">{{
          serverAppTimer.getFormattedTime('hours')
        }}</span>
      </div>
      <div class="p-4">
        <span class="text-8xl text-gray-200">:</span>
      </div>
      <div class="flex size-40 items-center justify-center">
        <span class="text-8xl text-gray-200">{{
          serverAppTimer.getFormattedTime('minutes')
        }}</span>
      </div>
      <div class="p-4">
        <span class="text-8xl text-gray-200">:</span>
      </div>
      <div class="flex size-40 items-center justify-center">
        <span class="text-8xl text-gray-200">{{
          serverAppTimer.getFormattedTime('seconds')
        }}</span>
      </div>
    </div>
    <div class="flex gap-4">
      <button
        class="bg-primary text-white px-4 py-2 rounded-md"
        @click="start()"
      >
        Start
      </button>
      <button
        class="bg-primary text-white px-4 py-2 rounded-md"
        @click="stop()"
      >
        Stop
      </button>
      <button
        class="bg-primary text-white px-4 py-2 rounded-md"
        @click="reset()"
      >
        Reset
      </button>
    </div>
  </div>
</template>
