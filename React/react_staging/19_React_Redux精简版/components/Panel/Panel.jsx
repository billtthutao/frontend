import React, { Component } from 'react'
import store from '../../redux/store'

export default class Panel extends Component {

    myRef1 = React.createRef()

    add = () => {
        let selectNum = parseInt(this.myRef1.current.value);
        store.dispatch({type:'increment',data:selectNum*1})
    }

    subscribe = () => {
        let selectNum = parseInt(this.myRef1.current.value);
        store.dispatch({type:'subscribe',data:selectNum*1})
    }
    addIfOdd = () => {
        let selectNum = parseInt(this.myRef1.current.value);
        let count = store.getState()
        if(count % 2 !== 0){
            store.dispatch({type:'increment',data:selectNum*1})
        }
    }
    addAsync = () => {
        let selectNum = parseInt(this.myRef1.current.value);
        setTimeout(()=>{
            store.dispatch({type:'increment',data:selectNum*1})
        },1000)
    }

    render() {
        return (
            <div>
                <select ref={this.myRef1}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <input onClick={this.add} type="button" value="+"></input>&nbsp;
                <input onClick={this.subscribe} type="button" value="-"></input>&nbsp;
                <input onClick={this.addIfOdd} type="button" value="Increamt if odd"></input>&nbsp;
                <input onClick={this.addAsync} type="button" value="Increamt async"></input>&nbsp;
            </div>
        )
    }
}
