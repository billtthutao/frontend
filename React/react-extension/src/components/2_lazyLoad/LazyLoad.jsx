import React, { Component, lazy, Suspense } from 'react'
import Header from './Header'
import {NavLink, Route} from 'react-router-dom'
import Load from './Load'

const About = lazy(() => import('./About'))
const Home = lazy(() => import('./Home'))

export default class LazyLoad extends Component {
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
                            <NavLink activeClassName="active" className="list-group-item" to="/about">About</NavLink>
                            <NavLink activeClassName="active" className="list-group-item" to="/home">Home</NavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Suspense fallback={<Load/>}>
                                    <Route path="/about" component={About}></Route>
                                    <Route path="/home" component={Home}></Route>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
