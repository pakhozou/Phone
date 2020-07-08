import React from 'react';  //导入react
import {Table, Space, Switch, Row, Col, Input, Button} from 'antd';

//xxx 组件名
class UserList extends React.Component {
  //switch方法
  onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  //查看详情
  gotodetail() {
    this.props.history.push('/index/UserControl/UserDetail')
  }

  //搜索
  gotosearch() {
    console.log(this.refs.txtID.state.value);
    console.log(this.refs.txtName.state.value);
    console.log(this.refs.txtMobile.state.value);
  }

//重置
  gotoreset() {
    // this.refs.txtID.state.value = ''
    // this.refs.txtName.state.value = ''
    // this.refs.txtMobile.state.value = ''
  }

//构造函数
  constructor(props) {
    super(props)
    this.gotodetail = this.gotodetail.bind(this)
    this.state = {
      columns: [
        {
          title: '用户ID',
          dataIndex: 'userID',
          key: 'userID',
        },
        {
          title: '用户名称',
          dataIndex: 'userName',
          key: 'userName',
        },
        {
          title: '电话号码',
          dataIndex: 'mobile',
          key: 'mobile',
        },
        {
          title: '注册时间',
          key: 'regTime',
          dataIndex: 'regTime',
        },
        {
          title: '性别',
          key: 'sex',
          dataIndex: 'sex',
        },
        {
          title: '状态管理',
          key: 'state',
          dataIndex: 'state',
          render: (text, record, index) => (
            <Switch defaultChecked onChange={this.onChange}/>
          ),
        },
        {
          title: '操作',
          key: 'operation',
          render: (text, record, index) => (
            <Space size="middle">
              <Button onClick={this.gotodetail}>查看</Button>
              <Button danger onClick={this.gotodel}>删除</Button>
            </Space>
          ),
        },
      ],
      data: [
        {
          userID: '1',
          userName: '深雨',
          mobile: '18328039766',
          regTime: (new Date()).toLocaleDateString(),
          sex: '女',
        },
        {
          userID: '2',
          userName: '星辰',
          mobile: '15244870008',
          regTime: (new Date()).toLocaleDateString(),
          sex: '男',
        },
        {
          userID: '3',
          userName: '楚弥天',
          mobile: '13928630871',
          regTime: (new Date()).toLocaleDateString(),
          sex: '男',
        },
        {
          userID: '4',
          userName: '楚弥真',
          mobile: '18923796547',
          regTime: (new Date()).toLocaleDateString(),
          sex: '女',
        },
        {
          userID: '5',
          userName: '银夜',
          mobile: '13287328765',
          regTime: (new Date()).toLocaleDateString(),
          sex: '男',
        },
        {
          userID: '6',
          userName: '银羽',
          mobile: '13257947954',
          regTime: (new Date()).toLocaleDateString(),
          sex: '女',
        },
        {
          userID: '7',
          userName: '殷夜来',
          mobile: '13551519427',
          regTime: (new Date()).toLocaleDateString(),
          sex: '女',
        },
        {
          userID: '8',
          userName: '安瑾然',
          mobile: '13990592685',
          regTime: (new Date()).toLocaleDateString(),
          sex: '女',
        },
        {
          userID: '9',
          userName: '云焕',
          mobile: '17795853853',
          regTime: (new Date()).toLocaleDateString(),
          sex: '男',
        },
        {
          userID: '10',
          userName: '慕湮',
          mobile: '13964278539',
          regTime: (new Date()).toLocaleDateString(),
          sex: '女',
        },
      ],
    }
  }

//渲染
  render() {
    const style = {padding: '8px 0', fontSize: '16px'}
    const input = {width: '65%'}
    return (
      <div>
        <h2>用户列表</h2>
        {/*<Row>*/}
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Space size="middle">
              <div style={style}>
                用户ID：<Input ref="txtID" style={input}/>
              </div>
            </Space>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>
              用户名称：<Input ref="txtName" style={input}/>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>
              电话号码：<Input ref="txtMobile" style={input}/>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>
              <Space size="middle">
                <Button onClick={this.gotosearch.bind(this)} type="primary">搜索</Button>
                <Button onClick={this.gotoreset.bind(this)}>重置</Button>
              </Space>
            </div>
          </Col>
        </Row>
        <Table columns={this.state.columns} dataSource={this.state.data} pagination={{pageSize: 5,}}/>
      </div>
    )
  }
}

export {UserList as default}
