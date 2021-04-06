import {connect} from 'react-redux'
import React, { Component } from 'react'

class Header extends Component {

    render() {
        let {count,personCount} = this.props;
        return (
            <div>
                <h2>我是Count组件,组件2个person总是为{personCount}</h2>
                <h4>计算结果为：{count}</h4>
            </div>
        )
    }
}

export default connect(state => ({count:state.count,personCount:state.persons.length}),{})(Header)