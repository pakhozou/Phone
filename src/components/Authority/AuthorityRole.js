import React from 'react';  //导入react

import { Table,Space,Button } from 'antd';
//xxx 组件名
class AuthorityRole extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {}
    }

  Edit(id){
    console.log(id);
  }
//渲染
    render() {
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
          render: (text, record) => (
            <Space size="middle">
              <Button type='link' onClick={()=>this.Edit(record.id)}>编辑</Button>
              <Button type='link'>删除</Button>
            </Space>
          ),
        },
      ];

      const data = [
        {
          id: '1',
          username: '超级管理员',
          caozuo: '全部功能',
          timer:'2020-2-10'
        },
      ];
        return (
            <div>
              <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

export {AuthorityRole as default}
