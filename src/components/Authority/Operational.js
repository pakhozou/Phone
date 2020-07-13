import React from 'react';
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
import axios from 'axios'
import './css/Authority.css'
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
          fenyeobj:{
            page:1,
            size:3
          }
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

  getuserrole(){
    axios.get('/api//user/auth/adminList',
      {params:{
        page: this.state.fenyeobj.page,
        size: this.state.fenyeobj.size
        }
      }).then((res)=>{
      console.log('获取的用户');
      console.log(res);
    })
  }
  //挂载前
  componentWillMount() {
    this.getuserrole()
  }

//渲染
    render() {
      //表格
      const columns = [
        {
          title: '运营人员账号ID',
          dataIndex: 'id',
          key: 'id',
          render: text => <a>{text}</a>,
        },
        {
          title: '职位',
          dataIndex: 'zhiwei',
          key: 'zhiwei',

        },
        {
          title: '相关',
          dataIndex: 'caozuo',
          key: 'caozuo',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record,index) => (
            <Space size="middle">
              <Button type='link' >编辑</Button>
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
        return (
            <div>
              <Row >
                <Col span={4} offset={16}>
                  <Button type='primary' onClick={this.showModel}>添加</Button>
                </Col>
              </Row>
              <Table
                className='RoleTable'
                columns={columns}
                dataSource={this.state.datalist}
                pagination={this.fenye()}/>

            </div>
        )
    }
}

export {Operational as default}
