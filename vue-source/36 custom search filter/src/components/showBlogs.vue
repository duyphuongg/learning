<template>
  <div id="show-blogs">
    <button class="button" @click="printSvg()">printSvg</button>
    <button class="button" @click="printPng()">printPng</button>

    <div class="printMe2" ref="printMe">
      <h1>All Blog Articles</h1>
      <input type="text" v-model="search" placeholder="search blogs" />
      <p v-show="search_finish">Search finished!</p>
      <div
        v-for="(blog, index) in filteredBlogs"
        :key="index"
        class="single-blog"
      >
        <h2>{{ blog.title }}</h2>
        <article>{{ blog.body }}</article>
      </div>
    </div>
    <img :src="output" />
  </div>
</template>

<script>
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

export default {
  data() {
    return {
      blogs: [],
      search: "",
      search_finish: false,
      output: null,
    };
  },
  methods: {
    printSvg() {
      const el = this.$refs.printMe;
      htmlToImage
        .toSvg(el)
        .then((dataUrl) => {
          console.log(111111, dataUrl);
          this.download("image", "svg", dataUrl);
        })
        .catch((error) => {
          console.error("oops, something went wrong!", error);
        });
    },

    printPng() {
      const el = this.$refs.printMe;
      
      htmlToImage
        .toPng(el, { pixelRatio: 3 })
        .then((dataUrl) => {
          console.log(222222222, dataUrl);
          this.download("image", "png", dataUrl);
        })
        .catch((error) => {
          console.error("oops, something went wrong!", error);
        });

      

      
    },
    download(name, type, url) {
      var link = document.createElement("a");
      link.download = `${name}.${type}`;
      link.href = url;
      link.click();
    },
  },
  created() {
    this.$http
      .get("http://jsonplaceholder.typicode.com/posts")
      .then(function (data) {
        this.blogs = data.body.slice(0, 10);
      });
  },
  computed: {
    filteredBlogs: function () {
      return this.blogs.filter((blog) => {
        return blog.title.toUpperCase().match(this.search.toUpperCase());
      });
    },
  },
  watch: {
    filteredBlogs: function (newVal, oldval) {
      console.log("new value", newVal);
      this.search_finish = true;
    },
  },
};
</script>

<style>
#show-blogs {
  max-width: 800px;
  margin: 0px auto;
}

/* .printMe{
    width: 800px;
    transform: scale(2);
} */

.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
}
</style>
