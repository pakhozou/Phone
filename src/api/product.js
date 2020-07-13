/**
 * Created by LuxonD on 2020/7/9.
 */
export default {
    getProductList:"/goods/admin/GoodsManage/selcetGoods",//模糊查询商品
    xiuGaiProduct:"/goods/admin/GoodsManage/updateGoods",//修改商品
    ProductById:"/goods/admin/GoodsManage/selcetGoodsOneById",//查看ID详情
    openTeJia:"/goods/admin/GoodsManage/updateSpecificationsIsPriceBySid",//开启特价
    closeTeJia:"/goods/admin/GoodsManage/updateSpecificationsCloseIsPriceBySid",//关闭特价
    theType:"/goodstype/goodsType/queryGoods",//查询类别列表
    thePingPai:"/brands/queryBrand",//查询品牌
    delPD:"/goods/admin/GoodsManage/deleteGoods",//删除商品
    getGuiGeList:"/stockservice/stock/selectByTBId",//查询规格
    addProduct:"/goods/admin/GoodsManage/addGoods",//添加商品
    addGuiGe:"/goods/admin/GoodsManage/updateGoodsAddSpecificatios",//添加规格
    delGuiGe:"/goods/admin/GoodsManage/updateGoodsDeleteSpecificatios",//删除规格
    CimgUp:"/goods/admin/GoodsManage/updateGoodsUpdateCover",//修改商品封面图
    DimgUp:"/goods/admin/GoodsManage/updateGoodsUpdateDetailImg",//修改商品详细图
    upPDmsg:"/goods/admin/GoodsManage/updateGoods",//修改商品
    upImg:window.baseUrlConfig+"/user/file/upload",//图片上传
}