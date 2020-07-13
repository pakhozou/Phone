import React from 'react';  //导入react
import {Link} from 'react-router-dom'
import {Menu} from 'antd'

import * as antIcons from '@ant-design/icons';

import {inject,observer} from "mobx-react";

const { SubMenu } = Menu;
//xxx 组件名
@inject('data')
@observer
class SiderLink extends React.Component {
//构造函数
    constructor(props) {
      super(props)
      this.state = {

        leftMenu:[]
      }
    };
    //点击key
  handleClick = e => {
    console.log('click ', e);
    let key=e.key
    this.props.onBreadcrumb(key)
  };
  bindMenu(menulist){
    let MenuList = menulist.map((item)=>{
      let Icons = antIcons[item.menuIcon];
      if (item.menuChilds.length === 0){
        return <Menu.Item key={item.menuId} icon={<Icons/>} ><Link to={item.menuUrl}>{item.menuName}</Link></Menu.Item>
      }else {
        return <SubMenu key={item.menuId} icon={<Icons/>} title={item.menuName} >
          {this.bindMenu(item.menuChilds)}
        </SubMenu>
      }
    });
    return MenuList
  }
    componentWillMount() {
      console.log(this.props.data.data)
      let list =  this.bindMenu(this.props.data.data)
      console.log(list);
      this.setState({
        leftMenu : list
      })
    }

//渲染
    render() {
        return (
            <div>
              <Menu
                onClick={this.handleClick}
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                {this.state.leftMenu}
              </Menu>
            </div>
        )
    }
}

export {SiderLink as default}
