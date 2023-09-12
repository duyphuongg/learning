import Vue from 'vue'
import VueResource from 'vue-resource'
// import VueHtml2Canvas from 'vue-html2canvas';
import App from './App.vue'


// Use vue-resource package
Vue.use(VueResource);
// Vue.use(VueHtml2Canvas);

// Filters
// Vue.filter('to-uppercase', function(value){
//     return value.toUpperCase();
// });

new Vue({
  el: '#app',
  render: h => h(App)
})
