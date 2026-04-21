import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null,
    loading: true,
    initialized : false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userId: (state) => state.user?.id
  },

  actions: {
    // 🚀 inizializza sessione (OBBLIGATORIO all'avvio app)
    async init() {
      if (this.initialized) return
      this.loading = true

      const { data } = await supabase.auth.getSession()

      this.session = data.session
      this.user = data.session?.user ?? null

      this.initialized = true
      this.loading = false
    },

    // 🔑 LOGIN
    async login(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      this.session = data.session
      this.user = data.user

      return data
    },

    // 🆕 REGISTER
    async register(email, password, name, surname) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${import.meta.env.VITE_APP_URL}/auth/callback`
        }
      })

      if (error) throw error

      //Creare quindi nuovo utente con l'id che ricevo da data

      return data
    },

     async resendEmail(email) {
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${import.meta.env.VITE_APP_URL}/auth/callback`
        }
      })

      if (error) throw error

      return data
    },

    // 🚪 LOGOUT
    async logout() {
      const { error } = await supabase.auth.signOut()

      if (error) throw error

      this.user = null
      this.session = null
    },

    // 🔁 RESET PASSWORD (email link)
    async resetPassword(email) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${import.meta.env.VITE_APP_URL}/reset-password`
      })

      if (error) throw error

      return data
    },

    // 🔐 UPDATE PASSWORD (dopo link email)
    async updatePassword(newPassword) {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      return data
    },

    setSession(session) {
      this.session = session
      this.user = session?.user ?? null
    }
  },

  // 💾 persistenza (SOLO UI state, non fidarti al 100%)
  persist: {
    key: 'auth-store',
    storage: localStorage,
    paths: ['user', 'session']
  }
})