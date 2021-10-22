
import { 
    getSettingAutoUpdate, 
    getListAutoUpdateProducts,
    saveLinkAeFromAutoUpdate
} from "./../../../../services/AutoUpdateReviewService";

const state = {
    settings:null,
    settings_old:null,
    isNotShowBoxSave: true,
    listTranslateCountry: [],
    listAllCountryCode: [],
    isFirstSetting: true,
    isShowStepperSetting: false,
    high_priority_products_temp: [],
    exclude_products_temp: [],
    app_plan_info: null,
    isFirstSetDataStep2: false,
    key_fresh: 0,
    is_onboarding: false
}
  
const getters = {
    settings_auto: state => {
        if(state.settings){
            return state.settings.settings_auto || null
        }
    },
    settings_import_review: state => {
        if(state.settings){
            return state.settings.settings || null
        }
    },
    high_priority_products: state => {
        if(state.settings){
            return state.settings.highPriorityProducts || null
        }
    },
    exclude_products: state => {
        if(state.settings){
            return state.settings.excludeProducts    || null
        }
    },
    is_show_tooltip_upgrade: state => {
        let arrPlan = ['plus', 'premium', 'essential']
        return (arrPlan.includes(state.app_plan_info)) ? false : true;
    },
    is_show_tooltip_upgrade_essential: state => {
        let arrPlan = ['plus', 'premium']
        return (arrPlan.includes(state.app_plan_info)) ? false : true;
    },
    is_install_extension: () => {
        const { extensionId = "", aliReviewPassExtensionId = false } = window;
        if (!aliReviewPassExtensionId && !extensionId || (extensionId && extensionId != extensionIdDefine)) {
            return true
        }
        return false
    }
}

const mutations = {
    updateSettings: function(state, data){
        if(data){
            state.settings = data;
            state.high_priority_products_temp = JSON.parse(JSON.stringify(data.highPriorityProducts));
            state.exclude_products_temp = JSON.parse(JSON.stringify(data.excludeProducts));
        }
    },
    updateSettingsOld: function(state, data){
        if(data){
            state.settings_old = data;
        }
    },
    getListTranslateCountry: (state, data) => {
        state.listTranslateCountry = data;
    },
    getListAllCountryCode: (state, data) => {
        state.listAllCountryCode = data;
    },
    handleShowBoxSave: (state, data) => {
        state.isNotShowBoxSave = data
    },
    updateIsShowStepperSetting: (state, status) => {
        state.isShowStepperSetting = status
    },
    updateIsFirstSetting: (state, status) => {
        state.isFirstSetting = status
    },
    updateHighPriorityProducts: (state, data) => {
        state.settings.highPriorityProducts = data;
    },
    updateExcludeProducts: (state, data) => {
        state.settings.excludeProducts = data;
    },
    updateHighPriorityProductsTemp: (state, data) => {
        state.high_priority_products_temp = data;
    },
    updateExcludeProductsTemp: (state, data) => {
        state.exclude_products_temp = data;
    },
    updateAppPlanInfo: (state, data) => {
        state.app_plan_info = data;
    },
    updateIsFirstSetDataStep2: (state, data) => {
        state.isFirstSetDataStep2 = data;
    },
    updateKeyFresh: (state, data) => {
        state.key_fresh = data;
    },
    updateIsOnBoarding: (state, data) => {
        state.is_onboarding = data;
    },
}

const actions = {
    getSetting: async function ({ commit, state }, data) {
        let res = await getSettingAutoUpdate()
        commit('updateSettings', res)
        let setting_old = JSON.parse(JSON.stringify(res));
        commit('updateSettingsOld', setting_old)
        commit('updateKeyFresh', state.key_fresh += 1)
        setTimeout(function() {
            commit('handleShowBoxSave', false)
        }, 1000);
    },
    getProducts: async function ({ commit }, data) {
        return await getListAutoUpdateProducts(data.key_word,data.page);
    },
    saveLinkAeFromAutoUpdate: async function ({ commit }, data) {
        return await saveLinkAeFromAutoUpdate(data);
    },
    showModalStepSetting: async function ({ commit }, status = false) {
        commit('updateIsShowStepperSetting', status)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
  