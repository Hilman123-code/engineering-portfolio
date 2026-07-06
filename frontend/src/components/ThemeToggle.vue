<template>
  <button
    @click="toggleTheme"
    class="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-600"
  >
    {{ isDark ? '☀️ Light' : '🌙 Dark' }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value

  document.body.classList.toggle('dark-mode', isDark.value)
}
</script>