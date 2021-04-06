import React, { Component } from 'react'
import { connect } from 'react-redux'
import {cachePageNum2} from '../../redux/actions/page2'
import { withRouter } from 'react-router-dom'
import { Button, Card, Table, message } from 'antd'
import { unCacheUser } from '../../redux/actions/user'
import {getRequestDetails} from '../../api'

const { Column } = Table;

class RequestDetails extends Component {
    state = {requestDetails:[],loading:false}

    fetchrequestDetails = async (requestEntityId) => {
        this.setState({loading:true})
        let response = await getRequestDetails(requestEntityId)
        if(response.code === 0){
            let requestDetails = response.data
            this.setState({requestDetails,loading:false})
        }else if(response.code === 405){
            this.props.unCacheUser()
            this.props.history.replace('/launch')   
        }else{
            message.error(response.msg)
            this.setState({loading:false})
        }
    }

    componentDidMount(){
        let { id } = this.props.location.state
        this.fetchrequestDetails(id)
    }
    
    render() {
        let {requestType, attachmentFileName} = this.props.location.state || {}
        this.requestType = requestType

        const title = this.requestType === 'global_mobility' ? `Globla International Proxy Forms Request Detail - ${attachmentFileName}` :
                      this.requestType === 'domestic_mobility' ? `Domestic Proxy Forms Request Detail - ${attachmentFileName}` :
                                           `Proxy Forms Request Detail - ${attachmentFileName}` ;

        const extra = (
            <Button type='primary' onClick={() => { this.props.history.goBack() }}>Return</Button>
        )
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table
                        dataSource={this.state.requestDetails}
                        bordered
                        pagination={{ defaultPageSize: 4, showQuickJumper: true, current: this.props.pageNum, onChange: (current) => this.props.cachePageNum2(current) }}
                        loading={this.state.loading}
                    >
                        <Column title="Report ID" dataIndex="reportId" key="reportId"/>
                        <Column title="Expense Type" dataIndex="expenseType" key="expenseType" />
                        <Column title="Expense Date" dataIndex="expenseDate" key="expenseDate" />
                        <Column title="Amount" dataIndex="expenseAmount" key="expenseAmount" />
                        <Column title="Expense Status" dataIndex="expenseStatusDesc" key="expenseStatusDesc" />
                    </Table>
                </Card>
            </div>
        )
    }
}

export default connect(
    state => ({pageNum:state.pageNum2}),
    {cachePageNum2, unCacheUser}
)(withRouter(RequestDetails))
