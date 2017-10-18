import state from './state'

const getters = {
    sliderList(state){
        return state.sliderList
    },
    detaildata(state){
        return state.detaildata
    },
    user(state){
        return state.user
    },
    userinfo(state){
        return state.userinfo
    },
    password(state){
        return state.password
    }
}
export default getters