import {defineStore} from "pinia";

export const useStore = defineStore('tsg', {
  persist: true,
  state: () => {
        return {
          token: null,
          refreshToken: null,
          userInfo: null,
          isLoadMenu: false,
          routers: null,
          permission: null,
          activeIndex: 'HomePage',
          openTabs: []
        }
  },
  actions: {
    // fetch user menu
    loadMenuAction(payload) {
      this.isLoadMenu = payload
    },
    // save user menu list
    routerAction(payload) {
      this.routers = payload
    },
    // save user permissions
    permissionAction(payload) {
      this.permission = payload
    },
    // save user token
    tokenAction(payload) {
      this.token = payload
    },
    activeIndexAction(payload) {
      this.activeIndex = payload
    },
    // add opened menu
    addTabAction(payload) {
      if(this.openTabs.filter(tab => tab.name === payload.name).length === 0) {
        payload.isClose = payload.name !== 'HomePage'
        this.openTabs.push(payload)
      }
    },
    removeTabAction(payload) {
      this.openTabs = this.openTabs.filter((tab) => tab.name !== payload)
    },
    clearTabAction() {
      this.openTabs = []
    }
  }
})