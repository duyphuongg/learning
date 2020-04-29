export default {
  listSearchUser: function (state) {
    return state.users.filter((user) => {
      return user.name.toUpperCase().match(state.key_word.toUpperCase())
    })
  },
  key_word: state => state.key_word
}
