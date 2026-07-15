<template>
  <section class="py-24 premium-bg text-white">
    <div class="max-w-6xl mx-auto px-6">
      <div class="glass-card rounded-[2rem] p-8 md:p-12 text-center">
        <p class="text-blue-400 font-semibold mb-3">
          Recruiter Mode
        </p>

        <h2 class="text-4xl md:text-5xl font-black mb-5">
          Looking for an engineer who can
          <span class="gradient-text">build real systems?</span>
        </h2>

        <p class="text-slate-400 max-w-2xl mx-auto mb-8 leading-8">
          I combine engineering knowledge, software development, database systems
          and problem-solving to build practical digital solutions.
        </p>

        <div class="flex flex-wrap justify-center gap-4">
          <a
            :href="normalizeAssetPath(profile.resume_url, '/resume/resume.pdf')"
            download
            class="magnetic-btn bg-blue-600 px-7 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition"
          >
            Download Resume
          </a>

          <button
            @click="isPreviewOpen = true"
            type="button"
            class="glass-card px-7 py-4 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 transition"
          >
            Preview Resume
          </button>

          <a
            v-if="profile.linkedin"
            :href="normalizeUrl(profile.linkedin)"
            target="_blank"
            class="glass-card px-7 py-4 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 transition"
          >
            LinkedIn
          </a>

          <a
            v-if="profile.email"
            href="#contact"
            class="glass-card px-7 py-4 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 transition"
          >
            Email Me
          </a>
        </div>
      </div>
    </div>

    <ResumeModal
      v-model="isPreviewOpen"
      :resume-url="normalizeAssetPath(profile.resume_url, '/resume/resume.pdf')"
    />
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '../services/api'
import { normalizeUrl, normalizeAssetPath } from '../utils/helpers'
import ResumeModal from './ResumeModal.vue'

const isPreviewOpen = ref(false)

const profile = reactive({
  resume_url: '',
  linkedin: '',
  email: ''
})

onMounted(async () => {
  const response = await api.get('/api/profile')
  Object.assign(profile, response.data)
})
</script>