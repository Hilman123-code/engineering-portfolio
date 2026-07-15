<template>
  <LoadingScreen :isLoading="isLoading" initials="H" />
  <CursorGlow />
  <ScrollProgress />
  <Navbar />

  <div class="reveal">
    <Hero />
  </div>

  <div class="reveal">
    <About />
    <SectionDivider />
  </div>

  <div class="reveal">
    <Stats />
    <SectionDivider />
  </div>

  <div class="reveal">
    <Skills />
    <SectionDivider />
  </div>

  <div class="reveal">
    <Projects />
    <GitHubStats />
    <SectionDivider />
  </div>

  <div class="reveal">
    <Timeline />
  </div>

  <div class="reveal">
    <Certificates />
    <SectionDivider />
  </div>

  <div class="reveal">
    <SocialLinks />
  </div>

  <div class="reveal">
    <RecruiterSection />
  </div>

  <div class="reveal">
    <Contact />
  </div>

  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { revealOnScroll } from '../utils/animations'

import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Skills from '../components/Skills.vue'
import Projects from '../components/Projects.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'
import Timeline from '../components/Timeline.vue'
import Certificates from '../components/Certificates.vue'
import SocialLinks from '../components/SocialLinks.vue'
import Stats from '../components/Stats.vue'
import RecruiterSection from '../components/RecruiterSection.vue'
import CursorGlow from '../components/CursorGlow.vue'
import ScrollProgress from '../components/ScrollProgress.vue'
import SectionDivider from '../components/SectionDivider.vue'
import GitHubStats from '../components/GitHubStats.vue'
import LoadingScreen from '../components/LoadingScreen.vue'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1600)

  revealOnScroll('.reveal')
})
</script>