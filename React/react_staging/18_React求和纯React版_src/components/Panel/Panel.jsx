import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class Panel extends Component {

    state = {count:0}
    myRef1 = React.createRef()

    add = () => {
        let selectNum = parseInt(this.myRef1.current.value);
        let count = this.state.count+selectNum;
        PubSub.publish('count-panel',{count});
        this.setState({count})
    }

    subscribe = () => {
        let selectNum = parseInt(this.myRef1.current.value);
        let count = this.state.count-selectNum;
        PubSub.publish('count-panel',{count});
        this.setState({count})
    }
    addIfOdd = () => {
        let selectNum = parseInt(this.myRef1.current.value);
        if(this.state.count % 2 != 0){
            let count = this.state.count+selectNum;
            PubSub.publish('count-panel',{count});
            this.setState({count})
        }
    }
    addAsync = () => {
        let selectNum = parseInt(this.myRef1.current.value);
        let count = this.state.count+selectNum;
        setTimeout(()=>{
            PubSub.publish('count-panel',{count});
            this.setState({count})
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
