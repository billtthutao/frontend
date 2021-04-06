import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Launch from './containers/Launch/Launch'
import Dashboard from './containers/Dashboard/Dashboard'

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/launch" component={Launch}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Redirect to="/launch" />
      </Switch>
    )
  }
}
