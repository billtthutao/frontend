const initState = 1;
export default function pageReducer(prevState=initState,action){
    const {type,data} = action;

    switch (type) {
        case 'cachePageNum':
            return data;
        default:
            return prevState;
    }
}