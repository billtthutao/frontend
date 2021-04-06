import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo, getEmployeeInfo } from '../api'
import { message } from 'ant-design-vue';

Vue.use(Vuex)

const state = {
    employee: {},
    user: {}
}

const mutations = {
    LOADEMP(state, { employee }) {
        state.employee = employee
    },
    LOADUSER(state, { user }) {
        state.user = user
    }
}

const actions = {
    searchEmployee({ commit, state }, employeeId) {
        (async () => {
            const response = await getEmployeeInfo(employeeId)

            if (response.code === 0) {
                const employee = response.data
                commit('LOADEMP', { employee })
            } else {
                message.error(response.msg + " : " + response.data)
            }
        })()
    },
    getUser({ commit, state }) {
        (async () => {
            const response = await getUserInfo()

            if (response.code === 0) {
                const user = response.data.attributes
                commit('LOADUSER', { user })
            } else {
                message.error(response.msg)
            }
        })()
    }
}

const getters = {
    userEmail(state) {
        return state.user.sub
    },
    employee(state) {
        return Object.entries(state.employee)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
