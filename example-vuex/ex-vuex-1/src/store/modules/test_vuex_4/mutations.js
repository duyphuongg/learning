export default{
  GET_USER: function (state, users) {
    state.users = users
  },
  GET_SEARCH: function (state, key) {
    state.key_word = key
  }
}
