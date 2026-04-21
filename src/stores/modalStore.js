import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    current: null, // nome modal
    props: {}
  }),

  getters: {
    isOpen: (state) => !!state.current
  },

  actions: {
    open(name, props = {}) {
      this.current = name
      this.props = props
    },

    close() {
      this.current = null
      this.props = {}
    }
  }
})