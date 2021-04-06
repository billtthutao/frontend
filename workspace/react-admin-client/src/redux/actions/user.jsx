import {CACHEUSER, UNCACHEUSER} from '../user_const'

export const cacheUser = data => ({type:CACHEUSER,data})
export const unCacheUser = () => ({type:UNCACHEUSER,data:{}})