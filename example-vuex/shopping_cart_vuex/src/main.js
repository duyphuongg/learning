import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import { currency } from './currency'

Vue.filter('currency', currency)
Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
