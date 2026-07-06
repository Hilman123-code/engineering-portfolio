<template>
  <AdminLayout>
    <Toast :show="toastShow" :message="toastMessage" :type="toastType" />

    <ConfirmModal
      :show="modalShow"
      title="Delete Message"
      message="Are you sure you want to delete this contact message?"
      @cancel="cancelDelete"
      @confirm="confirmDeleteContact"
    />

    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">Contact Messages</h1>
    </div>

    <input v-model="search" type="text" placeholder="Search contacts..." class="w-full mb-3 border rounded-xl px-4 py-3" />

    <p class="mb-5 text-gray-600">
      Showing {{ filteredContacts.length }} of {{ contacts.length }} messages
    </p>

    <p v-if="loading" class="text-center text-gray-500 mb-5">
      Loading contacts...
    </p>

    <div class="bg-white rounded-2xl shadow overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-slate-900 text-white">
          <tr>
            <th class="p-4">Name</th>
            <th class="p-4">Email</th>
            <th class="p-4">Message</th>
            <th class="p-4">Date</th>
            <th class="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="contact in filteredContacts" :key="contact.id" class="border-b">
            <td class="p-4">{{ contact.name }}</td>
            <td class="p-4">{{ contact.email }}</td>
            <td class="p-4">{{ contact.message }}</td>
            <td class="p-4">{{ formatDate(contact.created_at) }}</td>

            <td class="p-4">
              <button @click="openDeleteModal(contact.id)" class="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700">
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="filteredContacts.length === 0">
            <td colspan="5" class="p-4 text-center text-gray-500">
              No contact messages found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import AdminLayout from '../components/AdminLayout.vue'
import Toast from '../components/Toast.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

const contacts = ref([])
const search = ref('')
const loading = ref(false)

const toastShow = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const modalShow = ref(false)
const selectedContactId = ref(null)

const showToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  toastShow.value = true

  setTimeout(() => {
    toastShow.value = false
  }, 3000)
}

const filteredContacts = computed(() => {
  const keyword = search.value.toLowerCase()

  return contacts.value.filter((contact) => {
    const name = contact.name || ''
    const email = contact.email || ''
    const message = contact.message || ''

    return (
      name.toLowerCase().includes(keyword) ||
      email.toLowerCase().includes(keyword) ||
      message.toLowerCase().includes(keyword)
    )
  })
})

const fetchContacts = async () => {
  loading.value = true

  try {
    const response = await api.get('/api/admin/contacts')
    contacts.value = response.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const openDeleteModal = (id) => {
  selectedContactId.value = id
  modalShow.value = true
}

const cancelDelete = () => {
  selectedContactId.value = null
  modalShow.value = false
}

const confirmDeleteContact = async () => {
  try {
    await api.delete(`/api/admin/contacts/${selectedContactId.value}`)

    modalShow.value = false
    selectedContactId.value = null

    showToast('Message deleted successfully!', 'success')
    fetchContacts()
  } catch (err) {
    console.error(err)
    showToast('Failed to delete message!', 'error')
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleString()
}

onMounted(() => {
  fetchContacts()
})
</script>