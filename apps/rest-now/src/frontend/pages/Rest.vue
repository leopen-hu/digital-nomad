<script setup lang="ts">
import { Button } from '../components/ui/button'
import RestClock from '@/frontend/components/RestClock.vue'

const returnToWork = () => {
  window.restApi.close()
}
</script>

<template>
  <div
    class="flex flex-col h-dvh overflow-x-hidden items-center justify-center bg-black text-white"
  >
    <RestClock />
    <Button variant="link" @click="returnToWork" class="mt-4 text-gray-300 text-base tracking-widest select-none">
      Back To Work
    </Button>
  </div>
</template>
