import React, { Component } from 'react'
import './Item.css'
import PropTypes from 'prop-types'

export default class Item extends Component {

    static propTypes = {
        changeItemDoneStatus: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired
    }

    state = {flag:false}

    backgroundColor = (flag) => {
        return () => {
            this.setState({flag:flag})
        }
    }

    changeItemDoneStatus = (id) => {
        return (event) => {
            this.props.changeItemDoneStatus(id,event.target.checked)
        }
    }

    handleDelete = id => {
        this.props.deleteToDo(id);
    }

    render() {
        let {id,name,done} = this.props;
        return (
            <div onMouseEnter={this.backgroundColor(true)} onMouseLeave={this.backgroundColor(false)} className='item' style={{backgroundColor: this.state.flag?'#ddd':'white'}}>
                <input type='checkbox' checked={done} onChange={this.changeItemDoneStatus(id)}></input>
                <span>{name}</span>
                <input onClick={()=>this.handleDelete(id)} className='delBtn' type='button' value='删除' style={{display:this.state.flag?'block':'none'}}></input>
            </div>
        )
    }
}
