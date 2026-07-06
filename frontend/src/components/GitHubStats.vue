<template>
  <section class="py-24 bg-slate-950 text-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-blue-400 font-semibold mb-3">GitHub Activity</p>

        <h2 class="text-4xl md:text-5xl font-black">
          Latest
          <span class="gradient-text">repositories</span>
        </h2>

        <p class="text-slate-400 mt-4 max-w-2xl mx-auto">
          Live GitHub data showing recent repositories and development activity.
        </p>
      </div>

      <div class="grid md:grid-cols-4 gap-6 mb-12">
        <div class="glass-card rounded-3xl p-6 text-center">
          <h3 class="text-4xl font-black gradient-text">
            {{ profile.public_repos }}
          </h3>
          <p class="text-slate-400 mt-2">Repositories</p>
        </div>

        <div class="glass-card rounded-3xl p-6 text-center">
          <h3 class="text-4xl font-black gradient-text">
            {{ profile.followers }}
          </h3>
          <p class="text-slate-400 mt-2">Followers</p>
        </div>

        <div class="glass-card rounded-3xl p-6 text-center">
          <h3 class="text-4xl font-black gradient-text">
            {{ profile.following }}
          </h3>
          <p class="text-slate-400 mt-2">Following</p>
        </div>

        <div class="glass-card rounded-3xl p-6 text-center">
          <h3 class="text-4xl font-black gradient-text">
            {{ repos.length }}
          </h3>
          <p class="text-slate-400 mt-2">Latest Projects</p>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <a
          v-for="repo in repos"
          :key="repo.id"
          :href="repo.html_url"
          target="_blank"
          class="glass-card rounded-3xl p-7 hover:-translate-y-2 transition"
        >
          <h3 class="text-2xl font-bold mb-3">
            {{ repo.name }}
          </h3>

          <p class="text-slate-400 leading-7 mb-5">
            {{ repo.description || 'No description provided.' }}
          </p>

          <div class="flex justify-between text-sm text-slate-300">
            <span>⭐ {{ repo.stargazers_count }}</span>
            <span>{{ repo.language || 'Code' }}</span>
          </div>
        </a>
      </div>

      <div class="text-center mt-10">
        <a
          href="https://github.com/Hilman123-code"
          target="_blank"
          class="glass-card inline-block px-7 py-4 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 transition"
        >
          View Full GitHub Profile →
        </a>
      </div>

      <p v-if="error" class="text-center text-red-300 mt-8">
        Failed to load GitHub data.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const repos = ref([])
const error = ref(false)

const profile = ref({
  public_repos: 0,
  followers: 0,
  following: 0
})

onMounted(async () => {
  try {
    const reposResponse = await fetch(
      'https://api.github.com/users/Hilman123-code/repos?sort=updated&per_page=6'
    )

    repos.value = await reposResponse.json()

    const profileResponse = await fetch(
      'https://api.github.com/users/Hilman123-code'
    )

    profile.value = await profileResponse.json()
  } catch (err) {
    console.error(err)
    error.value = true
  }
})
</script>