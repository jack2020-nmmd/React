import axios from 'axios'
import qs from 'querystring'
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import store from '../redux/stores'
import { message } from "antd";
import { createDeleteUserInfoAction } from "../redux/action_creators/login_action";


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
    if(error.response.status === 401){
        message.error("身份验证失败，请重新登录", 0.5)
        //分发一个删除用户身份过期的action
        store.dispatch(createDeleteUserInfoAction())
    }else{
        message.error(error, 0.5)
    }
    return Promise.reject(error)
})

export default instance