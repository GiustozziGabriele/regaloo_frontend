import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/lib/api'
import { push } from 'notivue'
import { supabase } from '@/lib/supabase'

export const useEventItemsStore = defineStore('items', {
  state: () => ({
    itemsByEvent: {},
    needRefresh: {},
    availableItems: [],
    availableItemsNeedRefresh: true
  }),

  actions: {
    async fetchWishlistItems(event_id) {
        if(this.itemsByEvent[event_id] && !this.needRefresh[event_id]) return

        const { data, error } = await supabase
            .from('item_context') 
            .select('*, item_id(*)')
            .eq('event_id', event_id)

        if(error) {
            push.error({
                title: "Errore di caricamento dei dati", 
                message: error
            })
        }
        
        this.itemsByEvent[event_id] = data
        this.needRefresh[event_id] = false
    },

    getItems(wishlist_id) {
        return this.itemsByEvent[wishlist_id] ?? []
    },
    
    async addItem(event_item, event_id) {
        const res = await api.post(`/items/${event_id}/create-event-item`, event_item)
        if(!res.data.success) {
            push.error({
                title: res.data.error.message,
                message: res.data.error.code
            })
            return
        }
        
        this.itemsByEvent[event_id].push(res.data.data)
        this.availableItemsNeedRefresh = true
        push.success({title: "Articolo aggiunto alla wishlist"})
    },

    async updateItem(updates, item_id, event_id) {
        const { data, error } = await supabase.from('items').update(updates).eq('id', item_id).select()

        if(error) {
            push.error({
                title: 'Aggiornamento non avvenuto',
                message: error
            })
            return
        }

        const index = this.itemsByEvent[event_id].findIndex(i => i.item_id.id === item_id)
        if (index !== -1) {
            this.itemsByEvent[event_id][index].item_id = {
                ...this.itemsByEvent[event_id][index].item_id,
                ...updates
            }
            this.needRefresh[event_id] = true
            push.success({title: "Articolo aggiornato"})
        }
    },

    async removeItem(item_id, event_id) {
        const { error } = await supabase.from('item_context').delete().eq('item_id', item_id)

        if(error) {
            push.error({
                title: 'Cancellazione non avvenuta',
                message: error
            })
            return
        }

        const index = this.itemsByEvent[event_id].findIndex(i => i.item_id.id === item_id)
        if (index !== -1) this.itemsByEvent[event_id].splice(index, 1)
        this.needRefresh[event_id] = true
        this.availableItemsNeedRefresh = true
        push.success({title: "Articolo rimosso dalla wishlist"})
    },
    
    async fetchAvailableItems(event_id) {
        if(!this.availableItemsNeedRefresh) return

        const res = await api.get(`/items/${event_id}/available`)

        if (!res.data.success) {
            push.error({ title: res.data.error.message })
            return
        }

        this.availableItems = res.data.data
        this.availableItemsNeedRefresh = false
    },

    async addAvailableItems(item_ids, event_id) {
        const res = await api.post(`/items/event/${event_id}/add-existing`, { item_ids: item_ids })

        if (!res.data.success) {
            push.error({ title: res.data.error.message })
            return
        }

        res.data.data.forEach(item => {
            this.itemsByEvent[event_id].push(item)
        })

        this.availableItemsNeedRefresh = true
        push.success({ title: 'Articoli aggiunti' })
    }
  },
  persist: true
})