import React from 'react';  //导入react
import './css/Home.css'
//xxx 组件名
class Err404 extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {}
    }

//渲染
    render() {
        return (
            <div className='Err404'>
              <h2 >404 Not Found</h2>
              <h5>未找到页面</h5>
            </div>
        )
    }
}

export {Err404 as default}
