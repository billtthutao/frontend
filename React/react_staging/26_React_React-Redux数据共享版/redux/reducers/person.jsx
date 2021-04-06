import {ADDPERSON} from '../count_const'
import {nanoid} from 'nanoid'

const initState = [{id:nanoid(),name: 'Tom', age: 18}]

export default function personReducer(prevState=initState,action){
    const {type,data} = action
    switch (type) {
        case ADDPERSON:
            //这里不能用prevState.unshift(data), 因为如果这样用，返回的prevState还是同一个对象，使得redux无法识别到状态发生了变化
            return [data,...prevState]
        default:
            return prevState;
    }
}