<template>
    <div class="list-post" v-if="posts != []">
        <h4>List title post</h4>
        <fa-rating :glyph="thumbsUp"></fa-rating>
        <fa-rating :glyph="thumbsUp" :read-only="true" :rating="4.3" :increment="0.01" inactive-color="#A4AFB7ed" active-color="#FFB303" :item-size="16" :spacing="4" border-color="none"></fa-rating>
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
                <li v-for="(page, index) in paginationListPage"
                  :key="index"
                  :id="page"
                  @click="currPage = page"
                  :class="{'active' : currPage == page, 'disable' : typeof page !== 'number'}">
                    {{page}}
                </li>
              </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {FaRating} from 'vue-rate-it'
import ThumbsUp from 'vue-rate-it/glyphs/star'

export default {
  data () {
    return {
      currPage: 1,
      keyWord: '',
      keyFilter: '',
      thumbsUp: ''
    }
  },
  components: {
    'fa-rating': FaRating
  },
  created () {
    this.getPosts()
    this.thumbsUp = ThumbsUp
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
      return this.paginator(this.searchPost, this.currPage, 10)
    },
    paginationListPage: function () {
      return this.pagination(this.currPage, this.postPagination.totalPages)
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
    },
    getRange (start, end) {
      return Array(end - start + 1)
        .fill()
        .map((v, i) => i + start)
    },
    pagination (currentPage, pageCount) {
      let delta
      if (pageCount <= 10) {
        // delta === 10: [1 2 3 4 5 6 7 8 9 10]
        delta = 10
      } else {
        // delta === 2: [1 ... 4 5 6 ... 10]
        // delta === 4: [1 2 3 4 5 ... 10]
        delta = currentPage > 6 && currentPage < pageCount - 5 ? 4 : 6
      }

      const range = {
        start: Math.round(currentPage - delta / 2),
        end: Math.round(currentPage + delta / 2)
      }

      if (range.start - 1 === 1 || range.end + 1 === pageCount) {
        range.start += 1
        range.end += 1
      }

      let pages =
        currentPage > delta
          ? this.getRange(Math.min(range.start, pageCount - delta), Math.min(range.end, pageCount))
          : this.getRange(1, Math.min(pageCount, delta + 1))

      const withDots = (value, pair) => (pages.length + 1 !== pageCount ? pair : [value])

      if (pages[0] !== 1) {
        pages = withDots(1, [1, '...']).concat(pages)
      }

      if (pages[pages.length - 1] < pageCount) {
        pages = pages.concat(withDots(pageCount, ['...', pageCount]))
      }

      return pages
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
.page-pagination ul li.disable{
  pointer-events: none;
}
</style>
