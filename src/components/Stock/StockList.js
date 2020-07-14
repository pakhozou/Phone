import React from 'react';  //导入react
import './stockList.css' //导入样式组件
import api from "../../api/index"
import Axios from 'axios'
import {Table,Space,Button,Row,Col,Modal,Form, Input,Select,DatePicker,message } from 'antd'; //导入antd组件
//xxx 组件名
class StockList extends React.Component {
    formRefOne = React.createRef();//添加form控制层
    formRefTwo = React.createRef();//进货form控制层
    formRefThree = React.createRef();//状态form控制层
    formRefSix = React.createRef();//删除form控制层



    componentDidMount() {
        this.sum();
        this.huoAll();
        this.paiAll()
    }

//获取数据的方法
    sum() {
        Axios.post(api.login.select,
            this.state.theForm
        ).then((ser) => {
            if (ser.data.code === 200) {
                this.filterStoreType(ser)//过滤,设置ser的stock的值
                this.setState({
                    dataSource: ser.data.data.data,
                    total: ser.data.data.dataCount
                })
                // message.success('查询成功');
            } else {
                message.error('库存不存在！');
                console.log("查询失败")
            }
            // console.log(ser)
        })
    }

    //过滤函数
    filterStoreType(ser) {
        ser.data.data.data.map((item) => {
            item.stock_state = this.storeType(item.stock_state)
            item.stock_typeid = this.huoType(item.stock_typeid)
            item.stock_brandid = this.pingType(item.stock_brandid)
            return "ok"
        })
    }

//过滤状态函数
    storeType(stock_state) {
        if (stock_state === parseInt(1)) {
            return '可用'
        }
        else if (stock_state === parseInt(0)) {
            return '禁用'
        }
        else {
            return '删除'
        }
    }
//过滤货物类型函数
    huoType(stock_typeid){
        this.huoAll() //获取所有货物类型
        // console.log(this.state.stock_typeid,stock_typeid)
        let cs=this.state.stock_typeid.find((item)=>{
            return item.goodsType_id === stock_typeid
        })
        if(cs===undefined){
            return "未知"
        }else{
            return cs.goodsType_name
        }
    }
//过滤品牌类型
    pingType(stock_brandid){
        this.paiAll()
        // console.log(this.state.stock_brandid)
        let cs=this.state.stock_brandid.find((item)=>{
            return item.goodsBrand_id === stock_brandid
        })
        if(cs===undefined){
            return "未知"
        }else{
            return cs.goodsBrand_name
        }
    }

//获取所有货物类型
    huoAll(){
        Axios.post(api.login.queryGoods,
            {
                nowsPage:1,
                pageSize:10
            }).then((ser)=>{
            if(ser.data.code===200){
                this.setState({
                    stock_typeid:ser.data.data.data
                },()=>{
                    // console.log(this.state.stock_typeid)
                })
            }else {
                message.error('货物类型接口获取失败！');
                console.log("货物类型接口错误")
            }
        })
    }
//获取所有货物品牌
    paiAll(){
        Axios.post(api.login.queryBrand,
            {
                goodsBrand_id: 0,
                goodsBrand_logo: "",
                goodsBrand_name: "",
                nowsPage: 1,
                pageSize: 99,
                remarks: ""
            }
        ).then((ser)=>{
            if(ser.data.code===200){
                this.setState({
                    stock_brandid:ser.data.data.data
                },()=>{
                    // console.log(this.state.stock_brandid)
                })
            }else {
                message.error('货物品牌接口获取失败！');
                console.log("货物品牌接口错误")
            }
        })
    }


//构造函数
    constructor(props) {
        super(props)
        this.state = {
            current:1, //  当前页
            pageSize:2,//  每页显示
            total:'',//  总条数
            stock_typeid:[],//存储所有的货物类型
            stock_brandid:[],//存储所有的货物品牌

            //模糊查询初始设置
            theForm:{
                stock_id:'',//库存ID
                stock_name:'',//货物名
                stock_typeid:'',//货物类型
                stock_brandid:'',//货物品牌
                nowsPage:1,//当前页
                pageSize:2//显示条数
            },
            //模糊查询中间变量
            lei:'',
            ping:'',
            //状态改变初始值变量
            zhaungZhongTai:'',
            //状态form表单数据存储区
            zhaungTaiForm:{
                stock_id:'',//库存ID
                stock_state:'',//状态值
            },
            //表格显示数据
            dataSource : [],
            //表格标题与操作
            columns:[
                {
                    title: '库存id',
                    dataIndex: 'stock_id',
                    key: 'stock_id',
                },
                {
                    title: '货物名',
                    dataIndex: 'stock_name',
                    key: 'stock_name',
                },
                {
                    title: '库存状态',
                    dataIndex: 'stock_state',
                    key: 'stock_state',
                },
                {
                    title: '货物类型',
                    dataIndex: 'stock_typeid',
                    key: 'stock_typeid',
                },
                {
                    title: '品牌类型',
                    dataIndex: 'stock_brandid',
                    key: 'stock_brandid',
                },
                {
                    title: '库存总数',
                    dataIndex: 'stock_totalnumber',
                    key: 'stock_totalnumber',
                },
                {
                    title: '操作',
                    render: (text,record,index) => (
                        <Space>
                            {/*每行表单点击事件操作按钮*/}
                            <Button type="primary" onClick={()=>{this.Wdelete(record.stock_id)}}>状态改变</Button>
                            <Button  onClick={()=>{this.chang(record.stock_id)}}>查看</Button>
                            <Button  onClick={()=>{this.huoAdd(record.stock_id)}}>进货</Button>
                            <Button  onClick={()=>{this.sanAdd(record.stock_id)}}>删除库存</Button>
                        </Space>
                    )
                }
            ],

            //添加form表单数据存储区
            tianForm:{
                stock_number: "",
                stock_brandid: "",
                stock_name: "",
                stock_price: "",
                stock_totalnumber: "",//总数等于进货数量stock_number
                stock_typeid: ""
            },
            //添加模态框显示变量
            visible: false,
            //状态模态框显示变量
            visibleOne:false,
            huowuType:'货物类型',//货物类型清理默认值
            pingPaiType:"品牌类型",//品牌类型清理默认值
            zhaungTai:'状态管理',//状态类型清除默认值

            // 进货模态框显示变量
            visibletwo:false,
        //    进货form表单数据存储区
            jinForm:{
                stock_id:'',//库存ID
                stock_price:'',//进货单价
                stock_number:'',//进货数量
                time:''//进货时间
            },
            //删除模态框显示变量
            visibleTwo:false,
            sanTai:'',//删除总值变量
            sanForm:{
                stock_id:'',//库存ID
                stock_totalnumber:'',//状态值
            },


        //    存储操作表单当前行ID
            biaoId:''
        }
    }


//货物类型选择事件
    souHuoXia = value => {
      console.log(value)
        this.setState({
            lei:value,
            huowuType:value
        })
    };
//品牌类型选择事件
    souPingXia = value => {
        console.log(value)
        this.setState({
            ping:value,
            pingPaiType:value
        })
    };
//查询重置事件
    formXo(e) {
        this.refs.theId.state.value=''//货物ID
        this.refs.name.state.value=''//货物名
        this.setState({
            current:1,
            pageSize:2,
            theForm:{
                stock_id:'',//库存ID
                stock_name:'',//货物名
                stock_typeid:'',//货物类型
                stock_brandid:'',//货物品牌
                nowsPage:1,//当前页
                pageSize:2//显示条数
            },
            huowuName:"",//货物类型默认值
            huowuType:'货物类型',
            pingPaiType:"品牌类型",
            lei:'',
            ping:'',
        }, () => {
            this.sum()
            console.log(this.state.theForm) //这里拿到的是最新的值true
        })
    }
//模糊查询事件
    formAdd(e) {
        this.setState({
            theForm:{
                stock_id:this.refs.theId.state.value,//货物ID
                stock_name:this.refs.name.state.value,//货物名
                stock_typeid:this.state.lei,//货物类型
                stock_brandid:this.state.ping,//货物品牌
                nowsPage:this.state.current,//当前页
                pageSize:this.state.pageSize //显示条数
            }
        }, () => {
            this.sum()
            // console.log(this.state.theForm)
        })
    }


//添加按钮事件
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
//添加取消事件
    handleCancel = () => {
        console.log('');
        this.setState({
            visible: false,
        });
    };
//添加确认按钮
    onFinish = values => {
        this.setState({
            tianForm:{
                stock_number: values.user.stock_number,
                stock_brandid: values.user.stock_brandid,
                stock_name: values.user.stock_name,
                stock_price: values.user.stock_price,
                stock_totalnumber: values.user.stock_number,//总数等于进货数量stock_number
                stock_typeid: values.user.stock_typeid
            },
            visible: false,//取消模态框
        },()=>{
            // console.log(this.state.tianForm);
            this.kuAdd()
        });
        this.formRefOne.current.resetFields()//重置表单
    };
//库存添加事件
    kuAdd(){
        Axios.post(api.login.add,
            this.state.tianForm
        ).then((ser)=> {
            // console.log(ser)
            if(ser.data.code===200){
                message.success('添加成功');
            }else {
                message.error(ser.data.msg);
                // console.log(ser.data.msg)
            }
        })
    }


//  进货
    huoAdd(id){
        this.setState({
            visibletwo: true,
            biaoId:id,
        });
    }
//  进货取消按钮
    huoAddQu = () => {
        this.setState({
            visibletwo: false,
        });
        this.formRefTwo.current.resetFields()//重置表单
    };
//  进货确认按钮
    huoAddOk = values => {
        this.setState({
            visibletwo: false,
            jinForm:{
                stock_id:this.state.biaoId,//库存ID
                stock_price:values.user.stock_price,//进货单价
                stock_number:values.user.stock_number,//进货数量
                time:values.user.time._d,//进货时间
            }
        },()=>{
            // console.log(this.state.jinForm)
        });
        // console.log(values)
        this.jinHuoAdd();
        this.formRefTwo.current.resetFields()//重置表单
    };
//  进货添加事件
    jinHuoAdd(){
        // console.log(this.state.biaoId);
        Axios.post(api.login.addinfo,
            this.state.jinForm
        ).then((ser)=> {
            if(ser.data.code===200){
                message.success('进货成功');
                this.formAdd()
            }else {
                message.error(ser.data.msg);
                // console.log(ser.data.msg)
            }
        })
    }


//状态改变按钮
    Wdelete(id){
        this.setState({
            visibleOne: true,
            biaoId:id,
        },()=>{
            // console.log(this.state.stock_id)
        });
    }
//状态类型选择事件
    zhaungTai = value => {
        // console.log(value)
        this.setState({
            zhaungZhongTai:value,
            zhaungTai:value
        })
    };
//状态改变取消按钮
    WdeleteQue = () => {
        this.setState({
            visibleOne: false,
            zhaungTai:'状态管理'
        });
        this.formRefThree.current.resetFields()//重置表单
    };
// 状态改变确认按钮
    WdeleteQueOk = e => {
        // console.log(e);
        this.setState({
            zhaungTaiForm:{
                stock_id:this.state.biaoId,//库存ID
                stock_state:this.state.zhaungZhongTai,//状态值
            },
            visibleOne: false,
            zhaungTai:'状态管理'
        },()=>{
            this.zhaungTaiAdd()
        });
        this.formRefThree.current.resetFields();//重置表单
        // console.log(this.state.stock_id)//删除的库存id
    };
//状态改变函数确认事件
    zhaungTaiAdd(){
        // console.log(this.state.biaoId);
        Axios.post(api.login.update,
            this.state.zhaungTaiForm
        ).then((ser)=> {
            if(ser.data.code===200){
                message.success('状态改变成功');
                this.formAdd()
            }else {
                message.error(ser.data.msg);
                // console.log(ser.data.msg)
            }
        })
    }


//  查看
    chang(id){
       // 路由跳转
        console.log(id)
       this.props.history.push('/index/Stock/Stocks/'+id)
    }

//删除按钮
    sanAdd(id){
        this.setState({
            visibleTwo: true,
            biaoId:id,
        },()=>{
            // console.log(this.state.stock_id)
        });
    }
//删除取消按钮
    sanQue = () => {
        this.setState({
            visibleTwo: false
        });
        this.formRefSix.current.resetFields()//重置表单
    };
//删除确认按钮
    sanQueOk = e => {
        // console.log(e);
        this.setState({
            sanTai:e.user.time,
            sanForm:{
                stock_id:this.state.biaoId,//库存ID
                stock_totalnumber:e.user.time,//状态值
            },
            visibleTwo: false,
            // zhaungTai:'状态管理'
        },()=>{
            console.log(this.state.sanForm)
            this.sanTaiAdd()
        });
        this.formRefSix.current.resetFields()//重置表单
    };
//删除改变函数确认事件
    sanTaiAdd(){
        // console.log(this.state.biaoId);
        Axios.post(api.login.theUpdate,
            this.state.sanForm
        ).then((ser)=> {
            if(ser.data.code===200){
                this.formAdd()
                message.success('库存总数改变成功');
            }else {
                message.error(ser.data.msg);
                // console.log(ser.data.msg)
            }
        })
    }


// 分页处理函数
    sheZhi(page){
        this.setState({
            current:page
        },()=>{
            // Axios.post("http://111.229.83.241:9601/stockservice/stock/select",
            //     this.state.theForm
            // ).then((ser)=>{
            //    this.formAdd()
            // })
            this.formAdd()
        })

    };
//渲染
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const { Option } = Select;
        //循环所有货物类型进行渲染
        let commentList = this.state.stock_typeid.map( (item)=> {
            return  <Option value={item.goodsType_id}>{item.goodsType_name}</Option>
        })
        //循环所有货物品牌进行渲染
        let pingList = this.state.stock_brandid.map( (item)=> {
            return  <Option value={item.goodsBrand_id}>{item.goodsBrand_name}</Option>
        })
        return (
            <div>
                {/*模糊搜索*/}
                <div className="sousuo">
                    <Form {...layout} name="control-ref">
                        <Row gutter={16}>
                                <Col className="gutter-row" span={5}>
                                    <div>
                                        <Input ref = "theId" placeholder="货物ID" type = "text" />
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={5}>
                                    <div>
                                        <Input ref = "name" placeholder="货物名"  type = "text"/>
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={5}>
                                    <div>
                                        <Select
                                            placeholder="货物类型"
                                            onChange={this.souHuoXia}
                                            allowClear
                                            value={this.state.huowuType}
                                        >
                                            {commentList}
                                        </Select>
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={5}>
                                    <div>
                                        <Select
                                            placeholder="品牌类型"
                                            onChange={this.souPingXia}
                                            value={this.state.pingPaiType}
                                            allowClear
                                        >
                                            {pingList}
                                        </Select>
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={4}>
                                    <div className="div-button">
                                        <Button className="button" type="primary" onClick={this.formXo.bind(this)}>重置</Button>
                                        <Button onClick={this.formAdd.bind(this)}>查询</Button>
                                    </div>
                                </Col>
                        </Row>
                    </Form>
                </div>
                {/*添加*/}
                <div>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={20}>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Button type="primary" onClick={this.showModal}>添加</Button>
                        </Col>
                    </Row>
                    <Modal
                        title="添加"
                        visible={this.state.visible}
                        footer={[]}
                        onCancel={this.handleCancel}
                    >
                        {/*添加模态框表单区*/}
                        <Form {...layout} ref={this.formRefOne}  name="nest-messages" onFinish={this.onFinish}>
                            <Form.Item name={['user', 'stock_name']} label="货物名" >
                                <Input />
                            </Form.Item>
                            <Form.Item name={['user', 'stock_typeid']} label="货物类型">
                                <Select
                                    placeholder="货物类型"
                                    allowClear
                                >
                                    {commentList}
                                </Select>
                            </Form.Item>
                            <Form.Item name={['user', 'stock_brandid']} label="品牌">
                                <Select
                                    placeholder="品牌"
                                    allowClear
                                >
                                    {pingList}
                                </Select>
                            </Form.Item>
                            <Form.Item name={['user', 'stock_price']} label="进货单价">
                                <Input/>
                            </Form.Item>
                            <Form.Item name={['user', 'stock_number']} label="进货数量">
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit" >
                                    确认
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                {/*表格 分页*/}
                <div>
                    <Table size="default" dataSource={this.state.dataSource} columns={this.state.columns} pagination={
                        {current:this.state.current,//  当前页
                            pageSize:this.state.pageSize,//  每页显示
                            total:this.state.total,//  总条数
                            onChange:(page)=> {this.sheZhi(page)}//点击分页回调函数
                        }
                    } />
                    {/*表格状态改变模态框*/}
                    <Modal
                        title="状态"
                        visible={this.state.visibleOne}
                        footer={[]}
                        onCancel={this.WdeleteQue}
                    >
                        <Form {...layout} ref={this.formRefThree} name="nest-messages" onFinish={this.WdeleteQueOk}>
                            <Form.Item name={['user', 'time']} label="状态管理" >
                                <Select
                                    placeholder="状态管理"
                                    onChange={this.zhaungTai}
                                    allowClear
                                    value={this.state.zhaungTai}
                                >
                                    <Option value='1'>可用</Option>
                                    <Option value='0'>禁用</Option>
                                    <Option value='-1'>删除</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit" >
                                    确认
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    {/*进货模态框*/}
                    <Modal
                        title="进货"
                        visible={this.state.visibletwo}
                        footer={[]}
                        onCancel={this.huoAddQu}
                    >
                        <Form {...layout} ref={this.formRefTwo} name="nest-messages" onFinish={this.huoAddOk}>
                            <Form.Item name={['user', 'time']} label="进货日期" >
                                <DatePicker/>
                            </Form.Item>
                            <Form.Item name={['user', 'stock_number']} label="进货数量">
                                <Input />
                            </Form.Item>
                            <Form.Item name={['user', 'stock_price']} label="进货单价">
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit" >
                                    确认
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    {/*表格删除改变模态框*/}
                    <Modal
                        title="删除"
                        visible={this.state.visibleTwo}
                        footer={[]}
                        onCancel={this.sanQue}
                    >
                        <Form {...layout} ref={this.formRefSix} name="nest-messages" onFinish={this.sanQueOk}>
                            <Form.Item name={['user', 'time']} label="更新总数" >
                                <Input/>
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit" >
                                    确认
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}

export {StockList as default}
