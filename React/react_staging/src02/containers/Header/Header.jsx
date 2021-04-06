import {connect} from 'react-redux'
import Header from '../../components/Header/Header'

const mapStateToProps = (state) => {
    return {count:state};
}

const mapDispatchToProps = {}

export default connect(mapStateToProps,mapDispatchToProps)(Header)