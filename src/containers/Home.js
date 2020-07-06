import React from 'react';  //导入react

import { Layout, Breadcrumb,Button } from 'antd';


import './css/Home.css'   //引入css样式

import SiderLink from '../components/SiderLink'   //引入侧边栏
import ContentRouter from '../components/ContentRouter'   //引入内容

const { Header, Content, Sider } = Layout;

//xxx 组件名
class Home extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {}
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
                      <Button type='link'>Exit</Button>
                    </div>
                  </div>
                </Header>


                <Layout>
                  {/*侧边导航*/}
                  <Sider width={200} className="site-layout-background" theme='light'>
                    <SiderLink/>
                  </Sider>


                  <Layout style={{ padding: '0 24px 24px' }}>
                    {/*面包削*/}
                    <Breadcrumb style={{ margin: '16px 0' }}>
                      <Breadcrumb.Item>Home</Breadcrumb.Item>
                      <Breadcrumb.Item>List</Breadcrumb.Item>
                      <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>

                    {/*内容*/}
                    <Content
                      className="site-layout-background"
                      style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                      }}
                    >
                      <ContentRouter/>

                    </Content>

                  </Layout>

                </Layout>
              </Layout>
            </div>
        )
    }
}

export {Home as default}
