import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)
let store = new Vuex.Store({
    mutations,
    getters,
    state
})

export default store;

