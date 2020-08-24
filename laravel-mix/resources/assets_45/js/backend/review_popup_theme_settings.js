import ReviewPopupThemeSettings from './../views/review-popup/theme-settings/theme-settings';

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

Vue.directive('disabled-show-tooltip', {
  bind: function (el, binding, vnode) {
    if(binding.value){
      el.classList.add('disabled-show-tooltip');
      let newElement = document.createElement('div');
      newElement.setAttribute('class', 'translucent');
      el.appendChild(newElement);
    }
  }
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

export const EventBus = new Vue();

new Vue({
    el: '#js-review-popup-theme-settings',
    components: {
      "review-popup-theme-settings": ReviewPopupThemeSettings
    }
});
