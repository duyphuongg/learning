const state = {
  list_link: [
    'youtube.com',
    'google.com'
  ],
  old_link: []
}

const getters = {
  getCountLink: (state) => state.list_link.length
}

const mutations = {
  ADD_LINK: (state, link) => {
    state.list_link.push(link)
  },
  DEL_ONE_LINK: (state, index) => {
    let delLink = state.list_link.splice(index, 1)
    state.old_link.push(...delLink)
  },
  DEL_ALL_LINK: (state) => {
    state.list_link = []
  }
}

const actions = {
  asyncDelAllLink: async ({commit}) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('DEL_ALL_LINK')
        console.log('Async del all link')
        resolve()
      }, 100)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
