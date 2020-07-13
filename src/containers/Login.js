import React from 'react';  //导入react
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './css/Login.css'
//xxx 组件名
import {inject,observer} from "mobx-react";
import axios from "../utils/axios";
import Roleapi from "../api";

@inject('data')
@observer
class Login extends React.Component {
//构造函数
  constructor(props) {
    super(props);
    this.state = {
      MenuList:[]
    }
  };
  //登录事件
    onFinish=value=>{
    // console.log(value.username);
    this.props.data.username = value.username
    this.props.data.login(value).then((res)=>{
      //登录后请求数据
      // console.log(data);
      // console.log(res);

      return new Promise((resolve)=>{
        let access_token = localStorage.getItem('access_token');
        console.log(access_token);
        axios({
          method: 'get',
          url: Roleapi.userRole.getUserInfo,
          headers: {
            "Authorization": "Bearer" + access_token
          }
        }).then((res) => {
          //获取当前登录信息
          console.log(res);
          if (res.data.code == 200) {
            if(res.data.data.roles[0].status != 0){
              message.warning('此账号禁用')
            }else {
              message.success('登录成功');
              console.log(res.data.data.roles[0].status);
              this.props.data.cundangqianID = res.data.data.roles[0].role_id;
              let menu2 = res.data.data.roles[0].secendMenus;
              localStorage.setItem('menu2', JSON.stringify(menu2));
              resolve('ok')
            }
          }else {
            resolve('no')
          }
        });
      }).then((res)=>{
        console.log(res);
        if (res == 'ok'){
          this.props.history.push('/index/HomePage');   //路由跳转
        }
      })
      //获取菜单
    }).catch((err)=>{
      // console.log(err);
      message.error(err);
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
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username-admin" />
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
