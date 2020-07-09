import React from 'react';  //导入react
import { Upload, Modal,Row,Col,Input,Select,Button,Table,Switch } from 'antd';
import { PlusOutlined,UnorderedListOutlined,InsertRowAboveOutlined,ProfileOutlined,ShoppingOutlined } from '@ant-design/icons';
//上传文件
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const { Option } = Select;
const { TextArea } = Input;
//xxx 组件名
class addProduct extends React.Component {
    chongZhi (){
        // this.props.refs.pdname.value =""
        this.setState({
            ProductName:"",
            ProductDetails:"",
            Postage:"",
            weight:"",
            keyword:"",
            flashSale:0,//限时抢购
            HotSale:0,//热销
            coupon:0,//优惠券
            fileList1: [],
            fileList2: [],
            guiGeList:[],
        })
    }



    ProductName(e){
        this.setState({
            ProductName:e.target.value
        })
    }
    ProductDetails(e){
        this.setState({
            ProductDetails:e.target.value
        })
    }
    Postage(e){
        this.setState({
            Postage:e.target.value
        })
    }
    weight(e){
        this.setState({
            weight:e.target.value
        })
    }
    keyword(e){
        this.setState({
            keyword:e.target.value
        })
    }








    //上传图片
    handleCancel1 = () => this.setState({ previewVisible1: false });
    handlePreview1 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage1: file.url || file.preview,
            previewVisible1: true,
            previewTitle1: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    handleChange1 = ({ file, fileList, event }) => {
        this.setState({ fileList1:fileList })
        console.log(event);
        if(event!=undefined){
            if(event.percent === 100){
                console.log(file);
                console.log(this.state.fileList1);
            }
        }
    };
    removeImg1 = () =>{
        console.log(this.state.fileList1);
    }
    handleCancel2 = () => this.setState({ previewVisible2: false });
    handlePreview2 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage2: file.url || file.preview,
            previewVisible2: true,
            previewTitle2: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    handleChange2 = ({ file, fileList, event }) => {
        this.setState({ fileList2:fileList })
        console.log(event);
        if(event!=undefined){
            if(event.percent === 100){
                console.log(file);
                console.log(this.state.fileList2);
            }
        }
    };
    removeImg2 = () =>{
        console.log(this.state.fileList2);
    }
    //获取类型事件
    getType = (e) =>{
        console.log(e);
    }
    //获取品牌事件
    getPingPai = (e)=>{
        console.log(e);
    }
    //是否抢购
    isQiangGou(){
        if(this.state.flashSale){
            this.setState({flashSale:0})
        }
        else {
            this.setState({flashSale:1})
        }
    }
    //是否热销
    isReXiao() {
        if(this.state.HotSale === 0){
            this.setState({HotSale:1})
        }
        else {
            this.setState({HotSale:0})
        }
    }
    //是否使用优惠券
    isYouHui() {
        if(this.state.coupon === 0){
            this.setState({coupon:1})
        }
        else {
            this.setState({coupon:0})
        }
    }
//构造函数
    constructor(props) {
        super(props)
        this.state = {
            previewVisible1: false,
            previewImage1: '',
            previewTitle1: '',
            previewVisible2: false,
            previewImage2: '',
            previewTitle2: '',
            guiGeMotai:false,


            ProductName:"",//商品名
            ProductDetails:"",//商品详情
            Postage:"",//邮费
            weight:"",//重量
            keyword:"",//关键字
            flashSale:0,//限时抢购
            HotSale:0,//热销
            coupon:0,//优惠券
            fileList1: [],//商品封面
            fileList2: [],//商品详情图

            //规格表数据
            guiGeList:[
                {
                    name:"华为数据线1.5M",
                    shoujia:35,
                    kucunID:23,
                    shuliang:91
                },
                {
                    name:"华为数据线2M",
                    shoujia:30,
                    kucunID:4,
                    shuliang:52
                },
                {
                    name:"华为数据线1M",
                    shoujia:20,
                    kucunID:7,
                    shuliang:982
                },
            ],
            //分类数据
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
            pingPaiListXuanRan:[]
        }
    }
    componentWillMount(){
        this.setState({
            //渲染下拉框
            pingPaiListXuanRan:this.state.pingPaiList.map(function (item) {return <Option value={item.id}>{item.name}</Option>}),
            fenLeiListXuanRan:this.state.fenLeiList.map(function (item) {return <Option value={item.id}>{item.name}</Option>})
        })
    }
    xianshiMoTi(){
        this.setState({ guiGeMotai: true })
    }
    guanBiGuiGe= ()=>{this.setState({ guiGeMotai: false })}
//渲染

    render() {
        //重置
        //上传图片
        const { previewVisible1, previewImage1, fileList1, previewTitle1 } = this.state;
        const { previewVisible2, previewImage2, fileList2, previewTitle2 } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        //类型
        function leixingonChange(value) {
            console.log(`selected ${value}`);
        }


        //规格表
        const columns = [
            {
                title: '库存名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '规格售价',
                dataIndex: 'shoujia',
                key: 'shoujia',
            },
            {
                title: '对应库存ID',
                dataIndex: 'kucunID',
                key: 'kucunID',
            },
            {
                title: '库存数量',
                key: 'shuliang',
                dataIndex: 'shuliang',
            },
            {
                title: '操作',
                render:(text) => (
                    <Button  type="danger">删除</Button>
                )
            },
        ];
        return (
            <div>
                <h2>添加商品</h2>
                <Row>
                    <Col>
                        <h3><UnorderedListOutlined />商品基础信息</h3>
                    </Col>
                </Row>
                <Row>
                    <Col span={3} style={{textAlign:"right"}}>商品名：</Col>
                    <Col><Input placeholder="商品名" onChange={this.ProductName.bind(this)} value={this.state.ProductName} style={{marginLeft:30,width:500}}/></Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={3} style={{textAlign:"right"}}>商品类型：</Col>
                    <Col>
                        <Select onChange={this.getType} style={{marginLeft:30,width:500}}>
                            {this.state.fenLeiListXuanRan}
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={3} style={{textAlign:"right"}}>商品品牌：</Col>
                    <Col>
                        <Select onChange={this.getPingPai} style={{marginLeft:30,width:500}}>
                            {this.state.pingPaiListXuanRan}
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={3} style={{textAlign:"right"}}>商品详情：</Col>
                    <Col><TextArea rows={4} onChange={this.ProductDetails.bind(this)} value={this.state.ProductDetails} style={{marginLeft:30,width:500}}/></Col>
                </Row>
                <Row>
                    <Col>
                        <h3><InsertRowAboveOutlined />商品规格信息</h3>
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={3} style={{textAlign:"right"}}>规格详情：</Col>
                    <Col>
                        <Row>
                            <Button type="primary" onClick={this.xianshiMoTi.bind(this)}>添加一个规格</Button>
                        </Row>
                        <Row>
                            <Table columns={columns} dataSource={this.state.guiGeList}  style={{width:900}}/>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col>
                        <h3><ProfileOutlined />商品详细信息</h3>
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={3} style={{textAlign:"right"}}>添加商品图：</Col>
                    <Col style={{marginLeft:30}}>
                        <Upload
                            action="http://112.74.52.2:8080/healthproject/file/upload"
                            listType="picture-card"
                            fileList={fileList1}
                            onPreview={this.handlePreview1}
                            onChange={this.handleChange1}
                            onRemove={this.removeImg1}
                        >
                            {fileList1.length >= 4 ? null : uploadButton}
                        </Upload>
                        <Modal
                            visible={previewVisible1}
                            title={previewTitle1}
                            footer={null}
                            onCancel={this.handleCancel1}
                        >
                            <img alt="example" style={{ width: '100%' }} src={previewImage1} />
                        </Modal>
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={3} style={{textAlign:"right"}}>添加商品详情图：</Col>
                    <Col style={{marginLeft:30}}>
                        <Upload
                            action="http://112.74.52.2:8080/healthproject/file/upload"
                            listType="picture-card"
                            fileList={fileList2}
                            onPreview={this.handlePreview2}
                            onChange={this.handleChange2}
                            onRemove={this.removeImg2}
                        >
                            {fileList2.length >= 4 ? null : uploadButton}
                        </Upload>
                        <Modal
                            visible={previewVisible2}
                            title={previewTitle2}
                            footer={null}
                            onCancel={this.handleCancel2}
                        >
                            <img alt="example" style={{ width: '100%' }} src={previewImage2} />
                        </Modal>
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={3} style={{textAlign:"right"}}>邮费：</Col>
                    <Col><Input placeholder="邮费" onChange={this.Postage.bind(this)} value={this.state.Postage} style={{marginLeft:30,width:500}}/></Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={3} style={{textAlign:"right"}}>商品重量：</Col>
                    <Col><Input placeholder="商品重量" onChange={this.weight.bind(this)} value={this.state.weight} style={{marginLeft:30,width:500}}/></Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={3} style={{textAlign:"right"}}>商品关键字：</Col>
                    <Col><Input placeholder="商品关键字" onChange={this.keyword.bind(this)} value={this.state.keyword} style={{marginLeft:30,width:500}}/></Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col>
                        <h3><ShoppingOutlined />商品活动信息</h3>
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={3} style={{textAlign:"right"}}>限时抢购：</Col>
                    <Col style={{marginLeft:30}}><Switch checked={this.state.flashSale} onClick={this.isQiangGou.bind(this)} /></Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={3} style={{textAlign:"right"}}>热销：</Col>
                    <Col style={{marginLeft:30}}><Switch checked={this.state.HotSale} onClick={this.isReXiao.bind(this)} /></Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={3} style={{textAlign:"right"}}>享受优惠券：</Col>
                    <Col style={{marginLeft:30}}><Switch checked={this.state.coupon} onClick={this.isYouHui.bind(this)} /></Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={2} offset={10}><Button type="primary">提交</Button></Col>
                    <Col><Button onClick={this.chongZhi.bind(this)}>重置</Button></Col>
                </Row>
                <Modal
                    title="添加规格"
                    visible={this.state.guiGeMotai}
                    onOk={this.handleOk}
                    onCancel={this.guanBiGuiGe}
                    okText="确认"
                    cancelText="取消"
                >
                    <Row>
                        <Col span={5} style={{textAlign:"right" ,lineHeight:"32px"}}>规格名：</Col>
                        <Col span={16}><Input placeholder="规格名" style={{width:200}}/></Col>
                    </Row>
                    <Row style={{marginTop:30}}>
                        <Col span={5} style={{textAlign:"right",lineHeight:"32px"}}>售价：</Col>
                        <Col span={16}><Input placeholder="售价" style={{width:200}}/></Col>
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

export {addProduct as default}
