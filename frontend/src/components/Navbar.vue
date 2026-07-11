<template>
  <nav class="nav-theme-scope fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl">
    <div class="glass-card rounded-2xl px-6 py-4 flex justify-between items-center text-white">
      <a href="#" class="font-bold text-xl">
        {{ profile.full_name || 'Portfolio' }}
      </a>

      <div class="hidden md:flex gap-6 text-sm text-slate-300">
        <a href="#about" class="hover:text-white">About</a>
        <a href="#skills" class="hover:text-white">Skills</a>
        <a href="#projects" class="hover:text-white">Projects</a>
        <a href="#contact" class="hover:text-white">Contact</a>
        <a href="/admin" class="hover:text-white">Admin</a>
      </div>

      <button @click="isOpen = !isOpen" class="md:hidden text-2xl">
        ☰
      </button>
    </div>

    <div
      v-if="isOpen"
      class="glass-card mt-3 rounded-2xl p-5 grid gap-4 text-white md:hidden"
    >
      <a href="#about" @click="isOpen = false">About</a>
      <a href="#skills" @click="isOpen = false">Skills</a>
      <a href="#projects" @click="isOpen = false">Projects</a>
      <a href="#contact" @click="isOpen = false">Contact</a>
      <a href="/admin" @click="isOpen = false">Admin</a>
    </div>
  </nav>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '../services/api'

const isOpen = ref(false)

const profile = reactive({
  full_name: ''
})

onMounted(async () => {
  const response = await api.get('/api/profile')
  Object.assign(profile, response.data)
})
</script>