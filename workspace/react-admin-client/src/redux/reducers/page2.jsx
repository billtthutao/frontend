const initState = 1;
export default function pageReducer2(prevState=initState,action){
    const {type,data} = action;

    switch (type) {
        case 'cachePageNum2':
            return data;
        default:
            return prevState;
    }
}