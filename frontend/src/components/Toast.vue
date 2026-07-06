<template>
  <div
    v-if="show"
    :class="[
      'fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg text-white',
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    ]"
  >
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String,
  type: {
    type: String,
    default: 'success'
  }
})
</script>