<template>
  <section class="py-20 bg-slate-950 text-white border-y border-white/10">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

        <div class="glass-card rounded-3xl p-8">
          <h2 class="text-4xl md:text-5xl font-black gradient-text">
            <Vue3Autocounter
              :startAmount="0"
              :endAmount="stats.total_projects"
              :duration="2"
            />+
          </h2>
          <p class="text-slate-400 mt-2">Projects</p>
        </div>

        <div class="glass-card rounded-3xl p-8">
          <h2 class="text-4xl md:text-5xl font-black gradient-text">
            <Vue3Autocounter
              :startAmount="0"
              :endAmount="stats.total_skills"
              :duration="2"
            />+
          </h2>
          <p class="text-slate-400 mt-2">Skills</p>
        </div>

        <div class="glass-card rounded-3xl p-8">
          <h2 class="text-4xl md:text-5xl font-black gradient-text">
            <Vue3Autocounter
              :startAmount="0"
              :endAmount="stats.total_certificates"
              :duration="2"
            />+
          </h2>
          <p class="text-slate-400 mt-2">Certificates</p>
        </div>

        <div class="glass-card rounded-3xl p-8">
          <h2 class="text-4xl md:text-5xl font-black gradient-text">
            <Vue3Autocounter
              :startAmount="0"
              :endAmount="stats.total_experiences"
              :duration="2"
            />+
          </h2>
          <p class="text-slate-400 mt-2">Experience</p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import Vue3Autocounter from 'vue3-autocounter'
import api from '../services/api'

const stats = reactive({
  total_projects: 0,
  total_skills: 0,
  total_certificates: 0,
  total_experiences: 0
})

onMounted(async () => {
  try {
    const response = await api.get('/api/stats')
    Object.assign(stats, response.data)
  } catch (err) {
    console.error(err)
  }
})
</script>