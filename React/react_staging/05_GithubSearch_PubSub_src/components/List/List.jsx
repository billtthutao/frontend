import React, { Component } from 'react'
import './List.css'
import PubSub from 'pubsub-js'

export default class List extends Component {

    state = {
        users: [],
        isFirst: true,
        isLoading: false,
        isError: false,
        error: null
    }

    componentDidMount(){
        this.token = PubSub.subscribe('github-search',(msg,stateObj) => {
            this.setState(stateObj)
        })
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.token)
    }

    render() {
        let { users, isFirst, isLoading, isError, error } = this.state;

        return (
            <div className="row">
                {
                    isFirst ? <h2>请输入进行搜索.....</h2> :
                        isLoading ? <h2>Load........</h2> :
                            isError ? <h2>{error}</h2> :
                                users.map(user => {
                                    return (
                                        <div className="card" key={user.href}>
                                            <a href={user.href} target="_blank" rel="noreferrer">
                                                <img src={user.imgSrc} style={{ width: '100px' }} alt='https://avatars.githubusercontent.com/u/6412038?v=3' />
                                            </a>
                                            <p className="card-text">{user.name}</p>
                                        </div>
                                    )
                                })
                }
            </div>
        )
    }
}