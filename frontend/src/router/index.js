import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import AdminLogin from '../pages/AdminLogin.vue'
import AdminDashboard from '../pages/AdminDashboard.vue'
import AdminContacts from '../pages/AdminContacts.vue'
import AdminProjects from '../pages/AdminProjects.vue'
import AdminProfile from '../pages/AdminProfile.vue'
import ProjectDetails from '../pages/ProjectDetails.vue'
import AdminExperiences from '../pages/AdminExperiences.vue'
import AdminCertificates from '../pages/AdminCertificates.vue'
import AdminSkills from '../pages/AdminSkills.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/admin',
    component: AdminLogin
  },
  {
    path: '/admin/dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/contacts',
    component: AdminContacts,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/projects',
    component: AdminProjects,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/profile',
    component: AdminProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/projects/:id',
    component: ProjectDetails
  },
  {
  path: '/admin/experiences',
  component: AdminExperiences,
  meta: { requiresAuth: true }
  },
  {
  path: '/admin/certificates',
  component: AdminCertificates,
  meta: { requiresAuth: true }
  },
  {
  path: '/admin/skills',
  component: AdminSkills,
  meta: { requiresAuth: true }
  },
  {
  path: '/:pathMatch(.*)*',
  component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const token = localStorage.getItem('adminToken')

  if (to.meta.requiresAuth && !token) {
    return '/admin'
  }

  return true
})

export default router