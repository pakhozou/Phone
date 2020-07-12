import React from 'react';  //导入react
import { Layout, Breadcrumb,Button } from 'antd';
import {Link} from "react-router-dom";
import './css/Home.css'   //引入css样式
import SiderLink from '../components/SiderLink'   //引入侧边栏
import {observer,inject} from "mobx-react";   //引入内容
import ContentRouter from '../components/ContentRouter'   //引入内容
import { Route} from 'react-router-dom'
import ProductDetails from '../components/Product/ProductDetails'
import XiuGaiProduct from "../components/Product/XiuGaiProduct"



const { Header, Content, Sider } = Layout;
@inject('data')
@observer
//xxx 组件名
class Home extends React.Component {

//构造函数
    constructor(props) {
        super(props)
        this.state = {
          Breadcrumblist :[],
          mbx1:'',
          mbx2:''
        }
    }
    //生成面包屑
  breadcrumb(key){
    console.log('闯过来的'+key)
    let breadcrumblist=JSON.parse(localStorage.getItem('menu2'));
    breadcrumblist.map((item)=>{
      if(item.menuchilds.length){
        if (item.menu_id==43){
          this.setState({
            mbx1:'',
            mbx2:''
          })
        }
        item.menuchilds.map((item2)=>{
          if (item2.menu_id == key){
            this.setState({
              mbx1:<Breadcrumb.Item>{item.menu_nameZh}</Breadcrumb.Item>,
              mbx2:<Breadcrumb.Item><Link to={item2.menu_url}>{item2.menu_nameZh}</Link></Breadcrumb.Item>
            })
          }
        })
      }
      else {
        if (item.menuId==key){

          this.setState({
            mbx1:<Breadcrumb.Item><Link to={item.menu_url}>{item.menu_nameZh}</Link></Breadcrumb.Item>,
            mbx2:''
          })
        }
        if (item.menuId==1){
          this.setState({
            mbx1:'',
            mbx2:''
          })
        }
      }
    })
  }
    //首页点击
    editmbx(){
    this.setState({
      mbx1:'',
      mbx2:''
    })
  }
  Exit=()=>{
    this.props.history.push('/login');
    localStorage.clear();
  }
    //挂在前
    componentWillMount() {
      // console.log(this.props.data.data);
    }

//渲染
    render() {
        return (
            <div>

              <Layout>
                {/*头部*/}
                <Header className="header">
                  <div className="logo" />

                  <div>
                    <h2 className='Headertxt'>
                      手机配件后台管理系统
                    </h2>
                    <div className='Exit'>
                      <Button type='link' onClick={this.Exit}>Exit</Button>
                    </div>
                  </div>
                </Header>


                <Layout>
                  {/*侧边导航*/}
                  <Sider width={200} className="site-layout-background" theme='light'>
                    <SiderLink onBreadcrumb={this.breadcrumb.bind(this)}/>
                  </Sider>


                  <Layout style={{ padding: '0 24px 24px' }}>
                    {/*面包削*/}
                    <Breadcrumb style={{ margin: '16px 0',fontSize:'18px' }}>
                      <Breadcrumb.Item><Link to='/index/HomePage' onClick={this.editmbx.bind(this)}>首页</Link></Breadcrumb.Item>
                      {this.state.mbx1}
                      {this.state.mbx2}
                    </Breadcrumb>

                    {/*内容*/}
                    <Content
                      className="site-layout-background"
                      style={{
                        padding: 24,
                        margin: 0,
                       height:'auto'
                      }}
                    >
                      <ContentRouter/>
                        {/*喜德贵跳转路由*/}
                        <Route path="/index/Product/ProductDetails" component={ProductDetails}/>
                        <Route path="/index/Product/XiuGaiProduct" component={XiuGaiProduct}/>
                    </Content>

                  </Layout>

                </Layout>
              </Layout>
            </div>
        )
    }
}

export {Home as default}
