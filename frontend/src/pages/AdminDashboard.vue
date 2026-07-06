<template>
  <AdminLayout>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">
        Admin Dashboard
      </h1>

      <button
        @click="logout"
        class="bg-red-600 text-white px-5 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <div
        @click="router.push('/admin/projects')"
        class="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg"
      >
        <h2 class="text-xl font-bold mb-2">Projects</h2>

        <p class="text-5xl font-bold text-blue-600 mb-2">
          {{ stats.total_projects }}
        </p>

        <p class="text-gray-600">
          Manage engineering projects
        </p>
      </div>

      <div
        @click="router.push('/admin/contacts')"
        class="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg"
      >
        <h2 class="text-xl font-bold mb-2">Contacts</h2>

        <p class="text-5xl font-bold text-blue-600 mb-2">
          {{ stats.total_contacts }}
        </p>

        <p class="text-gray-600">
          View submitted messages
        </p>
      </div>

      <div
        @click="router.push('/admin/profile')"
        class="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg"
      >
        <h2 class="text-xl font-bold mb-2">Profile</h2>

        <p class="text-5xl font-bold text-blue-600 mb-2">
          ⚙️
        </p>

        <p class="text-gray-600">
          Update portfolio details
        </p>
      </div>

      <div
        @click="router.push('/admin/experiences')"
        class="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg"
      >
        <h2 class="text-xl font-bold mb-2">Experiences</h2>

        <p class="text-5xl font-bold text-blue-600 mb-2">
          {{ stats.total_experiences }}
        </p>

        <p class="text-gray-600">
          Manage experience timeline
        </p>
      </div>

      <div
        @click="router.push('/admin/certificates')"
        class="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg"
      >
        <h2 class="text-xl font-bold mb-2">Certificates</h2>

        <p class="text-5xl font-bold text-blue-600 mb-2">
          {{ stats.total_certificates }}
        </p>

        <p class="text-gray-600">
          Manage certificates
        </p>
      </div>

      <div
        @click="router.push('/admin/skills')"
        class="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg"
      >
        <h2 class="text-xl font-bold mb-2">Skills</h2>

        <p class="text-5xl font-bold text-blue-600 mb-2">
          {{ stats.total_skills }}
        </p>

        <p class="text-gray-600">
          Manage portfolio skills
        </p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import AdminLayout from '../components/AdminLayout.vue'

const router = useRouter()

const stats = reactive({
  total_projects: 0,
  total_contacts: 0,
  total_experiences: 0,
  total_certificates: 0,
  total_skills: 0
})

const fetchStats = async () => {
  try {
    const response = await api.get('/api/admin/stats')
    Object.assign(stats, response.data)
  } catch (err) {
    console.error(err)
  }
}

const logout = () => {
  localStorage.removeItem('adminToken')
  router.push('/admin')
}

onMounted(() => {
  fetchStats()
})
</script>