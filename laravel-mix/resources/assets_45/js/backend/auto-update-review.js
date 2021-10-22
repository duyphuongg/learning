import AutoUpdateReviewSettings from './../views/auto-update-review/auto-update-review-setting';
import store from './../views/auto-update-review/store'

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
    el: '#js-auto-update-review-settings',
    components: {
      "auto-update-review-settings": AutoUpdateReviewSettings
    },
    store
});
