import React, { Component } from 'react'
import './Footer.css'
import PropTypes from 'prop-types';

export default class Footer extends Component {

    deleteCompletedToDos = this.props.deleteCompletedToDos;

    static propTypes = {
        toDos: PropTypes.array.isRequired,
        deleteCompletedToDos: PropTypes.func.isRequired,
        allSelectHandle: PropTypes.func.isRequired
    }

    static defaultProps = {
        toDos: []
    }

    allSelectHandle = (event) => {
        this.props.allSelectHandle(event.target.checked);
    }

    render() {
        let {toDos} = this.props;
        let completed = toDos.filter(item => item.done).map(item => item.id)
        return (
            <div className='footer'>
                <input type='checkbox' checked={completed.length === toDos.length?true:false} onChange={this.allSelectHandle}></input>
                <span>&nbsp;&nbsp;&nbsp;已完成{completed.length}&nbsp;/&nbsp;全部{toDos.length}</span>
                <input onClick={() => this.deleteCompletedToDos(completed)} className='delBtn' type='button' value='删除已完成任务'/>
            </div>
        )
    }
}
