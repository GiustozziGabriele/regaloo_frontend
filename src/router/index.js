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
import ProfilePage from '@/views/app/Profile/ProfilePage.vue'
import WishlistsPage from '@/views/app/Wishlists/pages/WishlistsPage.vue'
import WishlistDetailPage from '@/views/app/Wishlists/pages/WishlistDetailPage.vue'
import EventsPage from '@/views/app/Events/pages/EventsPage.vue'
import EventDetailPage from '@/views/app/Events/pages/EventDetailPage.vue'

import PublicWishlistPage from '@/views/public/wishlist/PublicWishlistPage.vue'

import NotFound from '@/views/errors/NotFound.vue'
import Forbidden from '@/views/errors/Forbidden.vue'
import ServerError from '@/views/errors/ServerError.vue'

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
      {path: 'profile', component: ProfilePage},
      {path: 'wishlists', component: WishlistsPage},
      {path: 'wishlists/:id', component: WishlistDetailPage},
      {path: 'events', component: EventsPage},
      {path: 'events/:id', component: EventDetailPage},
      {path: 'people', component: ProfilePage},
    ]
  },

  // 🆓 PUBLIC AREA
  {
    path: '/public',
    component: PublicLayout,
    meta: { public: true },
    children: [
      {path: 'w/:id', component: PublicWishlistPage},
      {path: 'e/:id', component: PublicWishlistPage}
    ]
  },

  {
    path: '/error',
    children: [
      { path: '403', component: Forbidden },
      { path: '404', component: NotFound },
      { path: '500', component: ServerError },
    ]
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(async(to) => {
  const auth = useAuthStore()
  const loading = useLoadingStore()

  loading.start(to.name)

  if (auth.loading) {
    await auth.init()
  }

  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const isPublic = to.matched.some(r => r.meta.public)

  // 🔐 PROTETTA
  if (requiresAuth && !auth.user) {
    loading.stop()
    return '/login'
  }

  // 🔓 PUBBLICA
  if (isPublic) {
    loading.stop()
    return true
  }

  // già loggato → evita login/register
  if ((to.path === '/login' || to.path === '/register') && auth.user) {
    loading.stop()
    return '/app/dashboard'
  }

  loading.stop()
  return true
})

export default router
