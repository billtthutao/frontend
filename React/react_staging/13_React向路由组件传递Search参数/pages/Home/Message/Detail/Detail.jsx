import React, { Component } from 'react'
import qs from 'querystring'

export default class Detail extends Component {
    state = {messages:[{id:'01',title:'Message001',content:'我是Message 001'},
    {id:'02',title:'Message002',content:'我是Message 002'},{id:'03',title:'Message003',content:'我是Message 003'}]};

    render() {
        let {search} = this.props.location
        let {messageId,messageTitle} = qs.parse(search.slice(1))
        let messageContent = this.state.messages.find(message=>message.id === messageId)

        return (
            <div>
                <ul>
                    <li>id: {messageContent.id}</li>
                    <li>title: {messageContent.title}</li>
                    <li>content: {messageContent.content}</li>
                </ul>
            </div>
        )
    }
}
