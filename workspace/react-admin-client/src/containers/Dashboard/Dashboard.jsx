import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './Dashboard.less'
import { Layout } from 'antd';
import DashboardSider from '../DashboardSider/DashboardSider'
import DashboardHeader from '../DashboardHeader/DashboardHeader'
import DashboardContent from '../DashboardContent/DashboardContent'
import DashboardBreadcrumb from '../DashboardBreadcrumb/DashboardBreadcrumb'

const { Footer } = Layout;

class Dashboard extends Component {
    render() {
        let { user } = this.props;

        if (Object.keys(user).length === 0) {
            return <Redirect to="/launch"></Redirect>
        }

        return (
            <Layout>
                <DashboardHeader/>
                <Layout>
                    <DashboardSider/>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <DashboardBreadcrumb/>
                        <DashboardContent/>
                        <Footer className='dashboard-footer'>&copy; Copyright 2021 - IBM CEPS - All Rights Reserved</Footer>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default connect(state => ({ user: state.user }), {})(Dashboard)
