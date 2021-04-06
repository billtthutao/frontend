import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import './DashboardSider.less'
import { Link } from 'react-router-dom'
import menuList from '../../config/menuListConfig'
import { withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

class DashboardSider extends PureComponent {

    constructor(props) {
        super(props)
        this.path = this.props.location.pathname
        this.menuNodes = this.generateMenuList(menuList)
    }

    generateMenuList = (menuList) => {
        return menuList.map(menu => {
            if (!menu.children) {
                return (
                    <Menu.Item key={menu.key} icon={menu.icon}>
                        <Link to={{pathname:menu.key,state:menu.state}}>{menu.title}</Link>
                    </Menu.Item>
                )
            } else {
                //check if current item should be open
                const cItem = menu.children.find(item => item.key === this.path)
                if (cItem) {
                    this.openKey = menu.key
                }

                return (
                    <SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
                        {
                            this.generateMenuList(menu.children)
                        }
                    </SubMenu>
                )
            }
        })
    }

    render() {
        this.path = this.props.location.pathname

        return (
            <Sider width={200} className="site-layout-background">
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[this.path]}
                    defaultOpenKeys={[this.openKey]}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {this.menuNodes}
                </Menu>
            </Sider>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(withRouter(DashboardSider))
