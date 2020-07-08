import React from 'react';  //导入react
import { Row, Col } from 'antd';
import { Input,Select,Button,Switch,Space,Table,Tooltip} from 'antd';
import { SearchOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'


//xxx 组件名
class ProductList extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {}
        this.chakan = this.chakan.bind(this)
    }
    chakan(event){
        this.props.history.push('/index/Product/ProductDetails')
    }

//渲染
    render() {
        const { Option } = Select;

        const columns = [
            {
                title: '商品ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '商品名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品图片',
                dataIndex: 'img',
                render:(text)=>(
                    <img src={text} width={100} height={100}/>
                )
            },
            {
                title: '商品类型',
                key: 'leixing',
                dataIndex: 'leixing',
            },
            {
                title: '品牌类型',
                key: 'pingpai',
                dataIndex: 'pingpai',
            },
            {
                title: '销量',
                key: 'pingpai',
                dataIndex: 'pingpai',
            },
            {
                title: '活动状态',
                render: (text,record) => (
                    <Space size="middle" direction="vertical">
                        <Row>下架：<Switch defaultChecked={false} onChange={()=>this.onChange(record.id)} /></Row>
                        <Row>抢购：<Switch onChange={()=>this.onChange(record.id)} /></Row>
                        <Row>热销：<Switch defaultChecked onChange={()=>this.onChange(record.id)} /></Row>
                    </Space>
                )
            },
            {
                title: '操作',
                render:(text,record) => (
                    <Space size="middle">
                        <Tooltip title="查看详情">
                            <Button type="primary" size="large" shape="circle" icon={<SearchOutlined />} onClick={this.chakan}/>
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
        const data = [
            {
                id: 1,
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
        ];
        return (
            <div>
              <h2>商品列表</h2>
                <Row>
                    <Col span={5}>商品名：<Input placeholder="商品名" style={{ width: 200 }} /></Col>
                    <Col span={5}>
                        商品类型：
                        <Select defaultValue="1" style={{ width: 200 }}>
                            <Option value="1">数据线</Option>
                            <Option value="2">手机壳</Option>
                            <Option value="3">钢化膜</Option>
                        </Select>
                    </Col>
                    <Col span={5}>
                        品牌类型：
                        <Select defaultValue="1" style={{ width: 200 }}>
                            <Option value="1">华为数据线</Option>
                            <Option value="2">苹果数据线</Option>
                            <Option value="3">小米数据线</Option>
                        </Select>
                    </Col>
                    <Col span={5}>
                        商品状态：
                        <Select defaultValue="1" style={{ width: 200 }}>
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
                    <Table columns={columns} dataSource={data} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(ProductList)
