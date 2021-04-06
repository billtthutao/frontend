import {connect} from 'react-redux'
import Panel from '../../components/Panel/Panel'
import {countIncrementAction,countDecrementAction, countIncrementAsyncAction} from '../../redux/count_action'

export default connect(
    state=>({count:state}),
    {
        increment: countIncrementAction,
        decrement: countDecrementAction,
        incrementAsync: countIncrementAsyncAction
    })
    (Panel)