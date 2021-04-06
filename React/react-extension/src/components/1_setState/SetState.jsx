import React, { Component } from 'react'

export default class SetState extends Component {

    state = {count:0}

    add = () => {
        //SetState方式一
        // this.setState({count:this.state.count+1})
        //SetState方式二
        this.setState((state,props) => {
            return {count:state.count+1}
        })
    }

    render() {
        return (
            <div>
                <h2>当前的结果为{this.state.count}</h2>
                <input onClick={this.add} type='button' value='加+1'></input>
            </div>
        )
    }
}
