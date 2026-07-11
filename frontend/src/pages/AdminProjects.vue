<template>
  <AdminLayout>
    <Toast :show="toastShow" :message="toastMessage" :type="toastType" />

    <ConfirmModal
      :show="modalShow"
      title="Delete Project"
      message="Are you sure you want to delete this project?"
      @cancel="cancelDelete"
      @confirm="confirmDeleteProject"
    />

    <h1 class="text-4xl font-bold mb-8">Manage Projects</h1>

    <div class="bg-white rounded-2xl shadow p-6 mb-8">
      <h2 class="text-2xl font-bold mb-5">
        {{ isEditing ? 'Edit Project' : 'Add New Project' }}
      </h2>

      <form
        @submit.prevent="isEditing ? updateProject() : addProject()"
        class="grid gap-6"
      >
        <!-- Basic Information -->
        <div>
          <h3 class="text-xl font-bold mb-4">Basic Information</h3>

          <div class="grid gap-4">
            <input
              v-model="form.title"
              type="text"
              placeholder="Project Title"
              class="border rounded-xl px-4 py-3"
            />

            <textarea
              v-model="form.description"
              rows="4"
              placeholder="Short Project Description"
              class="border rounded-xl px-4 py-3"
            ></textarea>

            <input
              v-model="form.tech"
              type="text"
              placeholder="Tech Example: Vue, Node.js, MySQL"
              class="border rounded-xl px-4 py-3"
            />

            <input
              v-model="form.status"
              type="text"
              placeholder="Status example: Completed / In Progress"
              class="border rounded-xl px-4 py-3"
            />

            <input
              v-model="form.duration"
              type="text"
              placeholder="Duration example: 3 Months"
              class="border rounded-xl px-4 py-3"
            />

            <input
              v-model="form.role"
              type="text"
              placeholder="Role example: Full Stack Developer"
              class="border rounded-xl px-4 py-3"
            />
          </div>
        </div>

        <!-- Media & Links -->
        <div>
          <h3 class="text-xl font-bold mb-4">Media & Links</h3>

          <div class="grid gap-4">
            <input
              v-model="form.image"
              type="text"
              placeholder="Image URL example: /images/project1.jpg"
              class="border rounded-xl px-4 py-3"
            />

            <input
              type="file"
              accept="image/*"
              @change="uploadImage"
              class="border rounded-xl px-4 py-3"
            />

            <div v-if="form.image" class="flex justify-center">
              <img
                :src="form.image"
                class="w-52 h-36 object-cover rounded-xl border shadow"
              />
            </div>

            <input
              v-model="form.github"
              type="text"
              placeholder="GitHub URL"
              class="border rounded-xl px-4 py-3"
            />

            <input
              v-model="form.demo"
              type="text"
              placeholder="Live Demo URL"
              class="border rounded-xl px-4 py-3"
            />
          </div>
        </div>

        <!-- Project Case Study -->
        <div>
          <h3 class="text-xl font-bold mb-4">Project Case Study</h3>

          <div class="grid gap-4">
            <textarea
              v-model="form.overview"
              rows="4"
              placeholder="Project Overview"
              class="border rounded-xl px-4 py-3"
            ></textarea>

            <textarea
              v-model="form.problem"
              rows="4"
              placeholder="Problem"
              class="border rounded-xl px-4 py-3"
            ></textarea>

            <textarea
              v-model="form.solution"
              rows="4"
              placeholder="Solution"
              class="border rounded-xl px-4 py-3"
            ></textarea>

            <textarea
              v-model="form.architecture"
              rows="4"
              placeholder="Architecture example: Camera → Python → API → MySQL → Dashboard"
              class="border rounded-xl px-4 py-3"
            ></textarea>

            <textarea
              v-model="form.challenges"
              rows="4"
              placeholder="Challenges"
              class="border rounded-xl px-4 py-3"
            ></textarea>

            <textarea
              v-model="form.result"
              rows="4"
              placeholder="Results / Outcome"
              class="border rounded-xl px-4 py-3"
            ></textarea>

            <textarea
              v-model="form.lessons"
              rows="4"
              placeholder="Lessons Learned"
              class="border rounded-xl px-4 py-3"
            ></textarea>
          </div>
        </div>

        <!-- Project Gallery -->
        <div v-if="isEditing">
          <h3 class="text-xl font-bold mb-4">Project Gallery</h3>

          <div class="grid gap-4">
            <input
              type="file"
              accept="image/*"
              @change="handleGalleryFile"
              class="border rounded-xl px-4 py-3"
            />

            <input
              v-model="galleryCaption"
              type="text"
              placeholder="Image caption"
              class="border rounded-xl px-4 py-3"
            />

            <button
              type="button"
              @click="uploadGalleryImage"
              class="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800"
            >
              Add Gallery Image
            </button>

            <div
              v-if="galleryImages.length > 0"
              class="grid md:grid-cols-3 gap-4 mt-4"
            >
              <div
                v-for="image in galleryImages"
                :key="image.id"
                class="border rounded-2xl p-3"
              >
                <img
                  :src="image.image_url"
                  class="w-full h-36 object-cover rounded-xl mb-3"
                />

                <p class="text-sm text-gray-600 mb-3">
                  {{ image.caption || 'No caption' }}
                </p>

                <button
                  type="button"
                  @click="deleteGalleryImage(image.id)"
                  class="bg-red-600 text-white px-4 py-2 rounded-xl w-full"
                >
                  Delete
                </button>
              </div>
            </div>

            <p v-else class="text-gray-500">
              No gallery images yet.
            </p>
          </div>
        </div>

        <!-- Submit -->
        <div class="flex gap-3">
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            {{ isEditing ? 'Update Project' : 'Add Project' }}
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
          Please fill in title, description and tech.
        </p>
      </form>
    </div>

    <input
      v-model="search"
      type="text"
      placeholder="Search projects..."
      class="w-full mb-3 border rounded-xl px-4 py-3"
    />

    <p class="mb-5 text-gray-600">
      Showing {{ filteredProjects.length }} of {{ projects.length }} projects
    </p>

    <p v-if="loading" class="text-center text-gray-500 mb-5">
      Loading projects...
    </p>

    <!-- Desktop table (md and up) -->
    <div class="hidden md:block bg-white rounded-2xl shadow overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-slate-900 text-white">
          <tr>
            <th class="p-4">Image</th>
            <th class="p-4">Title</th>
            <th class="p-4">Status</th>
            <th class="p-4">Role</th>
            <th class="p-4">Tech</th>
            <th class="p-4">Links</th>
            <th class="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="project in filteredProjects"
            :key="project.id"
            class="border-b"
          >
            <td class="p-4">
              <img
                v-if="project.image"
                :src="project.image"
                class="w-20 h-14 object-cover rounded-lg"
              />
              <span v-else class="text-gray-400">No image</span>
            </td>

            <td class="p-4 font-semibold">
              {{ project.title }}
            </td>

            <td class="p-4">
              <span
                :class="getStatusClass(project.status)"
                class="px-3 py-1 rounded-full text-sm"
              >
                {{ project.status || '-' }}
              </span>
            </td>

            <td class="p-4">
              {{ project.role || '-' }}
            </td>

            <td class="p-4">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full mr-2 mb-2"
              >
                {{ tech }}
              </span>
            </td>

            <td class="p-4">
              <div class="grid gap-2">
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  class="text-blue-600 font-semibold"
                >
                  GitHub
                </a>

                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  class="text-green-600 font-semibold"
                >
                  Demo
                </a>

                <span
                  v-if="!project.github && !project.demo"
                  class="text-gray-400"
                >
                  No links
                </span>
              </div>
            </td>

            <td class="p-4">
              <div class="flex gap-2">
                <button
                  @click="startEdit(project)"
                  class="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  @click="openDeleteModal(project.id)"
                  class="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredProjects.length === 0">
            <td colspan="7" class="p-4 text-center text-gray-500">
              No projects found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile card list (below md) -->
    <div class="md:hidden grid gap-4">
      <p
        v-if="filteredProjects.length === 0"
        class="bg-white rounded-2xl shadow p-6 text-center text-gray-500"
      >
        No projects found.
      </p>

      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="bg-white rounded-2xl shadow p-4"
      >
        <div class="flex gap-3 mb-3">
          <img
            v-if="project.image"
            :src="project.image"
            class="w-20 h-14 object-cover rounded-lg shrink-0"
          />
          <div
            v-else
            class="w-20 h-14 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400"
          >
            No image
          </div>

          <div class="min-w-0">
            <h3 class="font-semibold break-words">
              {{ project.title }}
            </h3>

            <p class="text-sm text-gray-500 break-words">
              {{ project.role || '-' }}
            </p>
          </div>
        </div>

        <span
          :class="getStatusClass(project.status)"
          class="inline-block px-3 py-1 rounded-full text-sm mb-3"
        >
          {{ project.status || '-' }}
        </span>

        <div class="flex flex-wrap gap-2 mb-3">
          <span
            v-for="tech in project.tech"
            :key="tech"
            class="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
          >
            {{ tech }}
          </span>
        </div>

        <div class="flex flex-wrap gap-3 mb-4 text-sm">
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            class="text-blue-600 font-semibold"
          >
            GitHub
          </a>

          <a
            v-if="project.demo"
            :href="project.demo"
            target="_blank"
            class="text-green-600 font-semibold"
          >
            Demo
          </a>

          <span
            v-if="!project.github && !project.demo"
            class="text-gray-400"
          >
            No links
          </span>
        </div>

        <div class="flex gap-2">
          <button
            @click="startEdit(project)"
            class="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
          >
            Edit
          </button>

          <button
            @click="openDeleteModal(project.id)"
            class="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import api from '../services/api'
import AdminLayout from '../components/AdminLayout.vue'
import Toast from '../components/Toast.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

const projects = ref([])
const search = ref('')
const loading = ref(false)
const error = ref(false)

const isEditing = ref(false)
const editingId = ref(null)

const toastShow = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const modalShow = ref(false)
const selectedProjectId = ref(null)

const galleryImages = ref([])
const galleryCaption = ref('')
const galleryFile = ref(null)

const form = reactive({
  title: '',
  description: '',
  tech: '',
  image: '',
  github: '',
  demo: '',
  status: '',
  duration: '',
  role: '',
  overview: '',
  problem: '',
  solution: '',
  architecture: '',
  challenges: '',
  result: '',
  lessons: ''
})

const showToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  toastShow.value = true

  setTimeout(() => {
    toastShow.value = false
  }, 3000)
}

const filteredProjects = computed(() => {
  const keyword = search.value.toLowerCase()

  return projects.value.filter((project) => {
    const title = project.title || ''
    const description = project.description || ''
    const status = project.status || ''
    const role = project.role || ''
    const duration = project.duration || ''
    const overview = project.overview || ''
    const problem = project.problem || ''
    const solution = project.solution || ''
    const tech = Array.isArray(project.tech)
      ? project.tech.join(', ')
      : project.tech || ''

    return (
      title.toLowerCase().includes(keyword) ||
      description.toLowerCase().includes(keyword) ||
      status.toLowerCase().includes(keyword) ||
      role.toLowerCase().includes(keyword) ||
      duration.toLowerCase().includes(keyword) ||
      overview.toLowerCase().includes(keyword) ||
      problem.toLowerCase().includes(keyword) ||
      solution.toLowerCase().includes(keyword) ||
      tech.toLowerCase().includes(keyword)
    )
  })
})

const fetchProjects = async () => {
  loading.value = true

  try {
    const response = await api.get('/api/projects')
    projects.value = response.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const fetchGalleryImages = async (projectId) => {
  if (!projectId) return

  try {
    const response = await api.get(`/api/projects/${projectId}/images`)
    galleryImages.value = response.data
  } catch (err) {
    console.error(err)
  }
}

const resetForm = () => {
  form.title = ''
  form.description = ''
  form.tech = ''
  form.image = ''
  form.github = ''
  form.demo = ''
  form.status = ''
  form.duration = ''
  form.role = ''
  form.overview = ''
  form.problem = ''
  form.solution = ''
  form.architecture = ''
  form.challenges = ''
  form.result = ''
  form.lessons = ''

  galleryImages.value = []
  galleryCaption.value = ''
  galleryFile.value = null

  isEditing.value = false
  editingId.value = null
}

const addProject = async () => {
  error.value = false

  if (!form.title || !form.description || !form.tech) {
    error.value = true
    return
  }

  try {
    await api.post('/api/admin/projects', form)
    resetForm()
    showToast('Project added successfully!', 'success')
    fetchProjects()
  } catch (err) {
    console.error(err)
    showToast('Failed to add project!', 'error')
  }
}

const startEdit = (project) => {
  isEditing.value = true
  editingId.value = project.id

  form.title = project.title || ''
  form.description = project.description || ''
  form.tech = Array.isArray(project.tech)
    ? project.tech.join(', ')
    : project.tech || ''
  form.image = project.image || ''
  form.github = project.github || ''
  form.demo = project.demo || ''
  form.status = project.status || ''
  form.duration = project.duration || ''
  form.role = project.role || ''
  form.overview = project.overview || ''
  form.problem = project.problem || ''
  form.solution = project.solution || ''
  form.architecture = project.architecture || ''
  form.challenges = project.challenges || ''
  form.result = project.result || ''
  form.lessons = project.lessons || ''

  fetchGalleryImages(project.id)

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const updateProject = async () => {
  error.value = false

  if (!form.title || !form.description || !form.tech) {
    error.value = true
    return
  }

  try {
    await api.put(`/api/admin/projects/${editingId.value}`, form)
    resetForm()
    showToast('Project updated successfully!', 'success')
    fetchProjects()
  } catch (err) {
    console.error(err)
    showToast('Failed to update project!', 'error')
  }
}

const cancelEdit = () => {
  resetForm()
}

const openDeleteModal = (id) => {
  selectedProjectId.value = id
  modalShow.value = true
}

const cancelDelete = () => {
  selectedProjectId.value = null
  modalShow.value = false
}

const confirmDeleteProject = async () => {
  try {
    await api.delete(`/api/admin/projects/${selectedProjectId.value}`)

    modalShow.value = false
    selectedProjectId.value = null

    showToast('Project deleted successfully!', 'success')
    fetchProjects()
  } catch (err) {
    console.error(err)
    showToast('Failed to delete project!', 'error')
  }
}

const getStatusClass = (status) => {
  const value = (status || '').toLowerCase()

  if (value.includes('completed')) {
    return 'bg-green-100 text-green-700'
  }

  if (value.includes('progress')) {
    return 'bg-yellow-100 text-yellow-700'
  }

  if (value.includes('planned')) {
    return 'bg-purple-100 text-purple-700'
  }

  return 'bg-gray-100 text-gray-700'
}

const uploadImage = async (event) => {
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
    showToast('Image uploaded successfully!', 'success')
  } catch (err) {
    console.error(err)
    showToast('Failed to upload image!', 'error')
  }
}

const handleGalleryFile = (event) => {
  galleryFile.value = event.target.files[0]
}

const uploadGalleryImage = async () => {
  if (!editingId.value) {
    showToast('Please edit a project first before adding gallery images.', 'error')
    return
  }

  if (!galleryFile.value) {
    showToast('Please select an image first.', 'error')
    return
  }

  const formData = new FormData()
  formData.append('image', galleryFile.value)

  try {
    const uploadResponse = await api.post('/api/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    await api.post(`/api/admin/projects/${editingId.value}/images`, {
      image_url: uploadResponse.data.imageUrl,
      caption: galleryCaption.value
    })

    galleryFile.value = null
    galleryCaption.value = ''

    showToast('Gallery image added successfully!', 'success')
    fetchGalleryImages(editingId.value)
  } catch (err) {
    console.error(err)
    showToast('Failed to add gallery image!', 'error')
  }
}

const deleteGalleryImage = async (imageId) => {
  try {
    await api.delete(`/api/admin/project-images/${imageId}`)
    showToast('Gallery image deleted successfully!', 'success')
    fetchGalleryImages(editingId.value)
  } catch (err) {
    console.error(err)
    showToast('Failed to delete gallery image!', 'error')
  }
}

onMounted(() => {
  fetchProjects()
})
</script>