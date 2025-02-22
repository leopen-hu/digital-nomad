<script setup lang="ts">
import { DotFilledIcon } from '@radix-icons/vue'
</script>

<template>
  <div class="flex flex-row flex-nowrap select-none">
    <div class="flex items-center justify-center">
      <span class="text-digital-clock text-6xl">00</span>
    </div>
    <div class="flex flex-col items-center justify-center">
      <DotFilledIcon class="digital-clock-dot w-6 h-6 mx-1" />
      <DotFilledIcon class="digital-clock-dot w-6 h-6 mx-1" />
    </div>
    <div class="flex items-center justify-center">
      <span class="text-digital-clock  text-6xl">00</span>
    </div>
  </div>
</template>
