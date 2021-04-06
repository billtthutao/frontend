import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0
}

const mutations = {
    INCREMENT(state,{num}){
        state.count = state.count + num;
    },
    DECREMENT(state,{num}){
        state.count = state.count - num;
    }
}

const actions = {
    increment({commit,state},num){
        commit('INCREMENT',{num})
    },
    decrement({commit,state},num){
        commit('DECREMENT',{num})
    },
    incrementIfOdd({commit,state},num){
        if(state.count%2===1){
            commit('INCREMENT',{num})
        }
    },
    incrementAsync({commit,state},num){
        setTimeout(()=>{
            commit('INCREMENT',{num})
        },1000)
    }
}

const getters = {
    oddOrEven(state){
        return state.count%2 === 0 ? '偶数' : '奇数'
    },
    count(state){
        return state.count
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
