<template>
    <div class="list-post" v-if="posts != []">
        <h4>List title post</h4>
        <div class="table-responsive-xxs">
            <div class="header">
              <input type="text" v-model="keyWord" placeholder="Search post title">
              <input type="number" v-model="keyFilter" placeholder="Search post id">
            </div>
            <table class="table table-hover table-ali-custom table-mid table-pad-25">
                <thead>
                    <tr>
                        <th width="15%">Id</th>
                        <th width="15%">Title</th>
                        <th >Body</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="post in postPagination.data" :key="post.id">
                    <td :id="post.id">{{ post.id }}</td>
                    <td :id="post.title">{{ post.title }}</td>
                    <td :id="post.body">{{ post.body }}</td>
                  </tr>
                </tbody>
            </table>
            <div class="page-pagination" v-if="postPagination.totalPages > 1">
              <ul >
                <li v-for="(page, index) in postPagination.totalPages"
                  :key="index"
                  :id="page"
                  @click="currPage = page"
                  :class="{'active' : currPage == page}">
                    {{page}}
                </li>
              </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  data () {
    return {
      currPage: 1,
      keyWord: '',
      keyFilter: ''
    }
  },
  created () {
    this.getPosts()
  },
  computed: {
    ...mapState('b', [
      'posts'
    ]),
    searchPost: function () {
      if (this.keyWord && this.keyFilter) {
        let searchKeyWord = this.posts.filter((post) => {
          return post.title.toUpperCase().match(this.keyWord.toUpperCase())
        })
        let result = searchKeyWord.filter((post) => {
          return post.id > this.keyFilter
        })
        return result
      } else if (this.keyWord && !this.keyFilter) {
        return this.posts.filter((post) => {
          return post.title.toUpperCase().match(this.keyWord.toUpperCase())
        })
      } else if (!this.keyWord && this.keyFilter) {
        return this.posts.filter((post) => {
          return post.id > this.keyFilter
        })
      }
      return this.posts
    },
    postPagination: function () {
      return this.paginator(this.searchPost, this.currPage)
    }
  },
  watch: {
    searchPost: function (val) {
      this.currPage = 1
    }
  },
  methods: {
    ...mapActions('b', [
      'getPosts'
    ]),
    paginator (items, pageInput, perPageInput) {
      let page = pageInput || 1
      let perPage = perPageInput || 10
      let offset = (page - 1) * perPage

      let paginatedItems = items.slice(offset).slice(0, perPage)
      let totalPages = Math.ceil(items.length / perPage)
      return {
        page: page,
        perPage: perPage,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (totalPages > page) ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
        data: paginatedItems
      }
    }
  }
}
</script>

<style scoped>
.page-pagination ul{
  list-style: none;
  display: flex;
  justify-content: center;
}
.page-pagination ul li{
  width: 20px;
  height: 20px;
  color: #000;
  background: olive;
  margin: 0 4px;
  cursor: pointer;
}
.page-pagination ul li.active{
  background: crimson;
}
</style>
