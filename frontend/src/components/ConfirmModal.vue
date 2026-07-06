<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
  >
    <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-3">
        {{ title }}
      </h2>

      <p class="text-gray-600 mb-6">
        {{ message }}
      </p>

      <div class="flex justify-end gap-3">
        <button
          @click="$emit('cancel')"
          class="bg-gray-300 px-5 py-2 rounded-xl hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          @click="$emit('confirm')"
          class="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  message: String
})

defineEmits(['confirm', 'cancel'])
</script>