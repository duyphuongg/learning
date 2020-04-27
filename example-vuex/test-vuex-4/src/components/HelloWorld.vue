<template>
  <div class="hello">
    <div class="left">
      <h1>List User</h1>
      <label for="search_input">Search</label>
      <input type="text" v-model="input_search" @blur="getKeyWord">
      <ul>
        <li v-for="(user, index) in searchKeyWord" :key="index">
          <div class="user">
            <p>Name : {{user.name}}</p>
            <p>Email : {{user.email}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="right">
      <h1>Search User result </h1>
      <SearchUser/>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import SearchUser from './SearchUser'

export default {
  data () {
    return {
      input_search: ''
    }
  },
  name: 'HelloWorld',
  components: {
    SearchUser
  },
  created () {
    this.$store.dispatch('fetchDataUsers')
  },
  computed: {
    ...mapState([
      'users'
    ]),
    ...mapGetters([
      'searchKeyWord'
    ])
  },
  methods: {
    getKeyWord: function () {
      this.$store.commit('GET_KEYWORD', this.input_search)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  box-sizing: border-box;
}
.left, .right{
  width: 50%;
  float: left;
}
.left {
  border-right: 1px solid #000;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  display: block;
}
li {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  background: #dddde4;
  margin: 10px;
}
a {
  color: #42b983;
}

</style>
