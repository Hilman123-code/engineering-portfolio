<template>
  <section id="contact" class="py-24 premium-bg text-white">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-blue-400 font-semibold mb-3">
          Get In Touch
        </p>

        <h2 class="text-4xl md:text-5xl font-black">
          Let's build something
          <span class="gradient-text">valuable</span>
        </h2>

        <p class="text-slate-400 mt-4 max-w-2xl mx-auto">
          Have an opportunity, collaboration, project idea or internship offer?
          Send me a message.
        </p>
      </div>

      <div class="glass-card rounded-[2rem] p-8 md:p-10 max-w-4xl mx-auto">
        <form @submit.prevent="sendMessage" class="grid gap-5">
          <input
            v-model="form.name"
            type="text"
            placeholder="Your Name"
            class="bg-white/10 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            v-model="form.email"
            type="email"
            placeholder="Your Email"
            class="bg-white/10 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            v-model="form.message"
            rows="6"
            placeholder="Your Message"
            class="bg-white/10 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            :disabled="loading"
            class="bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Sending...' : 'Send Message' }}
          </button>

          <div v-if="success" class="bg-green-600/20 text-green-300 p-4 rounded-xl">
            ✅ Message sent successfully!
          </div>

          <div v-if="error" class="bg-red-600/20 text-red-300 p-4 rounded-xl">
            ❌ Please fill in all fields or check backend connection.
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '../services/api'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const success = ref(false)
const error = ref(false)
const loading = ref(false)

const sendMessage = async () => {
  success.value = false
  error.value = false

  if (!form.name || !form.email || !form.message) {
    error.value = true
    return
  }

  loading.value = true

  try {
    await api.post('/api/contact', {
      name: form.name,
      email: form.email,
      message: form.message
    })

    form.name = ''
    form.email = ''
    form.message = ''

    success.value = true
  } catch (err) {
    console.error(err)
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>