<template>
    <div id="list_link">
        <div class="right">
            <h3>List link</h3>
            <p>Count: {{getCountLink}}</p>
            <button @click="handleDelAll">Remove All</button>
            <button @click="handleAsyncDelAllLink">asyncDelAllLink</button>
            <ul>
                <li v-for="(link, index) in list_link" :key="index">
                    <p>{{link}}</p>
                    <button @click="handleDelLink(index)">Remove</button>
                </li>
            </ul>
            <h3>Old link</h3>
            <ul>
                <li v-for="(link, index) in old_link" :key="index">{{link}}</li>
            </ul>
        </div>
        <div class="left">
            <h3>Add new link: </h3>
            <input type="text" v-model="addlink" @keypress.enter="handleAddLink">
        </div>
    </div>
</template>

<script>
import {mapMutations, mapGetters, mapState, mapActions} from 'vuex'

export default {
  data () {
    return {
      addlink: ''
    }
  },
  created () {

  },
  computed: {
    ...mapState('link', [
      'old_link',
      'list_link'
    ]),
    ...mapGetters('link', [
      'getCountLink'
    ])
  },
  methods: {
    ...mapMutations('link', [
      'ADD_LINK',
      'DEL_ONE_LINK',
      'DEL_ALL_LINK'
    ]),
    ...mapActions('link', [
      'asyncDelAllLink'
    ]),
    handleAddLink (event) {
      this.ADD_LINK(this.addlink)
      this.addlink = ''
    },
    handleDelLink (index) {
      this.DEL_ONE_LINK(index)
    },
    handleDelAll () {
      this.DEL_ALL_LINK()
    },
    handleAsyncDelAllLink () {
      this.asyncDelAllLink()
    }
  }
}
</script>

<style>
    #list_link{
        margin-top: 50px;
        display: flex;
    }
    #list_link >div{
        width: 50%;
    }
    .right li{
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }
</style>
