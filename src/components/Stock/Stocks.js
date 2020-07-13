import React from 'react'
import Axios from 'axios'
import api from "../../api/index"
import {Table,Button,Space,Modal,Form,message} from 'antd'; //导入antd组件
class Stocks extends React.Component {
    componentDidMount(){
        this.sum();
    }
    //获取数据的方法
    sum(){
        // console.log(this.state.theAll)
        Axios.post(api.login.selectinfo,
            this.state.theAll
        ).then((ser)=>{
            if(ser.data.code===200){
                this.filterStoreType(ser)//过滤,设置ser的stock的值
                this.setState({
                    dataSource:ser.data.data.data,
                    total:ser.data.data.dataCount
                })
                message.success('获取数据成功');
            }else {
                message.success("暂无记录");
                // console.log(ser.data.msg)
            }
            // console.log(ser)
        })
    }
    //过滤函数
    filterStoreType(ser){
        ser.data.data.data.map((item) => {
            return item.time = this.timeType(item.time)
        })
        // console.log(cs)
    }
    //事件过滤函数
    timeType (value){
            if (value == null) {
                return '';
            } else {
                const date = new Date(value);
                const y = date.getFullYear();// 年
                let MM = date.getMonth() + 1;// 月
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();// 日
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();// 时
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();// 分
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();// 秒
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            }
        }

    //构造函数
    constructor(props) {
        super(props)
        this.state = {
            current:1, //  当前页
            pageSize:2,//  每页显示
            total:4,//  总条数
            visible:false,//模态框显示条件
            xiaohui:{
                stockinfo_id:"",//存储表格操作的id
                stockinfo_state:"",//状态
            },
            //获取数据查询条件
            theAll:{
                stock_id:this.props.match.params.id,//存储查看传下来的库存id
                nowsPage:1,
                pageSize:2,
            },
            //表格显示数据
            dataSource : [],
            //表格标题与操作
            columns:[
                {
                    title: '详情id',
                    dataIndex: 'stockinfo_id',
                    key: 'stockinfo_id',
                },
                {
                    title: '入库数量',
                    dataIndex: 'stock_number',
                    key: 'stock_number',
                },
                {
                    title: '单价',
                    dataIndex: 'stock_price',
                    key: 'stock_price',
                },
                {
                    title: '入库时间',
                    dataIndex: 'time',
                    key: 'time',
                },
                {
                    title: '操作',
                    render: (text,record,index) => (
                        <Space>
                            {/*每行表单点击事件操作按钮*/}
                            <Button type="primary" onClick={()=>{this.xiao(record.stockinfo_id)}}>删除记录</Button>
                        </Space>
                    )
                }
            ]
        }
    }


    //分页处理函数
    sheZhi(page){
        this.setState({
            current:page,
            theAll:{
                stock_id:this.props.match.params.id,//存储查看传下来的库存id
                nowsPage:page,
                pageSize:2,
            }
        },()=>{
            this.sum()
        })
    };



    //每行表格销毁事件函数
    xiao(id){
        this.setState({
            visible: true,
            xiaohui:{
                stockinfo_id:id,//存储表格操作的id
                stockinfo_state:0,//状态
            },
        },()=>{
            // console.log(this.state.xiaohui)
        });
    }
    // 销毁取消按钮
    xiaoXiao=()=>{
        this.setState({
            visible: false,
        });
    }
    //销毁确认按钮
    xiaoQue=values=>{
        this.setState({
            visible: false,
        });
        this.xhjl()
    }
    //销毁记录的方法
    xhjl(){
        Axios.post(api.login.updateinfo,
            this.state.xiaohui
        ).then((ser)=>{
            if(ser.data.code===200){
                message.success('销毁数据成功');
            }else {
                message.error(ser.data.msg);
                // console.log(ser.data.msg)
            }
            this.sum()
        })
    }

    render() {
        // console.log(this.props.match.params.id)//获取跳转的id
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        return (
            <div>
                {/*表格 分页*/}
                <Table size="default" dataSource={this.state.dataSource} columns={this.state.columns} pagination={
                    {current:this.state.current,//  当前页
                        pageSize:this.state.pageSize,//  每页显示
                        total:this.state.total,//  总条数
                        onChange:(page,pageSize)=> {this.sheZhi(page,pageSize)}//点击分页回调函数
                    }
                } />
                {/*销毁模态框*/}
                <Modal
                    title="销毁"
                    visible={this.state.visible}
                    footer={[]}
                    onCancel={this.xiaoXiao}
                >
                    <Form {...layout} name="nest-messages" onFinish={this.xiaoQue}>
                        <p>确认销毁</p>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit" >
                                确认
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export {Stocks as default}