import React, { Component } from 'react'
import { Card, DatePicker, message } from 'antd'
import { unCacheUser } from '../../redux/actions/user'
import ReactEcharts from 'echarts-for-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './Home.less'
import {getStatistics} from '../../api'

const { RangePicker } = DatePicker;

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {dostatistics:[0,0,0,0,0,0,0,0,0,0,0,0,0],gistatistics:[0,0,0,0,0,0,0,0,0,0,0,0,0],giTotal: 0, doTotal: 0} 
        this.getGiChart()  
        this.getDoChart()
    }

    getGiChart = async () => {
        let response = await getStatistics('global_mobility')
        if(response.code === 0){
            let gistatistics = response.data.statistics
            let giTotal = response.data.total
            this.setState({gistatistics,giTotal})
        }else if(response.code === 405){
            this.props.unCacheUser()
            this.props.history.replace('/launch')   
        }else{
            message.error(response.msg)
        }
    }

    getDoChart = async () => {
        let response = await getStatistics('domestic_mobility')
        if(response.code === 0){
            let dostatistics = response.data.statistics
            let doTotal = response.data.total
            this.setState({dostatistics,doTotal})
        }else if(response.code === 405){
            this.props.unCacheUser()
            this.props.history.replace('/launch')   
        }else{
            message.error(response.msg)
        }
    }

    getOptionForGrantTotal = () => {
        var option = {
            title: {
                text: 'Grant Total'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Global-Int', 'Domestic']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ["1+ Years","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Global-Int',
                    type: 'line',
                    // stack: 'Total',
                    data: this.state.gistatistics
                },
                {
                    name: 'Domestic',
                    type: 'line',
                    // stack: 'Total',
                    data: this.state.dostatistics
                },
            ]
        };

        return option;
    }

    render() {
        return (
            <div className='home'>
                <div className="grantTotal">
                    <Card title='Proxy Forms Request Total' style={{ width: 250 }}>
                        <p>Global-Int: {this.state.giTotal}</p>
                        <p>Domestic: {this.state.doTotal}</p>
                    </Card>
                    <ReactEcharts option={this.getOptionForGrantTotal()} />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { unCacheUser }
)(withRouter(Home))
