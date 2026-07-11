<template>
  <button
    @click="toggleTheme"
    class="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-600"
  >
    {{ isDark ? '☀️ Light' : '🌙 Dark' }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Note: this currently only re-themes the Navbar and Hero section.
// Other sections intentionally stay on the default dark theme.
const isDark = ref(true)

const applyTheme = () => {
  document.body.classList.toggle('light-mode', !isDark.value)
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme()
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved !== 'light'
  applyTheme()
})
</script>