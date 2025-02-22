<script setup lang="ts">
import { Button } from '../components/ui/button';

const returnToWork = () => {
  window.restApi.close();
};
</script>

<template>
  <div class="flex h-dvh overflow-x-hidden items-center justify-center bg-black text-white">
    <Button variant="ghost" @click="returnToWork">
      Return To Work
    </Button>
  </div>
</template>
