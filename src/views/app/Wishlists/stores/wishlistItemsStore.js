import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/lib/api'
import { push } from 'notivue'
import { supabase } from '@/lib/supabase'

export const useWishlistItemsStore = defineStore('items', {
  state: () => ({
    wishlistItems: [],
    needRefresh: true
  }),

  actions: {
    // ← funzione "privata", usala solo internamente
    _updateLocalItem(item_id, updates) {
        const index = this.wishlistItems.findIndex(i => i.item_id.id === item_id)
        if (index !== -1) {
            this.wishlistItems[index].item_id = {
            ...this.wishlistItems[index].item_id,
            ...updates
            }
        }
    },


    async fetchWishlistItems(wishlist_id) {
        if(!this.needRefresh) return this.wishlistItems

        const { data } = await supabase
            .from('item_context') 
            .select('*, item_id(*)')
            .eq('wishlist_id', wishlist_id)

        this.wishlistItems = data
        this.needRefresh = false
    },
    
    async addItem(wishlist_item, wishlist_id) {
        const res = await api.post(`/items/${wishlist_id}/create-item`, wishlist_item)
        if(res.data.success) {
            this.wishlistItems.push(res.data.data)
            push.success({title: "Articolo aggiunto alla wishlist"})
            this.needRefresh = true
            return
        }

        push.error({
            title: res.data.error.message,
            message: res.data.error.code
        })
    },

    async updateItem(updates, item_id) {
        const { data, error } = await supabase.from('items').update(updates).eq('id', item_id).select()

        if(error) {
            push.error({
            title: 'Aggiornamento non avvenuto',
            message: error
            })
            return false
        }

        this._updateLocalItem(item_id, data[0])
        push.success({title: "Articolo aggiornato"})
        this.needRefresh = true
        return true
    },

    async removeItemFromWishlist(item_id) {
        const { data, error } = await supabase.from('item_context').delete().eq('item_id', item_id)

        if(error) {
            push.error({
            title: 'Cancellazione non avvenuta',
            message: error
            })
            return false
        }

        this.wishlistItems = this.wishlistItems.filter(el => el.item_id?.id != item_id)
        push.success({title: "Articolo rimosso dalla wishlist"})
        this.needRefresh = true
        return true
    }
  }
})