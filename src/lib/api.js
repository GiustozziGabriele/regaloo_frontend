import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useErrorStore } from '@/stores/errorStore'
import router from '@/router'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  const token = auth.session?.access_token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status
    const errorStore = useErrorStore()

    if (status === 401) {
      router.push('/login?redirect=' + router.currentRoute.value.fullPath)
    }
    if (status === 403) {
      errorStore.set(403, 'Non hai i permessi per accedere a questa risorsa')
      router.push('/error/403')
    }
    if (status === 404) {
      errorStore.set(404, 'Pagina non trovata')
      router.push('/error/404')
    }
    if (status === 500) {
      errorStore.set(500, 'Errore interno del server')
      router.push('/error/500')
    }

    return Promise.reject(error)
  }
)