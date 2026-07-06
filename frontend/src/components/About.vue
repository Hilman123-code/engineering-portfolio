<template>
  <section id="about" class="py-24 bg-slate-950 text-white">
    <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p class="text-blue-400 font-semibold mb-3">About Me</p>

        <h2 class="text-4xl md:text-5xl font-black mb-6">
          Engineering mindset with
          <span class="gradient-text">software execution</span>
        </h2>

        <p class="text-slate-300 leading-8 mb-6">
          {{ profile.bio || 'I combine engineering knowledge with modern web technology to build practical digital systems.' }}
        </p>

        <div class="grid gap-3 mt-8 text-slate-300">
          <div v-if="profile.email" class="glass-card p-4 rounded-2xl">
            📧 {{ profile.email }}
          </div>

          <div v-if="profile.phone" class="glass-card p-4 rounded-2xl">
            📱 {{ profile.phone }}
          </div>

          <div v-if="profile.location" class="glass-card p-4 rounded-2xl">
            📍 {{ profile.location }}
          </div>
        </div>
      </div>

      <div class="grid gap-5">
        <div class="glass-card p-6 rounded-3xl">
          <h3 class="text-xl font-bold mb-2">⚙️ Engineering</h3>
          <p class="text-slate-300">
            Manufacturing systems, production flow, quality improvement and problem solving.
          </p>
        </div>

        <div class="glass-card p-6 rounded-3xl">
          <h3 class="text-xl font-bold mb-2">💻 Development</h3>
          <p class="text-slate-300">
            Frontend, backend, database and full-stack web system development.
          </p>
        </div>

        <div class="glass-card p-6 rounded-3xl">
          <h3 class="text-xl font-bold mb-2">📊 Analysis</h3>
          <p class="text-slate-300">
            Data analysis, reporting, process monitoring and decision support.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import api from '../services/api'

const profile = reactive({
  bio: '',
  email: '',
  phone: '',
  location: ''
})

onMounted(async () => {
  const response = await api.get('/api/profile')
  Object.assign(profile, response.data)
})
</script>