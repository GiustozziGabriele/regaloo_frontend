import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/lib/api'
import { push } from 'notivue'
import { supabase } from '@/lib/supabase'

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [],
    needRefresh: true
  }),

  actions: {
    async fetchEvents() {
        const auth = useAuthStore()
        if (!auth.userId) return
        if (!this.needRefresh) return 

        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('user_id', auth.userId)
            
        if(error) {
            push.error({
                title: 'Errore nel caricamento delle wishlists',
                message: error
            })
            return
        }

        this.events = data
        this.needRefresh = false
        push.success({title: 'Eventi caricati!'})
    }
  },

  persist: {}
})