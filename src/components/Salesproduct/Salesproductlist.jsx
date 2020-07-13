import React from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import Axios from '../../utils/axios';
import wjapi from '../../api/index'
// import echarts from 'echarts' 
// import echarts from 'echarts/lib/echarts'
import echarts from 'echarts/lib/echarts'
import { Row, Col } from 'antd';
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import './Salesproductlist.css'
export default class Salesproductlist extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tongjitu:[],
            index:[]
        }
       
    }
    componentDidMount(){
        Axios.post(wjapi.brand.queryType, {})
            .then(res => {
               let tj =[]
               let xb =[]
                console.log(res.data.data)
                res.data.data.map((element,index) => {
                    // console.log(index)
                    tj.push(element.goodsType_name)
                    xb.push(index)
                })

                this.setState({
                   tongjitu:tj,
                   index:xb
                },()=>{
                    console.log(this.state.tongjitu)
                    console.log(this.state.index)
                })
              

            })
    }
    getOption = () => {  //年销售额
        let option = {
            // legend: {},
            tooltip: {},
            dataset: {
                dimensions: ['product', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
                source: [
                    { product: '月销售额', '1':123, '2':234 ,'3':345, '4':456 ,'5':456 ,'6':567, '7':678, '8':789, '9':789, '10':345, '11':456, '12':678, '13':765, '14':543, '15':874, '16':421, '17':742, '18':743, '19':544, '13':666, '14':543, '15':987, '16':434, '17':312, '18':632, '19':321, '20':234, '21':765, '22':654, '23':765, '24':533, '25':777, '26':888, '27':423, '28':436, '29':324, '30':567 },
                ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' }
            ]
        }
        return option
    }
    yueOption = () => {    //月销售额
        let option = {
            legend: {},
            tooltip: {},
            dataset: {
                dimensions: ['product', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                source: [
                    { product: '年销售额', '1月': 43.3, '2月': 85.8, '3月': 93.7, '4月': 43.3, '5月': 85.8, '6月': 93.7, '7月': 43.3, '8月': 85.8, '9月': 93.7, '10月': 43.3, '11月': 85.8, '12月': 93.7 },
                ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' }
            ]
        }
        return option
    }
    xiaoliangOption = () => {
        let option = {
            title: {
                text: '销量统计图',
                subtext: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                left: 'center',
                top: 'bottom',
                data: this.state.tongjitu
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                    name: '半径模式',
                    type: 'pie',
                    radius: [20, 110],
                    center: ['25%', '50%'],
                    roseType: 'radius',
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: [
                        { value: 10, name: this.state.tongjitu[0] },
                        { value: 5, name: this.state.tongjitu[1] },
                        { value: 15, name: this.state.tongjitu[2] },
                        { value: 25, name: this.state.tongjitu[3] },
                        { value: 20, name: this.state.tongjitu[4] },
                        { value: 35, name: this.state.tongjitu[5] },
                        { value: 30, name: this.state.tongjitu[6] },
                        { value: 40, name: this.state.tongjitu[7] }
                    ]
                },
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: [30, 110],
                    center: ['75%', '50%'],
                    roseType: 'area',
                    data: [
                        { value: 10, name: this.state.tongjitu[0] },
                        { value: 5, name: this.state.tongjitu[1] },
                        { value: 15, name: this.state.tongjitu[2] },
                        { value: 25, name: this.state.tongjitu[3] },
                        { value: 20, name: this.state.tongjitu[4] },
                        { value: 35, name: this.state.tongjitu[5] },
                        { value: 30, name: this.state.tongjitu[6] },
                        { value: 40, name: this.state.tongjitu[7] }
                    ]
                }
            ]
        };
        return option
    }

    render() {
        return (
            <div>
                <h2>销售统计表</h2>
                <Row>
                    <Col span={12}><ReactEcharts option={this.getOption()} theme="Imooc" /></Col>
                    <Col span={12}><ReactEcharts option={this.yueOption()} theme="Imooc" /></Col>
                </Row>
                <Row>
                    <Col className='Salesproductlist_tongbizengzhang' span={6}>营业额
                        <Row >
                            <Col span={24} className='tongbi'>
                                <Row>
                                    <Col span={12}>
                                        <Row>
                                            <Col className='title' span={24}>月营业额</Col>
                                            <Col className='money' span={24}>￥500000</Col>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row className='right'>
                                            <Col className="icons-list" span={24}>-10%<CaretDownOutlined className='yansegre' /></Col>
                                            <Col className='title2' span={24}>同比上月</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24} className='tongbi'>
                                <Row>
                                    <Col span={12}>
                                        <Row>
                                            <Col className='title' span={24}>月利润</Col>
                                            <Col className='money' span={24}>￥500000</Col>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row className='right'>
                                            <Col className="icons-list" span={24}>+10%<CaretUpOutlined className='yansered' /></Col>
                                            <Col className='title2' span={24}>同比上月</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={18} className='wj'>
                        <Row>
                            <Col span={24}><ReactEcharts option={this.xiaoliangOption()} theme="Imooc" /></Col>
                        </Row>
                        
                    </Col>
                </Row>
            </div>
        )
    }
}