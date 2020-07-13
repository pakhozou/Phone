import React from 'react'
import { Form, Input, Button, Checkbox,Col ,Row,notification, Space } from 'antd';
import axios from "axios";
import orapi from "../../api";

class sendOrderInfo extends React.Component {
    formRef=React.createRef()
    constructor(props) {
        super(props);
        this.changeHandle=this.changeHandle.bind(this)
        this.state={
            orderSendInfo:{},//路由传过来的订单的详情
            orderGetInfo:{}//axios获取的订单的详情
        }
    }
    componentWillMount() {
        if (this.props.location.query!==undefined){
            this.setState({
                orderSendInfo:this.props.location.query.orderId

            },()=>{
                // console.log(this.state.orderSendInfo.ordersId)
                this.getOrderInfo()
                console.log(this.state.orderGetInfo)
            })
        }else {
            this.props.history.push('/index/Orderproduct/Orderdeliver')
        }
    }
    //获取订单详细
    getOrderInfo(){
        axios.post(orapi.order.selectOrderInfo,{orderId:this.state.orderSendInfo.ordersId},
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
            this.setState({
                orderGetInfo:res.data.data,
                // checkOrderList:res.data.data.list
            })
        })
    }
    //表单相关函数
    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    onFinish = values => {
         console.log('Success:', values);

        this.formRef.current.resetFields();
        this.props.history.go(-1)
    };
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);

    };
    cancel=()=>{
        this.props.history.go(-1)
        this.formRef.current.resetFields();
    }
    //表单相关函数 end
    //提示框的相关函数
    openNotificationWithIcon = type => {
        axios.post(orapi.order.sendProduct,{logisticsNo:this.state.sendOrderNumber,orderId:this.state.orderSendInfo.ordersId},{
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
            if (res.data.code==200){
                notification[type]({
                    message: '发货成功',
                    description:
                        '您的订单已成功发货，系统将会通知买家',
                    duration:1.5
                });
            }

        })


    };
    //提示框的end
    //搜索的数据改变事件
    changeHandle(e){
        e.preventDefault()//阻止默认事件
        let key =e.target.dataset.key;
        this.setState({
            [key]:e.target.value
        })
    }

    render() {
        let {sendToAdress,sendOrderNumber,orderCompany,sendOrderMoney,orderRemarks}=this.state//表单里面的数据的指向
        return (
            <div>
                <div style={{width:'64%',margin:'20px auto' ,border:'1px solid rgb(217,217,217)',padding:'10px 40px'}}>
                    <h2 style={{textAlign:'center'}}>发货详情</h2>
                    <Form
                        {...this.layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        ref={this.formRef}
                    >
                            <Row style={{marginBottom:'30px'}}>
                                <Col span={8}>
                                    <Row>
                                        <Col span={8}>
                                            订单ID：
                                        </Col>
                                        <Col span={16}>
                                            {this.state.orderSendInfo.ordersId}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={10}>
                                    <Row>
                                        <Col span={8}>
                                            订单时间：
                                        </Col>
                                        <Col span={16}>
                                            {this.state.orderSendInfo.ordersCreatetime}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={6}>
                                    <Row>
                                        <Col span={8}>
                                            收货人：
                                        </Col>
                                        <Col span={16}>
                                            {this.state.orderSendInfo.username}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        <Row style={{marginBottom:'30px'}}>
                            <Col span={8}>
                                <Row>
                                    <Col span={8}>
                                        收货电话：
                                    </Col>
                                    <Col span={16}>
                                        {this.state.orderGetInfo.phone}
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={10}>
                                <Row>
                                    <Col span={8}>
                                        收货地址：
                                    </Col>
                                    <Col span={16}>
                                        {this.state.orderGetInfo.userAddressDetail}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                         <Col span={11}>
                             <Form.Item
                                 label="发货地址"
                                 name="sendToAdress"
                                 labelAlign='left'
                             >
                                 <Input value={sendToAdress} onChange={this.changeHandle} data-key='sendToAdress' defaultValue='四川省成都市高新区天府二街'/>
                             </Form.Item>
                         </Col>
                         <Col span={11}>
                             <Form.Item
                                 label="物流单号"
                                 name="sendOrderNumber"
                                 rules={[{ required: true, message: '物流单号不能为空!' }]}
                             >
                                 <Input value={sendOrderNumber} onChange={this.changeHandle} data-key='sendOrderNumber'/>
                             </Form.Item>

                         </Col>
                     </Row>
                        <Row>
                            <Col span={11}>
                                <Form.Item
                                    label="物流公司"
                                    name="orderCompany"
                                    labelAlign='left'
                                >
                                    <Input value={orderCompany} onChange={this.changeHandle} data-key='orderCompany' />
                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Form.Item
                                    label="运费"
                                    name="sendOrderMoney"
                                >
                                    <Input value={sendOrderMoney} onChange={this.changeHandle} data-key='sendOrderMoney' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="备注信息："
                                    name="orderRemarks"
                                    labelAlign='left'
                                    labelCol={{span:4}}
                                >
                                    <Input.TextArea  value={orderRemarks} onChange={this.changeHandle} data-key='orderRemarks' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginBottom:'30px',color:'rgb(60,63,65)'}}>
                            <Col span={8}>
                                <Row>
                                    <Col span={8}>
                                        处理人：
                                    </Col>
                                    <Col span={16}>
                                        张大大
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Form.Item {...this.tailLayout} >
                            <Row>
                                <Col span={6}>
                                    <Button type="primary" htmlType="submit" onClick={() => this.openNotificationWithIcon('success')}>
                                        确定发货
                                    </Button>
                                </Col>
                                <Col span={6}>
                                    <Button htmlType="button" type='default' onClick={this.cancel}>
                                        取消
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }

}

export {sendOrderInfo as default}