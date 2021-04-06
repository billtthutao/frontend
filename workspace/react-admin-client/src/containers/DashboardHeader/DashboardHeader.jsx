import React, { Component } from 'react'
import { connect } from 'react-redux'
import './DashboardHeader.less'
import { unCacheUser } from '../../redux/actions/user'
import Logo from '../../assets/images/logo.png'
import { withRouter } from 'react-router-dom'
import { Layout, Button, Input, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;
const onSearch = value => console.log(value);
const { confirm } = Modal;

class DashboardHeader extends Component {

    logoff = (props) => {
        confirm({
            title: 'Do you Want to logoff?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk: () => {
                message.success('Logoff successfully')
                //clear the cached user in store
                this.props.unCacheUser()
                //Route to launch
                this.props.history.replace('/launch')
            },
            onCancel() {
            },
        });
    }

    render() {
        return (
            <Header className="dashboard-header">
                <div className="logo" >
                    <img src={Logo} alt='logo'></img>
                </div>
                <div className="user-info">
                    <span>Welcome, {this.props.user}</span>
                </div>
                <div className="logoff">
                    <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                    <Button onClick={this.logoff} type="link" >Logoff</Button>
                </div>
            </Header>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { unCacheUser }
)(withRouter(DashboardHeader))
