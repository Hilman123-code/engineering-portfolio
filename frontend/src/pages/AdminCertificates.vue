<template>
  <AdminLayout>
    <Toast :show="toastShow" :message="toastMessage" :type="toastType" />

    <ConfirmModal
      :show="modalShow"
      title="Delete Certificate"
      message="Are you sure you want to delete this certificate?"
      @cancel="cancelDelete"
      @confirm="confirmDeleteCertificate"
    />

    <h1 class="text-4xl font-bold mb-8">Manage Certificates</h1>

    <div class="bg-white rounded-2xl shadow p-6 mb-8">
      <h2 class="text-2xl font-bold mb-5">
        {{ isEditing ? 'Edit Certificate' : 'Add New Certificate' }}
      </h2>

      <form @submit.prevent="isEditing ? updateCertificate() : addCertificate()" class="grid gap-4">
        <input v-model="form.title" placeholder="Certificate Title" class="border rounded-xl px-4 py-3" />
        <input v-model="form.issuer" placeholder="Issuer" class="border rounded-xl px-4 py-3" />
        <input v-model="form.year" placeholder="Year" class="border rounded-xl px-4 py-3" />
        <input v-model="form.image" placeholder="Image URL example: /images/certificate1.jpg" class="border rounded-xl px-4 py-3" />
        
        <input
          type="file"
          accept="image/*"
          @change="uploadCertificateImage"
          class="border rounded-xl px-4 py-3"
        />

        <div v-if="form.image" class="flex justify-center">
          <img
            :src="form.image"
            class="w-52 h-36 object-cover rounded-xl border shadow"
          />
        </div>

        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Description"
          class="border rounded-xl px-4 py-3"
        ></textarea>

        <div class="flex gap-3">
          <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
            {{ isEditing ? 'Update Certificate' : 'Add Certificate' }}
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
      placeholder="Search certificates..."
      class="w-full mb-3 border rounded-xl px-4 py-3"
    />

    <p class="mb-5 text-gray-600">
      Showing {{ filteredCertificates.length }} of {{ certificates.length }} certificates
    </p>

    <div class="bg-white rounded-2xl shadow overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-slate-900 text-white">
          <tr>
            <th class="p-4">Image</th>
            <th class="p-4">Title</th>
            <th class="p-4">Issuer</th>
            <th class="p-4">Year</th>
            <th class="p-4">Description</th>
            <th class="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in filteredCertificates" :key="item.id" class="border-b">
            <td class="p-4">
              <img
                v-if="item.image"
                :src="item.image"
                class="w-20 h-14 object-cover rounded-lg"
              />

              <span v-else class="text-gray-400">
                No image
              </span>
            </td>

            <td class="p-4 font-semibold">{{ item.title }}</td>
            <td class="p-4">{{ item.issuer }}</td>
            <td class="p-4">{{ item.year }}</td>
            <td class="p-4">{{ item.description }}</td>

            <td class="p-4">
              <div class="flex gap-2">
                <button
                  @click="startEdit(item)"
                  class="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  @click="openDeleteModal(item.id)"
                  class="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredCertificates.length === 0">
            <td colspan="6" class="p-4 text-center text-gray-500">
              No certificates found.
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

const certificates = ref([])
const search = ref('')
const error = ref(false)

const isEditing = ref(false)
const editingId = ref(null)

const toastShow = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const modalShow = ref(false)
const selectedCertificateId = ref(null)

const form = reactive({
  title: '',
  issuer: '',
  year: '',
  description: '',
  image: ''
})

const showToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  toastShow.value = true

  setTimeout(() => {
    toastShow.value = false
  }, 3000)
}

const filteredCertificates = computed(() => {
  const keyword = search.value.toLowerCase()

  return certificates.value.filter((item) => {
    const title = item.title || ''
    const issuer = item.issuer || ''
    const year = item.year || ''
    const description = item.description || ''

    return (
      title.toLowerCase().includes(keyword) ||
      issuer.toLowerCase().includes(keyword) ||
      year.toLowerCase().includes(keyword) ||
      description.toLowerCase().includes(keyword)
    )
  })
})

const fetchCertificates = async () => {
  try {
    const response = await api.get('/api/certificates')
    certificates.value = response.data
  } catch (err) {
    console.error(err)
  }
}

const resetForm = () => {
  form.title = ''
  form.issuer = ''
  form.year = ''
  form.description = ''
  form.image = ''

  isEditing.value = false
  editingId.value = null
}

const addCertificate = async () => {
  error.value = false

  if (!form.title || !form.description) {
    error.value = true
    return
  }

  try {
    await api.post('/api/admin/certificates', form)
    resetForm()
    showToast('Certificate added successfully!', 'success')
    fetchCertificates()
  } catch (err) {
    console.error(err)
    showToast('Failed to add certificate!', 'error')
  }
}

const startEdit = (item) => {
  isEditing.value = true
  editingId.value = item.id

  form.title = item.title || ''
  form.issuer = item.issuer || ''
  form.year = item.year || ''
  form.description = item.description || ''
  form.image = item.image || ''

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const updateCertificate = async () => {
  error.value = false

  if (!form.title || !form.description) {
    error.value = true
    return
  }

  try {
    await api.put(`/api/admin/certificates/${editingId.value}`, form)
    resetForm()
    showToast('Certificate updated successfully!', 'success')
    fetchCertificates()
  } catch (err) {
    console.error(err)
    showToast('Failed to update certificate!', 'error')
  }
}

const cancelEdit = () => {
  resetForm()
}

const openDeleteModal = (id) => {
  selectedCertificateId.value = id
  modalShow.value = true
}

const cancelDelete = () => {
  selectedCertificateId.value = null
  modalShow.value = false
}

const confirmDeleteCertificate = async () => {
  try {
    await api.delete(`/api/admin/certificates/${selectedCertificateId.value}`)

    modalShow.value = false
    selectedCertificateId.value = null

    showToast('Certificate deleted successfully!', 'success')
    fetchCertificates()
  } catch (err) {
    console.error(err)
    showToast('Failed to delete certificate!', 'error')
  }
}

const uploadCertificateImage = async (event) => {
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

    form.image = response.data.imageUrl

    showToast('Certificate image uploaded successfully!', 'success')
  } catch (err) {
    console.error(err)
    showToast('Failed to upload certificate image!', 'error')
  }
}

onMounted(() => {
  fetchCertificates()
})
</script>