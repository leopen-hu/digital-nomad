<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Dot, Play, Square } from 'lucide-vue-next'
import { formatTimeForClock } from '@/common/format'
import { useWorkStore } from '../store/work'
import { storeToRefs } from 'pinia'

const store = useWorkStore()
const { isWorking } = storeToRefs(store)
const formattedTime = ref(formatTimeForClock(0))
store.$subscribe((mutation, state) => {
  formattedTime.value = formatTimeForClock(state.todayWorkedTime)
})

const { initWork, startWork, rest } = store

const clickButton = () => {
  isWorking.value ? rest() : startWork()
  console.log(window.themeApi.getTheme())
}

onMounted(() => {
  initWork()
})
</script>

<template>
  <div
    class="flex flex-col bg-gray-900 items-center justify-center shadow-lg rounded-3xl w-fit p-16"
  >
    <div class="flex flex-row flex-nowrap select-none">
      <div class="flex items-center justify-center">
        <span class="text-digital-clock">{{ formattedTime.hours }}</span>
      </div>
      <div class="flex flex-col items-center justify-center">
        <Dot :strokeWidth="4" class="digital-clock-dot" />
        <Dot :strokeWidth="4" class="digital-clock-dot" />
      </div>
      <div class="flex items-center justify-center">
        <span class="text-digital-clock">{{ formattedTime.minutes }}</span>
      </div>
      <div class="flex flex-col items-center justify-center">
        <Dot :strokeWidth="4" class="digital-clock-dot" />
        <Dot :strokeWidth="4" class="digital-clock-dot" />
      </div>
      <div class="flex items-center justify-center">
        <span class="text-digital-clock">{{ formattedTime.seconds }}</span>
      </div>
    </div>

    <div
      class="flex w-full mt-4 lg:mt-8 pt-10 lg:pt-14 border-t items-center text-gray-200 justify-center"
    >
      <button
        @click="clickButton"
        :class="`flex justify-center items-center w-12 h-12 lg:w-20 lg:h-20 rounded-full border-2 cursor-pointer ${isWorking ? 'hover:text-red-500' : 'hover:text-green-500'}`"
      >
        <Square v-if="isWorking" class="w-6 h-6 lg:w-10 lg:h-10" />
        <Play
          v-else
          class="w-6 h-6 ml-0.5 lg:w-10 lg:h-10 lg:ml-1"
        />
      </button>
    </div>
  </div>
</template>
