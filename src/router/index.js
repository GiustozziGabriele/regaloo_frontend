import { createRouter, createWebHistory } from 'vue-router'
import { useLoadingStore } from '@/stores/loadingStore'
import { useAuthStore } from '@/stores/auth'

import AuthLayout from '@/layouts/AuthLayout.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'

import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import CheckEmail from '@/views/auth/CheckEmail.vue'
import Callback from '@/views/auth/Callback.vue'

import Dashboard from '@/views/app/Dashboard/Dashboard.vue'
import Profile from '@/views/app/Profile/Profile.vue'
import WishlistsPage from '@/views/app/Wishlists/pages/WishlistsPage.vue'
import WishlistDetail from '@/views/app/Wishlists/pages/WishlistDetailPage.vue'
import EventsPage from '@/views/app/Events/pages/EventsPage.vue'
import EventDetail from '@/views/app/Events/pages/EventDetail.vue'

const routes = [

  {path: '/', redirect: '/login'},

  // 🔓 AUTH
  {
    path: '/', 
    component: AuthLayout,
    children: [
      {path: 'login', name: 'Login', component: Login},
      {path: 'register', name: 'Register', component: Register},
      {path: 'forgot-password', name: 'Forgot Password', component: ForgotPassword},
      {path: 'reset-password', name: 'Reset Password', component: ResetPassword},
      {path: 'check-email', name: 'Check Email', component: CheckEmail},
      {path: 'auth/callback', name: 'Callback Login Page', component: Callback}
    ]
  },

  // 🔐 PRIVATE AREA
  {
    path: '/app',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {path: '', redirect: '/app/dashboard'},
      {path: 'dashboard', component: Dashboard},
      {path: 'profile', component: Profile},
      {path: 'wishlists', component: WishlistsPage},
      {path: 'wishlists/:id', component: WishlistDetail},
      {path: 'events', component: EventsPage},
      {path: 'events/:id', component: EventDetail},
      {path: 'people', component: Profile},
    ]
  },

  // 🆓 PUBLIC AREA
  {
    path: '/public',
    component: PublicLayout,
    meta: { public: true },
    children: [
      {path: 'w/:id', component: WishlistDetail},
      {path: 'e/:id', component: EventDetail}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(async(to) => {
  const auth = useAuthStore()
  const loading = useLoadingStore()

  loading.start(to.name)

  // aspetta init se necessario
  if (auth.loading) {
    await auth.init()
  }

  // se route protetta e non loggato
  if (to.meta.requiresAuth && !auth.user) {
    loading.stop()
    return '/login'
  }

  if (to.meta.public && auth.isAuthenticated) {
    loading.stop()
    return '/app'
  }

  // se loggato e va su login
  if ((to.path === '/login' || to.path === '/register') && auth.user) {
    loading.stop()
    return '/app/dashboard'
  }

  loading.stop()
  return true
})

export default router
