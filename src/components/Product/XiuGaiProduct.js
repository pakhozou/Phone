import React from 'react';  //导入react
import { Upload, Modal,Row,Col,Input,Select,Button,Table,Switch,Popconfirm,message } from 'antd';
import { PlusOutlined,UnorderedListOutlined,InsertRowAboveOutlined,ProfileOutlined,ShoppingOutlined } from '@ant-design/icons';
import axios from 'axios'
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
    CimgOver=()=>{
        this.setState({
            CimgModal:false,
            fileList1:[]
        })
    }
    DimgOver=()=>{
        this.setState({
            DimgModal:false,
            fileList2:[]
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
        console.log(event);
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
        console.log(e);
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
        // let list = [...this.state.guiGeList]
        let addObj = {}
        let id =this.state.Gid
        // let num
        // for(let i = 0;i<this.state.guiGeiList.length;i++){
        //     if(this.state.guiGeiList[i].id === id){
        //         num = this.state.guiGeiList[i].num
        //     }
        // }
        addObj.goodsId = this.state.id
        addObj.specificationsName = this.state.specificationsName
        addObj.salesPrice= parseFloat(this.state.price)
        addObj.stockId = id

        // console.log(addObj);
        axios.post(ioApi.product.addGuiGe,addObj,{
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
            this.getProductMSG(this.state.id)
        })
        // addObj.shuliang = parseFloat(num)
        // list.push(addObj)
        this.setState({ guiGeMotai: false })

    }
    uplod=()=>{
        let key = "up"
        message.loading({content:"上传中",key})
        // console.log(6);
        let goodsId = this.state.id
        let goodBrandId = this.state.goodBrandId //品牌ID
        let goodsFlagStrs = this.state.keyword.split("、")//关键字
        let goodsFreight = parseFloat(this.state.Postage)
        let goodsIntroduce = this.state.ProductDetails
        let goodsIsHot = this.state.HotSale
        let goodsIsRush = this.state.flashSale
        let goodsIscoupon = this.state.coupon
        let goodsName = this.state.ProductName
        let goodsStatue = 1
        let goodsTypeId = this.state.goodsTypeId
        let goodsWeight = parseFloat(this.state.weight)
        let specificationsList=[]

        for(let z =0;z<this.state.guiGeList.length;z++){
            let guiPa={}
            guiPa.price = this.state.guiGeList[z].salesPrice
            guiPa.specificationsName = this.state.guiGeList[z].specificationsName
            guiPa.stockId = this.state.guiGeList[z].specificationsId
            specificationsList.push(guiPa)
        }
        let upObj = {
            goodsId,
            goodBrandId,
            goodsFlagStrs,
            goodsFreight,
            goodsIntroduce,
            goodsIsHot,
            goodsIsRush,
            goodsIscoupon,
            goodsName,
            goodsStatue,
            goodsTypeId,
            goodsWeight
        }
        axios.post(ioApi.product.upPDmsg,upObj,{
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
                message.success({content:"修改成功",key,duration:2})
            }
            else {
                message.error({content:"提交失败：后台的锅",key,duration:2})
            }

        })
        // console.log(upObj);

    }
    delGui(data,index){
        // console.log(data.specificationsId);
        axios.post(ioApi.product.delGuiGe,
            {
                SpecificationsId:data.specificationsId
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

            this.getProductMSG(this.state.id)
        })
    }


    CimgAdd=()=>{
        // console.log(this.state.fileList1[0].response.msg);
        let obj = {
            goodscoverId:this.state.FimgID,
            goodsId:this.state.id,
            img:this.state.fileList1[0].response.msg
        }
        // console.log(obj);
        axios.post(ioApi.product.CimgUp,obj,{
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            // console.log(res);
            this.setState({
                CimgModal:false,
                fileList1:[]
            })
            this.getProductMSG(this.state.id)
        })

    }
    DimgAdd=()=>{
        // console.log(this.state.fileList2);
        let obj = {
            detailimgId:this.state.XimgID,
            goodsId:this.state.id,
            img:this.state.fileList2[0].response.msg
        }
        axios.post(ioApi.product.DimgUp,obj).then((res)=>{
            // console.log(res);
            this.setState({
                DimgModal:false,
                fileList2:[]
            })
            this.getProductMSG(this.state.id)
        })
    }
//构造函数
    constructor(props) {
        super(props)
        this.state = {
            fenL:"",
            pinL:"",
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
            guiGeiList:[
                // {id:1,name:"c型数据线1.5米"},
                // {id:2,name:"苹果X手机钢化膜"},
                // {id:3,name:"小米智能音箱"}
            ],
            guiGeiListXuanRan:[],
            FengMianImg:"",//封面图
            XiangQing:"",//详情图
            FimgNum:"",//封面图数量
            XimgNum:"",//详情图数量
            FimgID:"",
            XimgID:"",

            CimgModal:false,
            DimgModal:false,
        }
        this.getProductMSG = this.getProductMSG.bind(this)
    }

    updataCimg(msg){
        // console.log(msg);
        this.setState({
            FimgID:msg,
            CimgModal:true
        })
    }
    updataDimg(msg){
        // console.log(msg);
        this.setState({
            XimgID:msg,
            DimgModal:true
        })
    }

    getProductMSG(thisId){
        let key = "uplode"
        message.loading({content:"初始化中",key})
        axios.post(ioApi.product.ProductById,{
            GoodsId:thisId
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
                message.error({content:"加载失败",key,duration:2})
            }
            let that = this
            // console.log(res.data.data);
            let msg = res.data.data
            let k = []
            for(let i=0;i<msg.goodsFlag.length;i++){
                k.push(msg.goodsFlag[i].flagName)
            }
            let t
            for (let x=0;x<this.state.fenL.length;x++){
                if(this.state.fenL[x].goodsType_name === msg.goodsTypeName){
                    t = this.state.fenL[x].goodsType_id
                }
            }
            let p
            for (let x=0;x<this.state.pinL.length;x++){
                if(this.state.pinL[x].goodsBrand_name === msg.goodBrandName){
                    p = this.state.pinL[x].goodsBrand_id
                }
            }
            this.setState({
                ProductName:msg.goodsName,//商品名


                goodsTypeId:t,//类型
                goodBrandId:p,//品牌

                ProductDetails:msg.goodsIntroduce,//商品详情
                guiGeList:msg.specifications,//规格表
                Postage:msg.goodsFreight,//邮费
                weight:msg.goodsWeight,//重量
                keyword:k.join("、"),//关键字
                flashSale:msg.goodsIsRush,//抢购
                HotSale:msg.goodsIsHot,//热销
                coupon:msg.goodsIscoupon,//是否享受优惠券
                FengMianImg:res.data.data.goodsCoverImg.map(function (itme) {
                    return <Col span={4}>
                        <div style={{width:150,height:150,overflow:"hidden"}} onClick={()=>that.updataCimg(itme.goodscoverId)}>
                            <img src={itme.img} width={150}/>
                        </div>
                    </Col>
                }),//封面图
                XiangQing:res.data.data.goodsDetailimg.map(function (itme) {
                    return <Col span={4}>
                        <div style={{width:150,height:150,overflow:"hidden"}} onClick={()=>that.updataDimg(itme.detailimgId)}>
                            <img src={itme.img} width={150}/>
                        </div>
                    </Col>
                }),//详情图
                FimgNum:res.data.data.goodsCoverImg.length,
                XimgNum:res.data.data.goodsDetailimg.length
            },function () {
                message.success({content:"加载完成",key,duration:1})
            })
        })
    }


    //!!!!!!!!!!!!!!!!!挂载前！！！！！！！！！！！！！！！！！！
    componentWillMount(){
        let thisId
        if(this.props.location.query !== undefined){
            // console.log(this.props.location.query.id);
            this.setState({
                id:this.props.location.query.id
            })
            thisId = this.props.location.query.id

        }
        else {
            this.props.history.push("/index/Product/ProductList")
        }

        axios.post(ioApi.product.theType,{nowsPage:1,pageSize:1000}).then((res)=>{
            this.setState({
                //渲染下拉框
                // pingPaiListXuanRan:this.state.pingPaiList.map(function (item) {return <Option value={item.goodsType_id}>{item.goodsType_name}</Option>}),
                fenLeiListXuanRan:res.data.data.data.map(function (item) {return <Option value={item.goodsType_id}>{item.goodsType_name}</Option>}),
                fenL:res.data.data.data
            },function () {
                axios.post(ioApi.product.thePingPai,{nowsPage:1,pageSize:1000,remarks:""}).then((res)=>{
                    if(res.data.code === 200){
                        this.setState({
                            //渲染下拉框
                            pingPaiListXuanRan:res.data.data.data.map(function (item) {return <Option value={item.goodsBrand_id}>{item.goodsBrand_name}</Option>}),
                            pinL:res.data.data.data
                        },function () {
                            this.getProductMSG(thisId)
                        })
                    }
                    else {
                        message.error({content:"品牌下拉框获取失败，后台的锅"})
                    }
                })
            })
        })
    }
    xianshiMoTi(){
        this.setState({ guiGeMotai: true })
    }
    guanBiGuiGe= ()=>{this.setState({ guiGeMotai: false })}
    back(){
        this.props.history.go(-1)
    }
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
                title: '规格名',
                dataIndex: 'specificationsName',
                key: 'specificationsName',
            },
            {
                title: '规格售价',
                dataIndex: 'salesPrice',
                key: 'salesPrice',
            },
            {
                title: '规格ID',
                dataIndex: 'specificationsId',
                key: 'specificationsId',
            },
            {
                title: '库存数量',
                key: 'stockNumber',
                dataIndex: 'stockNumber',
            },
            {
                title: '操作',
                render:(text,record,index) => (
                    <Popconfirm
                        title="你确定删除规格吗？"
                        okText="确定"
                        cancelText="取消"
                        onConfirm={()=>this.delGui(text,index)}
                    >
                    <Button  type="danger">删除</Button>
                    </Popconfirm>
                )
            },
        ];
        let upImg = ioApi.product.upImg
        return (
            <div>
                <Button  type="primary" onClick={this.back.bind(this)}>返回</Button>
                <h2>修改商品</h2>
                <Row style={{marginTop:80}}>
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
                <Row style={{marginTop:80}}>
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
                <Row style={{marginTop:80}}>
                    <Col>
                        <h3><ProfileOutlined />&nbsp;&nbsp;商品详细信息</h3>
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={3} style={{textAlign:"right"}}>修改商品图：</Col>
                    <Col style={{marginLeft:30}} span={20}>
                        <Row>
                            {this.state.FengMianImg}
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:80}}>
                    <Col span={3} style={{textAlign:"right"}}>修改商品详情图：</Col>
                    <Col style={{marginLeft:30}} span={20}>
                       <Row>
                           {this.state.XiangQing}
                       </Row>
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
                <Row style={{marginTop:80}}>
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





                <Modal
                    title="重新上传商品封面图"
                    visible={this.state.CimgModal}
                    onOk={this.CimgAdd}
                    onCancel={this.CimgOver}
                    okText="确认"
                    cancelText="取消"
                >
                    <Upload
                        action={upImg}
                        listType="picture-card"
                        fileList={fileList1}
                        onPreview={this.handlePreview1}
                        onChange={this.handleChange1}
                        onRemove={this.removeImg1}
                    >
                        {fileList1.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal
                        visible={previewVisible1}
                        title={previewTitle1}
                        footer={null}
                        onCancel={this.handleCancel1}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage1} />
                    </Modal>
                </Modal>



                <Modal
                    title="重新上传商品详情图"
                    visible={this.state.DimgModal}
                    onOk={this.DimgAdd}
                    onCancel={this.DimgOver}
                    okText="确认"
                    cancelText="取消"
                >
                    <Upload
                        action={upImg}
                        listType="picture-card"
                        fileList={fileList2}
                        onPreview={this.handlePreview2}
                        onChange={this.handleChange2}
                        onRemove={this.removeImg2}
                    >
                        {fileList2.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal
                        visible={previewVisible2}
                        title={previewTitle2}
                        footer={null}
                        onCancel={this.handleCancel2}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage2} />
                    </Modal>
                </Modal>
            </div>









        )
    }
}

export {addProduct as default}
