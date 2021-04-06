import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    toDoList : []
}

const mutations = {
    ADDTODO(state,{todo}){
        state.toDoList.unshift(todo)
    },
    DELTODO(state,{index}){
        state.toDoList.splice(index,1)
    },
    UPDTODO(state,{index,todo}){
        state.toDoList.splice(index,1,todo)
    },
    UPDALLTODO(state,{done}){
        state.toDoList.forEach(todo => todo.done = done)
    },
    REMDONETODO(state){
        state.toDoList = state.toDoList.filter(todo => !todo.done)
    },
    LOADTODO(state,{todos}){
        state.toDoList = todos
    }
}

const actions = {
    addToDo({commit,state},todo){
        commit('ADDTODO',{todo})
    },
    delToDo({commit,state},index){
        commit('DELTODO',{index})
    },
    remDoneToDo({commit,state}){
        commit('REMDONETODO')
    },
    updateToDo({commit,state},index){
        const todo = state.toDoList[index]
        todo.done = !todo.done
        commit('UPDTODO',{index,todo})
    },
    updateAllToDo({commit,state},done){
        commit('UPDALLTODO',{done})
    },
    loadToDo({commit,state}){
        setInterval(() => {
            const todos = JSON.parse(window.localStorage.getItem('todos') || '[]')
            commit('LOADTODO',{todos})
        }, 500);
    }
}

const getters = {
    todoTotal(state){
        return state.toDoList.length
    },
    doneTotal(state){
        return state.toDoList.filter(todo => todo.done).length
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
