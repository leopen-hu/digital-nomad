<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppIcon from './icons/AppIcon.vue'
</script>

<template>
  <div class="h-dvh overflow-x-hidden">
    <nav class="drag-region flex w-full justify-start h-9">
      <AppIcon class="p-2 w-9 h-9" />
    </nav>
    <div
      class="relative h-[calc(100%-36px)] bg-gray-800"
    >
    <RouterView />
    </div>
  </div>
</template>

<style lang="css" scoped>
.drag-region {
  -webkit-app-region: drag;
}
.not-drag-region {
  -webkit-app-region: no-drag;
}
</style>
