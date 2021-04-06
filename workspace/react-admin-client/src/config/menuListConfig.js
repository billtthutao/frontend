import {
    AppstoreOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    LinkOutlined,
    SettingOutlined,
    BarChartOutlined
} from '@ant-design/icons';

const menuList = [
    {
        title: 'Home',
        key: '/dashboard/home',
        state: {},
        icon: <AppstoreOutlined />   
    },
    {
        title: 'Mobility GI',
        key: 'Mobility-GI',
        state: {},
        icon: <PieChartOutlined /> ,
        children: [
            {
                title: 'Submit',
                key: '/dashboard/gi-submit',
                state: {requestType:'global_mobility'},
                icon: <DesktopOutlined /> 
            },
            {
                title: 'Check',
                key: '/dashboard/gi-check',
                state: {requestType:'global_mobility'},
                icon: <ContainerOutlined /> 
            },
            {
                title: 'Statistics',
                key: '/dashboard/gi-statistics',
                state: {requestType:'global_mobility'},
                icon: <BarChartOutlined /> 
            }
        ]
    },
    {
        title: 'Mobility Domestic',
        key: 'Mobility-DO',
        state: {},
        icon: <MailOutlined/>,
        children: [
            {
                title: 'Submit',
                key: '/dashboard/do-submit',
                state: {requestType:'domestic_mobility'},
                icon: <SettingOutlined /> 
            },
            {
                title: 'Check',
                key: '/dashboard/do-check',
                state: {requestType:'domestic_mobility'},
                icon: <LinkOutlined /> 
            },
            {
                title: 'Statistics',
                key: '/dashboard/do-statistics',
                state: {requestType:'domestic_mobility'},
                icon: <BarChartOutlined /> 
            }
        ]
    }
]

export default menuList