import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export const store = new Vuex.Store({
  state: {
    users: [],
    keyword: ''
  },
  mutations: {
    GET_USER: function (state, users) {
      this.state.users = users
    },
    GET_KEYWORD: function (state, value) {
      this.state.keyword = value
    }
  },
  getters: {
    searchKeyWord: function (state) {
      return state.users.filter((user) => {
        return user.name.toUpperCase().match(state.keyword.toUpperCase())
      })
    }
  },
  actions: {
    fetchDataUsers: function ({commit}) {
      return new Promise((resolve, reject) => {
        Vue.http.get('https://jsonplaceholder.typicode.com/users')
          .then((response) => {
            commit('GET_USER', response.body)
          })
          .catch(error => {
            console.log(error.statusText)
          })
      })
    }
  }
})
