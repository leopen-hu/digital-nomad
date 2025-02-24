<script setup lang="ts">
import WorkClock from '@/frontend/components/WorkClock.vue'
import Layout from '../components/Layout.vue'
import CompleteWork from '../components/CompleteWork.vue'

</script>

<template>
  <Layout>
    <div class="relative flex items-center justify-center h-full">
      <WorkClock />
      <CompleteWork />
    </div>
  </Layout>
  
</template>
