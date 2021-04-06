import {connect} from 'react-redux'
import Header from '../../components/Header/Header'

export default connect(state => ({count:state}),null)(Header)