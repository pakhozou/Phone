import React from 'react';  //导入react
//xxx 组件名
class Discount extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {}
    }

//渲染
    render() {
        return (
            <div>
              <h2>优惠券</h2>
            </div>
        )
    }
}

export {Discount as default}
