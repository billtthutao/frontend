import {connect} from 'react-redux'
import React, { PureComponent } from 'react'
import './Launch.less'
import Logo from '../../assets/images/logo.png'
import { Button, message } from 'antd';
import {userAuth} from '../../api'
import {cacheUser} from '../../redux/actions/user'
import {Redirect} from 'react-router-dom'

class Launch extends PureComponent {

    launch = async () => {
        //axios to do authorization
        const response = await userAuth()

        if(response.code === 0){
            message.success('Authorization is successful')
            //Cache the user in store
            this.props.cacheUser(response.data.attributes.sub)
            //Route to dashboard
            this.props.history.replace('/dashboard')
        } else {
            message.error(response.msg)
        }
    }

    render() {
        let {user} = this.props;

        if(Object.keys(user).length !== 0){
            return <Redirect to="/dashboard"></Redirect>
        }

        return (
            <div className='launch'>
                <header className='launch-header'>
                    <img src={Logo} alt='logo' />
                    <h1>Concur Proxy Form Submittion System</h1>
                </header>
                <section className='launch-content'>
                    <span>Important Note:</span>
                    <span>This system is used by particular authorized users to submit concur report by proxy.</span>
                    <span>It can be used for:</span>
                    <ul>
                        <li>- Mobility GI assignments of the US and Officers direct billed expenses which has a payment type of company paid</li>
                        <li>- Mobility Domestic assignments for the US and Officers direct billed expenses which has a payment type of company paid</li>
                    </ul>
                    <div className='launch-button'>
                        <Button onClick={this.launch} type="primary" size='large'>Launch</Button>
                    </div>
                </section>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {
        cacheUser
    }
    )(Launch)
