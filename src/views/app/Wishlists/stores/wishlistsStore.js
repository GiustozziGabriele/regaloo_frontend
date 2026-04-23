import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/lib/api'
import { supabase } from '@/lib/supabase'
import { push } from 'notivue'

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
        if (!this.needRefresh) return 

        const { data, error } = await supabase
            .from('wishlists') 
            .select('*')
            .eq('user_id', auth.userId)

        if(error) {
            push.error({
                title: 'Errore nel caricamento delle wishlists',
                message: error
            })
            return
        }
        
        this.wishlists = data
        this.needRefresh = false
        push.success({title: 'Wishlists caricate!'})
    },

    async createWishlist(wishlist) {
        const auth = useAuthStore()
        if (!auth.userId) return
        wishlist['user_id'] = auth.userId

        const { data, error } = await supabase
            .from('wishlists')
            .insert(wishlist)
            .select()
            .single()

        if(error) {
            push.error({
                title: 'Errore nella creazione della wishlist',
                message: error
            })
            return
        }

        this.wishlists.push(data)
        this.needRefresh = true
        push.success({title: 'Wishlist creata con successo!'})
    },

    async deleteWishlist(wishlist_id) {
        const { error } = await supabase
            .from('wishlists')
            .delete()
            .eq('id', wishlist_id)

        if(error) {
            push.error({
                title: "Errore nell'eliminazione della wishlist",
                message: error
            })
            return false
        }

        this.needRefresh = true
        push.success({title: 'Wishlist eliminata con successo!'})
        return true
    }
  },

  persist: true
})