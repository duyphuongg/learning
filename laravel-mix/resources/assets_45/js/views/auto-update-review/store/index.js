import Vuex from 'vuex';
import ListUpdate from './modules/list-update'
import Setting from './modules/setting'
Vue.use(Vuex);
if(process.env.NODE_ENV !== 'production'){
  Vue.config.devtools = true
}
export default new Vuex.Store({
  modules: {
    ListUpdate,
    Setting
  }
})
