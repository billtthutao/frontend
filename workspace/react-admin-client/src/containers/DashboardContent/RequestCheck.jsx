import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Card, Table, Tag, Space, message, Modal } from 'antd'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getSubmittedRequests, deleteSubmittedRequest } from '../../api'
import { Link } from 'react-router-dom'
import { cachePageNum } from '../../redux/actions/page'
import { unCacheUser } from '../../redux/actions/user'

const { Column } = Table;
const { confirm } = Modal;

class RequestCheck extends Component {
    state = { submittedRequests: [], loading: false }

    fetchSubmittedRequests = async (type) => {
        this.setState({ loading: true })
        let response = await getSubmittedRequests(type)
        if (response.code === 0) {
            let submittedRequests = response.data
            this.setState({ submittedRequests, loading: false })
        } else if (response.code === 405) {
            this.props.unCacheUser()
            this.props.history.replace('/launch')
        } else {
            message.error(response.msg)
            this.setState({ loading: false })
        }
    }

    deleteRequest = (record) => {
        confirm({
            title: 'Do you Want to delete this request?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk: async () => {
                this.setState({ loading: true })
                let response = await deleteSubmittedRequest(record)
                if (response.code === 0) {
                    let submittedRequests = response.data
                    this.setState({ submittedRequests, loading: false })
                    message.success('Record is deleted successfully')
                } else if (response.code === 405) {
                    this.props.unCacheUser()
                    this.props.history.replace('/launch')
                } else {
                    message.error(response.msg)
                    this.setState({ loading: false })
                }
            },
            onCancel() {
            },
        });
    }

    componentDidMount() {
        this.fetchSubmittedRequests(this.requestType)
    }

    render() {
        let { requestType } = this.props.location.state || {}
        this.requestType = requestType

        const title = this.requestType === 'global_mobility' ? 'Check Global-International Mobility Proxy Forms' :
            this.requestType === 'domestic_mobility' ? 'Check Domestic Mobility Proxy Forms' :
                'Check Proxy Forms';

        const submitPathName = this.requestType === 'global_mobility' ? '/dashboard/gi-submit' :
            this.requestType === 'domestic_mobility' ? '/dashboard/do-submit' :
                '/dashbard/xx-submit';

        const detailPathName = this.requestType === 'global_mobility' ? '/dashboard/gi-request-detail' :
            this.requestType === 'domestic_mobility' ? '/dashboard/do-request-detail' :
                '/dashboard/xx-request-detail';

        const extra = (<Button type="primary" icon={<PlusOutlined />} onClick={() => this.props.history.push({ pathname: submitPathName, state: { requestType: this.requestType } })}>Add</Button>)

        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={this.state.submittedRequests}
                    bordered
                    pagination={{ defaultPageSize: 4, showQuickJumper: true, current: this.props.pageNum, onChange: (current) => this.props.cachePageNum(current) }}
                    loading={this.state.loading}
                >
                    <Column
                        title="File Name"
                        dataIndex="attachmentUrl"
                        key="attachmentUrl"
                        render={(attachmentUrl, record) => {
                            return <a href={attachmentUrl}>{record.attachmentFileName}</a>
                        }}
                    />
                    <Column title="Requester" dataIndex="requester" key="requester" />
                    <Column title="Submit Date" dataIndex="submitDate" key="submitDate" />
                    <Column title="Comment" dataIndex="comment" key="comment" />
                    <Column
                        title="Status"
                        dataIndex="tags"
                        key="tags"
                        render={tags => (
                            <>
                                {tags.map(tag => {
                                    let color = "blue"
                                    return (
                                        <Tag color={color} key={tag}>
                                            {tag}
                                        </Tag>
                                    )
                                })}
                            </>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <Link to={{ pathname: detailPathName, state: { ...record, requestType: this.requestType } }}>Details</Link>
                                <Button onClick={() => this.deleteRequest(record)} type="link">Delete</Button>
                            </Space>
                        )}
                    />
                </Table>
            </Card>
        )
    }
}

export default connect(
    state => ({ pageNum: state.pageNum }),
    { cachePageNum, unCacheUser }
)(withRouter(RequestCheck))
