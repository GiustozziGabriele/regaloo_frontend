import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/lib/api'
import { push } from 'notivue'
import { supabase } from '@/lib/supabase'

export const useWishlistItemsStore = defineStore('items', {
  state: () => ({
    itemsByWishlist: {},
    needRefresh: {}
  }),

  actions: {
    async fetchWishlistItems(wishlist_id) {
        if(this.itemsByWishlist[wishlist_id] && !this.needRefresh[wishlist_id]) return

        const { data, error } = await supabase
            .from('item_context') 
            .select('*, item_id(*)')
            .eq('wishlist_id', wishlist_id)

        if(error) {
            push.error({
                title: "Errore di caricamento dei dati ", 
                message: error
            })
        }
        
        this.itemsByWishlist[wishlist_id] = data
        this.needRefresh[wishlist_id] = false
    },

    getItems(wishlist_id) {
        return this.itemsByWishlist[wishlist_id] ?? []
    },
    
    async addItem(wishlist_item, wishlist_id) {
        const res = await api.post(`/items/${wishlist_id}/create-item`, wishlist_item)
        if(!res.data.success) {
            push.error({
                title: res.data.error.message,
                message: res.data.error.code
            })
            return
        }
        
        this.itemsByWishlist[wishlist_id].push(res.data.data)
        push.success({title: "Articolo aggiunto alla wishlist"})
    },

    async updateItem(updates, item_id, wishlist_id) {
        const { data, error } = await supabase.from('items').update(updates).eq('id', item_id).select()

        if(error) {
            push.error({
                title: 'Aggiornamento non avvenuto',
                message: error
            })
            return
        }

        const index = this.itemsByWishlist[wishlist_id].findIndex(i => i.item_id.id === item_id)
        if (index !== -1) {
            this.itemsByWishlist[wishlist_id][index].item_id = {
                ...this.itemsByWishlist[wishlist_id][index].item_id,
                ...updates
            }
            this.needRefresh[wishlist_id] = true
            push.success({title: "Articolo aggiornato"})
        }
    },

    async removeItem(item_id, wishlist_id) {
        const { data, error } = await supabase.from('item_context').delete().eq('item_id', item_id)

        if(error) {
            push.error({
                title: 'Cancellazione non avvenuta',
                message: error
            })
            return
        }

        const index = this.itemsByWishlist[wishlist_id].findIndex(i => i.item_id.id === item_id)
        if (index !== -1) this.itemsByWishlist[wishlist_id].splice(index, 1)
        this.needRefresh[wishlist_id] = true
        push.success({title: "Articolo rimosso dalla wishlist"})
    }
  }
})