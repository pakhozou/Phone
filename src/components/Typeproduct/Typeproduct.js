import React from 'react';  //导入react
import { Alert, Radio, Button, Modal, Row, Col, Input, Tooltip, Table, Space, Select } from "antd";
import { SearchOutlined } from '@ant-design/icons';
// import Demo from "./Demo"
import './Typeproduct.css';
import Axios from "../../utils/axios"
import Typeapi from "../../api/index"
class typeproduct extends React.Component {

    //当组件输出到 DOM 后会执行 componentDidMount()
    componentDidMount() {
        this.Listrequest()
        this.Getdropdown()
    }
    //构造函数
    constructor(props) {
        super(props)
        this.state = {
            //  当前页
            current: 1,
            //  每页显示
            pageSize: 4,
            Length:'',
            //  总条数
            total: 12,
            //  默认显示第几页
            defaultCurrent: 1,
            //是否点击跳转
            showQuickJumper: true,
            visible: false,
            visible1: false,
            inpValu: "",
            Gitedit: '',
            name: "",
            id: "",
           
            Data: [],
            selecList: [],//下拉列表的数
            columns: [
                {
                    title: '类型id',
                    dataIndex: 'goodsType_id',
                    key: 'id',
                    render: text => <a>{text}</a>,
                    align:"center",
                    width:"150px"
                },
                {
                    title: '类型',
                    dataIndex: 'goodsType_name',
                    key: 'Type',
                    align:"center",
                    width:"250px"
                },
                {
                    title: 'Date',
                    dataIndex: 'goodsType_createTime',
                    key: 'Date',
                    align:"center",
                    width:"350px"
                },
                {
                    title: '操作',
                    align:"center",
                    width:"250px",
                    key: 'action',
                    render: (record) => (
                        <div>
                            <Space size="middle">
                                <Radio.Button value="default" type="ghost" onClick={() => this.showModal1(record)}>编辑</Radio.Button>
                                <Button type="dashed" danger onClick={() => this.DelType(record)}>删除</Button>
                            </Space>
                        </div>

                    ),
                },
            ]
        }
        this.DelType = this.DelType.bind(this)
    };
    Getdropdown(){
        console.log("请求成功")
        Axios.post(Typeapi.Type.queryType
        )
            .then(res => {
                this.setState({ selecList: res.data.data })
                console.log(res)
            })
            
    }
    //获取列表条数
    //列表请求
    Listrequest = () => {
        Axios.post(Typeapi.Type.queryGoods, {
            nowsPage: 1,
            pageSize: 20,
        })
            .then(res => {
                this.setState({ Data: res.data.data.data,
                    total:res.data.data.dataCount,
                    current:res.data.data.nowsPage
                })
                console.log(res)
            })
    }
    //模态框
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    //分页
    fenye() {
        const fy = {
            //  当前页
            current: this.state.current,
            //  每页显示
            pageSize: this.state.pageSize,
            //  总条数
            total: this.state.total,
            //  点击下一页
            onChange: (current) => this.changPage(current),
            //  每页显示变化
            onShowSizeChange: (Current, pageSize) => {
                console.log(pageSize);
                this.onShowSizeChange(Current, pageSize)
            },
            //  默认第几页
            defaultCurrent: this.state.defaultCurrent,
            //是否可以跳转
            showQuickJumper: this.state.showQuickJumper,
        };
        return fy
    }
    changPage(current) {
        console.log(current);
        this.setState({
            current: current
        })
    }
    onShowSizeChange(Current, pageSize) {
        console.log(Current, pageSize)
    }
    //删除类型
    DelType = (record) => {
        console.log(record.goodsType_id)
        Axios.post(Typeapi.Type.delType, {
            goodsType_id: record.goodsType_id
        })
            .then(res => {
                console.log(res.data)
                if (res.data.code === 500) {
                    this.warning(res.data.msg)
                }
                else if (res.data.code === 200) {
                    console.log(res.data.msg)
                    this.success(res.data.msg)
                    this.Listrequest()
                    this.Getdropdown()
                }
            })
    }
    showModal1 = (record) => {
        console.log(record.goodsType_name)
        this.setState({

            visible1: true,
            name: record.goodsType_name,
            id: record.goodsType_id
        });
        console.log(this.state)
        // return (record.goodsType_name, record.goodsType_id)
    };
    //点击模态框中的ok执行方法
    handleOk = e => {
        Axios.post(Typeapi.Type.addType, {
            goodsType_name: this.state.inpValu
        })
            .then(res => {
                if (res.data.code === 200) {
                    this.success(res.data.msg)
                    this.Listrequest()
                    this.Getdropdown()

                }
                else if(res.data.code === 500){
                    this.warning(res.data.msg)
                }
                console.log(res)
            })
        this.setState({
            visible: false,
        });
    };
    //下拉框
    handleChange(value) {
        console.log(value);
        Axios.post(Typeapi.Type.queryGoods, {
            nowsPage: 1,
            pageSize: 1,
            goodsType_name: value
        })
            .then(res => {
                console.log(res.data.data.data)
                this.setState({ Data: res.data.data.data })
            })
    }
    handleOk1 = e => {
        this.setState({
            visible1: false,
        });
        Axios.post(Typeapi.Type.editType, {
            goodsType_id: this.state.id,
            goodsType_name: this.state.Gitedit

        })
            .then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    this.success(res.data.msg)
                    this.Listrequest()
                    this.Getdropdown()
                }
                else if (res.data.code === 500) {
                    this.warning(res.data.msg)
                }
            })
    };
    //点击模态框中的取消执行方法
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    Getvalue(e) {
        // console.log(e.target.value)
        this.setState({
            Gitedit: e.target.value
        })
    };
    handleCancel1 = e => {
        this.setState({
            visible1: false,
        });
    };
    ProductName(e) {
        this.setState({
            inpValu: e.target.value
        })
    }
    warning = (message) => {
        Modal.warning({
            title: message,
            //   content: '该类型下还有子商品',
        });
    }
    success = (message) => {
        Modal.success({
            title: message,
        });
    }
    chongzhi = () => {
        this.Listrequest()
    }
    //渲染
    render() {
        const { Option } = Select;
        return (
            <div>
                <Row className="top">
                    <Col span={2} offset={1}><h4>商品类型</h4></Col>
                    <Col span={3} offset={0.5}>
                        <Select  defaultValue="选择类型" onChange={this.handleChange.bind(this)}>
                            {
                                this.state.selecList.map((element) => {
                                    return <Option value={element.goodsType_name}>{element.goodsType_name}</Option>
                                })
                            }
                        </Select>
                    </Col>
                    <Col span={2} offset={0.5}>
                        <Radio.Button className="chognzhi" type="primary" value="重置" onClick={this.chongzhi} >重置</Radio.Button>
                    </Col>
                    <Col span={2} offset={9}>
                        <Radio.Button className="tianjia" type="primary" value="商品类型" onClick={this.showModal} >添加</Radio.Button>
                    </Col>
                </Row>
                <Row className="Table">
                    <Col span={22} offset={1}>
                        <Table bordered="ture" columns={this.state.columns} tableLayout="auto" dataSource={this.state.Data} pagination={this.fenye()} />
                    </Col>
                </Row>
                <Modal
                    title="添加类型"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input placeholder="商品类型" onChange={this.ProductName.bind(this)} value={this.state.inpValu} />
                </Modal>
                <Modal
                    title="修改类型"
                    visible={this.state.visible1}
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                >
                    {/* <Demo></Demo> */}
                    <Input placeholder={this.state.name} onChange={this.Getvalue.bind(this)} />
                </Modal>

            </div>
        )
    }
}
export { typeproduct as default }
