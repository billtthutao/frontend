import React, { Component } from 'react'
import './context.css'

const MyContext = React.createContext();
const {Provider, Consumer} = MyContext

export default class ContextDemo extends Component {
    state = {user:{name:'Billtt',age:38}}

    render() {
        let info = `用户名:${this.state.user.name},年龄: ${this.state.user.age}`
        return (
            <div className='parent'>
                <h2>我是ContextDemo组件,我传递的信息是{info}</h2>
                <Provider value={{name:this.state.user.name,age:this.state.user.age}}>
                    <A user={this.state.user}/>
                </Provider>
            </div>
        )
    }
}

class A extends Component {

    render() {
        let {user} = this.props;
        let info = `用户名:${user.name},年龄: ${user.age}`

        return (
            <div className='child'>
                <h2>我是A组件,我接收到的信息是：{info}</h2>
                <B/>
            </div>
        )
    }
}

class B extends Component {
    static contextType = MyContext

    render() {
        let info = `用户名:${this.context.name},年龄: ${this.context.age}`

        return (
            <div className='grand'>
                <h2>我是B组件,我接收到的信息是{info}</h2>
                <C/>
            </div>
        )
    }
}

function C() {

    return (
        <div className='grand2'>
            <Consumer>
                {
                    value => 
                        {
                            let info = `用户名:${value.name},年龄: ${value.age}`
                            return <h2>我是C组件,我接收到的信息是{info}</h2>
                        }
                }
            </Consumer>
        </div>
    )
}

