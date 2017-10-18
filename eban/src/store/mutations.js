import state from './state'

const mutations = {
    setsliderlist:(state,payload)=> {
        state.sliderList = payload
    },
    setdetaildata:(state,payload)=>{
        state.detaildata = payload
    },
    setuser:(state,value)=>{
        state.user = value
    },
    setuserinfo:(state,value)=>{
        state.userinfo = value
    },
    setpassword:(state,password)=>{
        state.password = password
    }
}

export default mutations