import React from 'react';  //导入react
//xxx 组件名
class HomePage extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {}
    }

//渲染
    render() {
        return (
            <div>
              <h2>首页</h2>
            </div>
        )
    }
}

export {HomePage as default}
