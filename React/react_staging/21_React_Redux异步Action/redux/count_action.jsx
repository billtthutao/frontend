import countConst from './count_const'

export const countIncrementAction = (data) => ({type:countConst.INCREMENT,data})
export const countDecrementAction = (data) => ({type:countConst.DECREMENT,data})
export const countIncrementAsyncAction = (data) => {
    return (dispatch) => {
        setTimeout(()=>{
            dispatch(countIncrementAction(data))
        },1000)
    }
}
