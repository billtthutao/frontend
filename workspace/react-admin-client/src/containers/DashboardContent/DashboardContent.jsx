import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from '../Home/Home'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';
import RequestSubmit from './RequestSubmit'
import RequestCheck from './RequestCheck'
import RequestStatistics from './RequestStatistics'
import RequestDetails from './RequestDetails'

const { Content } = Layout;

class DashboardContent extends Component {
    render() {
        return (
            <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280}}>
                <Switch>
                    <Route path="/dashboard/home" component={Home}></Route>
                    <Route path="/dashboard/gi-submit"  render={(props)=><RequestSubmit key={props.location.pathname} {...props}/>}></Route>
                    <Route path="/dashboard/do-submit"  render={(props)=><RequestSubmit key={props.location.pathname} {...props}/>}></Route>
                    <Route path="/dashboard/gi-check" render={(props)=><RequestCheck key={props.location.pathname} {...props}/>}></Route>
                    <Route path="/dashboard/do-check" render={(props)=><RequestCheck key={props.location.pathname} {...props}/>}></Route>
                    <Route path="/dashboard/gi-statistics" render={(props)=><RequestStatistics key={props.location.pathname} {...props}/>}></Route>
                    <Route path="/dashboard/do-statistics" render={(props)=><RequestStatistics key={props.location.pathname} {...props}/>}></Route>
                    <Route path="/dashboard/do-request-detail" render={(props)=><RequestDetails key={props.location.pathname} {...props}/>}></Route>
                    <Route path="/dashboard/gi-request-detail" render={(props)=><RequestDetails key={props.location.pathname} {...props}/>}></Route>
                    <Redirect to="/dashboard/home" />
                </Switch>
            </Content>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(DashboardContent)
