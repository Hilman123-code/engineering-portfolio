import axios from 'axios'

const api = axios.create({
  baseURL: 'https://engineering-portfolio.up.railway.app'
})

// Automatically attach the admin JWT token (if present) to every request.
// This means individual components don't need to manually add headers
// when calling protected /api/admin/* endpoints.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// If the backend ever responds 401/403 (token missing, invalid, or expired),
// clear the stored token and send the user back to the login page.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('token')

      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin'
      }
    }

    return Promise.reject(error)
  }
)

export default api