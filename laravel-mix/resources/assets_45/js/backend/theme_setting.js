import ThemeSetting from './../views/theme-setting/theme-setting';

if(process.env.NODE_ENV !== 'production'){
    Vue.config.devtools = true
}

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

Vue.directive('border-color', {
  bind: function (el, binding, vnode) {
    el.style.borderColor = binding.value
  },
  update: function (el, binding, vnode) {
    el.style.borderColor = binding.value
  },
});

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
  el: '#js-theme-setting',
  components: {
    "theme-setting": ThemeSetting
  }
});