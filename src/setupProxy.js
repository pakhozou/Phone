// const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');   //引入

module.exports = function(app){
  app.use(
    createProxyMiddleware(
      '/api',{      //使用/api替换http://地址
        target:'http://111.229.83.241:9601/',
        changeOrigin:true,    //changeOrigin默认是false：请求头中host仍然是浏览器发送过来的host,
                              // 如果设置成true：发送请求头中host会设置成target·
        pathRewrite: {
          '^/api': '',        //将api代理到target网址，必写，不写会直接代理到http://111.229.83.241:9601/api
        },
        secure: false, // 是否验证证书
  }))
};
