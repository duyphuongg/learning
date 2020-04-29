<template>
    <div class="d-flex">
      <div class="w50 left">
        <h3>List User</h3>
        <ul>
            <li v-for="(user, index) in listSearchUser" :key="index" class="user-item">{{user.name}}</li>
        </ul>
      </div>
      <div class="w50 right">
        <h3>Search user: {{getCountUser}}</h3>
        <input type="text" @input="handleSearch" v-model="input_search" placeholder="Search">
      </div>
    </div>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  data () {
    return {
      input_search: ''
    }
  },
  created () {
    this.getUser()
  },
  computed: {
    ...mapGetters('b', [
      'listSearchUser'
    ]),
    getCountUser () {
      return this.listSearchUser.length
    }
  },
  mounted () {
  },
  methods: {
    ...mapMutations('b', [
      'GET_SEARCH'
    ]),
    ...mapActions('b', [
      'getUser'
    ]),
    handleSearch () {
      this.GET_SEARCH(this.input_search)
    }
  }
}
</script>

<style scoped>
  .d-flex{
    display: flex;
    margin-top: 50px;
  }
  .w50{
    width: 50%;
  }
  .left{
    border-right: 1px solid;
  }
</style>
