import React from 'react'
import {Tabs, Row, Col, TabPane, Table, Space} from 'antd';
import axios from 'axios';
import api from '../../api/index'

class UserDetail extends React.Component {
  componentWillMount() {
    // 接收传过来的用户id
    let userId = this.props.match.params.id

    // 根据用户id获取用户详情
    axios.get(api.user.getUserInfoById, {
      params: {
        userId
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.setState({
          userInfo: res.data.data
        })
      }
    }).catch((err) => {
      console.log(err);
    })

    // 根据用户id查询用户优惠券列表
    axios.post(api.user.query, {
      user_Id: userId,
      currentPsge: this.state.page,
      pageSize: this.state.size
    }, {}).then((res) => {
      if (res.data.data) {
        console.log(res);
        res.data.data.map((item, index) => {
          if (item.coupon_Statue == 1) {
            item.coupon_Statue = '未使用'
          } else if (item.coupon_Statue == 2) {
            item.coupon_Statue = '已使用'
          } else if (item.coupon_Statue == 3) {
            item.coupon_Statue = '已过期'
          }
        })
        this.setState({
          data: res.data.data,
          total: res.data.count,
        })
      }
    })

    // 根据用户id查询用户订单列表
    let data = {
      userId,
      limit: this.state.size,
      page: this.state.page3,
    }
    axios.post(api.user.userSelectOrders, data, {
      transformRequest: [
        function (data) {
          let params = "";
          var arr = [];
          for (var key in data) {
            arr.push(key + "=" + data[key]);
          }
          params = arr.join("&");
          return params;
        }
      ]
    }).then((res) => {
      console.log(res.data.data.length);
      if (res.data.data) {
        res.data.data.map((item, index) => {
          // 把订单状态12345转换成未支付，待发货，已发货，完成，异常
          if (item.ordersState == 1) {
            item.ordersState = '未支付'
          } else if (item.ordersState == 2) {
            item.ordersState = '待发货'
          } else if (item.ordersState == 3) {
            item.ordersState = '已发货'
          } else if (item.ordersState == 4) {
            item.ordersState = '完成'
          } else if (item.ordersState == 5) {
            item.ordersState = '异常'
          }
          // 把支付方式123转换成支付宝，微信，网银
          if (item.paymentMethod == 1) {
            item.paymentMethod = '支付宝'
          } else if (item.paymentMethod == 2) {
            item.paymentMethod = '微信'
          } else if (item.paymentMethod == 3) {
            item.paymentMethod = '网银'
          }
          item.ordersCreatetime = this.dateFormat(item.ordersCreatetime)
        })
        this.setState({
          data3: res.data.data,
          total3: res.data.dataCount,
        })
      }
    }).catch((err) => {
      console.log(err);
    })

    // 根据用户id查询用户积分流水列表
    axios.post(api.user.queryPoints, {
        user_id: userId,
        nowsPage: this.state.page2,
        pageSize: this.state.size,
      },
      {
        transformRequest: [
          function (data) {
            let params = "";
            var arr = [];
            for (var key in data) {
              arr.push(key + "=" + data[key]);
            }
            params = arr.join("&");
            return params;
          }
        ]
      }).then((res) => {
      if (res.data.code == 200) {
        res.data.data.data.map((item, index) => {
          if (item.integralInfo_statue == 1) {
            item.integralInfo_integral = '+' + item.integralInfo_integral
          }
        })
        this.setState({
          data2: res.data.data.data,
          total2: res.data.data.dataCount
        })
      }
    })
  }

  // 时间过滤器
  dateFormat(value) {
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

  // 优惠券列表分页方法
  onChange(page) {
    this.setState({
      page
    })
    console.log(page);
    let data = {
      user_Id: this.props.match.params.id,
      currentPsge: page,
      pageSize: this.state.size
    }
    axios.post(api.user.query, data,
      {
        // transformRequest: [
        //   function (data) {
        //     let params = "";
        //     var arr = [];
        //     for (var key in data) {
        //       arr.push(key + "=" + data[key]);
        //     }
        //     params = arr.join("&");
        //     return params;
        //   }
        // ]
      }).then((res) => {
      if (res.data.data) {
        res.data.data.map((item, index) => {
          if (item.coupon_Statue == 1) {
            item.coupon_Statue = '未使用'
          } else if (item.coupon_Statue == 2) {
            item.coupon_Statue = '已使用'
          } else if (item.coupon_Statue == 3) {
            item.coupon_Statue = '已过期'
          }
        })
        this.setState({
          data: res.data.data,
        })
      }
    })
  }

// 积分列表分页方法
  onChange2(page) {
    this.setState({
      page2: page
    })
    let data = {
      user_id: this.props.match.params.id,
      nowsPage: page,
      pageSize: this.state.size,
    }
    axios.post(api.user.queryPoints, data, {
      transformRequest: [
        function (data) {
          let params = "";
          var arr = [];
          for (var key in data) {
            arr.push(key + "=" + data[key]);
          }
          params = arr.join("&");
          return params;
        }
      ]
    }).then((res) => {
      console.log(res);
      if (res.data.code == 200) {
        res.data.data.data.map((item, index) => {
          if (item.integralInfo_statue == 1) {
            item.integralInfo_integral = '+' + item.integralInfo_integral
          }
        })
        this.setState({
          data2: res.data.data.data,
        })
      }
    })
  }

  // 订单列表分页方法
  onChange3(page) {
    this.setState({
      page3: page
    })
    let data = {
      page,
      limit: this.state.size,
      userId: this.props.match.params.id
    }
    axios.post(api.user.userSelectOrders, data, {
      transformRequest: [
        function (data) {
          let params = "";
          var arr = [];
          for (var key in data) {
            arr.push(key + "=" + data[key]);
          }
          params = arr.join("&");
          return params;
        }
      ]
    }).then((res) => {
        if (res.data.data) {
          res.data.data.map((item, index) => {
            // 把订单状态12345转换成未支付，待发货，已发货，完成，异常
            if (item.ordersState == 1) {
              item.ordersState = '未支付'
            } else if (item.ordersState == 2) {
              item.ordersState = '待发货'
            } else if (item.ordersState == 3) {
              item.ordersState = '已发货'
            } else if (item.ordersState == 4) {
              item.ordersState = '完成'
            } else if (item.ordersState == 5) {
              item.ordersState = '异常'
            }
            // 把支付方式123转换成支付宝，微信，网银
            if (item.paymentMethod == 1) {
              item.paymentMethod = '支付宝'
            } else if (item.paymentMethod == 2) {
              item.paymentMethod = '微信'
            } else if (item.paymentMethod == 3) {
              item.paymentMethod = '网银'
            }
            item.ordersCreatetime = this.dateFormat(item.ordersCreatetime)
          })
          this.setState({
            data3: res.data.data,
          })
        }
      }
    )
  }

  // 构造函数
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
      columns: [
        {
          title: '优惠券id',
          dataIndex: 'coupon_Id',
          key: 'coupon_Id',
        },
        {
          title: '优惠券名称',
          dataIndex: 'coupon_name',
          key: 'coupon_name',
        },
        {
          title: '过期日期',
          dataIndex: 'coupon_Endtime',
          key: 'coupon_Endtime',
        },
        {
          title: '优惠券状态',
          dataIndex: 'coupon_Statue',
          key: 'coupon_Statue',
        },
      ],
      data: [],
      total: '',
      page: 1,
      columns2: [
        {
          title: '积分流水日期',
          dataIndex: 'integralInfo_createTime',
          key: 'integralInfo_createTime',
        },
        {
          title: '积分详情（消费/兑换）',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: '积分流水',
          dataIndex: 'integralInfo_integral',
          key: 'integralInfo_integral',
        },
      ],
      data2: [],
      total2: '',
      page2: 1,
      columns3: [
        {
          title: '订单号',
          dataIndex: 'ordersNo',
          key: 'ordersNo',
        },
        {
          title: '生成时间',
          dataIndex: 'ordersCreatetime',
          key: 'ordersCreatetime',
        },
        {
          title: '订单状态',
          dataIndex: 'ordersState',
          key: 'ordersState',
        },
        {
          title: '实付金额',
          dataIndex: 'ordersMoney',
          key: 'ordersMoney',
        },
        {
          title: '支付方式',
          dataIndex: 'paymentMethod',
          key: 'paymentMethod',
        },
      ],
      data3: [],
      total3: '',
      page3: 1,
      size: 3,
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
            <div style={style}>用户ID：{this.state.userInfo.user_id}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>用户名称：{this.state.userInfo.userinfo_nickname}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>注册时间：{this.state.userInfo.createTime}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>手机号：{this.state.userInfo.user_username}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>积分总数：{this.state.userInfo.account_integral}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>账户资金：{this.state.userInfo.account_money}</div>
          </Col>
        </Row>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="优惠券查询" key="1">
            <Table columns={this.state.columns} dataSource={this.state.data} pagination={{
              current: this.state.page,
              pageSize: this.state.size,
              total: this.state.total,
              onChange: (page) => {
                this.onChange(page)
              }
            }}/>
          </TabPane>
          <TabPane tab="积分查询" key="2">
            <Table columns={this.state.columns2} dataSource={this.state.data2} pagination={{
              current: this.state.page2,
              pageSize: this.state.size,
              total: this.state.total2,
              onChange: (page) => {
                this.onChange2(page)
              }
            }}/>
          </TabPane>
          <TabPane tab="查看订单" key="3">
            <Table columns={this.state.columns3} dataSource={this.state.data3} pagination={{
              current: this.state.page3,
              pageSize: this.state.size,
              total: this.state.total3,
              onChange: (page) => {
                this.onChange3(page)
              }
            }}/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export {UserDetail as default}