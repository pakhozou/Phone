import React from 'react';  //导入react
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './css/Login.css'
//xxx 组件名
import {inject,observer} from "mobx-react";

@inject('data')
@observer
class Login extends React.Component {
//构造函数
  constructor(props) {
    super(props);
    this.state = {
      MenuList:[]
    }
  }
  onFinish=value=>{
    console.log(value.username);
    this.props.data.login(value).then(()=>{
      this.props.data.getMenu();      //获取菜单
      //登录后请求数据
      // console.log(data);
      this.props.history.push('/index/HomePage')   //路由跳转
      //获取菜单

    })
  };

  componentWillMount() {

  }

//渲染
  render() {
    return (
      <div className={'Login'}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username-pakhozou2" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password-123456"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登 录
            </Button>
          </Form.Item>

        </Form>
      </div>
    )
  }
}

export {Login as default}
