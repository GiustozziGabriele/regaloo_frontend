import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/lib/api'
import { supabase } from '@/lib/supabase'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: {}
  }),

  actions: {
    async fetchProfile() {
        if (this.profile) return this.profile

        const auth = useAuthStore()

        const { data } = await supabase
            .from('users')
            .select('*')
            .eq('id', auth.userId)
            .single

       
        this.profile = data
        return data      
    }
  },

  persist: {}
})