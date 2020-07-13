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
    let key=e.key;
    this.props.onBreadcrumb(key)
  };
  bindMenu(menulist){
    let MenuList = menulist.map((item)=>{
      let Icons = antIcons[item.menu_logo];
      // console.log(item.menus.length);
      if (item.menus.length == 0){
        return <Menu.Item key={item.menu_id} icon={<Icons/>} ><Link to={item.menu_url}>{item.menu_nameZh}</Link></Menu.Item>
      }else {
        // console.log(item.menuchilds.length)
        return <SubMenu key={item.menu_id} icon={<Icons/>} title={item.menu_nameZh} >

          {this.bindMenu(item.menus)}
        </SubMenu>
      }
    });
    return MenuList
  }

  componentWillMount() {
    let menulist = JSON.parse(localStorage.getItem('menu2'));

    let list =  this.bindMenu(menulist)
    this.setState({
      leftMenu : list
    });
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
