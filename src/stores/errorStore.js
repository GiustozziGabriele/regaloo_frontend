// stores/errorStore.js
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', {
  state: () => ({
    code: null,    // 401 | 403 | 404 | 500
    message: null
  }),
  actions: {
    set(code, message) {
      this.code = code
      this.message = message
    },
    clear() {
      this.code = null
      this.message = null
    }
  }
})