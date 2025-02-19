<script setup lang="ts">
import { useServerCountDown } from '@/store/server-count-down'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'

const serverCountDown = useServerCountDown()
let imgDynamicClass = ref('')
let fireDynamicClass = ref('')

onMounted(() => {
  serverCountDown.$onAction(({ name, store, after }) => {
    if (name === 'start') {
      imgDynamicClass.value = 'animate-rocket-start'
      fireDynamicClass.value = 'animate-fire-start'
      return
    }

    after(() => {
      if (store.status !== 'started' && imgDynamicClass.value === 'animate-flying') {
        imgDynamicClass.value = 'animate-rocket-stop'
        fireDynamicClass.value = 'animate-rocket-stop'
      }
    })
  })
})

const handleImgAnimationEnd = () => {
  imgDynamicClass.value =
    serverCountDown.status === 'started' ? 'animate-flying' : ''
  fireDynamicClass.value =
    serverCountDown.status === 'started' ? 'animate-flying' : ''
}
</script>

<template>
  <div class="flex flex-col items-center w-full h-full justify-end">
    <img
      src="/assets/rocket.png"
      :class="`w-1/6 ${imgDynamicClass}`"
      @animationend="handleImgAnimationEnd"
    />
    <div
      :class="`flex scale-y-0 justify-between w-8 h-12 ${fireDynamicClass}`"
    >
      <div
        class="`h-full bg-orange-400 w-2 mb-1 rounded-full origin-top`"
      ></div>
      <div
        class="`h-full bg-orange-400 w-2 mb-1 rounded-full origin-top`"
      ></div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@keyframes rocket-start {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100px);
  }
}

@keyframes flying {
  0%,
  100% {
    transform: translate(1px, -101px);
  }
  50% {
    transform: translate(-1px, -99px);
  }
}

@keyframes fire-start {
  0% {
    transform: scaleY(0);
    transform: translateY(0);
  }
  100% {
    transform: scaleY(1);
    transform: translateY(-100px);
  }
}

.animate-rocket-start {
  animation: rocket-start 2s forwards;
}

.animate-rocket-stop {
  animation: rocket-start 2s reverse;
}

.animate-flying {
  animation: flying 0.5s infinite;
}

.animate-fire-start {
  animation: fire-start 2s ease-out forwards;
}

.animate-fire-stop {
  animation: fire-start 2s ease-out reverse;
}
</style>
