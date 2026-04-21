import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/lib/api'
import { supabase } from '@/lib/supabase'

export const useWishlistsStore = defineStore('wishlists', {
  state: () => ({
    wishlists: []
  }),

  getters: {
    getById: (state) => {return (id) => state.wishlists.find(w => w.id === id)}
  },

  actions: {
    async fetchWishlists() {
      if(this.wishlists) return this.wishlists

      const auth = useAuthStore()

      const { data } = await supabase
        .from('wishlists') 
        .select('*')
        .eq('user_id', auth.userId)

      
      this.wishlists = data
    }
  },

  persist: {}
})