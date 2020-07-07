import React from 'react';  //导入react

import { Table,Space,Button,Modal,Tree,Popconfirm  } from 'antd';
// import {Link} from "react-router-dom";

import {inject,observer} from "mobx-react";
import './css/Authority.css'      //引入css
//*****2020/7/7邹麒瑞改******
//xxx 组件名
@inject('data')
@observer
class AuthorityRole extends React.Component {
//构造函数
   constructor(props) {
        super(props)
        this.state = {
          //编辑显示隐藏
          visible: false,

          //添加model
          addvisible:false,
          confirmLoading:false,

          //表格数据
          datalist : [
            {
              id: '1',
              username: '超级管理员',
              caozuo: '全部功能',
              timer:'2000-2-10'
            },
            {
              id: '2',
              username: '普通管理员',
              caozuo: '只有查看',
              timer:'2020-3-10'
            },
          ],


          //当前页
          current:1,
          //每页显示
          pageSize:5,
          //总条数
          total:2,
          //默认第几页
          defaultCurrent:1,
          //是否可以条状
          showQuickJumper:1

        }
    }
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
    onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    };

    onCheck = checkedKeys => {
      console.log('onCheck', checkedKeys);
    };

    onSelect = (selectedKeys, info) => {
      console.log('onSelect', info);

    };

    //删除事件
    Del(index){
      console.log(index);
      let datalist = [...this.state.datalist]
      console.log('数据'+ datalist);
      datalist.splice(index,1)
      this.setState({
        datalist
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
    console.log(current);
    this.setState({
      current:current
    })
    }
    //变化回调
    onShowSizeChange(Current,pageSize){
      console.log(Current,pageSize)
    }
      //显示添加
    showModel=()=>{
      this.setState({
        addvisible:true
      })
      };
    //提交确定按钮
    addJueSe(){

    }
    //取消按钮
    quxiaomodel=()=>{
      this.setState({
        addvisible: false,
      });
    }
    //挂载前

//渲染
    render() {
      //表格
      const columns = [
        {
          title: '角色ID',
          dataIndex: 'id',
          key: 'id',
          render: text => <a>{text}</a>,
        },
        {
          title: '角色',
          dataIndex: 'username',
          key: 'username',

        },
        {
          title: '相关操作',
          dataIndex: 'caozuo',
          key: 'caozuo',
        },
        {
          title: '创建时间',
          key: 'timer',
          dataIndex: 'timer',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record,index) => (
            <Space size="middle">
              <Button type='link' onClick={()=>this.Edit(record.id)}>编辑</Button>
              <Popconfirm
                title="确定删除吗？"
                onConfirm={()=>this.Del(index)}
                okText="确定"
                cancelText="取消">
                <Button type='link' >删除</Button>
              </Popconfirm>
            </Space>
          ),
        },
      ];

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
      ];
        return (
            <div>
              <div>
                <Button type='primary' onClick={this.showModel}>添加</Button>
              </div>
              {/*table表格*/}
              <Table
                className='RoleTable'
                columns={columns}
                dataSource={this.state.datalist}
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
                  onExpand={this.onExpand}
                  onCheck={this.onCheck}
                  onSelect={this.onSelect}
                  treeData={treeData}
                />
              </Modal>

            {/*  添加弹框*/}
              <Modal
                title="添加"
                visible={this.state.addvisible}
                onOk={this.addJueSe}
                confirmLoading={true}
                onCancel={this.quxiaomodel}
              >
                <h2>add</h2>
              </Modal>
            </div>
        )
    }
}

export {AuthorityRole as default}
