import React from 'react';  //导入react
//yoon 改 202-7-6 19：03
import { Input,Row, Col,DatePicker ,Button,Table,Space,Modal, Popconfirm,Select,message} from 'antd';//导入元件
import { DownOutlined } from '@ant-design/icons';

// import axios from 'axios'//导入axios
import axios from '../../utils/axios'
import orapi from '../../api/index'
import locale from 'antd/lib/date-picker/locale/zh_CN'

import './Orderproductlist.css'
// import order from "../../api/order";
//结束
//xxx 组件名
class Orderproductlist extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.changeHandle=this.changeHandle.bind(this)
        this.selctChange=this.selctChange.bind(this)
        this.dateChange=this.dateChange.bind(this)
        this.searchOrder=this.searchOrder.bind(this)
        this.dateChangeRule=this.dateChangeRule.bind(this)
        this.orderReset=this.orderReset.bind(this)
        this.delOrder=this.delOrder.bind(this)
        this.filterSendState=this.filterSendState.bind(this)
        this.state = {
            //表格的数组变量
            data: [],//订单数据
            visible: false,//控制模态框的显示
            orderProductList:[],//查看的数据
            //模态框中的商品表格中的数据
            checkOrderList:[],
            //搜索的订单号
            checkOrderNum:'',
            //搜索的状态
            checkOrderState:'',
            //搜索时间
            checkOrderDate:[],
            //搜索的开始时间
            checkOrderStartDate:'',
            //搜索的结束时间
            checkOrderEndDate:'',
            //当前页
            current:1,
            //每页显示的条数
            pageSize:5,
            //总页数
            dataCount:'',
        }
    }
    componentWillMount(){
        this.getOrderList()
    }
    //获得表单列表
    getOrderList=()=>{
        axios.post(orapi.order.selectOrderList,{limit:this.state.pageSize,page:this.state.current},
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
            console.log(res.data.data);
            if (res.data.data!=null){
                this.dateChangeRule(res)
                this.filterSendState(res)
                // this.filterSendState(res)
            }
            this.setState({
                data:res.data.data,
                dataCount:res.data.dataCount
            })
            console.log(this.state.dataCount)
        })
    }
    //返回时间的过滤函数
    dateChangeRule(res){
        let timeList=res.data.data.map((item)=>{
            return item.ordersCreatetime=this.dateFormat(item.ordersCreatetime)
        })
    }
    //过滤支付的方式
    filterPayMethod(paymentMethod){
        if (paymentMethod=='1'){
            return paymentMethod='支付宝'
        }
        else if (paymentMethod=='2'){
            return paymentMethod='微信'
        }
        else {
            return paymentMethod='网银'
        }
    }
    //删除函数
    // isShanChu(index){
    //     console.log('获取的index==='+index);
    //     const data = [...this.state.data];
    //     data.splice(index,1)
    //     this.setState({
    //         data
    //     })
    // }

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
        axios.post(orapi.order.selectOrderInfo,{orderId:orderId},
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
            if (res.data.data!=null){
                console.log(res.data.data)
                // res.data.data.ordersCreatetime=this.dateFormat(res.data.data.ordersCreatetime)
                res.data.data.ordersState=this.filterSendStateOne(res.data.data.ordersState)
                res.data.data.paymentMethod=this.filterPayMethod(res.data.data.paymentMethod)
            }
            this.setState({
                orderProductList:res.data.data,
                checkOrderList:res.data.data.list
            })
        })

    }
    //删除按钮的提示框


    //时间过滤器
    dateFormat (value) {
        if (value == null) {
            return '';
        } else {
            const date = new Date(value);
            const y = date.getFullYear();// 年
            let MM = date.getMonth() + 1;// 月
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();// 日
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();// 时
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();// 分
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();// 秒
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        }
    }
    //过滤发货的显示
    filterSendState(res){
        let timeList=res.data.data.map((item)=>{
            if (item.ordersState==1){
                return item.ordersState='未支付'
            }
            else if(item.ordersState==2){
                return item.ordersState='待发货'
            }
            else if (item.ordersState==3){
                return item.ordersState='已发货'
            }
            else if (item.ordersState==4){
                return item.ordersState='已完成'
            }
            else {
                return item.ordersState='异常订单'
            }
        })
    }
    //单个发货状态的过滤器
    filterSendStateOne(ordersState){
        if (ordersState==1){
            return ordersState='未支付'
        }
        else if(ordersState==2){
            return ordersState='待发货'
        }
        else if (ordersState==3){
            return ordersState='已发货'
        }
        else if (ordersState==4){
            return ordersState='已完成'
        }
        else {
            return ordersState='异常订单'
        }
    }
    //搜索的按钮
    searchOrder(){
        axios.post(orapi.order.selectOrderList,
            {orderNo:this.state.checkOrderNum,
                ordersState:this.state.checkOrderState,
                startTiem:this.state.checkOrderStartDate,
                endTiem:this.state.checkOrderEndDate,
                limit:this.state.pageSize,
                page:this.state.current
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
                if (res.data.data!=null){
                    this.dateChangeRule(res)
                    this.filterSendState(res)
                }
                this.setState({
                    data:res.data.data,
                    dataCount:res.data.dataCount
                })
                console.log(res.data.data)

        })
    }
    //搜索的数据改变事件
    changeHandle(e){
        e.preventDefault()//阻止默认事件
        let key =e.target.dataset.key;
        this.setState({
            [key]:e.target.value
        })
    }
    //改变的select的事件
    selctChange(e){
        this.setState({
            checkOrderState:e
        })
    }
    //改变日期的事件
    dateChange(e){
       let dateList= e.map((item)=>{
           return this.dateFormat(item._d)
        })
       this.setState({
           checkOrderStartDate:dateList[0],
           checkOrderEndDate:dateList[1],
       })
    }
    //重置按钮
    orderReset(){
        this.setState({
            checkOrderNum:'',
            checkOrderState:'',
            checkOrderStartDat:'',
            checkOrderEndDate:'',
        })
        this.getOrderList()
    }
    //删除订单
    delOrder(orderId){
        console.log(orderId);
        axios.post(orapi.order.delOrder,{orderId:orderId},{
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
            message.success('删除成功！');
            this.getOrderList()
        })
    }
    //分页
    fenye(nowPage){
        this.setState({
            current:nowPage
        },()=>{
            this.getOrderList()
        })
    }
    //单个发货状态的过滤器
    filterSendStateOne(ordersState){
        if (ordersState==1){
            return ordersState='未支付'
        }
        else if(ordersState==2){
            return ordersState='待发货'
        }
        else if (ordersState==3){
            return ordersState='已发货'
        }
        else if (ordersState==4){
            return ordersState='已完成'
        }
        else {
            return ordersState='异常订单'
        }
    }
    //过滤发货的显示
    filterSendState(res){
        let timeList=res.data.data.map((item)=>{
            if (item.ordersState==1){
                return item.ordersState='未支付'
            }
            else if(item.ordersState==2){
                return item.ordersState='待发货'
            }
            else if (item.ordersState==3){
                return item.ordersState='已发货'
            }
            else if (item.ordersState==4){
                return item.ordersState='已完成'
            }
            else {
                return item.ordersState='异常订单'
            }
        })
    }

//渲染
    render() {
        //订单日期的变量
        const { RangePicker } = DatePicker;
        const Option = Select.Option;//选择的下拉表的选项值

        //表格的列的显示
        const columns = [
            {
                title: '订单ID',
                dataIndex: 'ordersId',
                key: 'ordersId',
            },
            {
                title: '订单号',
                dataIndex: 'ordersNo',
                key: 'ordersNo',
            },
            {
                title: '用户ID',
                dataIndex: 'userId',
                key: 'userId',
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '订单时间',
                dataIndex: 'ordersCreatetime',
                key: 'ordersCreatetime',
            },
            {
                title: '订单状态',
                dataIndex: 'ordersState',
                key: 'ordersState',
            },
            {
                title: '订单实付金额',
                dataIndex: 'ordersMoney',
                key: 'ordersMoney',
            },
            {
                title: '操作',
                render: (text, record,index) => (
                    <Space size="middle">

                        <Button onClick={()=>this.checkOrder(record.ordersId)}>查看</Button>
                        <Popconfirm
                            title="确定要删除订单?"
                            onConfirm={()=>this.delOrder(record.ordersId)}
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
                dataIndex: 'goodsId',
                key: 'goodsId',
            },
            {
                title:'商品名称',
                dataIndex: 'goodsName',
                key: 'goodsName',
            },
            {
                title:'规格',
                dataIndex: 'specificationsName',
                key: 'specificationsName',
            },
            {
                title:'原价',
                dataIndex: 'goodsOldprice',
                key: 'goodsOldprice',
            },
            {
                title:'现价',
                dataIndex: 'goodsNewprice',
                key: 'goodsNewprice',
            },
            {
                title:'数量',
                dataIndex: 'goodsNumber',
                key: 'goodsNumber',
            },
            {
                title:'库存号',
                dataIndex: 'stockId',
                key: 'stockId',
            },
        ]
        let{checkOrderNum,checkOrderDate}=this.state
        return (

            <div className='orderListPage'>
              <h2>订单列表</h2>
                {/*改 yoon 2020-7-6 19:04*/}
                <div>
                    <Row>
                        <Col span={5}>订单号：<Input placeholder="请输入订单号" data-key='checkOrderNum' className='orderInput'  value={checkOrderNum} onChange={this.changeHandle} type='text'/></Col>
                        <Col span={4}>订单状态：
                            {/*<Dropdown overlay={menu}>*/}
                            {/*    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>*/}
                            {/*        全部状态 <DownOutlined />*/}
                            {/*    </a>*/}
                            {/*</Dropdown>*/}
                            <Select placeholder="请选择" value={this.state.checkOrderState} onChange={this.selctChange} >
                                <Option value="">全部</Option>
                                <Option value="1">未付款</Option>
                                <Option value="2">待发货</Option>
                                <Option value="3">已发货</Option>
                                <Option value="4">已完成</Option>
                                <Option value="5">异常订单</Option>
                            </Select>

                        </Col>
                        <Col span={6}> 订单日期：<RangePicker className='orderDate' locale={locale} data-key='checkOrderDate' value={checkOrderDate} onChange={this.dateChange} /></Col>
                        <Col span={4}>
                            <Button type="primary" className='primaryButton' onClick={this.searchOrder}>搜索</Button>
                            <Button onClick={this.orderReset}>重置</Button>
                        </Col>
                    </Row>
                    <Row className='orderTable'>
                        <Col span={24}>
                            <Table dataSource={this.state.data} columns={columns}  pagination={{
                                // defaultCurrent: this.state.defaultCurrent,
                                current: this.state.current,
                                pageSize:this.state.pageSize,
                                total:this.state.dataCount,
                                onChange:(page)=>{this.fenye(page)}//分页事件
                                }}/>
                        </Col>
                    </Row>
                    <div>
                        <Modal
                            title="订单详情"
                            width='50%'
                            // cancelText='取消'
                            // okText='返回'
                            footer={[<Button type='primary' onClick={this.handleCancel} style={{marginBottom:'20px',marginTop:'20px', width:'100px'}} >返回</Button>]}
                            bodyStyle={{}}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}

                        >
                            <Row>
                                   <Col span={12}>
                                      <Row>
                                          <Col span={10}>订单号：</Col>
                                          <Col span={14}>{this.state.orderProductList.ordersNo}</Col>
                                      </Row>
                                   </Col>
                                   <Col span={12}>
                                      <Row>
                                          <Col span={10}>收件姓名：</Col>
                                          <Col span={14}>{this.state.orderProductList.userinfoNickname}</Col>
                                      </Row>
                                   </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>下单时间：</Col>
                                        <Col span={14}>{this.dateFormat(this.state.orderProductList.ordersCreatetime)}</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>用户账号：</Col>
                                        <Col span={14}>{this.state.orderProductList.accountId}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={4}>
                                    下单商品：
                                </Col>
                                <Col span={20}>
                                    <Table bordered dataSource={this.state.checkOrderList} columns={Yproduct} style={{fontSize:'12px'}} pagination={false}/>
                                </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>订单原金额：</Col>
                                        <Col span={14}>{this.state.orderProductList.ordersOldprice}</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>订单配送费：</Col>
                                        <Col span={14}>{this.state.orderProductList.freight}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>订单优惠：</Col>
                                        <Col span={14}>
                                            <p>特价：减￥{this.state.orderProductList.couponStartMoney}</p>
                                            <p>优惠券 减￥{this.state.orderProductList.couponMoney}</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>订单实付金额：</Col>
                                        <Col span={14}>{this.state.orderProductList.ordersMoney}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>收货地址：</Col>
                                        <Col span={14}>{this.state.orderProductList.userAddressDetail}</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>联系方式：</Col>
                                        <Col span={14}>{this.state.orderProductList.phone}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>订单配送方式：</Col>
                                        <Col span={14}>{this.state.orderProductList.logisticsName}</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>物流单号：</Col>
                                        <Col span={14}>{this.state.orderProductList.logisticsNo}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row  style={{marginTop:'20px'}}>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>支付方式：</Col>
                                        <Col span={14}>{this.state.orderProductList.paymentMethod}</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={10}>订单状况：</Col>
                                        <Col span={14}>{this.state.orderProductList.ordersState}</Col>
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
