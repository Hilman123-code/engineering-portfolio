<template>
  <div
    class="pointer-events-none fixed inset-0 z-0"
    :style="{
      background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(59,130,246,0.18), transparent 40%)`
    }"
  ></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const x = ref(0)
const y = ref(0)

const move = (event) => {
  x.value = event.clientX
  y.value = event.clientY
}

onMounted(() => {
  window.addEventListener('mousemove', move)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', move)
})
</script>