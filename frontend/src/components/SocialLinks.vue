<template>
  <section class="py-16 bg-slate-950 text-white">
    <div class="max-w-6xl mx-auto px-6 text-center">
      <h2 class="text-3xl md:text-4xl font-black mb-6">
        Connect
        <span class="gradient-text">with me</span>
      </h2>

      <div class="flex flex-wrap justify-center gap-4">
        <a
          v-if="profile.github"
          :href="normalizeUrl(profile.github)"
          target="_blank"
          class="glass-card px-6 py-3 rounded-xl hover:bg-blue-600 transition"
        >
          GitHub
        </a>

        <a
          v-if="profile.linkedin"
          :href="normalizeUrl(profile.linkedin)"
          target="_blank"
          class="glass-card px-6 py-3 rounded-xl hover:bg-blue-600 transition"
        >
          LinkedIn
        </a>

        <a
          v-if="profile.email"
          :href="`mailto:${profile.email}`"
          class="glass-card px-6 py-3 rounded-xl hover:bg-blue-600 transition"
        >
          Email Me
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import api from '../services/api'

const profile = reactive({
  github: '',
  linkedin: '',
  email: ''
})

// Ensures external links always have a protocol, so hrefs like
// "www.linkedin.com/..." don't get treated as an internal route.
const normalizeUrl = (url) => {
  if (!url) return '#'
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

onMounted(async () => {
  const response = await api.get('/api/profile')
  Object.assign(profile, response.data)
})
</script>