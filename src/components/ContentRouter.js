import React from 'react';  //导入react
import {Switch, Route} from 'react-router-dom'
import {inject,observer} from "mobx-react";
import loadable from '@loadable/component'
@inject('data')
@observer
//xxx 组件名
class ContentRouter extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {

          RouterList:[]
        }
    }
    bindRouter(routerList){
      let RouterList = routerList.map((item)=>{
        if (item.menuchilds.length == 0){
          return <Route key={item.menu_id} path={item.menu_url} component={ loadable( () => import(`./${item.componentPath}`))}/>
        }else {
          return <Route key={item.menu_id} path={item.menu_url}  render={()=>
            <item.menupath>
           {this.bindRouter(item.menuchilds)}
            </item.menupath>
          }>
          </Route>
        }
      });
      return RouterList
    }
    componentWillMount() {
      let menulist = JSON.parse(localStorage.getItem('menu2'));
      console.log(menulist);
      let list =  this.bindRouter(menulist)
      // console.log(this.props.data.data);
      // console.log('xxx');
      // console.log(list);
      this.setState({
        RouterList : list
      })
    }

//渲染
    render() {
        return (
            <div>
              <Switch>
                {this.state.RouterList}
              </Switch>
            </div>
        )
    }
}

export {ContentRouter as default}
