import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuListConfig'

class DashboardBreadcrumb extends Component {

    getPathNodes = (menuList,path) => {
        for(let menu of menuList){
            let result = menu.title;
            if(menu.key === path){
                return result;
            }else if(menu.children){
                let subresult = this.getPathNodes(menu.children,path)
                if(subresult){
                    return result + "/" + subresult;
                }
            }
        }
    }

    render() {

        this.pathNodes = (this.getPathNodes(menuList, this.props.location.pathname) || this.props.location.pathname).split('/')
                        .map(node => node.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()))

        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                {
                    this.pathNodes.map(node => {
                        return <Breadcrumb.Item key={node}>{node}</Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(withRouter(DashboardBreadcrumb))
