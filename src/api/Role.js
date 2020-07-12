


export default {
  userRole : '/user/role/getRoleList',      //获取所有角色
  delRole : '/user/role/deleteRoleById',    //删除角色
  adminlogin : '/user/auth/adminlogin',     //管理员登录
  getMenuList : '/user/role/getMenuList',   //获取所有菜单
  adminList : '/user/auth/adminList',       //获取管理员列表
  addRole : '/user/role/addRole',           //添加角色
  getMenuListByRole : '/user/role/getMenuListByRole', //根据角色获取菜单
  updateUserStatue : '/user/auth/updateUserStatue',      //修改用户状态
  userChangeRole : '/user/role/userChangeRole',   //用户修改角色
  addAdminUser : '/user/auth/addAdminUser',   //添加管理员
  getUserInfo : '/user/auth/getUserInfo',    //获取用户信息
  roleAddMenus :  '/user/role/roleAddMenus',  //批量添加菜单
  roleDeleteMenus:'/user/role/roleDeleteMenus'  //批量删除菜单

}
