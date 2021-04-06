import {connect} from 'react-redux'
import React, { Component } from 'react'

class Header extends Component {

    render() {
        let {count} = this.props;
        return (
            <div>
                <h2>计算结果为：{count}</h2>
            </div>
        )
    }
}

export default connect(state => ({count:state}),null)(Header)