<script setup lang="ts">
import Button from '@/frontend/components/ui/button/Button.vue'
import { useWorkStore } from '../store/work'

const { endWork } = useWorkStore()
</script>

<template>
  <div
    class="absolute bottom-0 left-1/2 -translate-x-1/2 pb-2 flex items-center justify-center"
  >
    <Button
      @click="endWork"
      size="xs"
      variant="link"
      class="text-gray-500 hover:text-gray-200 tracking-widest select-none"
    >
      Work Done Today!
    </Button>
  </div>
</template>
