import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom'
import Detail from './Detail/Detail'

export default class Message extends Component {
    state = {messages:[{id:'01',title:'Message001',content:'我是Message 001'},
    {id:'02',title:'Message002',content:'我是Message 002'},{id:'03',title:'Message003',content:'我是Message 003'}]};

    pushLink = (request) => {
        let {pathname,state} = request;
        this.props.history.push(pathname,state)
    }

    replaceLink = (request) => {
        let {pathname,state} = request;
        this.props.history.replace(pathname,state)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    goForward = () => {
        this.props.history.goForward()
    }

    render() {
        let {messages} = this.state;
        return (
            <div>
                <ul>
                    {
                        messages.map(message => {
                            return <li key={message.id}>
                                <Link to={{pathname:"/home/message/detail",state:{messageId:message.id,messageTitle:message.title}}}>{message.title}</Link>&nbsp;&nbsp;
                                <input onClick={()=>this.pushLink({pathname:"/home/message/detail",state:{messageId:message.id,messageTitle:message.title}})} type="button" value="push"></input>
                                <input onClick={()=>this.replaceLink({pathname:"/home/message/detail",state:{messageId:message.id,messageTitle:message.title}})} type="button" value="replace"></input>
                            </li>
                        })
                    }
                </ul>
                <hr></hr>
                <Route path="/home/message/detail" component={Detail}></Route>
                <input onClick={this.goBack} type="button" value="后退"></input>&nbsp;
                <input onClick={this.goForward} type="button" value="前进"></input>
            </div>
        )
    }
}
