<template>
  <div
    v-if="modelValue"
    @click.self="close"
    class="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 md:p-10"
  >
    <div class="bg-white rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
      <div class="flex items-center justify-between px-5 py-3 border-b bg-slate-900 text-white shrink-0">
        <p class="font-semibold">Resume Preview</p>

        <div class="flex items-center gap-3">
          <a
            :href="resumeUrl"
            download
            class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            Download
          </a>

          <button
            @click="close"
            aria-label="Close preview"
            class="text-white/80 hover:text-white text-2xl leading-none px-2"
          >
            &times;
          </button>
        </div>
      </div>

      <iframe
        :src="resumeUrl"
        class="flex-1 w-full bg-slate-100"
        title="Resume Preview"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  resumeUrl: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
</script>
