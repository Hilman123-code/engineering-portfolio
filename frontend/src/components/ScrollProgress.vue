<template>
  <div class="fixed top-0 left-0 z-[9999] h-1 w-full bg-transparent">
    <div
      class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"
      :style="{ width: progress + '%' }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const progress = ref(0)

const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight

  progress.value = docHeight > 0
    ? (scrollTop / docHeight) * 100
    : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
  updateProgress()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>