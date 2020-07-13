import React from 'react';  //导入react
import { Table,  Space ,Button, Switch, Row, Col ,Input ,Form, Modal,DatePicker } from 'antd';
import moment from 'moment';
import Axios from '../../utils/axios';
import ioApi from '../../api/index'

const { RangePicker } = DatePicker;
class Discount extends React.Component {
    
//构造函数

    constructor(props) {
        super(props)
        //绑定双向数据方法
        this.changeHandle = this.changeHandle.bind(this);
        this.state = {
            id:0,//查看详情点击的id
            visible: false ,//模态框显示
            visibleAdd: false,//添加模态框显示
            inputId:"",    //查询id
            inputName:"",   //查询优惠券名
            addName:'',  //添加优惠券名
            addNum:'',  //添加优惠券数量
            addconditions:'',  //添加使用条件
            addpreferential:'',  //添加优惠金额
            addStartTime:'',  //添加开始时间
            addEndTime:'',  //添加结束时间
            data:[],  //列表数据
            current:1,  //页数
            pagesize:5,  //每页显示数
            total:'',  //总页数
            detailsId:'',  //详情id
            detailsName:'',  //详情优惠券名
            detailsconditions:'',  //详情使用条件
            detailspreferential:'',  //详情优惠金额
            detailsStartTime:'',  //详情开始时间
            detailsEndTime:'',  //详情结束时间
            detailsNum:'' , //详情数量
            detailsUserName:'',  //详情创建者姓名
            status:false//状态
        }
    };
    // 渲染前
    componentWillMount(){
        Axios.post(ioApi.discount.getDiscountList,
            {
                currentPsge:this.state.current,
                pageSize:this.state.pagesize
            },
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
        ).then(result => {
            console.log(result)
            this.setState({
                data:result.data.data,
                total:result.data.count
            })
        })
    }
    //修改优惠券的状态
    onSwich(e) {
        console.log(e);
        var changeStatue = e.coupon_Statue
        if(changeStatue===1){
            changeStatue=0
        }else{
            changeStatue=1
        }
        // console.log(id)
        // Axios.post(ioApi.discount.change,
        //     {
        //         coupon_Endtime:e.coupon_Endtime,
        //         coupon_Id:1,
        //         coupon_name:e.coupon_name,
        //         coupon_Starttime:e.coupon_Starttime,
        //         coupon_Statue:1,
        //         coupon_Money:e.coupon_Money,
        //         coupon_Startmoney:e.coupon_Startmoney,
        //         coupon_Userid:e.coupon_Userid
        //     }
        // ).then((result)=>{
        //     console.log(result)
        //     Axios.post(ioApi.discount.getDiscountList,
        //         {
        //             currentPsge:this.state.current,
        //             pageSize:this.state.pagesize
        //         },
        //         {
        //             headers:{
        //                 'Content-Type':'application/json'
        //             }
        //         }
        //     ).then(result1 => {
        //         console.log(result1)
        //         this.setState({
        //             data:result1.data.data,
        //             total:result1.data.count
        //         })
        //     })
        // })
    }
    
    //时间选择
    onChange(dates, dateStrings) {
        console.log(dateStrings)
        const dateParseStart = dateStrings[0]
        console.log(dateParseStart)
        const dateParseEnd = dateStrings[1]
        console.log(dateParseEnd)
        this.setState({
            addStartTime:dateParseStart,
            addEndTime:dateParseEnd
        })
    }
    //绑定数据
    ProductName1(e){
        this.setState({
            inputName:e.target.value
        })
    }
    ProductName(e){
        this.setState({
            inputId:e.target.value
        })
    }

    // 查看详情模态框
    showModal = (id) => {
        console.log(id)
        this.setState({
        visible: true,
        id:id
        });
        //查询详情
        Axios.post(ioApi.discount.xiangqing,{
            coupon_Id: id,
        }).then(result=>{
            console.log(result.data.data[0])
            this.setState({
                detailsId:result.data.data[0].coupon_Id,//优惠券id
                detailsName:result.data.data[0].coupon_name,//优惠券名
                detailsconditions:result.data.data[0].coupon_Money,//优惠金额
                detailspreferential:result.data.data[0].coupon_Startmoney,//使用条件
                detailsStartTime:result.data.data[0].coupon_Starttime,//开始时间
                detailsEndTime:result.data.data[0].coupon_Endtime,//结束时间
                detailsNum:result.data.data[0].coupon_Number,//优惠券数量
                detailsUserName:result.data.data[0].coupon_Userid,//创建者id
            })
        })
    };

    // 添加按钮模态框
    showModalAdd =()=>  {
        this.setState({
        visibleAdd: true,
        });
    };

    // 显示
    handleOk = e => {
        // console.log(e);
        this.setState({
            visible: false,
            visibleAdd: false,
        });
    };
    //封装的双向绑定
    changeHandle(e){
        e.preventDefault()
        let key = e.target.dataset.key;
        this.setState({[key]:e.target.value})
    }
    //添加
    add = ()=>{
        console.log(this.state.addName)
        console.log(this.state.addNum)
        console.log(this.state.addconditions)
        console.log(this.state.addpreferential)
        console.log(this.state.addStartTime)
        console.log(this.state.addEndTime)
        //添加优惠券
        Axios.post(ioApi.discount.add,{
            coupon_name:this.state.addName,   // 优惠券名称
            coupon_Number:this.state.addNum,  //优惠券数量
            coupon_Money:this.state.addconditions,  //优惠券金额
            coupon_Startmoney:this.state.addpreferential,  //使用条件
            coupon_Starttime:this.state.addStartTime,  //开始时间
            coupon_Endtime:this.state.addEndTime  //结束时间
        },
        {
            headers:{
                'Content-Type':'application/json'
            }
        }).then(result=>{
            console.log(result)
            //获取优惠券列表
            Axios.post(ioApi.discount.getDiscountList,
                {
                    currentPsge:this.state.current,
                    pageSize:this.state.pagesize
                },
                {
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            ).then(result1 => {
                console.log(result1)
                this.setState({
                    data:result1.data.data,
                    total:result1.data.count
                })
            })
        })
        this.setState({
            visible: false,
            visibleAdd: false,
        });
    }
    // 关闭
    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false,
            visibleAdd: false,
        });
    };
    // 重置
    onReset = () => {
        this.setState({inputId:''},function(){
           console.log(this.state.inputId)
        })
        this.setState({inputName:''},function(){
            console.log(this.state.inputName)
        })
        // 重新给列表赋值
        Axios.post(ioApi.discount.getDiscountList,
            {
                currentPsge:this.state.current,
                pageSize:this.state.pagesize
            },
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
        ).then(result => {
            console.log(result)
            this.setState({
                data:result.data.data
            })
        })
    };
    // 分页
    fenye(page){
        console.log(page)
        this.setState({
            current:page
        },function(){
            Axios.post(ioApi.discount.getDiscountList,
                {
                    currentPsge:this.state.current,
                    pageSize:this.state.pagesize
                },
                {
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            ).then(result => {
                console.log(result)
                this.setState({
                    data:result.data.data,
                    total:result.data.count
                })
            })
 
        }) 
    }
    // 搜索
    search = ()=>{
        console.log(this.state.inputId)
        console.log(this.state.inputName)
        Axios.post(ioApi.discount.search,{
            pageSize:this.state.pagesize,
            currentPsge:this.state.current,
            coupon_Id:this.state.inputId,
            coupon_name:this.state.inputName
        }).then(result=>{
            console.log(result.data.data)
            this.setState({
                data:result.data.data
            })
        })
    }

    formRef = React.createRef();
//渲染
    render() {
        let {addName,addNum,addconditions,addpreferential} = this.state;
        const columns = [
            {
              title: '优惠券id',
              dataIndex: 'coupon_Id',
              key: 'coupon_Id',
              render: text => <span>{text}</span>,
            },
            {
              title: '优惠券名称',
              dataIndex: 'coupon_name',
              key: 'coupon_name',
            },
            {
              title: '开始时间',
              dataIndex: 'coupon_Starttime',
              key: 'coupon_Starttime',
            },
            {
              title: '过期时间',
              key: 'coupon_Endtime',
              dataIndex: 'coupon_Endtime',
            },
            {
              title: '操作',
              key: 'coupon_Statue',
              render: (text,record) => (
                <Space size="large">
                    <Button type='default' onClick={()=>this.showModal(record.coupon_Id)}>查看详情</Button>
                    <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={record.coupon_Statue===1?true:false} onChange={()=>this.onSwich(text)}/>
                </Space>
              ),
            },
          ];
        return (
            <div>
                <h3>优惠券管理</h3>
                 {/* 添加优惠券模态框 */}
                 <Modal
                    forceRender
                    title="添加优惠券"
                    visible={this.state.visibleAdd}
                    onOk={this.add}
                    onCancel={this.handleCancel}
                    width={880}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                          退出
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.add}>
                          提交
                        </Button>,
                    ]}
                    >
                        <Form
                        >
                            {/* 第一行 */}
                            <Row>
                                <Col span='1'></Col>
                                <Col span='10'>
                                    <Form.Item label='优惠券名称：'>
                                        <Input data-key="addName" onChange={this.changeHandle} value={addName}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span='2'></Col>
                                <Col span='10'>
                                    <Form.Item label='优惠券数量：'>
                                        <Input data-key="addNum" onChange={this.changeHandle} value={addNum}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span='1'></Col>
                            </Row>
                            {/* 第二行 */}
                            <Row>
                                <Col span='1'></Col>
                                <Col span='10'>
                                    <Form.Item label='使用条件：'>
                                        <Input data-key="addconditions" onChange={this.changeHandle} value={addconditions}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span='2'></Col>
                                <Col span='10'>
                                    <Form.Item label='减免金额：'>
                                        <Input data-key="addpreferential" onChange={this.changeHandle} value={addpreferential}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span='1'></Col>
                            </Row>
                            {/* 第三行 */}
                            <Row>
                                <Col span='1'></Col>
                                <Col span='23'>
                                    <Form.Item label='有效时间：'>
                                        <RangePicker
                                            ranges={{
                                            // Today: [moment(), moment()],
                                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                                            }}
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </Form.Item>
                                </Col>
                                
                            </Row>
                        </Form>
                </Modal>
                {/* 头部搜索表单 */}
                <Form
                ref={this.formRef}
                name='search'
                >
                    <Row>
                        <Col span='4'>
                            <Button type="primary" onClick={this.showModalAdd}>添加优惠券</Button>
                        </Col>
                        <Col span='4'>
                            <Form.Item label="优惠券id：">
                                <Input onChange={this.ProductName.bind(this)} value={this.state.inputId}></Input>
                            </Form.Item>
                        </Col>
                        <Col span='2'></Col>
                        <Col span='4'>
                            <Form.Item label="优惠券名称：">
                                <Input onChange={this.ProductName1.bind(this)} value={this.state.inputName}></Input>
                            </Form.Item>
                        </Col>
                        <Col span='2'></Col>
                        <Col span='1'>
                            <Button type="primary" onClick={this.search}>搜索</Button>
                        </Col>
                        <Col span='4'>
                            <Button type="default" onClick={this.onReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                {/* 列表table */}
                <Table 
                columns={columns} 
                dataSource={this.state.data} 
                pagination={
                    {
                        current:this.state.current,
                        pageSize:this.state.pagesize,
                        total:this.state.total,
                        onChange:(page) => {this.fenye(page)}
                    }
                }
                />
                <Modal
                title="查看详情"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
                >
                    <Row>
                        <Col span='12'>优惠券id：{this.state.detailsId}</Col>
                        <Col span='12'>优惠券名称：{this.state.detailsName}</Col>
                    </Row>
                    <Row>
                        <Col span='12'>使用条件：{this.state.detailsconditions}元</Col>
                        <Col span='12'>减免金额：{this.state.detailspreferential}元</Col>
                    </Row>
                    <Row>
                        <Col span='12'>创建时间：{this.state.detailsStartTime}</Col>
                        <Col span='12'>结束时间：{this.state.detailsEndTime}</Col>
                    </Row>
                    <Row>
                        <Col span='12'>剩余数量：{this.state.detailsNum}</Col>
                        <Col span='12'>创建者姓名：{this.state.detailsUserName}</Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

export {Discount as default}
