<template>
  <section class="min-h-screen bg-slate-100 flex items-center justify-center px-6">
    <div class="bg-white p-8 rounded-2xl shadow w-full max-w-md">
      <h1 class="text-3xl font-bold text-center mb-8">
        Admin Login
      </h1>

      <form @submit.prevent="login" class="grid gap-5">
        <input
          v-model="email"
          type="email"
          placeholder="Admin Email"
          class="border rounded-xl px-4 py-3"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="border rounded-xl px-4 py-3"
        />

        <button
          type="submit"
          class="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          Login
        </button>

        <p v-if="error" class="text-red-600 text-center font-semibold">
          Invalid email or password.
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref(false)

const login = async () => {
  console.log('LOGIN BUTTON CLICKED')

  error.value = false

  try {
    const response = await api.post('/api/admin/login', {
      email: email.value,
      password: password.value
    })

    console.log(response.data)

    localStorage.setItem('adminToken', response.data.token)

    router.push('/admin/dashboard')
  } catch (err) {
    console.log(err)
    error.value = true
  }
}
</script>