import axios from 'axios'
import qs from 'querystring'
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import store from '../redux/stores'


const instance = axios.create({timeout:4000})
//请求拦截器
instance.interceptors.request.use(function (config) {
    //console.log(config);
    NProgress.start()
    //从redux中获取之前保存的token
    const {token} = store.getState().userInfo
    //向请求头中添加信息
    if(token){
        config.headers.Authorization = 'atguigu_' + token
    }
    const {method, data} = config
    //若post请求
    if (method.toLowerCase() === 'post') {
        if (data instanceof Object) {
            config.data = qs.stringify(data)
        }
    }
    return config
})

//响应拦截器
instance.interceptors.response.use( (response) => {
    NProgress.done()
    return response.data;//请求成功走这里,进入了网站
}, 
(error) => {
    NProgress.done()
    return Promise.reject(error)
})

export default instance