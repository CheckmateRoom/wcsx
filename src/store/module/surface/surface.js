const state = {
    surface_data:"",

} 

const getters = {
    isSurface_data(state) {
        return state.surface_data
    },

} 

const actions = {
    sendInformation({ commit }, detail ) {
        commit('sendInformation', detail)
    },

}

const mutations = {
    sendInformation(state, detail) {
        state.surface_data = detail;
    },

}

export default {
    state,
    getters,
    actions,
    mutations
} 

