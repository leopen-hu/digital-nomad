<script setup lang="ts">
import DigitalClock from '@/components/DigitalClock.vue'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogContent from '@/components/ui/dialog/DialogContent.vue'
import { useServerCountDown } from '@/store/server-count-down';
import { storeToRefs } from 'pinia';

const serverCountDown = useServerCountDown()
const { status } = storeToRefs(serverCountDown)

</script>

<template>
  <DigitalClock />
  <Dialog :open="status === 'finished'">
    <DialogContent asChild disableOutsidePointerEvents>
      <div class="max-w-[70%]">
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
      </div>
    </DialogContent>
  </Dialog>
</template>
