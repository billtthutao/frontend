import React, { Component } from 'react'
import './Header.css'
import {nanoid} from 'nanoid'
import PropTypes from 'prop-types'

export default class Header extends Component {

    static propTypes = {
        addToDoItem: PropTypes.func.isRequired
    }

    addItem = (event) =>{
        if(event.keyCode !== 13) return;
        if(event.target.value.trim() === ''){
            alert('输入任务名字不能为空！')
            return;
        }
        let item = {id:nanoid(),name:event.target.value,done:false}
        this.props.addToDoItem(item)
        event.target.value = ''
    }

    render() {
        return (
            <div>
                <input onKeyUp={this.addItem} id='header_input' type='text' placeholder='请输入要完成的任务的名称，按回车键确认'></input>
            </div>
        )
    }
}
