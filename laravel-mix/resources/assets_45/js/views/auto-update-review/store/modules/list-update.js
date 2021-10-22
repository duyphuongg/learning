import { 
    getListProductRunAutoUpdate
} from "./../../../../services/AutoUpdateReviewService";

const state = {
    list_update : null,
    next_update_time: null,
    is_loading_list: true
}
  
const getters = {

}

const mutations = {
    setListUpdate(state, data){
        state.list_update = data
    },
    setNextUpdateTime(state, data){
        state.next_update_time = data
    },
    setStatusLoading(state, data){
        state.is_loading_list = data
    }
}

const actions = {
    async getListUpdateData({commit}) {
        let res = await getListProductRunAutoUpdate()
        if(res.status){
            commit('setListUpdate', res.data)
            commit('setNextUpdateTime', res.next_update)
            commit('setStatusLoading', false)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
  