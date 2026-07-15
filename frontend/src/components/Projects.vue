<template>
  <section id="projects" class="py-24 bg-slate-950 text-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-blue-400 font-semibold mb-3">Portfolio Work</p>

        <h2 class="text-4xl md:text-5xl font-black">
          Featured
          <span class="gradient-text">engineering projects</span>
        </h2>

        <p class="text-slate-400 mt-4 max-w-2xl mx-auto">
          Practical projects that combine engineering thinking, software development,
          database systems and real problem solving.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-8">
        <div
          v-for="project in projects"
          :key="project.id"
          v-tilt
          @mousemove="handleMouseMove"
          class="glass-card premium-card rounded-[2rem] overflow-hidden w-full md:w-[calc(33.333%-1.334rem)]"
        >
          <img
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            @click="openLightbox(project.image)"
            class="w-full h-56 object-cover cursor-pointer hover:opacity-80 transition"
          />

          <div
            v-else
            class="h-56 bg-slate-800 flex items-center justify-center text-6xl"
          >
            🚀
          </div>

          <div class="p-7">
            <h3 class="text-2xl font-bold mb-3">
              {{ project.title }}
            </h3>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-if="project.status"
                :class="getStatusClass(project.status)"
                class="text-xs px-3 py-1 rounded-full"
              >
                {{ project.status }}
              </span>

              <span
                v-if="project.role"
                class="bg-purple-500/10 text-purple-300 text-xs px-3 py-1 rounded-full"
              >
                {{ project.role }}
              </span>
            </div>

            <p class="text-slate-300 leading-7 mb-5">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="bg-blue-500/10 text-blue-300 text-sm px-3 py-1 rounded-full"
              >
                {{ tech }}
              </span>
            </div>

            <div class="grid gap-3">
              <button
                @click="goToProject(project.id)"
                class="w-full bg-blue-600/20 border border-blue-500/30 text-blue-300 px-5 py-3 rounded-2xl font-semibold hover:bg-blue-600 hover:text-white transition"
              >
                View Details →
              </button>

              <div class="grid grid-cols-2 gap-3">
                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  class="text-center bg-white/10 px-4 py-3 rounded-xl text-sm hover:bg-white hover:text-slate-900 transition"
                >
                  Live Demo
                </a>

                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  class="text-center bg-white/10 px-4 py-3 rounded-xl text-sm hover:bg-white hover:text-slate-900 transition"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p v-if="projects.length === 0" class="text-center text-slate-400 mt-10">
        No projects added yet.
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
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const projects = ref([])
const lightboxImage = ref(null)

const openLightbox = (imageUrl) => {
  lightboxImage.value = imageUrl
}

const closeLightbox = () => {
  lightboxImage.value = null
}

const goToProject = (id) => {
  router.push(`/projects/${id}`)
}

const handleMouseMove = (event) => {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()

  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  card.style.setProperty('--x', `${x}px`)
  card.style.setProperty('--y', `${y}px`)
}

const getStatusClass = (status) => {
  const value = (status || '').toLowerCase()

  if (value.includes('completed')) {
    return 'bg-green-500/10 text-green-300'
  }

  if (value.includes('progress')) {
    return 'bg-yellow-500/10 text-yellow-300'
  }

  if (value.includes('planned')) {
    return 'bg-purple-500/10 text-purple-300'
  }

  return 'bg-slate-500/10 text-slate-300'
}

onMounted(async () => {
  try {
    const response = await api.get('/api/projects')
    projects.value = response.data
  } catch (err) {
    console.error(err)
  }
})
</script>