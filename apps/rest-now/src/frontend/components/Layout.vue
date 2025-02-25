<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppIcon from './icons/AppIcon.vue'
import MenuBar from './Menubar/Menubar.vue'
</script>

<template>
  <div class="h-dvh overflow-x-hidden">
    <nav class="drag-region flex w-full justify-start items-center h-9">
      <AppIcon class="w-6 h-6 ml-2" />
      <MenuBar class="not-drag-region" />
    </nav>
    <div
      class="relative h-[calc(100%-36px)] bg-gray-800"
    >
    <slot></slot>
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
