import React from 'react';
import {
  Table,
  Input,
  Space,
  Button,
  Row,
  Radio,
  Col,
  Switch,
  Modal,
  Select,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './css/Operational.css';

import {inject,observer} from "mobx-react";

import Roleapi from '../../api/index';
import axios from '../../utils/axios';

const { Option } = Select;
@inject('data')
@observer
//xxx 组件名
class Operational extends React.Component {
//构造函数
  constructor(props) {
    super(props)
    this.state = {
      datalist : [
        {
          id: '1',
          zhiwei: '超级管理员',
          caozuo: '全部功能',
          status:true,
        }],
      //当前页
      current:1,
      //每页显示
      pageSize:3,
      //总条数
      total:0,
      //默认第几页
      defaultCurrent:1,
      //是否可以条状
      showQuickJumper:1,

      //编辑模态框
      visible: false,
      //switch状态
      switchstatus:0,

      options : [
        { label: 1, value: '超级管理员' },
        { label: 2, value: '普通管理员' },
        { label: 3, value: '客服' },
        { label: 4, value: '商品管理员' },
        { label: 5, value: '用户' },
      ],

      editStatus:[],
      userID:0,
      roleID : 1,

    //  添加
      addvisible:false,
      //radio选项
      rolename:[
        {id:1,value:'超级管理员',lable:'超级管理员'},
        {id:2,value:'普通管理员',lable:'普通管理员'},
        {id:3,value:'客服',lable:'客服'},
        {id:4,value:'商品管理员',lable:'商品管理员'},
        {id:5,value:'用户',lable:'用户'}
      ],
      //存下拉值
      optionlist:[],
    //  input密码
      inputpwd:'',
      //账号
      inputuser:'',

        rolelist:[],

        option:[]
    }
  }

  //分页
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
  };

  changPage(current){
    console.log(current);
    this.setState({
      current:current
    },function () {
      this.getuserrole()
    })
  };

  //判断是否禁用
  showcaozuo(data){
    if (data.user_id == 1){
      data.status =1
    }
    let disableStatus = data.status;
    return disableStatus
  };
  //变化回调
  onShowSizeChange(Current,pageSize){
    console.log(Current,pageSize)
  };
  //获取列表数据
  getuserrole(){
    axios.get(Roleapi.userRole.adminList,
      {
        params:{
          page: this.state.current,
          size: this.state.pageSize
        }
      }).then((res)=>{
      console.log('获取的用户');
      console.log(res);
      this.setState({
        total:res.data.data.dataCount
      });
      // console.log(this.state.total);
      let xiutime = res.data.data.data.map((item)=>{
        return item.createTime = this.getdata(item.createTime)
      });
      res.data.data.data.createTime = xiutime;
      //绑定key
      let data = res.data.data.data.map((item)=>{
        item['key'] = item.user_id;
        return item;
      });
      this.props.data.getuserRole(data)
    })
  };
  //是否禁用
  switchcheck=(id,status)=>{
    console.log(id);
    console.log(status);
    if  (status == 1){
      status = 0
    }else {
      status = 1
    }
    axios.get(Roleapi.userRole.updateUserStatue, {
      params: {
        statue: status,
        userId:id,
      }
    }).then((res)=>{
      console.log(res);
      this.getuserrole()
    })
  };

  //如果id为1禁止修改状态
  updateDisable(id,status){
    if(id == 1){
      status = 1;
      let disableStatus = status
      return disableStatus
    }
  };
    getRolelists() {
       let data = []
       new Promise((res2)=>{
            axios.get(Roleapi.userRole.userRole).then((res) => {
                // console.log('获取的角色');
                console.log(res.data.data);
                data = res.data.data.map((item) => {
                    console.log('aaa');
                    // item['key'] = item.role_id;
                    return  <Radio className={'radioStyle'} value={item.role_id}>{item.role_nameZh}</Radio>
                })
                console.log(data)
                if(data.length ){
                  console.log('aaa')
                    res2('ok')
                }
            })
       }).then((res)=>{
           console.log(data)
          if(res == 'ok'){
              this.setState({
                  rolelist:data
              })
          }
       })
            //返回值
    };
  //时间戳
  getdata(createdate){
    const date=new Date(createdate);
    const year=date.getFullYear();
    const month=date.getMonth()+1;
    const day=date.getDay();
    const hour = date.getDate()
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return year+"-"+month+"-"+day+ "  "+ hour+":" +min+":"+sec ;
  };
  //编辑
  Edit=(text)=>{
    this.setState({
      visible: true,
    });
    console.log(text.user_id);
    this.props.data.userID = text.user_id;    //用户id
    this.props.data.roleID = text.role_id;    //角色id
      this.getRolelists()
  };

  //点击添加
  showModel=()=>{
    this.setState({
      addvisible: true,
    });
    this.getOption()
  };
  //添加
  adduser(){
    let roleId = parseInt(this.props.data.isaddid)
    axios.post(Roleapi.userRole.addAdminUser,{
      password:this.props.data.isadduserpwd,
      roleId:roleId,
      username:this.props.data.isaddusername
    },{
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
      if(res.data.code == 200){
        this.setState({
          addvisible:false,
        });
        this.props.data.isaddusername = '';
        this.props.data.isadduserpwd = ''
      }
    })
  };
  //渲染option
  getOption(){
          let data = []
          new Promise((res2)=>{
              axios.get(Roleapi.userRole.userRole).then((res) => {
                  // console.log('获取的角色');
                  console.log(res.data.data);
                  data = res.data.data.map((item) => {
                      console.log('aaa');
                      // item['key'] = item.role_id;
                    return <Option value={item.role_id}>{item.role_nameZh}</Option>
                      // <Option key={item.role_id} value={item.role_id} disabled={true}>{item.role_nameZh}</Option>
                  })
                  console.log(data)
                  if(data.length ){
                      console.log('aaa')
                      res2('ok')
                  }
              })
          }).then((res)=>{
              console.log(data)
              if(res == 'ok'){
                  this.setState({
                      option:data
                  })
              }
          })
          //返回值
  };
  //获取下拉值
  SelectChange=(value,id)=>{
    console.log(value);
    this.props.data.value = value
    // console.log(id);
    let ids = id.key;
    this.props.data.isaddid = ids;
    console.log(typeof this.props.data.isaddid);
  };
  //获取密码
  Pwdfun(e){
    this.props.data.isadduserpwd = e.target.value
    console.log(this.props.data.isadduserpwd);
    console.log(typeof this.props.data.isadduserpwd);
  };
  //获取账号
  userfun(e){
     this.props.data.isaddusername = e.target.value
    console.log(typeof this.props.data.isaddusername);
  };
  //点击取消按钮
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      addvisible: false,
    });
    this.props.data.isaddusername = '';
    this.props.data.isadduserpwd = '';
    this.props.data.value = '';
  };

  //单选按钮change事件
  onChange = e => {
   this.props.data.roleID =  e.target.value
    console.log(this.props.data.roleID);
  };

  //编辑 点击确定发起请求 //模态框点击确定函数

  editRole(){
    this.setState({
      visible:false,
    })
    axios.post(Roleapi.userRole.userChangeRole,{
      roleId : this.props.data.roleID,
      userId : this.props.data.userID
    },{
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
      if (res.data.code == 200){
        this.getuserrole();
      }
    })
  };
  //挂载前
  componentWillMount() {
      this.getRolelists();
      this.getuserrole();   //获取数据

      console.log(this.props.data.rolelist);


    let optionlist = this.getOption(this.state.rolelist);
    this.setState({
      optionlist
    })
  };
    componentDidMount(){

}
//渲染
  render() {
    //表格
    const columns = [
      {
        title: '运营人员账号ID',
        dataIndex: 'user_id',
        key: 'user_id',
        render: text => <Button type='link'>{text}</Button>,
      },
      {
        title: '管理员登录账号',
        dataIndex: 'user_username',
        key: 'user_username',
      },
      {
        title: '职位',
        dataIndex: 'role_nameZh',
        key: 'role_nameZh',

      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '状态',
        render:(text,record)=>(
          <Space size="middle">
            <Switch
              checkedChildren="启动"
              unCheckedChildren="禁用"
              onChange={()=>{this.switchcheck(record.user_id,record.user_statue)}}
              defaultChecked={record.user_statue}
            disabled={this.updateDisable(record.user_id,record.user_statue)}/>
          </Space>
        )
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button type='link' onClick={()=>{this.Edit(text)}}  disabled={this.showcaozuo(text)}>编辑</Button>
          </Space>
        ),
      },
    ];
    return (
      <div>
        <Row >
          <Col span={4} offset={16}>
            <Button type='primary' onClick={this.showModel}>添加</Button>
          </Col>
        </Row>
        {/*表格*/}
        <Table
          className='RoleTable'
          columns={columns}
          dataSource={this.props.data.userRolelist}
          pagination={this.fenye()}
        />

        {/*编辑模态框*/}
        <Modal
          title="选择角色"
          visible={this.state.visible}
          okText='确定'
          cancelText='取消'
          onOk={this.editRole.bind(this)}
          onCancel={this.handleCancel}
          >

          <Radio.Group  onChange={this.onChange} value={this.props.data.roleID}>
            {this.state.rolelist}
          </Radio.Group>

        </Modal>


      {/* 添加模态框*/}
        <Modal
          title="添加账号"
          visible={this.state.addvisible}
          okText='确定'
          cancelText='取消'
          onOk={this.adduser.bind(this)}
          onCancel={this.handleCancel}
        >
          <Row gutter={[16, 16]}>
            <Col span={6} offset={4}>
              <label htmlFor=""><h3>请输入账号：</h3></label>
            </Col>
            <Col span={12}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                onChange={this.userfun.bind(this)}
                value={ this.props.data.isaddusername}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6} offset={4}>
              <label htmlFor=""><h3>请输入密码：</h3></label>
            </Col>
            <Col span={12}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                onChange={this.Pwdfun.bind(this)}
                value={ this.props.data.isadduserpwd}/>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6} offset={4}>
              <label htmlFor=""><h3>&nbsp;&nbsp;&nbsp;选择角色：</h3></label>
            </Col>
            <Col span={12}>
              <Select style={{ width: '50%' }} onChange={this.SelectChange} value={this.props.data.value}>
                {this.state.option}
              </Select>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

export {Operational as default}
