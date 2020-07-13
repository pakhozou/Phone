import React from 'react';  //导入react
import { Row, Col } from 'antd';
import "./HomePage.css";
import {
    CalendarOutlined,
    AccountBookOutlined,
    CarryOutOutlined,
    FolderOpenOutlined,
    FolderAddOutlined,
    FolderOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Card } from 'antd';
// import echartTheme from './../themeLight'
//不是按需加载的话文件太大
//import echarts from 'echarts'
//下面是按需加载
import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
//首页组件名
class HomePage extends React.Component {
    getOption = () => {
        let option = {
            title: {
                text: '销售统计',
                subtext: '数据来自网络'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['销售总数', '销售总额']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['2月', '4月', '6月', '8月', '10月', '12月']
            },
            series: [
                {
                    name: '销售总数',
                    type: 'bar',
                    data: [138203, 213489, 89034, 104970, 131744, 130230]
                },
                {
                    name: '销售总额',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 161807]
                }
            ]
        };
        return option
    }
    //构造函数
    constructor(props) {
        super(props)
        this.state = {
            Totalorders: '300',
            thisTotalsales: '2000',
            thatTotalsales: '3000'

        }
    };
    //渲染
    render() {
        return (
            <div>
                <Row className="xxmHeader">
                    <Col className="xxmHeaderList" span={6} offset={2}>
                        <Row>
                            <Col span={12}><h3>本月订单总数</h3></Col>
                            <Col className="headerIcon" span={12}><CalendarOutlined /></Col>
                        </Row>
                        <h3>{this.state.Totalorders}</h3>
                    </Col>
                    <Col className="xxmHeaderList" span={6} offset={2}>
                        <Row>
                            <Col span={12}><h3>本月销售总额</h3></Col>
                            <Col className="headerIcon" span={12}><AccountBookOutlined /></Col>
                        </Row>
                        <h3>{this.state.thisTotalsales}</h3>
                    </Col>
                    <Col className="xxmHeaderList" span={6} offset={2}>
                        <Row>
                            <Col span={12}><h3>上月销售总额</h3></Col>
                            <Col className="headerIcon" span={12}><CarryOutOutlined /></Col>
                        </Row>
                        <h3>{this.state.thatTotalsales}</h3>
                    </Col>
                </Row>
                <Row className="Overview">
                    <Col span={9} offset={2}><h3>商品总览</h3></Col>
                    <Col span={9} offset={2}><h3>用户总览</h3></Col>
                </Row>
                <Row className="card">
                    <Col className="firstCard" span={9} offset={2}>
                        <span>
                        <h1><FolderOpenOutlined /></h1>
                            <span>下架商品</span>
                            <h2>9572</h2>
                        </span>
                        <span>
                            <h1><FolderAddOutlined /></h1>
                            <span>上架商品</span>
                            <h2>5624</h2>
                        </span>
                        <span>
                            <h1><FolderOutlined /></h1>
                            <span>全部商品</span>
                            <h2>9999</h2>
                        </span>
                    </Col>
                    <Col className="scdCard" span={9} offset={2}>
                        <span>
                            <h1><UserAddOutlined /></h1>
                            <span>本月新增</span>
                            <h2>9572</h2>
                        </span>
                        <span>
                            <h1><UsergroupAddOutlined /></h1>
                            <span>上月新增</span>
                            <h2>5624</h2>
                        </span>
                        <span>
                            <h1><UserOutlined /></h1>
                            <span>用户总览</span>
                            <h2>9999</h2>
                        </span>
                    </Col>
                </Row>
                <Row className="Statistics">
                    <Col span={2} offset={2}><h3>订单统计</h3></Col>
                </Row>
                <Row className="Statistics">
                    <Col span={4} offset={2}>
                        <div className="StatisticsCard">
                            <div>
                                <p>本月销售总数</p>
                                <p>56947</p>
                            </div>
                            <div>
                                <p className="growth">+12%</p>
                                <p>同比上月</p>
                            </div>
                        </div>

                        <div className="StatisticsCard">
                            <div>
                                <p>本月销售总额</p>
                                <p>56947</p>
                            </div>
                            <div>
                                <p className="growth">+15%</p>
                                <p>同比上月</p>
                            </div>
                        </div>

                        <div className="StatisticsCard">
                            <div>
                                <p>本月销售总额</p>
                                <p>56947</p>
                            </div>
                            <div>
                                <p className="growth"><span>+15%</span></p>
                                <p>同比上月</p>
                            </div>
                        </div>
                    </Col>
                    <Col className="myechar" span={14} offset={2}>
                        <Card>
                            <ReactEcharts option={this.getOption()} theme="Imooc" />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export { HomePage as default }
