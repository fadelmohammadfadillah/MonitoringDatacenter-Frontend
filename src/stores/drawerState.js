// Utilities
import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    drawer: true
  }),
  actions: {
    useDrawer(){
        this.drawer = !this.drawer
    }
  }
})
