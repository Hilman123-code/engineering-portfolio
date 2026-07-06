<template>
  <AdminLayout>
    <Toast :show="toastShow" :message="toastMessage" :type="toastType" />

    <ConfirmModal
      :show="modalShow"
      title="Delete Experience"
      message="Are you sure you want to delete this experience?"
      @cancel="cancelDelete"
      @confirm="confirmDeleteExperience"
    />

    <h1 class="text-4xl font-bold mb-8">Manage Experiences</h1>

    <div class="bg-white rounded-2xl shadow p-6 mb-8">
      <h2 class="text-2xl font-bold mb-5">
        {{ isEditing ? 'Edit Experience' : 'Add New Experience' }}
      </h2>

      <form @submit.prevent="isEditing ? updateExperience() : addExperience()" class="grid gap-4">
        <input v-model="form.title" placeholder="Title" class="border rounded-xl px-4 py-3" />
        <input v-model="form.company" placeholder="Company / Organization" class="border rounded-xl px-4 py-3" />
        <input v-model="form.year" placeholder="Year example: 2026" class="border rounded-xl px-4 py-3" />

        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Description"
          class="border rounded-xl px-4 py-3"
        ></textarea>

        <div class="flex gap-3">
          <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
            {{ isEditing ? 'Update Experience' : 'Add Experience' }}
          </button>

          <button
            v-if="isEditing"
            type="button"
            @click="cancelEdit"
            class="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>

        <p v-if="error" class="text-red-600 font-semibold">
          Please fill in title and description.
        </p>
      </form>
    </div>

    <input
      v-model="search"
      type="text"
      placeholder="Search experiences..."
      class="w-full mb-3 border rounded-xl px-4 py-3"
    />

    <p class="mb-5 text-gray-600">
      Showing {{ filteredExperiences.length }} of {{ experiences.length }} experiences
    </p>

    <div class="bg-white rounded-2xl shadow overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-slate-900 text-white">
          <tr>
            <th class="p-4">Title</th>
            <th class="p-4">Company</th>
            <th class="p-4">Year</th>
            <th class="p-4">Description</th>
            <th class="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in filteredExperiences" :key="item.id" class="border-b">
            <td class="p-4 font-semibold">{{ item.title }}</td>
            <td class="p-4">{{ item.company }}</td>
            <td class="p-4">{{ item.year }}</td>
            <td class="p-4">{{ item.description }}</td>

            <td class="p-4">
              <div class="flex gap-2">
                <button @click="startEdit(item)" class="bg-yellow-500 text-white px-4 py-2 rounded-xl">
                  Edit
                </button>

                <button @click="openDeleteModal(item.id)" class="bg-red-600 text-white px-4 py-2 rounded-xl">
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredExperiences.length === 0">
            <td colspan="5" class="p-4 text-center text-gray-500">
              No experiences found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import api from '../services/api'
import AdminLayout from '../components/AdminLayout.vue'
import Toast from '../components/Toast.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

const experiences = ref([])
const search = ref('')
const error = ref(false)

const isEditing = ref(false)
const editingId = ref(null)

const toastShow = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const modalShow = ref(false)
const selectedExperienceId = ref(null)

const form = reactive({
  title: '',
  company: '',
  year: '',
  description: ''
})

const showToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  toastShow.value = true

  setTimeout(() => {
    toastShow.value = false
  }, 3000)
}

const filteredExperiences = computed(() => {
  const keyword = search.value.toLowerCase()

  return experiences.value.filter((item) => {
    const title = item.title || ''
    const company = item.company || ''
    const year = item.year || ''
    const description = item.description || ''

    return (
      title.toLowerCase().includes(keyword) ||
      company.toLowerCase().includes(keyword) ||
      year.toLowerCase().includes(keyword) ||
      description.toLowerCase().includes(keyword)
    )
  })
})

const fetchExperiences = async () => {
  try {
    const response = await api.get('/api/experiences')
    experiences.value = response.data
  } catch (err) {
    console.error(err)
  }
}

const resetForm = () => {
  form.title = ''
  form.company = ''
  form.year = ''
  form.description = ''
  isEditing.value = false
  editingId.value = null
}

const addExperience = async () => {
  error.value = false

  if (!form.title || !form.description) {
    error.value = true
    return
  }

  try {
    await api.post('/api/admin/experiences', form)
    resetForm()
    showToast('Experience added successfully!', 'success')
    fetchExperiences()
  } catch (err) {
    console.error(err)
    showToast('Failed to add experience!', 'error')
  }
}

const startEdit = (item) => {
  isEditing.value = true
  editingId.value = item.id

  form.title = item.title || ''
  form.company = item.company || ''
  form.year = item.year || ''
  form.description = item.description || ''

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const updateExperience = async () => {
  error.value = false

  if (!form.title || !form.description) {
    error.value = true
    return
  }

  try {
    await api.put(`/api/admin/experiences/${editingId.value}`, form)
    resetForm()
    showToast('Experience updated successfully!', 'success')
    fetchExperiences()
  } catch (err) {
    console.error(err)
    showToast('Failed to update experience!', 'error')
  }
}

const cancelEdit = () => {
  resetForm()
}

const openDeleteModal = (id) => {
  selectedExperienceId.value = id
  modalShow.value = true
}

const cancelDelete = () => {
  selectedExperienceId.value = null
  modalShow.value = false
}

const confirmDeleteExperience = async () => {
  try {
    await api.delete(`/api/admin/experiences/${selectedExperienceId.value}`)

    modalShow.value = false
    selectedExperienceId.value = null

    showToast('Experience deleted successfully!', 'success')
    fetchExperiences()
  } catch (err) {
    console.error(err)
    showToast('Failed to delete experience!', 'error')
  }
}

onMounted(() => {
  fetchExperiences()
})
</script>