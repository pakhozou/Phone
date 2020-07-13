import React from 'react';  //导入react
import { Table,  Space ,Button, Switch, Row, Col ,Input ,Form, Modal,DatePicker } from 'antd';
import moment from 'moment';
import Axios from 'axios';
// import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
//xxx 组件名
const { RangePicker } = DatePicker;
const data = [
{
    key: '1',
    id: '1',
    name: "满100减10元",
    create: '2020-1-6',
    expiration:"2020-7-6"
},
{
    key: '2',
    id: '2',
    name: "满100减10元",
    create: '2020-1-6',
    expiration:"2020-7-6"
},
{
    key: '3',
    id: '3',
    name: "满100减10元",
    create: '2020-1-6',
    expiration:"2020-7-6"
},
{
    key: '4',
    id: '4',
    name: "满100减10元",
    create: '2020-1-6',
    expiration:"2020-7-6"
    },
    {
    key: '5',
    id: '5',
    name: "满100减10元",
    create: '2020-1-6',
    expiration:"2020-7-6"
    },
];
// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
//   };
function onSwich(checked) {
    console.log(checked);

    // console.log(id)
  }
function onChange(dates, dateStrings) {
    const dateParseStart = Date.parse(dateStrings[0])
    console.log(dateParseStart)
    const dateParseEnd = Date.parse(dateStrings[1])
    console.log(dateParseEnd)
  }
class Discount extends React.Component {
    
//构造函数

    constructor(props) {
        super(props)
        this.state = {
            id:0,
            visible: false ,
            visibleAdd: false,
            inputId:"",
            inputName:"",
        }
    };
    // 渲染前
    componentWillMount(){
        Axios.get('http://111.229.83.241:9601/coupon/hello',
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
        ).then(result => {
            console.log(result)
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
    };
    // 显示模态框事件


    // 添加按钮模态框
    showModalAdd =()=>  {
        this.setState({
        visibleAdd: true,
        });
    };

    // 显示
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
            visibleAdd: false,
        });
    };

    // 关闭
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            visibleAdd: false,
        });
    };
    // 重置
    onReset = () => {
       console.log("重置")
    //    this.formRef.current.resetFields();
       this.setState({inputId:''},function(){
           console.log(this.state.inputId)
       })
       this.setState({inputName:''},function(){
        console.log(this.state.inputName)
    })
    };

    // 搜索
    search = ()=>{
        console.log(this.state.inputId)
        console.log(this.state.inputName)
    }

    formRef = React.createRef();
//渲染
    render() {
        const columns = [
            {
              title: '优惠券id',
              dataIndex: 'id',
              key: 'id',
              render: text => <span>{text}</span>,
            },
            {
              title: '优惠券名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '创建时间',
              dataIndex: 'create',
              key: 'create',
            },
            {
              title: '过期时间',
              key: 'expiration',
              dataIndex: 'expiration',
            },
            {
              title: '操作',
              key: 'operation',
              render: (text,record) => (
                <Space size="large">
                    <Button type='default' onClick={()=>this.showModal(record.id)}>查看详情</Button>
                    <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked onChange={onSwich}/>
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
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                          退出
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
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
                                        <Input></Input>
                                    </Form.Item>
                                </Col>
                                <Col span='2'></Col>
                                <Col span='10'>
                                    <Form.Item label='优惠券数量：'>
                                        <Input></Input>
                                    </Form.Item>
                                </Col>
                                <Col span='1'></Col>
                            </Row>
                            {/* 第二行 */}
                            <Row>
                                <Col span='1'></Col>
                                <Col span='10'>
                                    <Form.Item label='使用条件：'>
                                        <Input></Input>
                                    </Form.Item>
                                </Col>
                                <Col span='2'></Col>
                                <Col span='10'>
                                    <Form.Item label='减免金额：'>
                                        <Input></Input>
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
                                            onChange={onChange}
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
                <Table columns={columns} dataSource={data} />
                <Modal
                title="查看详情"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
                >
                   <Row>
                        <Col span='12'>优惠券id：{this.state.id}</Col>
                        <Col span='12'>优惠券名称：{this.state.id}</Col>
                   </Row>
                   <Row>
                        <Col span='12'>使用条件：{this.state.id}</Col>
                        <Col span='12'>减免金额{this.state.id}</Col>
                   </Row>
                   <Row>
                        <Col span='12'>创建时间：{this.state.id}</Col>
                        <Col span='12'>结束时间：{this.state.id}</Col>
                   </Row>
                   <Row>
                        <Col span='12'>剩余数量：{this.state.id}</Col>
                        <Col span='12'>创建者姓名：{this.state.id}</Col>
                   </Row>
                </Modal>
            </div>
        )
    }
}

export {Discount as default}
