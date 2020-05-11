export default{
  getUser: async function ({commit}) {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        commit('GET_USER', data)
      })
      .catch((err) => console.log(err))
  },
  getPosts: async function ({commit}) {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        commit('GET_POSTS', data)
      })
      .catch((err) => console.log(err))
  }
}
