<template>
  <div class="hello">
    <p>{{msg}}</p>
    <div class="left">
      {{title}}
      <div class="links">
        <label for="add_link">Add link</label>
        <input type="text" id="add_link" v-model="newlink" @keyup.space="addLinkFunc">
        <ul>
          <li v-for="(link, key) in links" v-bind:key="key">
            <a :href="link">{{link}}</a>
            <button @click="removeLinkFunc(key)">Remove</button>
          </li>
        </ul>
        <button @click="removeAllFunc">Remove All</button>
        <button @click="asyncRemoveAllFunc">Async Remove All</button>
      </div>
      <div class="history">
        <h1>Last 5 history</h1>
        <p>{{getHistory}}</p>
      </div>
    </div>

    <div class="right">
      <Status/>
    </div>
  </div>
</template>

<script>
import Status from './Status'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
export default {
  name: 'HelloWorld',
  components: {
    Status
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      newlink: ''
    }
  },
  computed: {
    ...mapState([
      'title',
      'links',
      'users',
      'history'
    ]),
    ...mapGetters([
      'getHistory'
    ])
  },
  methods: {
    ...mapMutations([
      'ADD_LINK'
    ]),
    ...mapActions([
      'removeLink',
      'removeAll',
      'asyncRemoveAll'
    ]),
    getHistoryMethod () {
      console.log(this.getHistory)
    },
    addLinkFunc: function () {
      this.ADD_LINK(this.newlink)
      this.newlink = ''
    },
    removeLinkFunc: function (link) {
      this.removeLink(link)
    },
    removeAllFunc: function () {
      this.removeAll()
    },
    asyncRemoveAllFunc: function () {
      this.asyncRemoveAll().then(() => {
        this.msg = 'They have been removed'
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}
li {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
a {
  color: #42b983;
}

.left, .right{
  width: 50%;
  float: left;
}
.left{
  border-right: 1px solid black;
}
li button {
  float : right;
}
</style>
