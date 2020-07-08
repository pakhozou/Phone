import React from 'react';  //导入react
import { Table,  Space ,Button, Switch, Row, Col ,Input ,Form, Modal,DatePicker } from 'antd';
import moment from 'moment';
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
function onChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }
class Discount extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {}
    };

    // 查看详情模态框
    showModal = (id) => {
        console.log(id)
        this.setState({
        visible: true,
        });
    };

    // 显示模态框事件
    state = { 
        visible: false ,
        visibleAdd: false,
    };


    // 添加按钮模态框
    showModalAdd = () => {
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
                    <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />
                </Space>
              ),
            },
          ];
        return (
            <div>
                <h3>优惠券管理</h3>
                 {/* 添加优惠券模态框 */}
                 <Modal
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
                        <Form>
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
                                    <Form.Item label='到期时间：'>
                                        <RangePicker
                                            ranges={{
                                            Today: [moment(), moment()],
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
                <Form>
                    <Row>
                        <Col span='4'>
                            <Button type="primary" onClick={this.showModalAdd}>添加优惠券</Button>
                        </Col>
                        <Col span='4'>
                            <Form.Item label="优惠券id：">
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col span='2'></Col>
                        <Col span='4'>
                            <Form.Item label="优惠券名称：">
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col span='2'></Col>
                        <Col span='1'>
                            <Button type="primary">搜索</Button>
                        </Col>
                        <Col span='4'>
                            <Button type="default">重置</Button>
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
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}

export {Discount as default}
