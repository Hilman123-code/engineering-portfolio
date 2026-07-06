<template>
  <section class="min-h-screen bg-slate-100">
    <!-- Mobile Topbar -->
    <div class="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">
        Admin Panel
      </h1>

      <button
        @click="isOpen = !isOpen"
        class="text-3xl"
      >
        ☰
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isOpen"
      class="md:hidden bg-slate-900 text-white px-4 pb-4 grid gap-2"
    >
      <RouterLink
        @click="isOpen = false"
        to="/admin/dashboard"
        class="px-4 py-3 rounded-xl hover:bg-white/10"
        active-class="bg-blue-600"
      >
        Dashboard
      </RouterLink>

      <RouterLink
        @click="isOpen = false"
        to="/admin/projects"
        class="px-4 py-3 rounded-xl hover:bg-white/10"
        active-class="bg-blue-600"
      >
        Projects
      </RouterLink>

      <RouterLink
        @click="isOpen = false"
        to="/admin/contacts"
        class="px-4 py-3 rounded-xl hover:bg-white/10"
        active-class="bg-blue-600"
      >
        Contacts
      </RouterLink>

      <RouterLink
        @click="isOpen = false"
        to="/admin/profile"
        class="px-4 py-3 rounded-xl hover:bg-white/10"
        active-class="bg-blue-600"
      >
        Profile
      </RouterLink>

      <RouterLink @click="isOpen = false" to="/" class="px-4 py-3 rounded-xl hover:bg-white/10">
        View Website
      </RouterLink>
    </div>

    <div class="flex">
      <!-- Desktop Sidebar -->
      <aside class="w-64 bg-slate-900 text-white min-h-screen p-6 hidden md:block">
        <h1 class="text-2xl font-bold mb-10">
          Admin Panel
        </h1>

        <nav class="grid gap-3">
          <RouterLink
            to="/admin/dashboard"
            class="px-4 py-3 rounded-xl hover:bg-white/10"
            active-class="bg-blue-600"
          >
            Dashboard
          </RouterLink>

          <RouterLink
            to="/admin/projects"
            class="px-4 py-3 rounded-xl hover:bg-white/10"
            active-class="bg-blue-600"
          >
            Projects
          </RouterLink>

          <RouterLink
            to="/admin/contacts"
            class="px-4 py-3 rounded-xl hover:bg-white/10"
            active-class="bg-blue-600"
          >
            Contacts
          </RouterLink>

          <RouterLink
            to="/admin/profile"
            class="px-4 py-3 rounded-xl hover:bg-white/10"
            active-class="bg-blue-600"
          >
            Profile
          </RouterLink>

          <RouterLink to="/" class="px-4 py-3 rounded-xl hover:bg-white/10">
            View Website
          </RouterLink>

          <RouterLink
            to="/admin/experiences"
            class="px-4 py-3 rounded-xl hover:bg-white/10"
            active-class="bg-blue-600"
          >
            Experiences
          </RouterLink>

          <RouterLink
            to="/admin/certificates"
            class="px-4 py-3 rounded-xl hover:bg-white/10"
            active-class="bg-blue-600"
          >
            Certificates
          </RouterLink>

          <RouterLink
            to="/admin/skills"
            class="px-4 py-3 rounded-xl hover:bg-white/10"
            active-class="bg-blue-600"
          >
            Skills
          </RouterLink>
        </nav>
      </aside>

      <!-- Page Content -->
      <main class="flex-1 p-6 md:p-8 overflow-x-hidden">
        <slot />
      </main>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>