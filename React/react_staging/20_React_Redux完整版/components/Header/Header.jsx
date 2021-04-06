import React, { Component } from 'react'
import store from '../../redux/store'

export default class Header extends Component {

    render() {
        return (
            <div>
                <h2>计算结果为：{store.getState()}</h2>
            </div>
        )
    }
}

