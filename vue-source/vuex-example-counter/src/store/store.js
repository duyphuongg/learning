import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    INCLEMENT (state) {
      state.count++
    },
    DECLEMENT (state) {
      state.count--
    },
    INCLEMENTIFODD (state) {
      if (state.count % 2 !== 0) {
        state.count++
      }
    }
  },
  getters: {
    getChanLe (state) {
      return (state.count % 2 === 0) ? 'even' : 'odd'
    }
  },
  actions: {
    inclement (context) {
      context.commit('INCLEMENT')
    },
    declement (context) {
      context.commit('DECLEMENT')
    },
    inclementifodd (context) {
      context.commit('INCLEMENTIFODD')
    },
    inclementasync ({commit}) {
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          commit('INCLEMENT')
          resolve()
        }, 1000)
      })
    }
  }
})
