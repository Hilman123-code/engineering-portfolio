<template>
  <AdminLayout>
    <Toast :show="toastShow" :message="toastMessage" :type="toastType" />

    <div class="mb-8">
      <h1 class="text-4xl font-bold">Edit Profile</h1>
    </div>

    <div class="bg-white rounded-2xl shadow p-8 min-w-0">
      <form @submit.prevent="updateProfile" class="grid gap-5 min-w-0">
        <input v-model="profile.full_name" placeholder="Full Name" class="border rounded-xl px-4 py-3 w-full" />

        <input v-model="profile.job_title" placeholder="Job Title" class="border rounded-xl px-4 py-3 w-full" />

        <textarea v-model="profile.bio" rows="5" placeholder="Bio" class="border rounded-xl px-4 py-3 w-full"></textarea>

        <input v-model="profile.profile_image" placeholder="Profile Image URL" class="border rounded-xl px-4 py-3 w-full" />

        <input
          type="file"
          accept="image/*"
          @change="uploadProfileImage"
          class="border rounded-xl px-4 py-3 w-full"
        />

        <div v-if="profile.profile_image" class="flex justify-center">
          <img
            :src="profile.profile_image"
            class="w-40 h-40 object-cover rounded-2xl border shadow"
          />
        </div>

        <input v-model="profile.linkedin" placeholder="LinkedIn URL" class="border rounded-xl px-4 py-3 w-full" />

        <input v-model="profile.github" placeholder="GitHub URL" class="border rounded-xl px-4 py-3 w-full" />

        <input v-model="profile.email" placeholder="Email" class="border rounded-xl px-4 py-3 w-full" />

        <input v-model="profile.phone" placeholder="Phone" class="border rounded-xl px-4 py-3 w-full" />

        <input v-model="profile.location" placeholder="Location" class="border rounded-xl px-4 py-3 w-full" />

        <input v-model="profile.resume_url" placeholder="Resume URL example: /resume/resume.pdf" class="border rounded-xl px-4 py-3 w-full" />

        <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 w-full">
          Save Profile
        </button>
      </form>
    </div>
  </AdminLayout>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '../services/api'
import AdminLayout from '../components/AdminLayout.vue'
import Toast from '../components/Toast.vue'

const toastShow = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const profile = reactive({
  full_name: '',
  job_title: '',
  bio: '',
  profile_image: '',
  linkedin: '',
  github: '',
  email: '',
  phone: '',
  location: '',
  resume_url: ''
})

const showToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  toastShow.value = true

  setTimeout(() => {
    toastShow.value = false
  }, 3000)
}

const fetchProfile = async () => {
  try {
    const response = await api.get('/api/profile')
    Object.assign(profile, response.data)
  } catch (err) {
    console.error(err)
  }
}

const updateProfile = async () => {
  try {
    await api.put('/api/admin/profile', profile)
    showToast('Profile updated successfully!', 'success')
  } catch (err) {
    console.error(err)
    showToast('Failed to update profile!', 'error')
  }
}

const uploadProfileImage = async (event) => {
  const file = event.target.files[0]

  if (!file) return

  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await api.post('/api/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    profile.profile_image = response.data.imageUrl

    showToast('Profile image uploaded successfully!', 'success')
  } catch (err) {
    console.error(err)
    showToast('Failed to upload profile image!', 'error')
  }
}

onMounted(() => {
  fetchProfile()
})
</script>