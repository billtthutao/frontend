import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom'
import Detail from './Detail/Detail'

export default class Message extends Component {
    state = {messages:[{id:'01',title:'Message001',content:'我是Message 001'},
    {id:'02',title:'Message002',content:'我是Message 002'},{id:'03',title:'Message003',content:'我是Message 003'}]};

    render() {
        let {messages} = this.state;
        return (
            <div>
                <ul>
                    {
                        messages.map(message => {
                            return <li key={message.id}><Link to={`/home/message/detail/${message.id}/${message.title}`}>{message.title}</Link>&nbsp;&nbsp;</li>
                        })
                    }
                </ul>
                <hr></hr>
                <Route path="/home/message/detail/:messageId/:messageTitle" component={Detail}></Route>
            </div>
        )
    }
}
