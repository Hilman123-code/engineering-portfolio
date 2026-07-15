<template>
  <section class="aurora-bg grid-bg min-h-screen text-white flex items-center pt-32 pb-20">
    <div class="content-layer max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
      <div>
        <p class="text-blue-400 font-semibold mb-4">
          {{ profile.job_title || 'Engineering Portfolio' }}
        </p>

        <p class="text-2xl md:text-3xl font-bold mb-5">
          I build
          <span ref="typedText" class="gradient-text"></span>
        </p>

        <h1 class="text-5xl md:text-7xl font-black leading-tight mb-6">
          Building modern
          <span class="gradient-text">engineering systems</span>
        </h1>

        <p class="text-slate-300 text-lg leading-8 mb-8 max-w-xl">
          {{ profile.bio || 'I build practical engineering and software solutions using modern full-stack technology.' }}
        </p>

        <div class="flex flex-wrap gap-4">
          <a
            href="#projects"
            class="magnetic-btn bg-blue-600 px-7 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition"
          >
            View Projects
          </a>

          <a
            :href="profile.resume_url || '/resume/resume.pdf'"
            download
            class="glass-card px-7 py-4 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 transition"
          >
            Download CV
          </a>

          <button
            @click="isPreviewOpen = true"
            type="button"
            class="glass-card px-7 py-4 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 transition"
          >
            Preview CV
          </button>
        </div>

        <div class="flex flex-wrap gap-3 mt-8 text-sm text-slate-300">
          <span class="glass-card px-4 py-2 rounded-full">Vue</span>
          <span class="glass-card px-4 py-2 rounded-full">Node.js</span>
          <span class="glass-card px-4 py-2 rounded-full">Express</span>
          <span class="glass-card px-4 py-2 rounded-full">MySQL</span>
        </div>
      </div>

      <div class="glass-card rounded-[2rem] p-6 shadow-2xl">
        <img
          v-if="profile.profile_image"
          :src="profile.profile_image"
          class="w-full h-[420px] object-cover rounded-[1.5rem]"
        />

        <div
          v-else
          class="h-[420px] rounded-[1.5rem] bg-slate-800 flex items-center justify-center text-7xl"
        >
          ⚙️
        </div>
      </div>
    </div>

    <ResumeModal
      v-model="isPreviewOpen"
      :resume-url="profile.resume_url || '/resume/resume.pdf'"
    />
  </section>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import Typed from 'typed.js'
import api from '../services/api'
import ResumeModal from './ResumeModal.vue'

const typedText = ref(null)
const isPreviewOpen = ref(false)
let typedInstance = null

const profile = reactive({
  job_title: '',
  bio: '',
  profile_image: '',
  resume_url: ''
})

onMounted(async () => {
  try {
    const response = await api.get('/api/profile')
    Object.assign(profile, response.data)
  } catch (err) {
    console.error(err)
  }

  if (typedText.value) {
    typedInstance = new Typed(typedText.value, {
      strings: [
        'Software Development',
        'Engineering Systems',
        'Automation Ideas',
        'Database Solutions'
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1200,
      loop: true
    })
  }
})

onBeforeUnmount(() => {
  if (typedInstance) {
    typedInstance.destroy()
  }
})
</script>