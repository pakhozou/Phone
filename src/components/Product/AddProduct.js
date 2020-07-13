import React from 'react';  //导入react
import { Upload, Modal,Row,Col,Input,Select,Button,Table,Switch,message } from 'antd';
import { PlusOutlined,UnorderedListOutlined,InsertRowAboveOutlined,ProfileOutlined,ShoppingOutlined } from '@ant-design/icons';
import axios from '../../utils/axios'
import ioApi from '../../api/index'
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
            ProductName:"",//商品名
            ProductDetails:"",//商品详情
            Postage:"",//邮费
            weight:"",//重量
            keyword:"",//关键字
            flashSale:0,//限时抢购
            HotSale:0,//热销
            coupon:0,//优惠券
            fileList1: [],//商品封面图
            fileList2: [],//商品详情图
            guiGeList:[],//规格表
            fenLei:"",//分类
            pingPai:"",//品牌
            goodBrandId:"",
            goodsTypeId:"",
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
    Gname(e){
        this.setState({
            specificationsName:e.target.value
        })
    }
    price(e){
        this.setState({
            price:e.target.value
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
        // console.log(event);
        if(event!=undefined){
            if(event.percent === 100){
                // console.log(file);
                // console.log(this.state.fileList1);
            }
        }
    };
    removeImg1 = () =>{
        // console.log(this.state.fileList1);
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
        // console.log(event);
        if(event!=undefined){
            if(event.percent === 100){
                // console.log(file);
                // console.log(this.state.fileList2);
            }
        }
    };
    removeImg2 = () =>{
        // console.log(this.state.fileList2);
    }
    //获取类型事件
    getType = (e) =>{
        // console.log(e);
        this.setState({goodsTypeId:e})
    }
    //获取品牌事件
    getPingPai = (e)=>{
        // console.log(e);
        this.setState({goodBrandId:e})
    }
    //获取规格类型id
    getGtype(e){
        this.setState({Gtype:e},function () {
            axios.post(ioApi.product.getGuiGeList,{
                stock_typeid: this.state.Gtype,
                stock_brandid: this.state.Gpinpai
            } ,{
                headers:{
                    'Content-Type':'application/json'
                }
            },{
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
                // console.log(res);
                let list = []
                for(let i = 0;i<res.data.data.length;i++){
                    let addlist ={}
                    addlist.id=res.data.data[i].stock_id
                    addlist.name=res.data.data[i].stock_name
                    addlist.num=res.data.data[i].stock_totalnumber
                    list.push(addlist)
                }
                this.setState({
                    guiGeiList:list
                },function () {
                    this.setState({
                        //渲染下拉框
                        guiGeiListXuanRan:this.state.guiGeiList.map(function (item) {return <Option value={item.id}>{item.name}</Option>})
                    })
                })
            })
        })
    }
    getGpinPai(e){
        this.setState({Gpinpai:e},function () {
            axios.post(ioApi.product.getGuiGeList,{
                stock_typeid: this.state.Gtype,
                stock_brandid: this.state.Gpinpai
            } ,{
                headers:{
                    'Content-Type':'application/json'
                }
            },{
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
                // console.log(res.data.data);
                let list = []
                for(let i = 0;i<res.data.data.length;i++){
                    let addlist ={}
                    addlist.id=res.data.data[i].stock_id
                    addlist.name=res.data.data[i].stock_name
                    addlist.num=res.data.data[i].stock_totalnumber
                    list.push(addlist)
                }
                this.setState({
                    guiGeiList:list
                },function () {
                    // console.log(this.state.guiGeiList);
                    this.setState({
                        //渲染下拉框
                        guiGeiListXuanRan:this.state.guiGeiList.map(function (item) {return <Option value={item.id}>{item.name}</Option>})
                    })
                })
            })
        })
    }
    getGid(e){
        this.setState({
            Gid:e
        })
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
    GaddOKcg=()=>{
        // console.log("ok");
        let list = [...this.state.guiGeList]
        let addObj = {}
        let id =this.state.Gid
        let num
        for(let i = 0;i<this.state.guiGeiList.length;i++){
            if(this.state.guiGeiList[i].id === id){
                num = this.state.guiGeiList[i].num
            }
        }
        addObj.name = this.state.specificationsName
        addObj.shoujia= parseFloat(this.state.price)
        addObj.kucunID = id
        addObj.shuliang = parseFloat(num)
        list.push(addObj)
        this.setState({guiGeList:list, guiGeMotai: false })

    }
    uplod=()=>{
        let key = "upload"
        message.loading({ content: '上传中...', key });
        // console.log(6);
        let goodBrandId = this.state.goodBrandId //品牌ID
        let goodsCoverImg=[]//封面图
        let goodsDetailimg=[]//详细图
        let goodsFlag = this.state.keyword.split("、")//关键字
        let goodsFreight = this.state.Postage
        let goodsIntroduce = this.state.ProductDetails
        let goodsIsHot = this.state.HotSale
        let goodsIsRush = this.state.flashSale
        let goodsIscoupon = this.state.coupon
        let goodsName = this.state.ProductName
        let goodsStatue = 1
        let goodsTypeId = this.state.goodsTypeId
        let goodsWeight = this.state.weight
        let specificationsList=[]

        let CimgList = []
        for(let i =0;i<this.state.fileList1.length;i++){
            CimgList.push(this.state.fileList1[i].response.msg)
        }
        goodsCoverImg =CimgList
        let DimgList = []
        for(let x =0;x<this.state.fileList2.length;x++){
            DimgList.push(this.state.fileList2[x].response.msg)
        }
        goodsDetailimg = DimgList
        for(let z =0;z<this.state.guiGeList.length;z++){
            let guiPa={}
            guiPa.price = this.state.guiGeList[z].shoujia
            guiPa.specificationsName = this.state.guiGeList[z].name
            guiPa.stockId = this.state.guiGeList[z].kucunID
            specificationsList.push(guiPa)
        }
        let upObj = {
            goodBrandId,
            goodsCoverImg,
            goodsDetailimg,
            goodsFlag,
            goodsFreight,
            goodsIntroduce,
            goodsIsHot,
            goodsIsRush,
            goodsIscoupon,
            goodsName,
            goodsStatue,
            goodsTypeId,
            goodsWeight,
            specificationsList
        }
        axios.post(ioApi.product.addProduct,upObj,{
            headers:{
                'Content-Type':'application/json'
            }
        },{
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
            // console.log(res);
            if(res.data.code === 200){
                message.success({ content: '上传成功!', key, duration: 2 });
            }
            else {
                message.error({content:"上传失败",key,duration:2});
            }
        })
        // console.log(upObj);


    }
    delGui(data,index){
        // console.log(data);
        // console.log(index);
        let list = [...this.state.guiGeList]
        list.splice(index,1)
        this.setState({
            guiGeList:list
        })
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
            goodsTypeId:"",//分类ID
            goodBrandId:"",//品牌id
            ProductDetails:"",//商品详情
            Postage:"",//邮费
            weight:"",//重量
            keyword:"",//关键字
            flashSale:0,//限时抢购
            HotSale:0,//热销
            coupon:0,//优惠券
            upGuiGe:[],//上传规格
            fileList1: [],//商品封面
            fileList2: [],//商品详情图
            price:"",//规格价格
            specificationsName:"",//规格名
            stockId:"",//库存ID
            Gtype:"",//规格分类ID
            Gpinpai:"",//规格品牌id
            Gid:"",//规格id
            //规格表数据
            guiGeList:[],
            //分类数据
            fenLeiListXuanRan:[],
            //品牌数据
            pingPaiListXuanRan:[],
            //规格数据
            guiGeiList:[],
            guiGeiListXuanRan:[],
        }
    }
    componentWillMount(){
        axios.post(ioApi.product.theType,{nowsPage:1,pageSize:1000}).then((res)=>{
            this.setState({
                //渲染下拉框
                // pingPaiListXuanRan:this.state.pingPaiList.map(function (item) {return <Option value={item.goodsType_id}>{item.goodsType_name}</Option>}),
                fenLeiListXuanRan:res.data.data.data.map(function (item) {return <Option value={item.goodsType_id}>{item.goodsType_name}</Option>}),

            })
        })
        axios.post(ioApi.product.thePingPai,{nowsPage:1,pageSize:1000,remarks:""}).then((res)=>{
            if(res.data.code === 500){
                this.props.history.go(0)
            }
            this.setState({
                //渲染下拉框
                pingPaiListXuanRan:res.data.data.data.map(function (item) {return <Option value={item.goodsBrand_id}>{item.goodsBrand_name}</Option>}),

            })
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
            // console.log(`selected ${value}`);
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
                render:(text,record,index) => (
                    <Button  type="danger" onClick={()=>this.delGui(text,index)}>删除</Button>
                )
            },
        ];
        let upImg = ioApi.product.upImg
        return (
            <div>
                <h2>添加商品</h2>
                <Row>
                    <Col>
                        <h3><UnorderedListOutlined />&nbsp;&nbsp;商品基础信息</h3>
                    </Col>
                </Row>
                <Row>
                    <Col span={3} style={{textAlign:"right"}}>商品名：</Col>
                    <Col><Input placeholder="商品名" onChange={this.ProductName.bind(this)} value={this.state.ProductName} style={{marginLeft:30,width:500}}/></Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={3} style={{textAlign:"right"}}>商品类型：</Col>
                    <Col>
                        <Select onChange={this.getType} value={this.state.goodsTypeId} style={{marginLeft:30,width:500}}>
                            {this.state.fenLeiListXuanRan}
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={3} style={{textAlign:"right"}}>商品品牌：</Col>
                    <Col>
                        <Select onChange={this.getPingPai} value={this.state.goodBrandId} style={{marginLeft:30,width:500}}>
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
                        <h3><InsertRowAboveOutlined />&nbsp;&nbsp;商品规格信息</h3>
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
                        <h3><ProfileOutlined />&nbsp;&nbsp;商品详细信息</h3>
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={3} style={{textAlign:"right"}}>添加商品图：</Col>
                    <Col style={{marginLeft:30}}>
                        <Upload
                            action={upImg}
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
                    <Col span={3} style={{textAlign:"right"}}>&nbsp;&nbsp;添加商品详情图：</Col>
                    <Col style={{marginLeft:30}}>
                        <Upload
                            action={upImg}
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
                        <h3><ShoppingOutlined />&nbsp;&nbsp;商品活动信息</h3>
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
                    <Col span={2} offset={10}><Button type="primary" onClick={this.uplod.bind(this)}>提交</Button></Col>
                    <Col><Button onClick={this.chongZhi.bind(this)}>重置</Button></Col>
                </Row>
                <Modal
                    title="添加规格"
                    visible={this.state.guiGeMotai}
                    onOk={this.GaddOKcg}
                    onCancel={this.guanBiGuiGe}
                    okText="确认"
                    cancelText="取消"
                >
                    <Row>
                        <Col span={5} style={{textAlign:"right" ,lineHeight:"32px"}}>规格名：</Col>
                        <Col span={16}><Input placeholder="规格名" onChange={this.Gname.bind(this)} value={this.state.specificationsName} style={{width:200}}/></Col>
                    </Row>
                    <Row style={{marginTop:30}}>
                        <Col span={5} style={{textAlign:"right",lineHeight:"32px"}}>售价：</Col>
                        <Col span={16}><Input placeholder="售价" onChange={this.price.bind(this)} value={this.state.price} style={{width:200}}/></Col>
                    </Row>
                    <Row style={{marginTop:30}}>
                        <Col span={5} style={{textAlign:"right",lineHeight:"26px"}}>选择库存分类：</Col>
                        <Col span={16}>
                            <Select onChange={this.getGtype.bind(this)} value={this.state.Gtype} style={{width:200}}>
                                {this.state.fenLeiListXuanRan}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{marginTop:30}}>
                        <Col span={5} style={{textAlign:"right",lineHeight:"26px"}}>选择库存品牌：</Col>
                        <Col span={16}>
                            <Select onChange={this.getGpinPai.bind(this)} value={this.state.Gpinpai} style={{width:200}}>
                                {this.state.pingPaiListXuanRan}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{marginTop:30}}>
                        <Col span={5} style={{textAlign:"right",lineHeight:"26px"}}>选择库存货物：</Col>
                        <Col span={16}>
                            <Select onChange={this.getGid.bind(this)} value={this.state.Gid} style={{width:200}}>
                                {this.state.guiGeiListXuanRan}
                            </Select>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

export {addProduct as default}
