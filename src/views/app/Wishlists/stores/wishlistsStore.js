import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/lib/api'
import { supabase } from '@/lib/supabase'

export const useWishlistsStore = defineStore('wishlists', {
  state: () => ({
    wishlists: [],
    needRefresh: true
  }),

  getters: {
    getById: (state) => {return (id) => state.wishlists.find(w => w.id === id)}
  },

  actions: {
    async fetchWishlists() {
        const auth = useAuthStore()
        if (!auth.userId) return
        if (!this.needRefresh) return this.wishlists

        const { data } = await supabase
            .from('wishlists') 
            .select('*')
            .eq('user_id', auth.userId)

        console.log('USER ID:', auth.userId)
        console.log('DATA:', data)

        
        this.wishlists = data
        this.needRefresh = false
    }
  },

  persist: {}
})