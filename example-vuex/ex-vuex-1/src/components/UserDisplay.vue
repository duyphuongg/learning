<template>
    <div>
        <h3>List User {{key_word}}</h3>
        <ul>
            <li v-for="(user, index) in listUser" :key="index" class="user-item">{{user.name}}</li>
        </ul>
    </div>
</template>

<script>

import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  data () {
    return {

    }
  },
  created () {
    this.getUser()
  },
  computed: {
    ...mapState('b', ['key_word']),
    ...mapGetters('b', [
      'listUser'
    ])
  },
  mounted () {
  },
  methods: {
    ...mapActions('b', [
      'getUser'
    ])
  }
}
</script>

<style>

</style>
