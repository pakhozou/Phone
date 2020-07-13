import React from 'react';
import { Input,Row, Col, Menu, Dropdown,DatePicker ,Button,Table,Space,Modal, Popconfirm, message} from 'antd';//导入元件
import './Orderproductlist.css'
import axios from 'axios'//导入axios
import orapi from '../../api/index'//导入api

//xxx 组件名
class Orderdeliver extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.changeHandle=this.changeHandle.bind(this)
        // this.selctChange=this.selctChange.bind(this)
        this.dateChange=this.dateChange.bind(this)
        this.searchOrder=this.searchOrder.bind(this)
        this.dateChangeRule=this.dateChangeRule.bind(this)
        this.orderReset=this.orderReset.bind(this)
        this.delOrder=this.delOrder.bind(this)
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
            current:'1',
            //每页显示的条数
            pageSize:'1',
            //总页数
            dataCount:'',

        }
        this.isSendProduct=this.isSendProduct.bind(this)
    }
    //挂载在前获取的数据
    componentWillMount() {
        this.getSendOrderList()
    }

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
                this.dateChangeRule(res);
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
        this.getSendOrderList()
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
            this.getSendOrderList()
        })
    }

    //确认发货的按钮，跳转路由
    isSendProduct(text){
        this.props.history.push({pathname:'/index/Orderproduct/sendOrderInfo',query:{orderId:text}})
    }
    //返回时间的过滤函数
    dateChangeRule(res){
        let timeList=res.data.data.map((item)=>{
            return item.ordersCreatetime=this.dateFormat(item.ordersCreatetime)
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
    //获取表格的数据
    getSendOrderList(){
        axios.post(orapi.order.selectOrderList,{limit:this.state.pageSize,page:this.state.current,ordersState:'2'},{
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
                this.dateChangeRule(res)
                this.filterSendState(res)
            }
            this.setState({
                data:res.data.data,
                dataCount:res.data.dataCount
            })
            console.log(this.state.dataCount)
        })
    }
    //分页
    fenye(nowPage){
        this.setState({
            current:nowPage
        },()=>{
            this.getSendOrderList()
        })
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
        //表格的表头数据
        const columns=[
            {
                title:'订单ID',
                dataIndex:'ordersId',
                key:'ordersId'
            },
            {
                title:'订单号',
                dataIndex:'ordersNo',
                key:'ordersNo'
            },
            {
                title: '用户ID',
                dataIndex:'userId',
                key: 'userId'
            },
            {
                title: '下单时间',
                dataIndex:'ordersCreatetime',
                key:'ordersCreatetime'
            },
            {
                title:'订单状态',
                dataIndex:'ordersState',
                key:'ordersState'
            },
            {
                title: '订单金额',
                dataIndex:'ordersMoney',
                key:'ordersMoney'
            },
            {
                title: '操作',
                render: (text,record,index)=>(
                    <Space size='middle'>
                        <Button type="primary" onClick={()=>{this.isSendProduct(text)}}>确认发货</Button>
                    </Space>
                )
            }

        ]
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
        let{checkOrderNum,checkOrderDate}=this.state//订单号 和 订单时间的查询数据定义
        return (
            <div className='orderListPage'>
              <h2>发货管理</h2>
              <div>
                  <Row>
                      <Col span={5}>订单ID：<Input placeholder="请输入订单号" className='orderInput' data-key='checkOrderNum'  value={checkOrderNum} onChange={this.changeHandle} type='text'/></Col>
                      <Col span={6}> 订单日期：<RangePicker className='orderDate' data-key='checkOrderDate' value={checkOrderDate} onChange={this.dateChange} /></Col>
                      <Col span={4}>
                          <Button type="primary" className='primaryButton' onClick={this.searchOrder}>搜索</Button>
                          <Button onClick={this.orderReset}>重置</Button>
                      </Col>
                  </Row>
                  <Row className='orderTable'>
                      <Col span={24}>
                          <Table dataSource={this.state.data} columns={columns} pagination={{
                              // defaultCurrent: this.state.defaultCurrent,
                              current: this.state.current,
                              pageSize:this.state.pageSize,
                              total:this.state.dataCount,
                              onChange:(page)=>{this.fenye(page)}//分页事件
                          }}/>
                      </Col>
                  </Row>
              </div>
            </div>
        )
    }
}

export {Orderdeliver as default}
