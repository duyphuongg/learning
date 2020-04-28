import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export const store = new Vuex.Store({
  state: {
    title: 'My custom title',
    links: [
      'http://google.com',
      'http://youtube.com',
      'http://facebook.com'
    ],
    users: [],
    history: []
  },
  mutations: {
    ADD_LINK: function (state, link) {
      state.links.push(link)
      state.history.push(link)
    },
    REMOVE_LINK: function (state, link) {
      console.log('REMOVE_LINK', link)
      console.log('REMOVE_LINK before', state.links)
      state.links.splice(link, 1)
      state.history.push(state.links.splice(link, 1))
      console.log('REMOVE_LINK after', state.links)
    },
    REMOVE_ALL: function (state) {
      state.links = []
      state.history.push(state.links)
    },
    ASYNC_REMOVE_ALL: function (state) {
      state.links = []
      state.history.push(state.links)
    }
  },
  getters: {
    countLink: state => {
      return state.links.length
    },
    getHistory (state) {
      let end = state.history.length
      let start = (end - 5 > 0) ? (end - 5) : 0
      return state.history.slice(start, end).join(', ')
    }
  },
  actions: {
    removeLink: function (context, link) {
      context.commit('REMOVE_LINK', link)
    },
    removeAll: function (context) {
      context.commit('REMOVE_ALL')
    },
    asyncRemoveAll: function ({commit}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('REMOVE_ALL')
          resolve()
        }, 1500)
      })
    }
  }
})
