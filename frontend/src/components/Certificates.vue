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

      <div class="flex flex-wrap justify-center gap-8">
        <div
          v-for="certificate in certificates"
          :key="certificate.id"
          v-tilt
          @mousemove="handleMouseMove"
          class="glass-card premium-card rounded-[2rem] overflow-hidden w-full md:w-[calc(33.333%-1.334rem)]"
        >
          <img
            v-if="certificate.image"
            :src="certificate.image"
            :alt="certificate.title"
            @click="openLightbox(certificate.image)"
            class="w-full h-48 object-cover cursor-pointer hover:opacity-80 transition"
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

    <div
      v-if="lightboxImage"
      @click="closeLightbox"
      class="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-6"
    >
      <img
        :src="lightboxImage"
        class="max-w-5xl max-h-[85vh] object-contain rounded-2xl"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const certificates = ref([])
const lightboxImage = ref(null)

const openLightbox = (imageUrl) => {
  lightboxImage.value = imageUrl
}

const closeLightbox = () => {
  lightboxImage.value = null
}

const handleMouseMove = (event) => {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()

  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  card.style.setProperty('--x', `${x}px`)
  card.style.setProperty('--y', `${y}px`)
}

onMounted(async () => {
  const response = await api.get('/api/certificates')
  certificates.value = response.data
})
</script>