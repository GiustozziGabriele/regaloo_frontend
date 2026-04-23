import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@flaticon/flaticon-uicons/css/all/all.css'
import 'tom-select/dist/css/tom-select.bootstrap5.min.css'
import 'notivue/notifications.css'
import 'notivue/animations.css' 
import './style.css'
import './main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'
import { supabase } from './lib/supabase'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createNotivue } from 'notivue'

import App from './App.vue'
import router from './router'
import tooltip from './directives/tooltip'

const app = createApp(App)

// 🧠 Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

// 🔌 Plugins globali UI
app.directive('tooltip', tooltip)
app.use(pinia)
app.use(createNotivue({
  position: 'top-right',
  limit: 5,
  notifications: {
    global: {
      duration: 4000
    }
  }
}))

// 🧭 Router 
app.use(router)

// 🚀 Mount finale
const auth = useAuthStore()

const { data } = await supabase.auth.getSession()
auth.setSession(data.session)

supabase.auth.onAuthStateChange((event, session) => {
  auth.setSession(session)
})

app.mount('#app')

