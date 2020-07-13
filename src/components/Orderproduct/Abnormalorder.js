import React from 'react';  //导入react
import {
    Input,
    Row,
    Col,
    Menu,
    Dropdown,
    DatePicker,
    Button,
    Table,
    Space,
    Modal,
    Popconfirm,
    message,
    Tabs,
    Form, Select,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Orderproductlist.css'
// import axios from 'axios'//导入axios
import axios from '../../utils/axios'
import orapi from '../../api/index'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import {inject,observer} from "mobx-react";
@inject('data')
@observer
//xxx 组件名
class Abnormalorder extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.changeHandle=this.changeHandle.bind(this)
        this.selctChangeType=this.selctChangeType.bind(this)
        this.dateChange=this.dateChange.bind(this)
        this.searchOrder=this.searchOrder.bind(this)
        this.orderReset=this.orderReset.bind(this)
        this.disAgreen=this.disAgreen.bind(this)
        this.agree=this.agree.bind(this)
        this.state = {
            //异常订单的列表
           unusualOrderList:[],
            //点击查看 异常订单的id
            unusualOrderId:'',
            //控制模态框的显示
            visible:false,
            //当前页
            current:1,
            //每页显示的条数
            pageSize:5,
            //总页数
            dataCount:'',
            //订单处理人
            unusualOrderDealPeople:'',
            //处理异常订单需要获取的参数
            orderProductList:[],
            //处理异常的产品
            checkOrderList:[],
            //当前点击的订单的状态储存
            storeOrderState:'',
            //搜索的异常类型的
            checkOrderType:'',
            //搜索的订单ID
            orderNo:'',
            //搜索的订单日期开始
            startTiem:'',
            //搜索的订单的结束时间
            endTiem:'',

        }

    }

    //挂在前的渲染
    componentWillMount() {
        this.getUnOrderList()
        this.setState({
            unusualOrderDealPeople:this.props.data.username
        })
    }

    callback(key) {
        console.log(key);
    }
    //同意
    agree(){
        let access_token = localStorage.getItem('access_token');
        console.log(access_token);
        console.log(this.state.unusualOrderId)
        axios.post(orapi.order.dealUnOrder,
            {
                orderId:this.state.unusualOrderId,
                yesNo:'1'
            },{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                    "Authorization": "bearer " + access_token,
                },
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
            this.getUnOrderList()
            message.success('已向用户发送：订单已被同意!');
        })
        this.setState({
            visible: false,
        });
    }
    //不同意
    disAgreen(){
        let access_token = localStorage.getItem('access_token');
        console.log(access_token);
        console.log(this.state.unusualOrderId)
        axios.post(orapi.order.dealUnOrder,
            {
                orderId:this.state.unusualOrderId,
                yesNo:'2'
            },{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                    "Authorization": "bearer " + access_token,
                },
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
            this.getUnOrderList()
            message.warning('已向用户发出：订单处理被驳回!');
        })
        this.setState({
            visible: false,
        });
    }
    //取消的×
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    //处理订单
    dealOrder(data){
        console.log('打印orderId');
        console.log(data);
        let type=this.changeType(data.exceptionOrderState)
        this.setState({
            visible:true,
        })
        this.setState({
            unusualOrderId:data.ordersId,
            storeOrderState:type
        })
        axios.post(orapi.order.selectOrderInfo,{orderId:data.ordersId},
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
                console.log(res.data.data)
                res.data.data.ordersCreatetime=this.dateFormat(res.data.data.ordersCreatetime)
                res.data.data.ordersState=this.filterSendStateOne(res.data.data.ordersState)
                res.data.data.paymentMethod=this.filterPayMethod(res.data.data.paymentMethod)
            }
            this.setState({
                checkOrderList:res.data.data,
            })
            console.log(this.state.checkOrderList)
            if (res.data.data.list!=null){
                this.setState({
                    orderProductList:res.data.data.list
                })
            }
        })
    }
    //按钮过滤
    getButton =(data)=>{
        // console.log(this.state.storeOrderState);
        if (data.exceptionOrderSpeed==='未处理'){
            return <Button type='primary' onClick={()=>this.dealOrder(data)}>处理</Button>
        }
        else {
            return <Button disabled>处理</Button>
        }
    }
    //返回时间的过滤函数
    dateChangeRule(res){
        let timeList=res.data.data.map((item)=>{
            return item.ordersCreatetime=this.dateFormat(item.ordersCreatetime)
        })
    }
    //返回时间的过滤函数
    dateChangeRule11(res){
        let timeList=res.data.data.map((item)=>{
            return item.exceptionTime=this.dateFormat(item.exceptionTime)
        })
    }
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
    //搜索的数据改变事件
    changeHandle(e){
        e.preventDefault()//阻止默认事件
        let key =e.target.dataset.key;
        this.setState({
            [key]:e.target.value
        })
        console.log(e)
    }
    //获取异常订单的全部
    getUnOrderList(){
        axios.post(orapi.order.unOrderList,{limit:this.state.pageSize,page:this.state.current},{
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
                this.dateChangeRule(res);
                this.dateChangeRule11(res);
                this.filterSendState(res);
                this.filterUnorderType(res);
                this.filterSpeedOder(res);
            }
            this.setState({
                unusualOrderList:res.data.data,
                dataCount:res.data.dataCount
            })
            console.log(this.state.storeOrderState);
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
    //异常类型过滤器
    filterUnorderType(res){
        let timeList=res.data.data.map((item)=>{
            if (item.exceptionOrderState==1){
                return item.exceptionOrderState='退货'
            }
            else if(item.exceptionOrderState==2){
                return item.exceptionOrderState='换货'
            }
            else {
                return item.exceptionOrderState='已取消'
            }
        })
    }
    //异常类型过滤器
    changeType(exceptionOrderState){
            if (exceptionOrderState=='退货'){
                return 1
            }
            else if(exceptionOrderState=='换货'){
                return 2
            }
            else {
                return 3
            }
    }
    //异常订单处理进度
    filterSpeedOder(res){
        let timeList=res.data.data.map((item)=>{
            if (item.exceptionOrderSpeed==1){
                return item.exceptionOrderSpeed='未处理'
            }
            else {
                return item.exceptionOrderSpeed='已处理'
            }
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
    //分页
    fenye(nowPage){
        this.setState({
            current:nowPage
        },()=>{
            this.getUnOrderList()
        })
    }
    //改变的select的事件
    selctChange(e){
        this.setState({
            checkOrderState:e
        })
    }
    selctChangeType(e){
        console.log(e)
        this.setState({
            checkOrderType:e
        })
    }
    //搜索的按钮
    searchOrder(){
        console.log('搜索')
        console.log(this.state.checkOrderNum)
        console.log(this.state.orderNo)
        axios.post(orapi.order.unOrderList,
            {orderId:this.state.orderNo,
                exceptionOrdersSpeed:this.state.checkOrderType,
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
                console.log(res)
            if (res.data.data!=null){
                this.dateChangeRule(res);
                this.dateChangeRule11(res);
                this.filterSendState(res);
                this.filterUnorderType(res);
                this.filterSpeedOder(res);
            }
            this.setState({
                unusualOrderList:res.data.data,
                dataCount:res.data.dataCount
            })
            // console.log(res.data.data)

        })
    }
    //重置
    orderReset(){
        this.setState({
            orderNo:'',
            checkOrderType:'',
            checkOrderStartDate:'',
            checkOrderEndDate:'',
        })
        this.getUnOrderList()
    }
    //改变日期的事件
    dateChange(e){
        console.log(e);
        let dateList= e.map((item)=>{
            return this.dateFormat(item._d)
        })
        console.log(dateList);
        if(dateList!=null){
            console.log(dateList[0])
            this.setState({
            checkOrderStartDate:dateList[0],
            checkOrderEndDate:dateList[1],
        })
        }

    }
//渲染
    render() {
        const Option = Select.Option;//选择的下拉表的选项值
        //备注
        let {orderRemarks,checkOrderNum,checkOrderDate,dealUser}=this.state
        //订单日期的变量
        const { RangePicker } = DatePicker;
        //表格的列表
        const columns=[
            {
                title:'订单ID',
                dataIndex:'ordersId',
                key:'ordersId'
            },
            {
                title: '订单时间',
                dataIndex:'ordersCreatetime',
                key:'ordersCreatetime'
            },
            {
                title: '订单状态',
                dataIndex:'ordersState',
                key:'ordersState'
            },
            {
                title: '订单异常类型',
                dataIndex:'exceptionOrderState',
                key:'exceptionOrderState'
            },
            {
                title: '处理人',
                dataIndex:'userName',
                key:'userName'
            },
            {
                title: '申请处理时间',
                dataIndex:'exceptionTime',
                key:'exceptionTime'
            },
            {
                title: '处理进度',
                dataIndex:'exceptionOrderSpeed',
                key:'exceptionOrderSpeed'
            },
            {
                title: '操作',
                render:(text,record,index)=>(
                    this.getButton(text)
                ),
            }
        ]



        //标签页的数据
        const { TabPane } = Tabs;
        //点击查询里面的表的假数据
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

            <div  className='orderListPage'>
              <h2>未处理异常订单</h2>
              <div>
                  <Row>
                      <Col span={5}>订单ID：<Input placeholder="请输入订单号" className='orderInput' data-key='orderNo' value={this.state.orderNo} onChange={this.changeHandle} type='text' /></Col>
                      <Col span={6}> 订单日期：<RangePicker locale={locale} className='orderDate' data-key='checkOrderDate' value={checkOrderDate} onChange={this.dateChange}  /></Col>
                      <Col span={5}>处理人：<Input className='orderInput' data-key='dealUser' value={dealUser} onChange={this.changeHandle}/></Col>
                      <Col span={4}>处理状态：
                          <Select placeholder="请选择" value={this.state.checkOrderType} onChange={this.selctChangeType} >
                              <Option value="">全部</Option>
                              <Option value="1">未处理</Option>
                              <Option value="2">已处理</Option>
                          </Select>
                      </Col>
                      {/*<Col span={4}>异常类型：*/}
                      {/*    <Select placeholder="请选择" value={this.state.checkOrderState} onChange={this.selctChange} >*/}
                      {/*        <Option value="">全部</Option>*/}
                      {/*        <Option value="1">退货</Option>*/}
                      {/*        <Option value="2">换货</Option>*/}
                      {/*        <Option value="3">取消</Option>*/}
                      {/*    </Select>*/}
                      {/*</Col>*/}

                      <Col span={4}>
                          <Button type="primary" className='primaryButton' onClick={this.searchOrder}>搜索</Button>
                          <Button onClick={()=>{this.orderReset()}}>重置</Button>
                      </Col>
                  </Row>
                  <Row className='orderTable'>
                      <Col span={24}>
                          <Tabs defaultActiveKey="1" onChange={this.callback} tabBarStyle={{width:'100%'}}>
                              <TabPane tab="全部" key="1">
                                 <Row>
                                     <Col span={24}>
                                         <Table dataSource={this.state.unusualOrderList} columns={columns} pagination={{
                                             // defaultCurrent: this.state.defaultCurrent,
                                             current: this.state.current,
                                             pageSize:this.state.pageSize,
                                             total:this.state.dataCount,
                                             onChange:(page)=>{this.fenye(page)}//分页事件
                                         }}/>
                                     </Col>
                                 </Row>
                              </TabPane>
                              {/*<TabPane tab="退货订单" key="2">*/}
                              {/*    Content of Tab Pane 2*/}
                              {/*</TabPane>*/}
                              {/*<TabPane tab="换货订单" key="3">*/}
                              {/*    Content of Tab Pane 3*/}
                              {/*</TabPane>*/}
                              {/*<TabPane tab="取消订单" key="4">*/}
                              {/*    Content of Tab Pane 3*/}
                              {/*</TabPane>*/}
                          </Tabs>
                      </Col>
                  </Row>
                  <div>
                      <Modal
                          title="异常订单处理"
                          width='40%'
                          cancelText='不同意'
                          okText='同意'
                          okType="danger"
                          footer={[<Button style={{marginBottom:'20px'}} type='primary' onClick={this.agree}>同意</Button>,<Button onClick={this.disAgreen}>不同意</Button>]}
                          bodyStyle={{}}
                          visible={this.state.visible}
                          onCancel={this.handleCancel}
                          // onOk={this.handleOk}
                          // style={{paddingBottom:'20px'}}
                      >
                          <Row>
                              <Col span={12}>
                                  <Row>
                                      <Col span={10}>订单号：</Col>
                                      <Col span={14}>{this.state.unusualOrderId}</Col>
                                  </Row>
                              </Col>
                              <Col span={12}>
                                  <Row>
                                      <Col span={10}>收货人：</Col>
                                      <Col span={14}>{this.state.checkOrderList.userinfoNickname}</Col>
                                  </Row>
                              </Col>
                          </Row>
                          <Row  style={{marginTop:'20px'}}>
                              <Col span={12}>
                                  <Row>
                                      <Col span={10}>下单时间：</Col>
                                      <Col span={14}>{this.state.checkOrderList.ordersCreatetime}</Col>
                                  </Row>
                              </Col>
                              <Col span={12}>
                                  <Row>
                                      <Col span={10}>用户账号：</Col>
                                      <Col span={14}>{this.state.checkOrderList.accountId}</Col>
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
                                      <Col span={14}>{this.state.checkOrderList.ordersOldprice}</Col>
                                  </Row>
                              </Col>
                              <Col span={12}>
                                  <Row>
                                      <Col span={10}>订单配送费：</Col>
                                      <Col span={14}>￥{this.state.checkOrderList.freight}</Col>
                                  </Row>
                              </Col>
                          </Row>
                          <Row  style={{marginTop:'20px'}}>
                              <Col span={12}>
                                  <Row>
                                      <Col span={10}>订单优惠：</Col>
                                      <Col span={14}>
                                          <p>特价：减￥{this.state.checkOrderList.couponStartMoney}</p>
                                          <p>优惠券 减￥{this.state.checkOrderList.couponMoney}</p>
                                      </Col>
                                  </Row>
                              </Col>
                              <Col span={12}>
                                  <Row>
                                      <Col span={10}>订单实付金额：</Col>
                                      <Col span={14}>￥{this.state.checkOrderList.ordersMoney}</Col>
                                  </Row>
                              </Col>
                          </Row>
                          <Row  style={{marginTop:'20px'}}>
                              <Col span={12}>
                                  <Row>
                                      <Col span={10}>收货地址：</Col>
                                      <Col span={14}>{this.state.checkOrderList.userAddressDetail}</Col>
                                  </Row>
                              </Col>
                              <Col span={12}>
                                  <Row>
                                      <Col span={10}>联系方式：</Col>
                                      <Col span={14}>{this.state.checkOrderList.phone}</Col>
                                  </Row>
                              </Col>
                          </Row>
                          <Row  style={{marginTop:'20px'}}>
                              <Col span={12}>
                                  <Row>
                                      <Col span={10}>订单配送方式：</Col>
                                      <Col span={14}>{this.state.checkOrderList.logisticsName}</Col>
                                  </Row>
                              </Col>
                              <Col span={12}>
                                  <Row>
                                      <Col span={10}>物流单号：</Col>
                                      <Col span={14}>{this.state.checkOrderList.logisticsNo}</Col>
                                  </Row>
                              </Col>
                          </Row>
                          <Row  style={{marginTop:'20px'}}>
                              <Col span={12}>
                                  <Row>
                                      <Col span={10}>支付方式：</Col>
                                      <Col span={14}>{this.state.checkOrderList.paymentMethod}</Col>
                                  </Row>
                              </Col>
                              <Col span={12}>
                                  <Row>
                                      <Col span={10}>订单状况：</Col>
                                      <Col span={14}>{this.state.checkOrderList.ordersState}</Col>
                                  </Row>
                              </Col>
                          </Row>
                          <Row  style={{marginTop:'10px'}}>
                              <Col span={24}>
                                  <Form.Item
                                      label="备注信息："
                                      // name="orderRemarks"
                                      labelAlign='left'
                                      labelCol={{span:4}}
                                  >
                                      <Input.TextArea  value={orderRemarks} onChange={this.changeHandle} data-key='orderRemarks' />
                                  </Form.Item>
                              </Col>
                          </Row>
                      </Modal>
                  </div>
              </div>
            </div>
        )
    }
}

export {Abnormalorder as default}
