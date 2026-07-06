<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 z-[99999] bg-slate-950 text-white flex items-center justify-center"
  >
    <div class="text-center px-6">
      <h1 class="text-5xl md:text-7xl font-black gradient-text mb-4">
        {{ initials }}
      </h1>

      <p class="text-slate-300 text-lg mb-8">
        Engineering Portfolio
      </p>

      <div class="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
        <div class="h-full loading-bar"></div>
      </div>

      <p class="text-slate-500 text-sm mt-5">
        Loading experience...
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isLoading: Boolean,
  initials: {
    type: String,
    default: 'H'
  }
})
</script>