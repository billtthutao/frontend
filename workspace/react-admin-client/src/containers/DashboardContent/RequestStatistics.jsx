import { Button } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Card, message} from 'antd'
import { withRouter } from 'react-router-dom'
import ReactEcharts from 'echarts-for-react'
import { unCacheUser } from '../../redux/actions/user'
import {getStatistics} from '../../api'
    
class RequestStatistics extends Component {

    constructor(props){
        super(props)
        this.state = {statistics:[0,0,0,0,0,0,0,0,0,0,0,0,0]} 
        let {requestType} = this.props.location.state || {}
        this.updateChart(requestType) 
    }

    updateChart = async (requestType) => {
        let response = await getStatistics(requestType)
        if(response.code === 0){
            let statistics = response.data.statistics
            this.setState({statistics})
        }else if(response.code === 405){
            this.props.unCacheUser()
            this.props.history.replace('/launch')   
        }else{
            message.error(response.msg)
        }
    }

    getOption = () => {
        var option = {
            title: {
                text: this.requestType === 'global_mobility' ? 'Global-Int Request Total' : 
                      this.requestType === 'domestic_mobility' ? 'Domestic Request Total' :
                                           'xxxxx Request Total'
            },
            tooltip: {},
            legend: {
                data:['Total']
            },
            xAxis: {
                data: ["1+ Years","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
            },
            yAxis: {},
            series: [{
                name: 'Total',
                type: 'bar',
                data: this.state.statistics
            }]
        };

        return option;
    }
    render() {

        let {requestType} = this.props.location.state || {}
        this.requestType = requestType 

        const title = this.requestType === 'global_mobility' ? 'Global International Request Statistics' :
                      this.requestType === 'domestic_mobility' ? 'Domestic Request Statistics' :
                                           'xxxxx Request Statistics';

        return (
            <div>
                <Card>
                    <Button type='primary' onClick={()=>this.updateChart(this.requestType)}>Update</Button>
                </Card>
                <Card title={title}>
                    <ReactEcharts option={this.getOption()} />
                </Card>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {unCacheUser}
)(withRouter(RequestStatistics))
