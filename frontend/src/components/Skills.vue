<template>
  <section id="skills" class="py-24 premium-bg text-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-blue-400 font-semibold mb-3">Technical Skills</p>

        <h2 class="text-4xl md:text-5xl font-black">
          Skills that support
          <span class="gradient-text">real systems</span>
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="skill in skills"
          :key="skill.id"
          class="glass-card rounded-3xl p-8 hover:-translate-y-2 transition"
        >
          <div class="text-5xl mb-5">
            {{ skill.icon || '🚀' }}
          </div>

          <h3 class="text-2xl font-bold mb-4">
            {{ skill.title }}
          </h3>

          <p class="text-slate-300 leading-8">
            {{ skill.description }}
          </p>
        </div>
      </div>

      <p v-if="skills.length === 0" class="text-center text-slate-400 mt-8">
        No skills added yet.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const skills = ref([])

onMounted(async () => {
  const response = await api.get('/api/skills')
  skills.value = response.data
})
</script>