import React from 'react';  //导入react
import { Row, Col } from 'antd';
import { Input,Select,Button,Switch,Space,Table,Tooltip} from 'antd';
import { SearchOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import axios from '../../utils/axios'
import ioApi from '../../api/index'
const { Option } = Select;

//xxx 组件名
class ProductList extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {
            pdList:[
                {
                    id: 99,
                    name: '华为数据线',
                    img: "http://zhoudw.vip/healthproject/upload/7d1328eb-d8df-4005-bc15-b0eb8b1828b7.jpg",
                    leixing: '数据线',
                    pingpai: "华为数据线",
                    xiaoliang:23,
                },
                {
                    id: 2,
                    name: '苹果原装数据线',
                    img: "https://img1.360buyimg.com/n6/jfs/t1/132123/40/2321/318254/5ee72d7eEf4ee57b2/92cca23de50ce229.jpg",
                    leixing: '数据线',
                    pingpai: "苹果数据线",
                    xiaoliang:23,
                },
                {
                    id: 3,
                    name: '小米钢化膜',
                    img: "https://img1.360buyimg.com/n6/jfs/t1/132123/40/2321/318254/5ee72d7eEf4ee57b2/92cca23de50ce229.jpg",
                    leixing: '钢化膜',
                    pingpai: "小米钢化膜",
                    xiaoliang:23,
                },
                {
                    id: 4,
                    name: '苹果手机支架',
                    img: "https://img1.360buyimg.com/n6/jfs/t1/132123/40/2321/318254/5ee72d7eEf4ee57b2/92cca23de50ce229.jpg",
                    leixing: '手机支架',
                    pingpai: "苹果手机",
                    xiaoliang:23,
                },
            ],
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
        }
        this.chakan = this.chakan.bind(this)
    }
    chakan(data){
        this.props.history.push({pathname:'/index/Product/ProductDetails',query:{id:data.goodsId}})
    }
    componentWillMount(){
        axios.post(ioApi.product.getProductList,{
            goodBrandId: '',
            goodsName: '',
            goodsStatue: '',
            goodsTypeId: "",
            page: 1,
            size: 1000
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
            this.setState({
                pdList:res.data.data.data
            })
        })
        this.setState({
            //渲染下拉框
            pingPaiListXuanRan:this.state.pingPaiList.map(function (item) {return <Option value={item.id}>{item.name}</Option>}),
            fenLeiListXuanRan:this.state.fenLeiList.map(function (item) {return <Option value={item.id}>{item.name}</Option>}),

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
                            <Button shape="circle" size="large" icon={<EditOutlined />} />
                        </Tooltip>
                        <Tooltip title="删除商品">
                            <Button danger shape="circle" size="large" icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Space>
                )
            },
        ];

        return (
            <div>
              <h2>商品列表</h2>
                <Row>
                    <Col span={5}>商品名：<Input placeholder="商品名" style={{ width: 200 }} /></Col>
                    <Col span={5}>
                        商品类型：
                        <Select style={{ width: 200 }}>
                            {this.state.pingPaiListXuanRan}
                        </Select>
                    </Col>
                    <Col span={5}>
                        品牌类型：
                        <Select style={{ width: 200 }}>
                            {this.state.fenLeiListXuanRan}
                        </Select>
                    </Col>
                    <Col span={5}>
                        商品状态：
                        <Select style={{ width: 200 }}>
                            <Option value="1">已上架</Option>
                            <Option value="2">已下架</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Button type="primary">搜索</Button>
                        <Button style={{ marginLeft:30}}>重置</Button>
                    </Col>
                </Row>
                <Row style={{marginTop:50}}>
                    <Col span={24}>
                    <Table columns={columns} dataSource={this.state.pdList} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(ProductList)
