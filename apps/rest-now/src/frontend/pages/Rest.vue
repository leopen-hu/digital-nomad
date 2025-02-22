<script setup lang="ts">
import WorkClock from '@/frontend/components/WorkClock.vue'
import AlertDialog from '@/components/ui/alert-dialog/AlertDialog.vue'
import AlertDialogContent from '@/components/ui/alert-dialog/AlertDialogContent.vue'
import AlertDialogFooter from '@/components/ui/alert-dialog/AlertDialogFooter.vue'
import AlertDialogCancel from '@/components/ui/alert-dialog/AlertDialogCancel.vue'
import { useServerAppTimer } from '@/store/server-app-timer'
import { storeToRefs } from 'pinia'
import WorkAnimate from '@/components/WorkAnimate.vue'

const serverAppTimer = useServerAppTimer()
const { status } = storeToRefs(serverAppTimer)
</script>

<template>
  <div class="flex h-dvh overflow-x-hidden items-center justify-center bg-black text-white">
    Rest Window
  </div>
</template>
