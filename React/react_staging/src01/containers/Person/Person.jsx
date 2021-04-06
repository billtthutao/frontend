import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addPerson} from '../../redux/actions/person'
import {nanoid} from 'nanoid'

class Person extends Component {
    personName = React.createRef();
    personAge = React.createRef();

    addPerson = () => {
        const person = {id: nanoid(), name: this.personName.current.value, age: this.personAge.current.value*1}
        this.props.addPerson(person)
        this.personName.current.value = ''
        this.personAge.current.value = ''
    }

    render() {
        let {count} = this.props;

        return (
            <div>
                <h2>我是Person组件,Count组件的结算结果为{count}</h2>
                <hr></hr>
                <span>姓名：</span><input ref={this.personName} type='text' placeholder='person name'></input>&nbsp;
                <span>年龄：</span><input ref={this.personAge} type='text' placeholder='person age'></input>&nbsp;
                <input onClick={this.addPerson} type='button' value='添加'></input>
                <hr></hr>
                <ul>
                {
                    this.props.persons.map(person => {
                        return <li key={person.id}>{person.name}--{person.age}</li>
                    })
                }
                </ul>
            </div>
        )
    }
}

export default connect(
    state => ({persons:state.persons,count:state.count}),
    {
        addPerson
    }
)(Person)
