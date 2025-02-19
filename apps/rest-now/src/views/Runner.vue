<script setup lang="ts">
import DigitalClock from '@/components/DigitalClock.vue'
import AlertDialog from '@/components/ui/alert-dialog/AlertDialog.vue'
import AlertDialogContent from '@/components/ui/alert-dialog/AlertDialogContent.vue'
import AlertDialogFooter from '@/components/ui/alert-dialog/AlertDialogFooter.vue'
import AlertDialogCancel from '@/components/ui/alert-dialog/AlertDialogCancel.vue'
import { useServerCountDown } from '@/store/server-count-down'
import { storeToRefs } from 'pinia'
import WorkAnimate from '@/components/WorkAnimate.vue'

const serverCountDown = useServerCountDown()
const { status } = storeToRefs(serverCountDown)
</script>

<template>
  <div class="flex flex-col items-center justify-center h-3/5">
    <WorkAnimate></WorkAnimate>
  </div>
  <div class="flex justify-center h-2/5">
    <DigitalClock/>
  </div>
  <AlertDialog
    :open="status === 'finished'"
    @update:open="serverCountDown.reset"
  >
    <AlertDialogContent disableOutsidePointerEvents class="max-w-[70%]">
      <div>
        <div>Rest Now!</div>
        <div>Rest Now!</div>
        <div>Rest Now!</div>
        <div>Rest Now!</div>
        <div>Rest Now!</div>
        <div>Rest Now!</div>
        <div>Rest Now!</div>
        <div>Rest Now!</div>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>继续工作</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
