import React, {useEffect,useState} from 'react';  //导入react
import {
  Table,
  Space,
  Button,
  Modal,
  Tree,
  Popconfirm,
  Form,
  Select,
  Row,
  Col,
  } from 'antd';

// import {Link} from "react-router-dom";

import {inject,observer} from "mobx-react";
import './css/Authority.css'//引入css
import axios from "axios";
import Path from '../../api/index'

//*****2020/7/7邹麒瑞改******
//xxx 组件名
@inject('data')
@observer
class AuthorityRole extends React.Component {
  formRef = React.createRef();
  //构造函数
   constructor(props) {
        super(props)
        this.state = {
          //编辑显示隐藏
          visible: false,

          //添加model
          addvisible:false,
          confirmLoading:false,

          checked:'',
          //当前页
          current:1,
          //每页显示
          pageSize:3,
          //总条数
          total:0,
          //默认第几页
          defaultCurrent:1,
          //是否可以条状
          showQuickJumper:1

        }
    }

    showcaozuo(data){
     if (data.role_id == 1){
       data.status =1
     }
     let disableStatus = data.status
      return disableStatus
      }
    //*****编辑函数******


    //编辑
    Edit(id) {
    console.log(id);
    this.setState({
      visible: true,
    });

  }
    //模态框确定按钮
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
    //模态框取消按钮
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
    //
    // onExpand = expandedKeys => {
    // // console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // // or, you can remove all expanded children keys.
    // };
    //
    onCheck = checkedKeys => {
      console.log('onCheck', checkedKeys);
      this.setState({
        checked:checkedKeys
      });
      console.log(this.state.checked)
    };

    onSelect = (selectedKeys, info) => {
      console.log('onSelect', info);

    };

    //删除事件
    Del(id){
      console.log(id.role_id);
      axios.post('/api/user/role/deleteRoleById',
        {
          roleId : id.role_id
        },
        {
          transformRequest:[
            function(data){
              let params = "";
              var arr = [];
              for(var key in data){
                arr.push(key+"="+data[key]);
              }
              params = arr.join("&");
              return params;
            }
          ]
        }).then((res)=>{
        console.log(res);
        this.getRolelist()      //调用数据
      })

    }
    //  分页
    fenye(){
      const fy = {
        //  当前页
        current:this.state.current,
        //  每页显示
        pageSize:this.state.pageSize,
        //  总条数
        total:this.state.total,
        //  点击下一页
        onChange:(current)=> this.changPage(current),
        //  每页显示变化
        onShowSizeChange:(Current,pageSize) =>{
          console.log(pageSize);
          this.onShowSizeChange(Current,pageSize)
        },
        //  默认第几页
        defaultCurrent:this.state.defaultCurrent,
        //是否可以跳转
        showQuickJumper:this.state.showQuickJumper,
      };
      return fy
    }

    //点击页码事件
    changPage(current){
    // console.log(current);
    this.setState({
      current:current
    })
    }
    //变化回调
    onShowSizeChange(Current,pageSize){
      console.log(Current,pageSize)
    }
      //*****添加函数*****
      //显示添加
    showModel=()=>{
      this.setState({
        addvisible:true
      })
      };
    //提交确定按钮
    onFinish = (value) =>{
      console.log(value);
      this.formRef.current.resetFields();   //清空
    };
    //点击取消按钮
    editmotai(){
      this.setState({
        addvisible:false,
      })
      console.log('清空')
      this.formRef.current.resetFields();   //清空
    };
    //点击右上角取消按钮
    handleCanceltwo = e => {
      // console.log(e);
      this.setState({
        addvisible: false,
      });
    };

    //请求角色数据
    getRolelist() {
      axios.get('/api/user/role/getRoleList').then((res) => {
        // console.log('获取的角色');
        // console.log(res.data.data.length);
        this.total = res.data.data.length;    //获取总条数
        this.props.data.getRole(res.data.data)
      })
    }
    //获取菜单
    getMenuList(){
      axios.get('/api/user/role/getMenuList').then((res)=>{
        console.log('获取的menu');
        console.log(res);
        this.props.data.getMenu(res.data.data)
      })
    }
    //挂在前
    componentWillMount() {
      //挂载前执行请求数据
      this.getRolelist();
      //获取菜单
      this.getMenuList();
    }
    //挂载后
    componentDidMount() {

    }

//渲染
    render() {
//取消添加按钮
      const  validateMessages = {
        required: "'${name}' 是必选字段",
      }

      //表格
      const columns = [
        {
          title: '角色ID',
          dataIndex: 'role_id',
          key: 'role_id',
          render: text => <a>{text}</a>,
        },
        {
          title: '角色',
          dataIndex: 'role_nameZh',
          key: 'role_nameZh',
        },
        {
          title: '操作',
          key: 'action',
          render: (text,record) => (
            <Space size="middle" >
              <Button type='link' onClick={()=>this.Edit(record.id)} disabled={this.showcaozuo(text)}>编辑</Button>
              <Popconfirm
                title="确定删除吗？"
                onConfirm={()=>this.Del(text)}
                okText="确定"
                cancelText="取消">
                <Button type='link' disabled={this.showcaozuo(text)}>删除</Button>
              </Popconfirm>
            </Space>
          ),
        },
      ];
      //树形控件数据
      const treeData = [
        {
          title: '商品管理',
          key: '1',
          children: [
            {
              title: '商品列表',
              key: '2',
            },
            {
              title: '添加商品',
              key: '3',
            },
          ],
        },
        {
          title: '优惠券管理',
          key: '4',
        },
        {
          title: '品牌管理',
          key: '5',
        },
        {
          title: '类型管理',
          key: '6',
        },
        {
          title: '订单管理',
          key: '7',
          children:[
            {
              title: '订单列表',
              key: '8',
            },
            {
              title: '发货管理',
              key: '9',
            },
            {
              title: '未处理异常订单',
              key: '10',
            },
          ]
        },
        {
          title: '销售管理',
          key: '11',
          children: [
            {
              title: '销售统计表',
              key: '12',
            },
          ],
        },
        {
          title: '用户管理',
          key: '13',
          children: [
            {
              title: '用户列表',
              key: '14',
            },
          ],
        },
        {
          title: '库存管理',
          key: '15',
          children: [
            {
              title: '库存列表',
              key: '16',
            },
          ],
        },
        {
          title: '权限列表',
          key: '17',
          children: [
            {
              title: '角色列表',
              key: '18',
            },
            {
              title: '运营人员管理',
              key: '19',
            },
          ],
        },
      ];
        return (
            <div>
              <Row >
                <Col span={4} offset={16}>
                  <Button type='primary' onClick={this.showModel}>添加</Button>
                </Col>
              </Row>
              {/*table表格*/}
              <Table
                className='RoleTable'
                columns={columns}
                dataSource={this.props.data.datalist}
                pagination={this.fenye()}/>


              {/*编辑弹框*/}
              <Modal
                title="权限列表"
                okText='确定'
                cancelText='取消'
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
              {/*树形控件*/}
                <Tree
                  checkable
                  // onExpand={this.onExpand}
                  onCheck={this.onCheck}
                  onSelect={this.onSelect}
                  treeData={treeData}
                />
              </Modal>

            {/*  添加弹框*/}
              <Modal
                title="添加"
                visible={ this.state.addvisible}
                //取消两个原始按钮
                footer={[]}
                onCancel={this.handleCanceltwo}
              >
                <Form
                  name="nest-messages"
                  onFinish={this.onFinish}
                  validateMessages={validateMessages}
                  ref={this.formRef}>

                  <Form.Item name={['user']} label="选择角色" rules={[{ required: true }]}>
                    <Select>
                      <Select.Option value="1" disabled={true}>超级管理员</Select.Option>
                      <Select.Option value="2">普通管理员</Select.Option>
                      <Select.Option value="3">客服</Select.Option>
                      <Select.Option value="4">商品管理员</Select.Option>
                      <Select.Option value="5">营业管理员</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name={'Treevalue'} label="选择权限">
                    <Tree
                      checkable
                      // onExpand={this.onExpand}
                      onCheck={this.onCheck}
                      onSelect={this.onSelect}
                      treeData={treeData}
                    />
                  </Form.Item>
                  <Form.Item >
                    <Button type="primary" htmlType="submit">提交</Button>
                    <Button type="button" onClick={this.editmotai.bind(this)}>取消</Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
        )
    }
}

export {AuthorityRole as default}
