import ReviewPopupRuleSettings from './../views/review-popup/rule-settings/rule-settings';

if(process.env.NODE_ENV !== 'production'){
    Vue.config.devtools = true
}

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

Vue.directive('background-color', {
  bind: function (el, binding, vnode) {
    el.style.backgroundColor = binding.value
  },
  update: function (el, binding, vnode) {
    el.style.backgroundColor = binding.value
  },
});

Vue.directive('color', {
  bind: function (el, binding, vnode) {
    el.style.color = binding.value
  },
  update: function (el, binding, vnode) {
    el.style.color = binding.value
  },
});

new Vue({
    el: '#js-review-popup-rule-settings',
    components: {
      "review-popup-rule-settings": ReviewPopupRuleSettings
    }
});