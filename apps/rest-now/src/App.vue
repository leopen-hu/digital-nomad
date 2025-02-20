<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainMenu from './components/MainMenu.vue'
</script>

<template>
  <div class="h-dvh overflow-x-hidden">
    <nav class="drag-region flex w-full justify-start h-9">
      <img src="@/../public/assets/icons/icon.ico" class="flex w-9 p-2"/>
      <MainMenu class="not-drag-region" />
    </nav>
    <div
      class="relative h-[calc(100%-36px)] bg-[url('/assets/bg-work.jpg')] bg-cover bg-center"
    >
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/80 to-black/30"
      ></div>
      <div class="relative z-10 p-8 text-white h-full">
        <RouterView />
      </div>
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
