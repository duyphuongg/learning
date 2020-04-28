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
  }
}
