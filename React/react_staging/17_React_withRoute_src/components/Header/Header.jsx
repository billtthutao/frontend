import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {

    goBack = () => {
        this.props.history.goBack()
    }

    goForward = () => {
        this.props.history.goForward()
    }
    
    render() {
        return (
            <div>
                <div className="page-header"><h2>React Router Demo</h2></div>
                <input onClick={this.goBack} type="button" value="ει"></input>&nbsp;
                <input onClick={this.goForward} type="button" value="εθΏ"></input>
            </div>
        )
    }
}

export default withRouter(Header)
