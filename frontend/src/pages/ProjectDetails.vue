<template>
  <section class="aurora-bg grid-bg min-h-screen text-white py-28">
    <div class="content-layer max-w-6xl mx-auto px-6">
      <button
        @click="router.push('/#projects')"
        class="glass-card px-5 py-3 rounded-xl mb-8 hover:bg-white hover:text-slate-900 transition"
      >
        ← Back to Projects
      </button>

      <div v-if="project" class="glass-card rounded-[2rem] overflow-hidden shadow-2xl">
        <img
          v-if="project.image"
          :src="project.image"
          :alt="project.title"
          class="w-full h-[420px] object-cover"
        />

        <div class="p-8 md:p-10">
          <p class="text-blue-400 font-semibold mb-3">Project Case Study</p>

          <h1 class="text-4xl md:text-6xl font-black mb-6">
            {{ project.title }}
          </h1>

          <p class="text-slate-300 leading-8 text-lg mb-8">
            {{ project.overview || project.description }}
          </p>

          <div class="grid md:grid-cols-3 gap-4 mb-8">
            <div class="glass-card p-5 rounded-2xl">
              <p class="text-slate-400 text-sm mb-3">Status</p>
              <span :class="getStatusClass(project.status)" class="px-4 py-2 rounded-full font-semibold">
                {{ project.status || 'Not specified' }}
              </span>
            </div>

            <div class="glass-card p-5 rounded-2xl">
              <p class="text-slate-400 text-sm">⏱ Duration</p>
              <h3 class="font-bold text-lg">{{ project.duration || 'Not specified' }}</h3>
            </div>

            <div class="glass-card p-5 rounded-2xl">
              <p class="text-slate-400 text-sm">👨‍💻 Role</p>
              <h3 class="font-bold text-lg">{{ project.role || 'Developer' }}</h3>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 mb-10">
            <span
              v-for="tech in project.tech"
              :key="tech"
              class="bg-blue-500/10 text-blue-300 text-sm px-3 py-1 rounded-full"
            >
              {{ tech }}
            </span>
          </div>

          <div class="flex flex-wrap gap-4 mb-10">
            <a
              v-if="project.demo"
              :href="project.demo"
              target="_blank"
              class="magnetic-btn bg-blue-600 px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition"
            >
              Live Demo
            </a>

            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              class="glass-card px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 transition"
            >
              GitHub Repo
            </a>
          </div>

          <div v-if="galleryImages.length > 0" class="mb-10">
            <h2 class="text-3xl font-black mb-6">
              Project Gallery
            </h2>

            <div class="grid md:grid-cols-3 gap-6">
              <div
                v-for="image in galleryImages"
                :key="image.id"
                @click="openLightbox(image.image_url)"
                class="glass-card rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 transition"
              >
                <img
                  :src="image.image_url"
                  class="w-full h-48 object-cover"
                />

                <p class="p-4 text-slate-400">
                  {{ image.caption || 'Project image' }}
                </p>
              </div>
            </div>
          </div>

          <div class="grid gap-6">
            <div v-if="project.problem" class="glass-card p-8 rounded-3xl border border-white/10">
              <h3 class="text-2xl font-bold mb-3">🎯 Problem</h3>
              <p class="text-slate-300 leading-8 whitespace-pre-line text-lg">{{ project.problem }}</p>
            </div>

            <div v-if="project.solution" class="glass-card p-8 rounded-3xl border border-white/10">
              <h3 class="text-2xl font-bold mb-3">💡 Solution</h3>
              <p class="text-slate-300 leading-8 whitespace-pre-line text-lg">{{ project.solution }}</p>
            </div>

            <div v-if="project.architecture" class="glass-card p-8 rounded-3xl border border-white/10">
              <h3 class="text-2xl font-bold mb-3">🏗️ Architecture</h3>
              <p class="text-slate-300 leading-8 whitespace-pre-line text-lg">{{ project.architecture }}</p>
            </div>

            <div v-if="project.challenges" class="glass-card p-8 rounded-3xl border border-white/10">
              <h3 class="text-2xl font-bold mb-3">⚠️ Challenges</h3>
              <p class="text-slate-300 leading-8 whitespace-pre-line text-lg">{{ project.challenges }}</p>
            </div>

            <div v-if="project.result" class="glass-card p-8 rounded-3xl border border-white/10">
              <h3 class="text-2xl font-bold mb-3">📈 Results</h3>
              <p class="text-slate-300 leading-8 whitespace-pre-line text-lg">{{ project.result }}</p>
            </div>

            <div v-if="project.lessons" class="glass-card p-8 rounded-3xl border border-white/10">
              <h3 class="text-2xl font-bold mb-3">🎓 Lessons Learned</h3>
              <p class="text-slate-300 leading-8 whitespace-pre-line text-lg">{{ project.lessons }}</p>
            </div>
            <div class="flex justify-between mt-16">

              <button
                v-if="previousProject"
                @click="router.push(`/projects/${previousProject.id}`)"
                class="glass-card px-6 py-4 rounded-2xl hover:bg-white hover:text-slate-900 transition"
              >
                ← {{ previousProject.title }}
              </button>

              <div></div>

              <button
                v-if="nextProject"
                @click="router.push(`/projects/${nextProject.id}`)"
                class="glass-card px-6 py-4 rounded-2xl hover:bg-white hover:text-slate-900 transition"
              >
                {{ nextProject.title }} →
              </button>

            </div>
          </div>
        </div>
      </div>

      <p v-else class="text-center text-slate-400">Loading project...</p>
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
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()

const project = ref(null)
const galleryImages = ref([])
const lightboxImage = ref(null)

const previousProject = ref(null)
const nextProject = ref(null)

const fetchProject = async () => {
  const response = await api.get(`/api/projects/${route.params.id}`)
  project.value = response.data
}

const fetchGalleryImages = async () => {
  const response = await api.get(`/api/projects/${route.params.id}/images`)
  galleryImages.value = response.data
}

const openLightbox = (imageUrl) => {
  lightboxImage.value = imageUrl
}

const closeLightbox = () => {
  lightboxImage.value = null
}

const getStatusClass = (status) => {
  const value = (status || '').toLowerCase()

  if (value.includes('completed')) return 'bg-green-500/10 text-green-300 border border-green-500/20'
  if (value.includes('progress')) return 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20'
  if (value.includes('planned')) return 'bg-purple-500/10 text-purple-300 border border-purple-500/20'

  return 'bg-slate-500/10 text-slate-300 border border-slate-500/20'
}

const fetchNavigation = async () => {
  const response = await api.get('/api/projects')

  const list = response.data

  const index = list.findIndex(
    p => p.id == route.params.id
  )

  if (index > 0) {
    previousProject.value = list[index - 1]
  }

  if (index < list.length - 1) {
    nextProject.value = list[index + 1]
  }
}

onMounted(async () => {
  try {
    await fetchProject()
    await fetchGalleryImages()
    await fetchNavigation()
  } catch (err) {
    console.error(err)
  }
})
</script>