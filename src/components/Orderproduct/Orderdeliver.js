import React from 'react';
import { Input,Row, Col, Menu, Dropdown,DatePicker ,Button,Table,Space,Modal, Popconfirm, message} from 'antd';//导入元件
import './Orderproductlist.css'
import { DownOutlined } from '@ant-design/icons';

//xxx 组件名
class Orderdeliver extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {
            data:[
                {
                    key:'1',
                    sendOrderId:'8494859483',
                    sendOrderDate:'2020-08-08 18:11',
                    sendOrderState:'未发货',
                    sendOrderProducts:'iphone11 手机壳 X1 华为mate11 数据线 X1',
                    sendOrderMoney:'￥110'
                }
            ]
        }
    }


//渲染
    render() {
        //订单日期的变量
        const { RangePicker } = DatePicker;
        //表格的假数据
        const columns=[
            {
                title:'订单ID',
                dataIndex:'sendOrderId',
                key:'sendOrderId'
            },
            {
                title: '订单时间',
                dataIndex:'sendOrderDate',
                key:'sendOrderDate'
            },
            {
                title:'订单状态',
                dataIndex:'sendOrderState',
                key:'sendOrderState'
            },
            {
                title: '订单商品',
                dataIndex:'sendOrderProducts',
                key: 'sendOrderProducts'
            },
            {
                title: '订单金额',
                dataIndex:'sendOrderMoney',
                key:'sendOrderMoney'
            },
            {
                title: '操作',
                render: (text,record,index)=>(
                    <Space size='middle'>
                        <Button type="primary">确认发货</Button>
                    </Space>
                )
            }

        ]
        return (
            <div className='orderListPage'>
              <h2>发货管理</h2>
              <div>
                  <Row>
                      <Col span={5}>订单ID：<Input placeholder="请输入订单号" className='orderInput'/></Col>
                      <Col span={6}> 订单日期：<RangePicker className='orderDate' /></Col>
                      <Col span={4}>
                          <Button type="primary" className='primaryButton'>搜索</Button>
                          <Button>重置</Button>
                      </Col>
                  </Row>
                  <Row className='orderTable'>
                      <Col span={24}>
                          <Table dataSource={this.state.data} columns={columns} />
                      </Col>
                  </Row>
              </div>
            </div>
        )
    }
}

export {Orderdeliver as default}
