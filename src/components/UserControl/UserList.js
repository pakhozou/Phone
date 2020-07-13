import React from 'react';  //导入react
import {Table, Space, Switch, Row, Col, Input, Button} from 'antd';
import axios from 'axios';
import api from '../../api/index'

// xxx 组件名
class UserList extends React.Component {
  // 挂载
  componentDidMount() {
    //传参
    let data = {
      page: this.state.page,
      size: this.state.size,
    }
    //获取用户列表
    axios.get(api.user.userList, {
      params: data
    }).then((res) => {
      console.log(res);
      if (res.data.code == 200) {
        // 把性别1男2女转换成男和女
        res.data.data.data.map((item, index) => {
          if (item.userinfo_sex == 1) {
            item.userinfo_sex = '男'
          } else if (item.userinfo_sex == 2) {
            item.userinfo_sex = '女'
          }
        })
        this.setState({
          data: res.data.data.data,
          total: res.data.data.dataCount
        })
      } else {
        console.log(res);
      }
    }).catch((res) => {
      console.log(res);
    })
  }

  // switch方法
  onChange(param) {
    let userId = param.user_id
    let statue = param.user_statue
    let list = this.state.data
    let nowCode
    if (statue === 1) {
      for (let i = 0; i < list.length; i++) {
        if (userId === list[i].user_id) {
          list[i].user_statue = 0
          nowCode = 0
        }
      }
      this.setState({
        data: list
      })
    }
    else {
      for (let i = 0; i < list.length; i++) {
        if (userId === list[i].user_id) {
          list[i].user_statue = 1
          nowCode = 1
        }
      }
      this.setState({
        data: list
      })
    }
    axios.get(api.user.updateUserStatue, {
      params: {
        statue: nowCode,
        userId
      }
    }).then((res) => {
      // console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  // 分页方法
  onChange2(page) {
    this.setState({
      page
    })
    let upObj = {}
    if (this.state.txtID !== "") {
      upObj.userId = this.state.txtID
    }
    if (this.state.txtName !== "") {
      upObj.userNickName = this.state.txtName
    }
    if (this.state.txtPhone !== "") {
      upObj.phone = this.state.txtPhone
    }
    upObj.page = page
    upObj.size = this.state.size
    console.log(page);
    // let data = {
    //   userId: this.state.txtID,
    //   userNickName: this.state.txtName,
    //   phone: this.state.txtPhone,
    //   page:page,
    //   size: this.state.size,
    // }
    // console.log(data);
    axios.get(api.user.userList, {
      params: upObj
    }).then((res) => {
      console.log(res);
      if(res.data.code==200){
        res.data.data.data.map((item, index) => {
          if (item.userinfo_sex == 1) {
            item.userinfo_sex = '男'
          } else if (item.userinfo_sex == 2) {
            item.userinfo_sex = '女'
          }
        })
        this.setState({
          data: res.data.data.data,
        })
      }
    })
  }

  // 双向绑定通过ID搜索
  txtID(e) {
    this.setState({
      txtID: e.target.value
    })
  }

  // 双向绑定通过name搜索
  txtName(e) {
    this.setState({
      txtName: e.target.value,
    })
  }

  // 双向绑定通过phone搜索
  txtPhone(e) {
    this.setState({
      txtPhone: e.target.value
    })
  }

  //查看详情
  gotodetail(id) {
    this.props.history.push({
      pathname: '/index/UserControl/UserDetail/' + id
    })
  }

  //搜索
  gotosearch() {
    let upObj = {}
    if (this.state.txtID !== "") {
      upObj.userId = this.state.txtID
    }
    if (this.state.txtName !== "") {
      upObj.userNickName = this.state.txtName
    }
    if (this.state.txtPhone !== "") {
      upObj.phone = this.state.txtPhone
    }
    upObj.page = 1
    upObj.size = this.state.size

    axios.get(api.user.userList, {
      params: upObj
    }).then((res) => {
      console.log(res);
      if (res.data.code == 200) {
        res.data.data.data.map((item, index) => {
          if (item.userinfo_sex == 1) {
            item.userinfo_sex = '男'
          } else if (item.userinfo_sex == 2) {
            item.userinfo_sex = '女'
          }
        })
        this.setState({
          data: res.data.data.data,
          total: res.data.data.dataCount
        })
      } else {
        console.log(res);
      }
    }).catch((res) => {
      console.log(res);
    })
  }

//重置
  gotoreset() {
    this.setState({
      txtID: '',
      txtName: '',
      txtPhone: ''
    })
    let data = {
      page: 1,
      size: this.state.size,
    }
    axios.get(api.user.userList, {
      params: data
    }).then((res) => {
      console.log(res);
      if (res.data.code == 200) {
        res.data.data.data.map((item, index) => {
          if (item.userinfo_sex == 1) {
            item.userinfo_sex = '男'
          } else if (item.userinfo_sex == 2) {
            item.userinfo_sex = '女'
          }
        })
        this.setState({
          data: res.data.data.data,
          total: res.data.data.dataCount
        })
      } else {
        console.log(res);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

//构造函数
  constructor(props) {
    super(props)
    this.gotodetail = this.gotodetail.bind(this)
    this.state = {
      page: 1,
      size: 3,
      columns: [
        {
          title: '用户ID',
          dataIndex: 'user_id',
          key: 'user_id',
        },
        {
          title: '用户名称',
          dataIndex: 'userinfo_nickname',
          key: 'userinfo_nickname',
        },
        {
          title: '电话号码',
          dataIndex: 'user_username',
          key: 'user_username',
        },
        {
          title: '注册时间',
          key: 'createTime',
          dataIndex: 'createTime',
        },
        {
          title: '性别',
          key: 'userinfo_sex',
          dataIndex: 'userinfo_sex',
        },
        {
          title: '状态管理',
          render: (text, record, index) => (
            <Switch checkedChildren="启用" unCheckedChildren="冻结" checked={text.user_statue} onChange={() => {
              this.onChange(text)
            }}/>
          ),
        },
        {
          title: '操作',
          key: 'operation',
          render: (text, record, index) => (
            <Button onClick={() => {
              this.gotodetail(record.user_id)
            }}>查看</Button>
          ),
        },
      ],
      data: [],
      txtID: '',
      txtName: '',
      txtPhone: ''
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
                用户ID：<Input onChange={this.txtID.bind(this)} value={this.state.txtID} style={input}/>
              </div>
            </Space>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>
              用户名称：<Input onChange={this.txtName.bind(this)} value={this.state.txtName} style={input}/>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>
              电话号码：<Input onChange={this.txtPhone.bind(this)} value={this.state.txtPhone} style={input}/>
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
        <Table columns={this.state.columns} dataSource={this.state.data} pagination={{
          current: this.state.page,
          pageSize: this.state.size,
          total: this.state.total,
          onChange: (page) => {
            this.onChange2(page)
          }
        }}/>
      </div>
    )
  }
}

export {UserList as default}
