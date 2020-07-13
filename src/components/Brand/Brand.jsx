import React from 'react';  //导入react
import { Table, Space, Button, Modal } from "antd";
import { Row, Col, Select } from 'antd';
import wjapi from '../../api/index';
import Axios from '../../utils/axios';
// import Axios from 'axios'
import './Brand.css'
import Demo from './Dome'
import AddBrand from './AddBrand'
import Item from 'antd/lib/list/Item';


const { Option } = Select;



//xxx 组件名
export default class Brand extends React.Component {
    //构造函数


    //分页
    fenye(zonggong) {
        const fy = {
            //  当前页
            current: this.state.current,
            //  每页显示
            pageSize: this.state.pageSize,
            //  总条数
            total: this.state.zonggong,
            //  点击下一页
            onChange: (current) => this.changPage(current),
            //  每页显示变化
            onShowSizeChange: (Current, pageSize) => {
                console.log(pageSize);
                this.onShowSizeChange(Current, pageSize)
            },
            //  默认第几页
            defaultCurrent: this.state.defaultCurrent,
            //是否可以跳转
            showQuickJumper: this.state.showQuickJumper,
        };
        return fy
    }
    //点击页码事件
    changPage(current) {
        console.log(current);
        this.setState({
            current: current
        })
    }
    //变化回调
    onShowSizeChange(Current, pageSize) {
        console.log(Current, pageSize)
    }
    success(tishi) {
        Modal.success({
            content: tishi,
        });
    }
    warning(tishi) {
        Modal.warning({
            title: '失败',
            content: tishi,
        });
    }
    //删除
    isShanChu(record, index) {

        // console.log('获取的index===' + index);
        // console.log(record.goodsBrand_id);
        Axios.post(wjapi.brand.delBrand, {
            "goodsBrand_id": record.goodsBrand_id,
            "remarks": ""
        })
            .then(res => {
                // console.log(res.data.code)
                if (res.data.code === 500) {
                    const tishi = '该品牌下有商品，不能被删除'
                    this.warning(tishi)
                } else if (res.data.code === 200) {
                    const tishi = '删除成功!'
                    this.success(tishi)
                    this.huoqushuju()
                }

                
            })
        // const Brandlist = [...this.state.Brandlist];
        // Brandlist.splice(index, 1)
    }
    //添加品牌
    addBrand() {
        this.setState({
            visibletwo: true,
        });
    }
    //编辑
    edit(record) {
        // console.log(record);
        // console.log('获取的index===' + index);
        this.setState({
            bianji: record,
            visible: true,
        }, () => {
            // console.log(this.state.bianji)
        });

    }
    handleOk = e => {    //编辑事件
        Axios.post(wjapi.brand.editBrand, {
            "goodsBrand_id": this.state.bianji.goodsBrand_id,
            "goodsBrand_logo": this.state.bianjiimg.msg,
            "goodsBrand_name": this.state.bianjiname,
            "nowsPage": 1,
            "pageSize": 10,
            "remarks": this.state.bianjibeizhu
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    const tishi = '编辑成功！'
                    this.success(tishi)
                } else {
                    const tishi = '编辑失败！'
                    this.warning(tishi)
                }
                this.huoqushuju()
                this.cxhuoquxialakuang()

            })
        // console.log(e);
        this.setState({
            kong: '',
            visible: false,
        });
    };

    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleOktwo = e => {
        Axios.post(wjapi.brand.addBrand, {
            "goodsBrand_id": 0,
            "goodsBrand_logo": this.state.addbrandimg.msg,
            "goodsBrand_name": this.state.addbrandname,
            "nowsPage": 1,
            "pageSize": 12,
            "remarks": this.state.addbrandbeizhu
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    const tishi = '添加成功'
                    this.success(tishi)
                }
                this.huoqushuju()
                this.cxhuoquxialakuang()
            })
        // console.log(e);
        this.setState({
            visibletwo: false,
        });
    };

    handleCanceltwo = e => {
        // console.log(e);
        this.setState({
            visibletwo: false,
        });
    };
    //回调函数
    constructor(props) {
        super(props);
        this.state = {
            //  当前页
            current: 1,
            //  每页显示
            pageSize: 3,
            //  总条数
            total: 20,
            //  默认显示第几页
            defaultCurrent: 1,
            //品牌list
            Brandlist: [],
            //品牌搜索list
            Brandquerlist: [],
            //编辑数组
            bianji: [],
            //是否点击跳转
            showQuickJumper: true,
            visible: false,
            visibletwo: false,
            //数据 
            selectList: '选择品牌',//选择品牌  
            kong: '',
            //子组件值
            bianjiname: '',
            bianjibeizhu: '',
            bianjiimg: '',
            addbrandname: '',
            addbrandbeizhu: '',
            addbrandimg: '',
            zonggong: ''

        };
        this.isShanChu = this.isShanChu.bind(this)
    }
    getaddimg(item) {
        this.setState({
            addbrandimg: item.response
        }, () => {
            // console.log( this.state.addbrandimg)
        });
    }
    getaddbeizhu(addbeizhu) {
        this.setState({
            addbrandbeizhu: addbeizhu
        }, () => {
            // console.log(this.state.addbrandbeizhu)
        });
    }
    getaddname(addname) {
        this.setState({
            addbrandname: addname
        }, () => {
            // console.log(this.state.addbrandname)
        });
    }
    getbianjiimg(item) {
        this.setState({
            bianjiimg: item.response
        }, () => {
            // console.log( this.state.bianjiimg)
        });
    }
    getbianjibeizhu(brandbeizhu) {
        this.setState({
            bianjibeizhu: brandbeizhu
        }, () => {
            // console.log(this.state.bianjibeizhu)
        });
    }
    getbianjiname(brandname) {
        this.setState({
            bianjiname: brandname
        }, () => {
            // console.log(this.state.bianjiname)
        });
    }
    dj() {
        // console.log(this.state.bianji)
    }
    componentDidMount() {
        Axios.post(wjapi.brand.queryBrand, {
            "nowsPage": 1,
            "pageSize": 20,
            "remarks": ""
        })
            .then(res => {
                let cs = []
                // console.log(res.data.data.data)
                res.data.data.data.map((element) => {
                    cs.push(element.goodsBrand_name)
                    // console.log(element.goodsBrand_name)
                    // this.setState({
                    //     Brandquerlist:element.goodsBrand_name
                    // })
                    // this.state.Brandquerlist.push(element.goodsBrand_name)
                    // console.log(this.state.Brandquerlist)
                })

                this.setState({
                    Brandquerlist: cs,
                    Brandlist: res.data.data.data,
                    zonggong: this.state.Brandlist.length
                })
                console.log(this.state.Brandlist.length)
                console.log(this.state.Brandquerlist)

            })


    }
    // sousuo() {
    //     this.state.Brandlist.map((element, index) => {
    //         console.log(element.goodsBrand_name)

    //     })
    // }
    //获取搜索下拉框数据

    huoqushuju() {
        Axios.post(wjapi.brand.queryBrand, {
            "nowsPage": 1,
            "pageSize": 20,
            "remarks": ""
        })
            .then(res => {
                // console.log(res.data.data.data)
                this.setState({
                    Brandlist: res.data.data.data,
                })

                console.log(this.state.Brandlist)
            })
    }
    handleChange(value) {
        // console.log(value);
        this.setState({
            selectList: value
        })
        Axios.post(wjapi.brand.queryBrand, {
            "goodsBrand_name": value,
            "nowsPage": 1,
            "pageSize": 12,
            "remarks": ""
        })
            .then(res => {
                // console.log(res.data.data.data)
                this.setState({
                    Brandlist: res.data.data.data
                })
                // console.log(this.state.Brandlist)
            })
    }
    cxhuoquxialakuang() {
        Axios.post(wjapi.brand.queryBrand, {
            "nowsPage": 1,
            "pageSize": 12,
            "remarks": ""
        })
            .then(res => {
                let cs = []
                // console.log(res.data.data.data)
                res.data.data.data.map((element) => {
                    cs.push(element.goodsBrand_name)
                })

                this.setState({
                    Brandquerlist: cs,
                })
                // console.log(this.state.Brandlist)
            })
    }
    resetButtom() {
        this.huoqushuju()
        this.fenye(this.state.zonggong)
        this.setState({
            selectList: '选择品牌'

        })
    }
    //渲染
    render() {
        const columns = [
            {
                title: '品牌id',
                dataIndex: 'goodsBrand_id',
                key: 'id',
                render: key => <a>{key}</a>,
                align: 'center'
            },
            {
                title: '品牌名称',
                dataIndex: 'goodsBrand_name',
                key: 'name',
                render: text => <a>{text}</a>,
                align: 'center'
            },
            {
                title: '品牌logo',
                dataIndex: 'goodsBrand_logo',
                key: 'logo',
                render: (text) => {
                    return <img src={text} style={{ height: '50px' }} />
                },
                align: 'center',
                ellipsis: true
            },
            {
                title: '创建时间',
                dataIndex: 'createtime',
                key: 'time',
                align: 'center'
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record, index) => (
                    <Space size="middle">
                        <Button type="primary" onClick={() => this.edit(record)}>编辑</Button>
                        <Button danger onClick={() => this.isShanChu(record, index)}>删除</Button>
                    </Space>
                ),
            },
        ];
        return (
            <div>
                <div className='Brand_header'>
                    <Row>
                        <Col span={24}><h2>品牌</h2></Col>
                    </Row>
                    <Row>
                        <Col span={12}>品牌名称：
                        <Select defaultValue="选择品牌" value={this.state.selectList} style={{ width: 200 }} onChange={this.handleChange.bind(this)}>
                                {
                                    this.state.Brandquerlist.map((item, index) => {
                                        return <Option value={item}>{item}</Option>
                                    })
                                }
                                {/* <Option value={this.state.Brandquerlist}>{this.state.Brandquerlist}</Option> */}
                            </Select>
                            <Button type="primary" onClick={() => this.resetButtom()}>重置</Button>
                        </Col>

                        <Col span={12} className='right_btn'>
                            <Button
                                type="primary" onClick={() => this.addBrand()}

                            >添加品牌</Button>
                        </Col>
                    </Row>
                </div>
                <Table
                    className={'tab'}
                    columns={columns}
                    dataSource={this.state.Brandlist}
                    pagination={this.fenye()}
                />
                <Modal
                    title="编辑品牌"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Demo
                        bianji={this.state.bianji}
                        getDataimg={this.getbianjiimg.bind(this)}
                        getDataname={this.getbianjiname.bind(this)}
                        getDatabeizhu={this.getbianjibeizhu.bind(this)}
                    ></Demo>
                </Modal>
                <Modal
                    title="添加品牌"
                    visible={this.state.visibletwo}
                    onOk={this.handleOktwo}
                    onCancel={this.handleCanceltwo}
                >
                    <AddBrand
                        getAddname={this.getaddname.bind(this)}
                        getAddbeizhu={this.getaddbeizhu.bind(this)}
                        getAddimg={this.getaddimg.bind(this)}
                    ></AddBrand>
                </Modal>
            </div>
        )
    }
}