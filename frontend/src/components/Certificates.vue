<template>
  <section class="py-24 bg-slate-950 text-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-blue-400 font-semibold mb-3">Achievements</p>

        <h2 class="text-4xl md:text-5xl font-black">
          Certificates &
          <span class="gradient-text">training</span>
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="certificate in certificates"
          :key="certificate.id"
          class="glass-card rounded-[2rem] overflow-hidden hover:-translate-y-2 transition"
        >
          <img
            v-if="certificate.image"
            :src="certificate.image"
            :alt="certificate.title"
            class="w-full h-48 object-cover"
          />

          <div class="p-7">
            <p class="text-blue-400 font-semibold mb-2">
              {{ certificate.year }}
            </p>

            <h3 class="text-xl font-bold mb-2">
              {{ certificate.title }}
            </h3>

            <p class="text-slate-300 font-semibold mb-3">
              {{ certificate.issuer }}
            </p>

            <p class="text-slate-400">
              {{ certificate.description }}
            </p>
          </div>
        </div>
      </div>

      <p v-if="certificates.length === 0" class="text-center text-slate-400">
        No certificates added yet.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const certificates = ref([])

onMounted(async () => {
  const response = await api.get('/api/certificates')
  certificates.value = response.data
})
</script>