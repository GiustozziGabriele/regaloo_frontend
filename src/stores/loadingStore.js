import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loadingStore', {
  state: () => ({
    loading: false,
    loadingFrom: null
  }),

  actions: {
    start(from) {
      this.loading = true
      this.loadingFrom = from
    },

    stop() {
      this.loading = false
      this.loadingFrom = null
    }
  }
})
