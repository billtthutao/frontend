import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import About from './pages/About/About'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import MyNavLink from './components/MyNavLink/MyNavLink'

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              <MyNavLink to="/about">About</MyNavLink>
              <MyNavLink to="/home">Home</MyNavLink>

            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                <Switch>
                  <Route path="/about" component={About}></Route>
                  <Route path="/home" component={Home}></Route>
                  <Redirect to="/about"/>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
