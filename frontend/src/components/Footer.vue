<template>
  <footer class="bg-slate-950 text-white py-10 border-t border-white/10">
    <div class="max-w-7xl mx-auto px-6 text-center">
      <h3 class="text-2xl font-black mb-2">
        {{ profile.full_name || 'Engineering Portfolio' }}
      </h3>

      <p class="text-slate-400 mb-4">
        {{ profile.job_title || 'Built with Vue, Node.js, Express and MySQL.' }}
      </p>

      <p class="text-sm text-slate-500">
        © 2026 {{ profile.full_name || 'Briwke' }}. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import api from '../services/api'

const profile = reactive({
  full_name: '',
  job_title: ''
})

onMounted(async () => {
  const response = await api.get('/api/profile')
  Object.assign(profile, response.data)
})
</script>