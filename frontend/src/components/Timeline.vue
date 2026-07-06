<template>
  <section class="py-24 premium-bg text-white">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-blue-400 font-semibold mb-3">My Journey</p>

        <h2 class="text-4xl md:text-5xl font-black">
          Experience
          <span class="gradient-text">timeline</span>
        </h2>
      </div>

      <div class="grid gap-6">
        <div
          v-for="experience in experiences"
          :key="experience.id"
          class="glass-card p-8 rounded-3xl hover:-translate-y-1 transition"
        >
          <p class="text-blue-400 font-semibold mb-2">
            {{ experience.year }}
          </p>

          <h3 class="text-2xl font-bold mb-2">
            {{ experience.title }}
          </h3>

          <p class="text-slate-300 font-semibold mb-3">
            {{ experience.company }}
          </p>

          <p class="text-slate-400 leading-8">
            {{ experience.description }}
          </p>
        </div>
      </div>

      <p v-if="experiences.length === 0" class="text-center text-slate-400">
        No experience added yet.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const experiences = ref([])

onMounted(async () => {
  const response = await api.get('/api/experiences')
  experiences.value = response.data
})
</script>