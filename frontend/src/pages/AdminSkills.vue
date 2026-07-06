<template>
  <AdminLayout>
    <Toast :show="toastShow" :message="toastMessage" :type="toastType" />

    <ConfirmModal
      :show="modalShow"
      title="Delete Skill"
      message="Are you sure you want to delete this skill?"
      @cancel="cancelDelete"
      @confirm="confirmDeleteSkill"
    />

    <h1 class="text-4xl font-bold mb-8">Manage Skills</h1>

    <div class="bg-white rounded-2xl shadow p-6 mb-8">
      <h2 class="text-2xl font-bold mb-5">
        {{ isEditing ? 'Edit Skill' : 'Add New Skill' }}
      </h2>

      <form @submit.prevent="isEditing ? updateSkill() : addSkill()" class="grid gap-4">
        <input
          v-model="form.icon"
          placeholder="Icon example: 💻"
          class="border rounded-xl px-4 py-3"
        />

        <input
          v-model="form.title"
          placeholder="Skill Title"
          class="border rounded-xl px-4 py-3"
        />

        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Description"
          class="border rounded-xl px-4 py-3"
        ></textarea>

        <div class="flex gap-3">
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            {{ isEditing ? 'Update Skill' : 'Add Skill' }}
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
      placeholder="Search skills..."
      class="w-full mb-3 border rounded-xl px-4 py-3"
    />

    <p class="mb-5 text-gray-600">
      Showing {{ filteredSkills.length }} of {{ skills.length }} skills
    </p>

    <div class="bg-white rounded-2xl shadow overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-slate-900 text-white">
          <tr>
            <th class="p-4">Icon</th>
            <th class="p-4">Title</th>
            <th class="p-4">Description</th>
            <th class="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="skill in filteredSkills"
            :key="skill.id"
            class="border-b"
          >
            <td class="p-4 text-3xl">{{ skill.icon }}</td>
            <td class="p-4 font-semibold">{{ skill.title }}</td>
            <td class="p-4">{{ skill.description }}</td>

            <td class="p-4">
              <div class="flex gap-2">
                <button
                  @click="startEdit(skill)"
                  class="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  @click="openDeleteModal(skill.id)"
                  class="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredSkills.length === 0">
            <td colspan="4" class="p-4 text-center text-gray-500">
              No skills found.
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

const skills = ref([])
const search = ref('')
const error = ref(false)

const isEditing = ref(false)
const editingId = ref(null)

const toastShow = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const modalShow = ref(false)
const selectedSkillId = ref(null)

const form = reactive({
  icon: '',
  title: '',
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

const filteredSkills = computed(() => {
  const keyword = search.value.toLowerCase()

  return skills.value.filter((skill) => {
    const icon = skill.icon || ''
    const title = skill.title || ''
    const description = skill.description || ''

    return (
      icon.toLowerCase().includes(keyword) ||
      title.toLowerCase().includes(keyword) ||
      description.toLowerCase().includes(keyword)
    )
  })
})

const fetchSkills = async () => {
  try {
    const response = await api.get('/api/skills')
    skills.value = response.data
  } catch (err) {
    console.error(err)
  }
}

const resetForm = () => {
  form.icon = ''
  form.title = ''
  form.description = ''

  isEditing.value = false
  editingId.value = null
}

const addSkill = async () => {
  error.value = false

  if (!form.title || !form.description) {
    error.value = true
    return
  }

  try {
    await api.post('/api/admin/skills', form)
    resetForm()
    showToast('Skill added successfully!', 'success')
    fetchSkills()
  } catch (err) {
    console.error(err)
    showToast('Failed to add skill!', 'error')
  }
}

const startEdit = (skill) => {
  isEditing.value = true
  editingId.value = skill.id

  form.icon = skill.icon || ''
  form.title = skill.title || ''
  form.description = skill.description || ''

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const updateSkill = async () => {
  error.value = false

  if (!form.title || !form.description) {
    error.value = true
    return
  }

  try {
    await api.put(`/api/admin/skills/${editingId.value}`, form)
    resetForm()
    showToast('Skill updated successfully!', 'success')
    fetchSkills()
  } catch (err) {
    console.error(err)
    showToast('Failed to update skill!', 'error')
  }
}

const cancelEdit = () => {
  resetForm()
}

const openDeleteModal = (id) => {
  selectedSkillId.value = id
  modalShow.value = true
}

const cancelDelete = () => {
  selectedSkillId.value = null
  modalShow.value = false
}

const confirmDeleteSkill = async () => {
  try {
    await api.delete(`/api/admin/skills/${selectedSkillId.value}`)

    modalShow.value = false
    selectedSkillId.value = null

    showToast('Skill deleted successfully!', 'success')
    fetchSkills()
  } catch (err) {
    console.error(err)
    showToast('Failed to delete skill!', 'error')
  }
}

onMounted(() => {
  fetchSkills()
})
</script>