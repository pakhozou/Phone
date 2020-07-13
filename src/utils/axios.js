import axios from 'axios'

//喜德贵添加默认地址
<<<<<<< HEAD
axios.defaults.baseURL=window.baseUrlConfig;
=======
axios.defaults.baseURL='http://111.229.83.241:9601';
>>>>>>> 682a633971aeb6b3fbda972a0707685ac5672260


 //拦截axios发起的所有请求，通过aispatch修改isLoading为true
// axios.interceptors.request.use(
//   config =>{
//     //batoken添加到header中
//     return config
//   },
//   err=>{
//     return Promise.reject(err);
//   })
// //拦截axios发起的所有响应，通过dispatch修改isLoading为false
// axios.interceptors.response.use((config)=>{
//   //将token存起来
//   return config
// })

export default axios
