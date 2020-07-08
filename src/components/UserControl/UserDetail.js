import React from 'react'
import {Tabs, Row, Col, TabPane, Table, Space} from 'antd';

class UserDetail extends React.Component {
  //构造函数
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          title: '推广人id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '推广人用户名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '推广人注册时间',
          dataIndex: 'reg',
          key: 'reg',
        },
        {
          title: '推广收益',
          dataIndex: 'profit',
          key: 'profit',
        },
      ],
      data: [
        {
          id: '1',
          name: '深雨',
          reg: (new Date()).toLocaleDateString(),
          profit: '￥132.00',
        },
        {
          id: '2',
          name: '深夜',
          reg: (new Date()).toLocaleDateString(),
          profit: '￥375.00',
        },
        {
          id: '3',
          name: '深渊',
          reg: (new Date()).toLocaleDateString(),
          profit: '￥200.00',
        },
      ],
      columns2: [
        {
          title: '优惠券id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '优惠券名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '过期日期',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: '优惠券状态',
          dataIndex: 'state',
          key: 'state',
        },
      ],
      data2: [
        {
          id: '1',
          name: '满100减20',
          date: (new Date()).toLocaleDateString(),
          state: '已使用',
        },
        {
          id: '2',
          name: '满500减100',
          date: (new Date()).toLocaleDateString(),
          state: '未使用',
        },
        {
          id: '3',
          name: '满50减5',
          date: (new Date()).toLocaleDateString(),
          state: '已过期',
        },
        {
          id: '4',
          name: '满20减3',
          date: (new Date()).toLocaleDateString(),
          state: '未过期',
        },
        {
          id: '5',
          name: '满10减10',
          date: (new Date()).toLocaleDateString(),
          state: '已使用',
        },
      ],
      columns3: [
        {
          title: '积分流水日期',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: '积分详情（消费/兑换）',
          dataIndex: 'detail',
          key: 'detail',
        },
        {
          title: '积分流水',
          dataIndex: 'points',
          key: 'points',
        },
      ],
      data3: [
        {
          date: (new Date()).toLocaleDateString(),
          detail: '购买商品奖励',
          points: '+100'
        },
        {
          date: (new Date()).toLocaleDateString(),
          detail: '兑换优惠券',
          points: '-500'
        },
      ],
      columns4: [
        {
          title: '订单号',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '生成时间',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: '订单原价',
          dataIndex: 'originalPrice',
          key: 'originalPrice',
        },
        {
          title: '订单状态',
          dataIndex: 'state',
          key: 'state',
        },
        {
          title: '实付金额',
          dataIndex: 'actualPayment',
          key: 'actualPayment',
        },
        {
          title: '支付方式',
          dataIndex: 'paymentMethod',
          key: 'paymentMethod',
        },
      ],
      data4: [
        {
          id: '1',
          date: (new Date()).toLocaleDateString(),
          originalPrice: '￥150',
          state: '已完成',
          actualPayment: '￥140',
          paymentMethod: '微信'
        },
        {
          id: '2',
          date: (new Date()).toLocaleDateString(),
          originalPrice: '￥200',
          state: '退款中',
          actualPayment: '￥180',
          paymentMethod: '支付宝'
        },
        {
          id: '3',
          date: (new Date()).toLocaleDateString(),
          originalPrice: '￥89',
          state: '已退款',
          actualPayment: '￥58',
          paymentMethod: '微信'
        },
        {
          id: '4',
          date: (new Date()).toLocaleDateString(),
          originalPrice: '￥130',
          state: '待发货',
          actualPayment: '￥110',
          paymentMethod: '微信'
        },
      ],
    }
  }

  render() {
    const {TabPane} = Tabs;
    const style = {padding: '8px 0', fontSize: '14px'};
    return (
      <div>
        <h2>用户详情</h2>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={8}>
            <div style={style}>用户ID:000312321412</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>用户名称:喵小二</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>注册时间:2020年7月6日 09:27:55</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>积分总数:110分</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>手机号:18328039766</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>上次登录:2020年7月7日 21:34:42</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>积分总数:110分</div>
          </Col>
          <Col className="gutter-row" span={8}>

          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>上次登录:2020年7月7日 21:34:42</div>
          </Col>
        </Row>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="显示推广" key="1">
            <Table columns={this.state.columns} dataSource={this.state.data}/>
          </TabPane>
          <TabPane tab="优惠券查询" key="2">
            <Table columns={this.state.columns2} dataSource={this.state.data2}/>
          </TabPane>
          <TabPane tab="积分查询" key="3">
            <Table columns={this.state.columns3} dataSource={this.state.data3}/>
          </TabPane>
          <TabPane tab="查看订单" key="4">
            <Table columns={this.state.columns4} dataSource={this.state.data4}/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export {UserDetail as default}