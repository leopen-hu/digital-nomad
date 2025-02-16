<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainMenu from './components/MainMenu.vue'
</script>

<template>
  <div class="h-dvh overflow-x-hidden">
    <nav><MainMenu /></nav>
    <div class="h-[calc(100%-36px)]"><RouterView/></div>
  </div>
</template>
