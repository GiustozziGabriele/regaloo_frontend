import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/lib/api'
import { supabase } from '@/lib/supabase'

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: []
  }),

  actions: {
    async fetchEvents() {
      const { data } = await supabase.from('events').select('*')

      if(data) {
        this.events = data
      }
    }
  },

  persist: {}
})