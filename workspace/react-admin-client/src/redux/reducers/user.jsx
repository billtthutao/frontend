import {CACHEUSER, UNCACHEUSER} from '../user_const'
import storageUtils from '../../utils/storageUtils'

const initUser = storageUtils.getUser();

export default function countReducer(prevState=initUser,action){
    const {type,data} = action;
    switch (type) {
        case CACHEUSER:
            storageUtils.saveUser(data);
            return data;
        case UNCACHEUSER:
            storageUtils.removeUser();
            return {};
        default:
            return prevState;
    }
}