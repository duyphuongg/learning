import GoogleShoppingSettings from './../views/google-shopping/google-shopping-settings';
import store from './../views/google-shopping/store'

// Handle add class disabled action
Vue.directive('disabled-action', {
  bind: function (el, binding, vnode) {
    if(binding.value){
      el.classList.add('disabled-action');
    }
  },
  update: function (el, binding, vnode) {
    if(binding.value){
      el.classList.add('disabled-action');
    }else{
      el.classList.remove('disabled-action');
    }
  },
});

new Vue({
    el: '#js-google-shopping-settings',
    components: {
      "google-shopping-settings": GoogleShoppingSettings
    },
    store
});
