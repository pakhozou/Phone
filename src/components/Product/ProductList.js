import React from 'react';  //导入react
import { Row, Col } from 'antd';
import { Input,Select,Button,Switch,Space,Table,Tooltip,Popconfirm,message} from 'antd';
import { SearchOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import ioApi from '../../api/index'
const { Option } = Select;

//xxx 组件名
class ProductList extends React.Component {
    //点击页码事件
    changPage(current){
        console.log(current);

        this.setState({
            page:current
        },function () {
            this.initdata()
        })
    }
    //变化回调
    onShowSizeChange(Current,pageSize){
        console.log(Current,pageSize)
    }
    fenye(){
        const fy = {
            //  当前页
            current:this.state.page,
            //  每页显示
            pageSize:this.state.size,
            //  总条数
            total:this.state.count,
            //  点击下一页
            onChange:(current)=> this.changPage(current),
            //  每页显示变化
            onShowSizeChange:(Current,pageSize) =>{
                console.log(pageSize);
                this.onShowSizeChange(Current,pageSize)
            },
            //  默认第几页
            defaultCurrent:this.state.defaultCurrent,
            //是否可以跳转
            showQuickJumper:this.state.showQuickJumper,
        };
        return fy
    }
//构造函数
    constructor(props) {
        super(props)
        this.state = {
            pdList:[],
            fenLeiList:[
                {id:1,name:"数据线"},
                {id:2,name:"手机壳"},
                {id:3,name:"钢化膜"},
            ],
            fenLeiListXuanRan:[],
            //品牌数据
            pingPaiList:[
                {id:1,name:"华为"},
                {id:2,name:"苹果"},
                {id:3,name:"小米"}
            ],
            pingPaiListXuanRan:[],
            goodsName:"",//商品名查询
            goodsStatue:"",//商品状态
            goodsTypeId:"",//商品类型ID
            goodBrandId:"",//商品品牌ID
            page:1,//当前页
            size:2,//每页数
            count:""//总数
        }
        this.chakan = this.chakan.bind(this)
    }
    chongZhi(){
        this.setState({
            goodsName:"",//商品名查询
            goodsStatue:"",//商品状态
            goodsTypeId:"",//商品类型ID
            goodBrandId:"",//商品品牌ID
            page:1,//当前页
            size:2,//每页数
        },function () {
            this.initdata()
        })
    }
    GETzhuangTai(e){
        this.setState({
            goodsStatue:e
        })
    }
    ShangPingID(e){
        this.setState({
            goodBrandId:e
        })
    }
    TypeID(e){
        this.setState({
            goodsTypeId:e
        })
    }
    chakan(data){
        this.props.history.push({pathname:'/index/Product/ProductDetails',query:{id:data.goodsId}})
    }
    xiuGai(data){
        this.props.history.push({pathname:'/index/Product/XiuGaiProduct',query:{id:data.goodsId}})
    }
    delPD(data){
        axios.post(ioApi.product.delPD,{
            GoodsId:data.goodsId
        }, {
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
            this.initdata()
        })
    }
    componentWillMount(){
        this.initdata()
        axios.post(ioApi.product.theType,{nowsPage:1,pageSize:1000}).then((res)=>{
            if(res.data.code === 500){
                this.props.history.go(0)
            }
            this.setState({
                //渲染下拉框
                // pingPaiListXuanRan:this.state.pingPaiList.map(function (item) {return <Option value={item.goodsType_id}>{item.goodsType_name}</Option>}),
                fenLeiListXuanRan:res.data.data.data.map(function (item) {return <Option value={item.goodsType_id}>{item.goodsType_name}</Option>}),

            })
        })
        axios.post(ioApi.product.thePingPai,{nowsPage:1,pageSize:1000,remarks:""},{
            headers:{
                'Content-Type':'application/json'
            }
        }, {
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
            if(res.data.code === 500){
                this.props.history.go(0)
            }
            let list =res.data.data.data
            this.setState({
                //渲染下拉框
                pingPaiListXuanRan:list.map(function (item) {return <Option value={item.goodsBrand_id}>{item.goodsBrand_name}</Option>}),

            })
        })

    }
    initdata(){
        let key = "upload"
        message.loading({content:"加载数据中",key})
        axios.post(ioApi.product.getProductList,{
            goodBrandId: this.state.goodBrandId,
            goodsName: this.state.goodsName,
            goodsStatue: this.state.goodsStatue,
            goodsTypeId: this.state.goodsTypeId,
            page: this.state.page,
            size: this.state.size
        },{
            headers:{
                'Content-Type':'application/json'
            }
        }, {
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
            if(res.data.code === 500){
                message.error({content:"加载失败：我觉得是后台的锅",key,duration:2})
            }
            this.setState({
                pdList:res.data.data.data,
                count:res.data.data.dataCount
            },function () {
                message.success({content:"加载成功",key,duration:1})
            })
        })
    }
    goodsName(e){
        this.setState({
            goodsName:e.target.value
        })
    }
    xiaJiaChange(data){
        console.log(data);
        let list = this.state.pdList
        let nowSta
        if(data.goodsStatue === 1){
            for(let i=0;i<list.length;i++){
                if(data.goodsId === list[i].goodsId){
                    list[i].goodsStatue = 0
                    nowSta=0
                    this.setState({
                        pdList:list
                    })
                }
            }
        }
        else {
            for(let i=0;i<list.length;i++){
                if(data.goodsId === list[i].goodsId){
                    list[i].goodsStatue = 1
                    nowSta=1
                    this.setState({
                        pdList:list
                    })
                }
            }
        }
        axios.post(ioApi.product.xiuGaiProduct,{
            goodsId:data.goodsId,
            goodsStatue:nowSta
        },{
            headers:{
                'Content-Type':'application/json'
            }
        }, {
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
        })
    }
    qiangGouChange(data){
        console.log(data);
        let list = this.state.pdList
        let nowSta
        if(data.goodsIsRush === 1){
            for(let i=0;i<list.length;i++){
                if(data.goodsId === list[i].goodsId){
                    list[i].goodsIsRush = 0
                    nowSta=0
                    this.setState({
                        pdList:list
                    })
                }
            }
        }
        else {
            for(let i=0;i<list.length;i++){
                if(data.goodsId === list[i].goodsId){
                    list[i].goodsIsRush = 1
                    nowSta=1
                    this.setState({
                        pdList:list
                    })
                }
            }
        }
        axios.post(ioApi.product.xiuGaiProduct,{
            goodsId:data.goodsId,
            goodsIsRush:nowSta
        },{
            headers:{
                'Content-Type':'application/json'
            }
        }, {
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
        })
    }
    reXiaoChange(data){
        console.log(data);
        let list = this.state.pdList
        let nowSta
        if(data.goodsIsHot === 1){
            for(let i=0;i<list.length;i++){
                if(data.goodsId === list[i].goodsId){
                    list[i].goodsIsHot = 0
                    nowSta=0
                    this.setState({
                        pdList:list
                    })
                }
            }
        }
        else {
            for(let i=0;i<list.length;i++){
                if(data.goodsId === list[i].goodsId){
                    list[i].goodsIsHot = 1
                    nowSta=1
                    this.setState({
                        pdList:list
                    })
                }
            }
        }
        axios.post(ioApi.product.xiuGaiProduct,{
            goodsId:data.goodsId,
            goodsIsHot:nowSta
        },{
            headers:{
                'Content-Type':'application/json'
            }
        }, {
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
        })
    }

//渲染
    render() {
        const { Option } = Select;

        const columns = [
            {
                title: '商品ID',
                dataIndex: 'goodsId',
                key: 'goodsId',
            },
            {
                title: '商品名',
                dataIndex: 'goodsName',
                key: 'goodsName',
            },
            {
                title: '商品图片',
                dataIndex: 'goodsImg',
                render:(text)=>(
                    <img src={text} width={100} height={100}/>
                )
            },
            {
                title: '商品类型',
                key: 'goodsTypeName',
                dataIndex: 'goodsTypeName',
            },
            {
                title: '品牌类型',
                key: 'goodBrandName',
                dataIndex: 'goodBrandName',
            },
            {
                title: '销量',
                key: 'goodsSales',
                dataIndex: 'goodsSales',
            },
            {
                title: '活动状态',
                render: (text,record) => (
                    <Space size="middle" direction="vertical">
                        <Row>下架：<Switch checked={text.goodsStatue} onChange={()=>this.xiaJiaChange(text)} /></Row>
                        <Row>抢购：<Switch checked={text.goodsIsRush} onChange={()=>this.qiangGouChange(text)} /></Row>
                        <Row>热销：<Switch checked={text.goodsIsHot} onChange={()=>this.reXiaoChange(text)} /></Row>
                    </Space>
                )
            },
            {
                title: '操作',
                render:(text,record) => (
                    <Space size="middle">
                        <Tooltip title="查看详情">
                            <Button type="primary" size="large" shape="circle" icon={<SearchOutlined />} onClick={()=>this.chakan(text)}/>
                        </Tooltip>
                        <Tooltip title="编辑商品">
                            <Button shape="circle" size="large"  onClick={()=>this.xiuGai(text)} icon={<EditOutlined />} />
                        </Tooltip>
                        <Tooltip title="删除商品">
                            <Popconfirm
                                title="你确定关闭特价吗？"
                                okText="确定"
                                cancelText="取消"
                                onConfirm={()=>this.delPD(text)}
                            >
                            <Button danger shape="circle" size="large" icon={<DeleteOutlined/>} />
                            </Popconfirm>
                        </Tooltip>
                    </Space>
                )
            },
        ];

        return (
            <div>
              <h2>商品列表</h2>
                <Row>
                    <Col span={5}>商品名：<Input placeholder="商品名" value={this.state.goodsName} onChange={this.goodsName.bind(this)} style={{ width: 200 }} /></Col>
                    <Col span={5}>
                        商品类型：
                        <Select value={this.state.goodsTypeId} onChange={this.TypeID.bind(this)} style={{ width: 200 }}>
                            {this.state.fenLeiListXuanRan}
                        </Select>
                    </Col>
                    <Col span={5}>
                        品牌类型：
                        <Select style={{ width: 200 }}  value={this.state.goodBrandId} onChange={this.ShangPingID.bind(this)}>
                            {this.state.pingPaiListXuanRan}
                        </Select>
                    </Col>
                    <Col span={5}>
                        商品状态：
                        <Select style={{ width: 200 }} value={this.state.goodsStatue} onChange={this.GETzhuangTai.bind(this)}>
                            <Option value="1">已上架</Option>
                            <Option value="0">已下架</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={this.initdata.bind(this)}>搜索</Button>
                        <Button style={{ marginLeft:30}} onClick={this.chongZhi.bind(this)}>重置</Button>
                    </Col>
                </Row>
                <Row style={{marginTop:50}}>
                    <Col span={24}>
                    <Table columns={columns} dataSource={this.state.pdList} pagination={this.fenye()}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(ProductList)
