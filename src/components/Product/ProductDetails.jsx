import React from 'react';  //导入react
import { Row, Col } from 'antd';
import { Input,Select,Button,Switch,Space,Table,Tooltip,Modal,Popconfirm} from 'antd';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
//xxx 组件名
class ProductDetails extends React.Component {
//渲染
    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    teJiaXuanRan(data) {
        if(data.iste){
            return <Popconfirm
                title="你确定关闭特价吗？"
                okText="确定"
                cancelText="取消"
            >
            <Button danger>关闭特价</Button>
            </Popconfirm>
        }
        else {
            return <Button type="primary" onClick={this.showModal}>开启特价</Button>
        }
    };
    back(){
        this.props.history.go(-1)
    }
    render() {

        const data = [
            {
                id: 1,
                name: '1.5米数据线',
                shouJia: 20,
                kuChun: 10086,
                tejia:12,
                daoqi:"2020-8-10",
                iste:true
            },
            {
                id: 2,
                name: '2米数据线',
                shouJia: 22,
                kuChun: 10086,
                tejia:"无",
                daoqi:"无",
                iste:false
            },
            {
                id: 3,
                name: '3米数据线',
                shouJia: 25,
                kuChun: 10086,
                tejia:"无",
                daoqi:"无",
                iste:false
            },
        ];
        const columns = [
            {
                title: '规格id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '规格名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '售价',
                dataIndex: 'shouJia',
                key: 'shouJia',
            },
            {
                title: '库存数量',
                key: 'kuChun',
                dataIndex: 'kuChun',
            },
            {
                title: '特价',
                key: 'tejia',
                dataIndex: 'tejia',
            },
            {
                title: '到期时间',
                key: 'daoqi',
                dataIndex: 'daoqi',
            },
            {
                title: '操作',
                render:(text,record) => (
                    this.teJiaXuanRan(text)
                )
            },
        ];
        function onChange(value, dateString) {
            console.log('Selected Time: ', value);
            console.log('Formatted Selected Time: ', dateString);
        }

        function onOk(value) {
            console.log('onOk: ', value);
        }
        return (
            <div>
                <Button  type="primary" onClick={this.back.bind(this)}>返回</Button>
                <h2 style={{marginTop:50}}>商品详情</h2>
                <Row style={{marginTop:50}}>
                    <Col span={7}>商品名：</Col>
                    <Col span={7}>商品分类：</Col>
                    <Col span={7}>商品品牌：</Col>
                </Row>
                <Row style={{marginTop:50}}>
                    <Col span={7}>商品重量：</Col>
                    <Col span={7}>收取邮费：</Col>
                </Row>
                <Row style={{marginTop:50}}>
                    <Col span={2}>商品封面图：</Col>
                    <Col span={5}>
                        <div style={{width:240,height:240,overflow:"hidden"}}>
                        <img src="https://img1.360buyimg.com/n6/jfs/t1/132123/40/2321/318254/5ee72d7eEf4ee57b2/92cca23de50ce229.jpg" width={240}/>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{width:240,height:240,overflow:"hidden"}}>
                        <img src="https://img1.360buyimg.com/n6/jfs/t1/132123/40/2321/318254/5ee72d7eEf4ee57b2/92cca23de50ce229.jpg" width={240}/>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{width:240,height:240,overflow:"hidden"}}>
                        <img src="https://img1.360buyimg.com/n6/jfs/t1/132123/40/2321/318254/5ee72d7eEf4ee57b2/92cca23de50ce229.jpg" width={240}/>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{width:240,height:240,overflow:"hidden"}}>
                            <img src="https://i.pximg.net/img-master/img/2020/06/09/00/01/32/82192076_p0_master1200.jpg" width={240}/>
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop:50}}>
                    <Col span={2}>商品规格：</Col>
                    <Col span={20}>
                        <Table columns={columns} dataSource={data} />
                    </Col>
                </Row>
                <Row>
                    <Col span={7}>是否热销：</Col>
                    <Col span={7}>是否限时抢购：</Col>
                    <Col span={7}>商品状态：</Col>
                </Row>
                <Row style={{marginTop:50}}>
                    <Col span={2}>商品详情图：</Col>
                    <Col span={5}>
                        <div style={{width:240,height:240,overflow:"hidden"}}>
                            <img src="https://img1.360buyimg.com/n6/jfs/t1/132123/40/2321/318254/5ee72d7eEf4ee57b2/92cca23de50ce229.jpg" width={240}/>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{width:240,height:240,overflow:"hidden"}}>
                            <img src="https://img1.360buyimg.com/n6/jfs/t1/132123/40/2321/318254/5ee72d7eEf4ee57b2/92cca23de50ce229.jpg" width={240}/>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{width:240,height:240,overflow:"hidden"}}>
                            <img src="https://img1.360buyimg.com/n6/jfs/t1/132123/40/2321/318254/5ee72d7eEf4ee57b2/92cca23de50ce229.jpg" width={240}/>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div style={{width:240,height:240,overflow:"hidden"}}>
                            <img src="https://i.pximg.net/img-master/img/2020/06/09/00/01/32/82192076_p0_master1200.jpg" width={240}/>
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop:50,marginBottom:100}}>
                    <Col span={7}>是否享受优惠券：</Col>
                    <Col span={7}>商品关键字：</Col>
                </Row>
                <Modal
                    title="开启特价"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Row>
                        <Col span={5} style={{textAlign:"right" ,lineHeight:"32px"}}>特价金额：</Col>
                        <Col span={16}><Input placeholder="特价金额" style={{width:200}}/></Col>
                    </Row>
                    <Row style={{marginTop:30}}>
                        <Col span={5} style={{textAlign:"right",lineHeight:"32px"}}>到期时间：</Col>
                        <Col span={16}><DatePicker showTime onChange={onChange} onOk={onOk} style={{width:200}} /></Col>
                    </Row>
                    <Row style={{marginTop:30}}>
                        <Col span={5} style={{textAlign:"right",lineHeight:"26px"}}>享受优惠券：</Col>
                        <Col span={16}><Switch defaultChecked  /></Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

export{ProductDetails as default}