import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Upload, Input, Card, message } from 'antd'
import { UploadOutlined, CheckOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import { submitRequests } from '../../api'
import { unCacheUser } from '../../redux/actions/user'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};


class RequestSubmit extends Component {

    form = React.createRef()

    //handle the single file upload
    normFile = (e) => {
        console.log('Upload event:', e, this.form.current);
        let { file, fileList } = e;

        if (e.file.status === 'done') {
            if (e.file.response.code === 0 && e.file.response.data !== null) {
                message.success('File upload successful')
                const { name, url } = e.file.response.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else if (e.file.response.code === 405) {
                this.props.unCacheUser()
                this.props.history.replace('/launch')
            } else {
                message.error('File upload failed, reason: '+e.file.response.msg)
                this.form.current.setFieldsValue({ upload: [] })
                e.fileList = []
                e.file = {}
            }
        } else if (e.file.status === 'error') {
            message.error('File upload failed, please retry!')
            this.form.current.setFieldsValue({ upload: [] })
        }

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    //submit the form data to back end to process
    onFinish = async (values) => {
        console.log('Received values of form: ', values);
        if(values.upload === undefined || values.upload.length === 0){
            message.warn("Please upload your request file!")
        }else{
            let response = await submitRequests(this.requestType, values.upload, values.comment)
            if (response.code === 0) {
                message.success(response.data)
                this.form.current.setFieldsValue({ comment: "", upload: [] })
            } else if (response.code === 405) {
                this.props.unCacheUser()
                this.props.history.replace('/launch')
            } else {
                message.error(response.msg + ":" + response.data)
            }
        }
    };

    render() {
        let {requestType} = this.props.location.state || {}
        this.requestType = requestType

        const title = this.requestType === 'global_mobility' ? 'Submit Global-International Mobility Proxy Forms' :
                      this.requestType === 'domestic_mobility' ? 'Submit Domestic Mobility Proxy Forms' : 
                                           'Submit Proxy Forms';

        const pathName = this.requestType === 'global_mobility' ? '/dashboard/gi-check' : 
                         this.requestType === 'domestic_mobility' ? '/dashboard/do-check' : 
                                              'dashboard/xx-check';

        const extra = (<Button type="primary" icon={<CheckOutlined />} onClick={() => this.props.history.push({pathname:pathName,state:{requestType:this.requestType}})}>Check</Button>)

        return (
            <Card title={title} extra={extra}>
                <Form name="validate_other" {...formItemLayout} onFinish={this.onFinish} ref={this.form}>
                    {/* parameter name is identifying the file-name parm sent to back end */}
                    <Form.Item
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={this.normFile}
                        extra="Upload proxy forms data"
                    >
                        {/* backend should upload the file to oss server and return the result below
                            {
                                "status": 0,
                                "data": {
                                    "name": "file-xxxxxxxx",
                                    "url": "http://xxxxxxxxx"
                                }
                            }
                        */}
                        <Upload name="requestFile" action="/proxyForm/upload" listType="text" accept=".csv, .xls, .xlsx" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name="comment" label="Comment">
                        <Input.TextArea allowClear={true} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default connect(
    state => ({}),
    { unCacheUser }
)(withRouter(RequestSubmit))
