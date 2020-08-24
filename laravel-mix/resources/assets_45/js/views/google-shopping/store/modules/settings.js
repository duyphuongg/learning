import { 
    getSettingGoogleShopping, 
    getAllProducts
} from "./../../../../services/GoogleShoppingService";

const state = {
    is_first_time: true,
    settings: null,
    settings_old: null,
    key_fresh: 0,
    is_not_show_box_save: true,
    app_plan: null,
    is_creating_file: false,
}
  
const getters = {
    setting_google_shopping: state => {
        if(state.settings){
            return state.settings.setting_google_shopping || null
        }
    },
    is_show_tooltip_upgrade: state => {
        return (state.app_plan == 'free' || state.app_plan == 'starter') ? true : false; 
    }
}

const mutations = {
    updateIsFirstTime: (state, data) => {
        state.is_first_time = data;
    },
    updateSettings: (state, data) => {
        state.settings = data;
    },
    updateSettingsOld: (state, data) => {
        state.settings_old = data;
    },
    updateKeyFresh: (state, data) => {
        state.key_fresh = data;
    },
    updateIsNotShowBoxSave: (state, data) => {
        state.is_not_show_box_save = data;
    },
    updateProductIds: (state, data) => {
        state.settings.product_ids = data;
    },
    updateAppPlan: (state, data) => {
        state.app_plan = data;
    },
    updateIsCreatingFile: (state, data) => {
        state.is_creating_file = data;
    },
}

const actions = {
    getSettings: async function ({ commit, state }, data) {
        let res = await getSettingGoogleShopping()
        commit('updateSettings', res.data)
        let setting_old = JSON.parse(JSON.stringify(res.data));
        commit('updateSettingsOld', setting_old)
        commit('updateKeyFresh', state.key_fresh += 1)
        setTimeout(function() {
            commit('updateIsNotShowBoxSave', false)
        }, 1000);
    },
    getProducts: async function ({ commit }, data) {
        return await getAllProducts(data.key_word,data.page);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
  