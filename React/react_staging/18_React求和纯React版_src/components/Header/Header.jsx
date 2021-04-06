import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class Header extends Component {

    state = {
        count:0
    }

    componentDidMount(){
        this.token = PubSub.subscribe('count-panel',(msg,stateObj) => {
            this.setState(stateObj)
        })
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.token)
    }

    render() {
        return (
            <div>
                <h2>计算结果为：{this.state.count}</h2>
            </div>
        )
    }
}

