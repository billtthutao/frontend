import React, { Component } from 'react'
import './List.css'
import Item from '../Item/Item'
import PropTypes from 'prop-types'

export default class List extends Component {

    static propTypes = {
        changeItemDoneStatus: PropTypes.func.isRequired,
        toDos: PropTypes.array.isRequired,
        deleteToDo: PropTypes.func.isRequired
    }

    static defaultProps = {
        toDos: []
    }

    changeItemDoneStatus = this.props.changeItemDoneStatus;
    deleteToDo = this.props.deleteToDo;
    
    render() {
        let {toDos} = this.props;

        return (
            <div className='list_toDoList'>
                {
                    toDos.map(item => {
                        return <Item deleteToDo={this.deleteToDo} changeItemDoneStatus={this.changeItemDoneStatus} key={item.id} {...item}/>
                    })
                }
            </div>
        )
    }
}
