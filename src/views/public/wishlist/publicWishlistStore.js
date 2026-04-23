import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/lib/api'
import { supabase } from '@/lib/supabase'
import { push } from 'notivue'

export const usePublicWishlistStore = defineStore('publicWishlist', {
  state: () => ({
    wishilistItems: {},
    showDetails: false
  }),

  actions: {
    async fetchWishlistItems(wishlist_id) {
        const res = await api.get(`/items/${wishlist_id}`)

        if (!res.data.success) {
            push.error({ title: res.data.error.message })
            return
        }
        const is_owner = res.data.meta.is_owner
        const is_logged = res.data.meta.is_logged

        if(is_owner) this.showDetails = false
        if(!is_owner && is_logged) this.showDetails = true

        this.wishilistItems[wishlist_id] = res.data.data
    },

    getItems(wishlist_id) {
        return this.wishilistItems[wishlist_id] ?? []
    },
  },

  persist: true
})