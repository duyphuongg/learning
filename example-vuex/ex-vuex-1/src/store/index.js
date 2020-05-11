import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

// Modules
import testOne from './modules/test_vuex_1'
import testFour from './modules/test_vuex_4'
import link from './modules/link'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  /**
   * Assign the modules to the store.
   */
  modules: {
    a: testOne,
    b: testFour,
    link
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger()] : []
})
