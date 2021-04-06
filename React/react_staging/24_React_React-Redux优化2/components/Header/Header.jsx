import React, { Component } from 'react'

export default class Header extends Component {

    render() {
        let {count} = this.props;
        return (
            <div>
                <h2>计算结果为：{count}</h2>
            </div>
        )
    }
}

