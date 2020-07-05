import React from 'react';  //导入react
import {Link} from 'react-router-dom'
import {Menu} from 'antd'

import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
//xxx 组件名
class xxx extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {}
    }

//渲染
    render() {
        return (
            <div>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 1 }}
              >
                <Menu.Item key="sub1" icon={<UserOutlined />}>首页</Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="商品管理">
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
              </Menu>
            </div>
        )
    }
}

export {xxx as default}
