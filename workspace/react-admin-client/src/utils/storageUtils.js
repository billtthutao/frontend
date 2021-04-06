// import store from 'store'

const USER_KEY = 'user_key'
const storageUtils = {
    // saveUser: user => store.set(USER_KEY,user),
    // getUser: () => store.get(USER_KEY) || {}, 
    // removeUser: () => store.remove(USER_KEY)
    saveUser: user => sessionStorage.setItem(USER_KEY,JSON.stringify(user)),
    getUser: () => JSON.parse(sessionStorage.getItem(USER_KEY) || '{}'), 
    removeUser: () => sessionStorage.removeItem(USER_KEY)
}

export default storageUtils;