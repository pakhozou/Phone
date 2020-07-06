import React from 'react';  //导入react
//xxx 组件名
class Brand extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {}
    }

//渲染
    render() {
        return (
            <div>
              <h2>品牌管理</h2>
            </div>
        )
    }
}

export {Brand as default}
