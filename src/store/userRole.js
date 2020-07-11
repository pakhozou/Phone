import {observable,action} from "mobx";
import Roleapi from '../api/index';
import axios from '../utils/axios';



class userRole {
  @observable data = [
    {
      menuId: 1,
      menuName: "首页",
      menuUrl: "/index/HomePage",
      menupath: "HomePage",
      componentPath: "HomePage/HomePage",
      menuIcon: "AreaChartOutlined",
      menuState: 0,
      menuChilds: []
    },
    {
      menuId: 2,
      menuName: "商品管理",
      menuUrl: "/index/Product",
      menupath: "Product",
      componentPath: "Product/Product",
      menuIcon: "ShoppingOutlined",
      menuState: 0,
      menuChilds: [
        {
          menuId: 3,
          menuName: "商品列表",
          menuUrl: "/index/Product/ProductList",
          menupath: "ProductList",
          componentPath: "Product/ProductList",
          menuIcon: "ShoppingOutlined",
          menuState: 0,
          menuChilds: []
        },
        {
          menuId: 4,
          menuName: "添加商品",
          menuUrl: "/index/Product/AddProduct",
          menupath: "AddProduct",
          componentPath: "Product/AddProduct",
          menuIcon: "ShoppingOutlined",
          menuState: 0,
          menuChilds: []
        }
      ]
    },
    {
      menuId: 5,
      menuName: "优惠券管理",
      menuUrl: "/index/Discount",
      menupath: "Discount",
      componentPath: "Discount/Discount",
      menuIcon: "BookOutlined",
      menuState: 0,
      menuChilds: []
    },
    {
      menuId: 6,
      menuName: "品牌管理",
      menuUrl: "/index/Brand",
      menupath: "Brand",
      componentPath: "Brand/Brand",
      menuIcon: "SlackOutlined",
      menuState: 0,
      menuChilds: []
    },
    {
      menuId: 7,
      menuName: "类型管理",
      menuUrl: "/index/Typeproduct",
      menupath: "Typeproduct",
      componentPath: "Typeproduct/Typeproduct",
      menuIcon: "AppstoreOutlined",
      menuState: 0,
      menuChilds: []
    },
    {
      menuId: 8,
      menuName: "订单管理",
      menuUrl: "/index/Orderproduct",
      menupath: "Orderproduct",
      componentPath: "Orderproduct/Orderproduct",
      menuIcon: "CopyOutlined",
      menuState: 0,
      menuChilds: [
        {
          menuId: 9,
          menuName: "订单列表",
          menuUrl: "/index/Orderproduct/Orderproductlist",
          menupath: "Orderproductlist",
          componentPath: "Orderproduct/Orderproductlist",
          menuIcon: "CopyOutlined",
          menuState: 0,
          menuChilds: []
        },
        {
          menuId: 10,
          menuName: "发货管理",
          menuUrl: "/index/Orderproduct/Orderdeliver",
          menupath: "Orderdeliver",
          componentPath: "Orderproduct/Orderdeliver",
          menuIcon: "CopyOutlined",
          menuState: 0,
          menuChilds: []
        },
        {
          menuId: 11,
          menuName: "未处理异常订单",
          menuUrl: "/index/Orderproduct/Abnormalorder",
          menupath: "Abnormalorder",
          componentPath: "Orderproduct/Abnormalorder",
          menuIcon: "CopyOutlined",
          menuState: 0,
          menuChilds: []
        }
      ]
    },
    {
      menuId: 12,
      menuName: "销售管理",
      menuUrl: "/index/Salesproduct",
      menupath: "Salesproduct",
      componentPath: "Salesproduct/Salesproduct",
      menuIcon: "PayCircleOutlined",
      menuState: 0,
      menuChilds: [
        {
          menuId: 13,
          menuName: "销售统计表",
          menuUrl: "/index/Salesproduct/Salesproductlist",
          menupath: "Salesproductlist",
          componentPath: "Salesproduct/Salesproductlist",
          menuIcon: "PayCircleOutlined",
          menuState: 0,
          menuChilds: []
        }
      ]
    },
    {
      menuId: 14,
      menuName: "用户管理",
      menuUrl: "/index/UserControl",
      menupath: "UserControl",
      componentPath: "UserControl/UserControl",
      menuIcon: "UserOutlined",
      menuState: 0,
      menuChilds: [
        {
          menuId: 15,
          menuName: "用户列表",
          menuUrl: "/index/UserControl/UserList",
          menupath: "UserList",
          componentPath: "UserControl/UserList",
          menuIcon: "UserOutlined",
          menuState: 0,
          menuChilds: []
        }
      ]
    },
    {
      menuId: 16,
      menuName: "库存管理",
      menuUrl: "/index/Stock",
      menupath: "Stock",
      componentPath: "Stock/Stock",
      menuIcon: "ControlOutlined",
      menuState: 0,
      menuChilds: [
        {
          menuId: 17,
          menuName: "库存列表",
          menuUrl: "/index/Stock/StockList",
          menupath: "StockList",
          componentPath: "Stock/StockList",
          menuIcon: "ControlOutlined",
          menuState: 0,
          menuChilds: []
        }
      ]
    },
    {
      menuId: 18,
      menuName: "权限管理",
      menuUrl: "/index/Authority",
      menupath: "Authority",
      componentPath: "Authority/Authority",
      menuIcon: "SlidersOutlined",
      menuState: 0,
      menuChilds: [
        {
          menuId: 19,
          menuName: "角色管理",
          menuUrl: "/index/Authority/AuthorityRole",
          menupath: "AuthorityRole",
          componentPath: "Authority/AuthorityRole",
          menuIcon: "SlidersOutlined",
          menuState: 0,
          menuChilds: []
        },
        {
          menuId: 20,
          menuName: "运营人员管理",
          menuUrl: "/index/Authority/Operational",
          menupath: "Operational",
          componentPath: "Authority/Operational",
          menuIcon: "SlidersOutlined",
          menuState: 0,
          menuChilds: []
        }
      ]
    }
  ];    //菜单
  @observable menulist = [];   //存放菜单数组
  @observable access_token = ''; //token
  @observable token_type='';
  @observable isLogin = false;  //是否登录
  @observable datalist = [];    //存放角色数组
  @observable userRolelist = [];   //存放用户数组
  @observable menu = [];   //存放用户数组
  @observable muenarr = [];   //点击菜单

  @observable roleID = 0;   //角色ID
  @observable userID = 0;   //角色ID


  @observable selectvalue = ''; //下拉值
  @observable ids = 0 ;    //用户id
  //获取角色数据
  @action getRole(list) {
    this.datalist = list;
    // console.log(JSON.parse(JSON.stringify(this.datalist)));
  };

  //获取菜单数据
  @action getMenu(){
    let getmenu =JSON.parse(localStorage.getItem('menu'));
    console.log(getmenu);
    let menulist =[];
    getmenu.forEach((item)=>{
      if (item.menu_parentId==0 ){
        menulist.push(item);
        item.menuchilds = [];
      }else{
        item.menuchilds = [];
      }
    });
    getmenu.forEach((item)=>{
      if (item.menu_parentId>0){
        menulist.forEach((item2)=>{
          if (item2.menu_id == item.menu_parentId){
            // console.log(item)
            item2.menuchilds.push(item);

          }
        })
      }
    })
    this.menulist = menulist;
    localStorage.setItem('menu2',JSON.stringify(this.menulist));
    // console.log(JSON.parse(JSON.stringify(this.menulist)));
  }
  //登录
  @action login = (obj) => {
    return new Promise((resolve, reject) => {
      axios.post(Roleapi.userRole.adminlogin,
        {password: obj.password, username: obj.username},
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
        },

        axios.get(Roleapi.userRole.getMenuList).then((res)=>{
          // console.log('获取menu');
          // console.log(res.data.data);
          this.menu = res.data.data;
          localStorage.setItem('menu',JSON.stringify(this.menu))
        })
      ).then((res) => {

        console.log(res);
        if (res.data.code === 200) {
          this.access_token = res.data.data.access_token;
          this.token_type = res.data.data.token_type;
          localStorage.setItem('token_type', res.data.data.token_type);   //
          localStorage.setItem('access_token', res.data.data.access_token);   //

          resolve('登录成功')
        } else {
          reject('登录失败')
        }
      }).catch((err) => {
        // console.log('错误');
        console.log(err);
      })
    })
  };
  //  获取用户
  @action getuserRole(userRolelist){
    this.userRolelist = userRolelist
    // console.log(JSON.parse(JSON.stringify(this.userRolelist)));
  };

  @action setmenuarr=(obj)=>{
    this.muenarr = obj;
    localStorage.setItem('muenarr',this.muenarr)
    // console.log(obj);
    console.log(this.muenarr);
  };
  //获取状态
  @action getswitchstatus(obj){
    console.log(obj);
    // console.log(typeof obj.statue);
    // console.log(typeof obj.userId);
    return new Promise((resolve,reject)=>{
     if  (obj.statue == 1){
       obj.statue = 0
     }else {
       obj.statue = 1
     }
     axios.get(Roleapi.userRole.updateUserStatue,{
       params:{
         statue:obj.statue,
         userId:obj.userId,
       }
     }).then((res)=>{
       // console.log(res);
       if(res.data.code == 200){
         resolve('成功')
       }else {
         resolve('失败')
       }
     })
   })
  }


}
export default userRole
