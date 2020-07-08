import React from 'react';  //导入react
//yoon 改 202-7-6 19：03
import { Input,Row, Col, Menu, Dropdown,DatePicker ,Button,Table,Space,Modal, Popconfirm, message} from 'antd';//导入元件
import { DownOutlined } from '@ant-design/icons';

import './Orderproductlist.css'
//结束
//xxx 组件名
class Orderproductlist extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {
            //表格的数组变量
            data: [
                {
                    key: '1',
                    orderId: '89658',
                    userID: '001',
                    userName: '张大大',
                    orderDate:'2020-08-08 12:12',
                    orderState:'未发货',
                    orderMoney:'￥120',
                },
                {
                    key: '2',
                    orderId: '89659',
                    userID: '002',
                    userName: '王甜甜',
                    orderDate:'2020-07-08 12:12',
                    orderState:'已发货',
                    orderMoney:'￥100',
                },
            ],//表格的假数据
            visible: false,//控制模态框的显示
            orderId:0,//模态框传过去的订单的ID
            //模态框中的商品表格中的数据
            orderProductList:[
                {
                    key:1,
                    orderProductID:'001',
                    orderProductName:'iphone 手机壳',
                    orderProductRule:'iphone 11',
                    orderProductSale:'￥70',
                    orderProductMoney:'￥50',
                    orderProductMoneyNumber:'1'
                },
                {
                    key:2,
                    orderProductID:'002',
                    orderProductName:'华为数据线',
                    orderProductRule:'mate 12',
                    orderProductSale:'￥70',
                    orderProductMoney:'￥70',
                    orderProductMoneyNumber:'1'
                }
            ]
        }
    }
    //删除函数
    isShanChu(index){
        console.log('获取的index==='+index);
        const data = [...this.state.data];
        data.splice(index,1)
        this.setState({
            data
        })
    }
    //查看的弹框
    showModal = () => {
        this.setState({
            visible:true,
        })
        // this.setState({
        //     visible: true,
        // });

    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    //查看订单详情的函数
    checkOrder(orderId){
        this.setState({
            visible:true,
        })
        this.setState({
            orderId:orderId
        })
    }
    //删除按钮的提示框


//渲染
    render() {

        //订单状态的下拉列表
        const menu = (
            <Menu>
                <Menu.Item >
                    未发货
                </Menu.Item>
                <Menu.Item>
                    已发货
                </Menu.Item>
                <Menu.Item>
                    已完成订单
                </Menu.Item>
                <Menu.Item >
                    已取消订单
                </Menu.Item>
                <Menu.Item >
                    已退货订单
                </Menu.Item>
                <Menu.Item >
                   异常订单
                </Menu.Item>
            </Menu>
        );
        //订单日期的变量
        const { RangePicker } = DatePicker;


        //表格的列的显示
        const columns = [
            {
                title: '订单ID',
                dataIndex: 'orderId',
                key: 'orderId',
            },
            {
                title: '用户ID',
                dataIndex: 'userID',
                key: 'userID',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '订单时间',
                dataIndex: 'orderDate',
                key: 'orderDate',
            },
            {
                title: '订单状态',
                dataIndex: 'orderState',
                key: 'orderState',
            },
            {
                title: '订单实付金额',
                dataIndex: 'orderMoney',
                key: 'orderMoney',
            },
            {
                title: '操作',
                render: (text, record,index) => (
                    <Space size="middle">

                        <Button onClick={()=>this.checkOrder(record.orderId)}>查看</Button>
                        <Popconfirm
                            title="确定要删除订单?"
                            onConfirm={()=>this.isShanChu(index)}
                            okText="删除"
                            cancelText="取消"
                            okButtonProps={index}
                        >
                            <Button type="primary" >删除</Button>
                        </Popconfirm>,
                    </Space>
                ),
            }

        ];
        const Yproduct=[
            {
                title:'商品ID',
                dataIndex: 'orderProductID',
                key: 'orderProductID',
            },
            {
                title:'商品名称',
                dataIndex: 'orderProductName',
                key: 'orderProductName',
            },
            {
                title:'规格',
                dataIndex: 'orderProductRule',
                key: 'orderProductRule',
            },
            {
                title:'原价',
                dataIndex: 'orderProductSale',
                key: 'orderProductSale',
            },
            {
                title:'现价',
                dataIndex: 'orderProductMoney',
                key: 'orderProductMoney',
            },
            {
                title:'数量',
                dataIndex: 'orderProductNumber',
                key: 'orderProductMoneyNumber',
            },
        ]

        return (
            <div className='orderListPage'>
              <h2>订单列表</h2>
                {/*改 yoon 2020-7-6 19:04*/}
                <div>
                    <Row>
                        <Col span={5}>订单号：<Input placeholder="请输入订单号" className='orderInput'/></Col>
                        <Col span={4}>订单状态：
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    全部状态 <DownOutlined />
                                </a>
                            </Dropdown>
                        </Col>
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
                    <div>
                        <Modal
                            title="订单详情"
                            width='40%'
                            // cancelText='取消'
                            // okText='返回'
                            footer={[]}
                            bodyStyle={{}}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                        >
                            <Row>
                                   <Col span={12}>
                                      <Row>
                                          <Col span={10}>订单号：</Col>
                                          <Col span={14}>{this.state.orderId}</Col>
                                      </Row>
                                   </Col>
                                   <Col span={12}>
                                      <Row>
                                          <Col span={10}>用户名：</Col>
                                          <Col span={14}>xxxbidrgn</Col>
                                      </Row>
                                   </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>下单时间：</Col>
                                        <Col span={14}>2020-08-08 18:18</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>用户账号：</Col>
                                        <Col span={14}>859485930583</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={4}>
                                    下单商品：
                                </Col>
                                <Col span={20}>
                                    <Table bordered dataSource={this.state.orderProductList} columns={Yproduct} style={{fontSize:'12px'}} pagination={false}/>
                                </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>订单原金额：</Col>
                                        <Col span={14}>￥120</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>订单配送费：</Col>
                                        <Col span={14}>￥10</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>订单优惠：</Col>
                                        <Col span={14}>
                                            <p>特价：减￥20</p>
                                            <p>优惠券 满100减20</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>订单实付金额：</Col>
                                        <Col span={14}>￥110</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>收货地址：</Col>
                                        <Col span={14}>成都市新都区</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>联系方式：</Col>
                                        <Col span={14}>18936233264</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>订单配送方式：</Col>
                                        <Col span={14}>圆通快递</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>物流单号：</Col>
                                        <Col span={14}>10096326511862</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>支付方式：</Col>
                                        <Col span={14}>支付宝</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>订单状况：</Col>
                                        <Col span={14}>已发货</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Modal>
                    </div>
                </div>
            {/*    end */}

            </div>
        )
    }
}


export {Orderproductlist as default}
