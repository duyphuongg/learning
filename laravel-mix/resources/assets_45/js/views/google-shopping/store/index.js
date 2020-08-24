import Vuex from 'vuex';
import Settings from './modules/settings'

Vue.use(Vuex);

if(process.env.NODE_ENV !== 'production'){
  Vue.config.devtools = true
}

export default new Vuex.Store({
  modules: {
    Settings
  }
})
