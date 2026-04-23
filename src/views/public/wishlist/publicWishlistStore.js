import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/lib/api'
import { supabase } from '@/lib/supabase'
import { push } from 'notivue'

export const usePublicWishlistStore = defineStore('publicWishlist', {
  state: () => ({
    wishilistItems: [],
    isOwner: false,
    needRefresh: true
  }),

  actions: {
    async fetchWishlistItems(wishlist_id) {
        const res = await api.get(`/items/${wishlist_id}`)

        if (!res.data.success) {
            push.error({ title: res.data.error.message })
            return
        }

        this.wishilistItems = res.data.data
        this.isOwner = res.data.meta.is_owner
        this.needRefresh = false
    }
  },

  persist: true
})