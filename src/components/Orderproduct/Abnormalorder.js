import React from 'react';  //导入react
//xxx 组件名
class Abnormalorder extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {}
    }

//渲染
    render() {
        return (
            <div>
              <h2>未处理异常订单</h2>
            </div>
        )
    }
}

export {Abnormalorder as default}
