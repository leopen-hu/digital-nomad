<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainMenu from './components/MainMenu.vue'
</script>

<template>
  <div class="h-dvh overflow-x-hidden">
    <nav><MainMenu /></nav>
    <div
      class="relative h-[calc(100%-36px)] bg-[url('/assets/bg-work.jpg')] bg-cover bg-center"
    >
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/80 to-black/30"
      ></div>
      <div class="relative z-10 p-8">
        <RouterView />
      </div>
    </div>
  </div>
</template>
