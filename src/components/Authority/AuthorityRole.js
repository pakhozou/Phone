import React from 'react';  //导入react
import {
  Table,
  Space,
  Button,
  Modal,
  Tree,
  Popconfirm,
  Select,
  Row,
  Col, Switch,
} from 'antd';
import Roleapi from '../../api/index'
import axios from '../../utils/axios'

import {inject,observer} from "mobx-react";
import './css/Authority.css'//引入css


const { Option } = Select;
//*****2020/7/7邹麒瑞改******
//xxx 组件名
@inject('data')
@observer
class AuthorityRole extends React.Component {
  //构造函数
  constructor(props) {
    super(props);
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
      showQuickJumper:1,
      //select下拉
      rolename:[
        {id:1,value:'超级管理员',lable:'超级管理员'},
        {id:2,value:'普通管理员',lable:'普通管理员'},
        {id:3,value:'客服',lable:'客服'},
        {id:4,value:'商品管理员',lable:'商品管理员'},
        {id:5,value:'用户',lable:'用户'}
      ],
      //存下拉值
      optionlist:[],

      treeData:[],

      //树形控件配置
      // treeData : [
      //   {
      //     title: '商品管理',
      //     key: '1',
      //     children: [
      //       {
      //         title: '商品列表',
      //         key: '2',
      //       },
      //       {
      //         title: '添加商品',
      //         key: '3',
      //       },
      //     ],
      //   },
      //   {
      //     title: '优惠券管理',
      //     key: '4',
      //   },
      //   {
      //     title: '品牌管理',
      //     key: '5',
      //   },
      //   {
      //     title: '类型管理',
      //     key: '6',
      //   },
      //   {
      //     title: '订单管理',
      //     key: '7',
      //     children:[
      //       {
      //         title: '订单列表',
      //         key: '8',
      //       },
      //       {
      //         title: '发货管理',
      //         key: '9',
      //       },
      //       {
      //         title: '未处理异常订单',
      //         key: '10',
      //       },
      //     ]
      //   },
      //   {
      //     title: '销售管理',
      //     key: '11',
      //     children: [
      //       {
      //         title: '销售统计表',
      //         key: '12',
      //       },
      //     ],
      //   },
      //   {
      //     title: '用户管理',
      //     key: '13',
      //     children: [
      //       {
      //         title: '用户列表',
      //         key: '14',
      //       },
      //     ],
      //   },
      //   {
      //     title: '库存管理',
      //     key: '15',
      //     children: [
      //       {
      //         title: '库存列表',
      //         key: '16',
      //       },
      //     ],
      //   },
      //   {
      //     title: '权限列表',
      //     key: '17',
      //     children: [
      //       {
      //         title: '角色列表',
      //         key: '18',
      //       },
      //       {
      //         title: '运营人员管理',
      //         key: '19',
      //       },
      //     ],
      //   },
      // ],
      //默认选中值
      checkeds:[],
      //添加选择权限
      muenarr:[],
    }
  }
  //判断是否禁用
  showcaozuo(data){
    if (data.role_id == 1){
      data.status =1
    }
    let disableStatus = data.status;
    return disableStatus
  }

  //*****编辑函数******
  //编辑
  Edit(id) {
    console.log(id);
    this.setState({
      visible: true,
    });
    this.getMenuListByRole(id);

  }
  //模态框确定按钮
  handleOk = e => {
    console.log(e);
    return new Promise((resolve,reject)=>{
      let selectvalue = this.props.data.selectvalue
      axios.post(Roleapi.userRole.addRole,{
          "level": 0,
          "role_name": "string",
          "role_nameZh": selectvalue,
          "status": 0
        },
        {
          headers:{
            'Content-Type':'application/json'
          }
        }).then((res)=>{
        console.log(res);
        if (res.data.code == 200){
          resolve('成功')
        }else {
          resolve('失败')
        }
      })
    }).then((res)=>{
      console.log(res);
      if (res == '成功'){
        this.getRolelist();     //调用数据
        this.setState({
           muenarr:'',
          visible:false,

        })
      }
    })
  };
  //模态框取消按钮
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      addvisible: false,
    });
  };

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);

  };

  //删除事件
  Del(id){
    // console.log(id.role_id);
    axios.post(Roleapi.userRole.delRole,
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
      }).then(()=>{
      // console.log(res);
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
  //渲染option
  getOption(list){
    let optionlist = list.map((item)=>{
      if(item.id == 1){
        return <Option key={item.id} value={item.lable} disabled={true}>{item.value}</Option>
      }else {
        return <Option key={item.id} value={item.lable} >{item.value}</Option>
      }
    })
    return optionlist
  }

  //显示添加
  showModel=()=>{
    this.setState({
      addvisible:true
    })
  };


  //请求角色数据
  getRolelist() {
    axios.get(Roleapi.userRole.userRole).then((res) => {
      // console.log('获取的角色');
      // console.log(res.data.data);
      this.total = res.data.data.length;    //获取总条数
      this.props.data.getRole(res.data.data)
    })
  };

  //下拉值
  SelectChange=(value,id)=>{
    // console.log(id);
    let ids = id.key;
    console.log(ids);
    this.props.data.selectvalue =  value;
    this.props.data.ids =  ids;
    // console.log('selectvalue');
    // console.log( this.state.selectvalue);
    //  根据id得到菜单
    this.getMenuListByRole(ids)
  };

  //获取tree
  huoqutree(){
    let treeobj = {};
    let treechildren = {};
    let treelist = [];
    let tree = JSON.parse(localStorage.getItem('menu'));
    tree.forEach((item)=>{
      if (item.menu_id == 43){
        return
      }
      if (item.menu_parentId == 0){
        treeobj={}
        treeobj.children = [];
        treeobj.key = item.menu_id;
        treeobj.title = item.menu_nameZh;
        treelist.push(treeobj)
      }else {
        treeobj.children = [];
      }
    });
    // for (let i = 0 ; i <tree.length; i++ ){
    //   if (tree[i].menu_parentId == 0){
    //       treeobj={}
    //       treeobj.title = tree[i].menu_nameZh;
    //       treeobj.key = tree[i].menu_id;
    //       treeobj.children = [];
    //       console.log(treeobj);
    //     treelist.push(treeobj)
    //   }else {
    //     treeobj.children = [];
    //   }
    // }

    tree.forEach((item)=>{
      if (item.menu_parentId > 0){
        treechildren={}
        treechildren.children = [];
        treechildren.key = item.menu_id;
        treechildren.title = item.menu_nameZh;
        treelist.forEach((item2)=>{
          if (item2.key == item.menu_parentId){
            item2.children.push(treechildren);
          }
        })
      }
    });
    console.log(treelist);
    this.state.treeData = treelist
  };

  //添加角色
  addRole=()=>{
    this.setState({
      addvisible:false,
      visible: true,
    });
  };

  //判断状态
  switchcheck(status){
    console.log(status);
    console.log(status.status);
    this.props.data.RoleStatus = status.status
  }

  //根据角色id获取列表
  getMenuListByRole(id){
    console.log(id);
    return new Promise((reslove,reject)=>{
        // let ids = parseInt(this.props.data.ids);
        // console.log( ids);
        axios.get(Roleapi.userRole.getMenuListByRole,{
          params : {
            roleId : id
          }
        }).then((res)=>{
          console.log(res);
          if (res.data.code == 200) {
            let num;
            let checkmenu = [];
            let treekeys = res.data.data;
            treekeys.map((item) => {
              // console.log(item.menu_id);
              num = item.menu_id;
              checkmenu.push(num)
            });
            this.props.data.setmenuarr(checkmenu)
            reslove('ok')
          }else {
            reslove('no')
          }
      })
    }).then((res)=>{
        console.log(res);
        let muenarr = [];
        if(res == 'ok'){
          let menu = JSON.parse(JSON.stringify(this.props.data.muenarr));
          menu.forEach((item)=>{
            muenarr.push(item)
          })

          this.setState({
            muenarr:muenarr
          })
          this.showTree()
        }
        console.log(muenarr);
        //存放menuarr
        this.props.data.treeArr = muenarr;
        //赋值
        axios.post(Roleapi.userRole.roleAddMenus,{
          menuIds: this.props.data.treeArr,
          roleId : id
        },{
          headers:{
            'Content-Type':'application/json'
          }
        }).then((res)=>{
          console.log(res);
        })
      })
  }

  showTree(){
    return (
      <Tree
      checkable
      // onExpand={this.onExpand}
      onCheck={this.onCheck}
      onSelect={this.onSelect}
      treeData={this.state.treeData}
      defaultCheckedKeys={this.state.muenarr}
    />)
  }
  //挂在前
  componentWillMount() {
    //挂载前执行请求数据
    this.getRolelist();
  //  得到tree值
    this.huoqutree();
  }
  //挂载后
  componentDidMount() {
    let optionlist = this.getOption(this.state.rolename);
    this.setState({
      optionlist
    })

  }
  //更新后
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(prevProps);
  }

  //渲染
  render() {
//取消添加按钮
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
            <Button type='link' onClick={()=>this.Edit(record.role_id)} disabled={this.showcaozuo(text)}>编辑</Button>
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
          {/*<Tree*/}
          {/*  checkable*/}
          {/*  // onExpand={this.onExpand}*/}
          {/*  onCheck={this.onCheck}*/}
          {/*  onSelect={this.onSelect}*/}
          {/*  treeData={this.state.treeData}*/}
          {/*  defaultCheckedKeys={[]}*/}
          {/*/>*/}
          {this.showTree()}
        </Modal>

        {/*  添加弹框*/}
        <Modal
          title="添加"
          visible={ this.state.addvisible}
          //取消两个原始按钮
          okText='确定'
          cancelText='取消'
          onOk={this.addRole}
          onCancel={this.handleCancel}
        >
          {/*选择管理员职位*/}
          <label htmlFor=""><h3>选择角色：</h3></label>
          <Select style={{ width: '50%' }} onChange={this.SelectChange}>
            {this.state.optionlist}
          </Select>
          <br/>
          {/*选择权限*/}
          {/*<label htmlFor=""><h3>选择权限：</h3></label>*/}
          {/*{this.showTree()}*/}
        </Modal>
      </div>
    )
  }
}

export {AuthorityRole as default}
