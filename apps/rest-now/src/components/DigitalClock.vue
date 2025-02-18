<script setup lang="ts">
import { onMounted } from 'vue'
import { useServerCountDown } from '@/store/server-count-down'

const serverCountDown = useServerCountDown()

const getInitialSeconds = async () => {
  const seconds = await window.countDownApi.getSeconds()
  serverCountDown.setSeconds(seconds)
}

const start = async () => {
  await window.countDownApi.start()
}

const stop = async () => {
  await window.countDownApi.stop()
}

const reset = async () => {
  await window.countDownApi.reset()
}

onMounted(() => {
  getInitialSeconds()
  window.countDownApi.onUpdated(serverCountDown.setSeconds)
})
</script>

<template>
  <div class="flex flex-col gap-16 h-full items-center justify-center">
    <div class="flex flex-nowrap items-center justify-center">
      <div class="flex size-40 items-center justify-center bg-muted">
        <span class="text-8xl text-primary">{{
          serverCountDown.getFormattedTime('hours')
        }}</span>
      </div>
      <div class="p-4">
        <span class="text-8xl text-primary">:</span>
      </div>
      <div class="flex size-40 items-center justify-center bg-muted">
        <span class="text-8xl text-primary">{{
          serverCountDown.getFormattedTime('minutes')
        }}</span>
      </div>
      <div class="p-4">
        <span class="text-8xl text-primary">:</span>
      </div>
      <div class="flex size-40 items-center justify-center bg-muted">
        <span class="text-8xl text-primary">{{
          serverCountDown.getFormattedTime('seconds')
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
