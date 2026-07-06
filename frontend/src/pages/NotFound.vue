<template>
  <section
    class="aurora-bg grid-bg min-h-screen flex items-center justify-center text-white"
  >
    <div class="text-center px-6">
      <h1 class="text-8xl md:text-9xl font-black gradient-text mb-6">
        404
      </h1>

      <h2 class="text-3xl md:text-5xl font-bold mb-4">
        Page Not Found
      </h2>

      <p class="text-slate-400 max-w-xl mx-auto leading-8 mb-10">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <button
        @click="router.push('/')"
        class="bg-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition"
      >
        Back to Homepage
      </button>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>