import {connect} from 'react-redux'
import Panel from '../../components/Panel/Panel'
import {countIncrementAction,countDecrementAction, countIncrementAsyncAction} from '../../redux/count_action'

const mapStateToProps = (state) => {
    return {count:state}
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: (data) => dispatch(countIncrementAction(data)),
        decrement: (data) => dispatch(countDecrementAction(data)),
        incrementAsync: (data,time) => dispatch(countIncrementAsyncAction(data,time))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Panel)