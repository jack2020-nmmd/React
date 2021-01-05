//项目所有请求由这个文件
import myAxios from './myAxios'
import axios from 'axios'
import qs from 'querystring'
import {BASE_URL} from '../config'
//登录请求
// export  const reqLogin = (value) => {
//    return axios.post('http://localhost:3000/login', qs.stringify(value))
// }
export  const reqLogin = (value) => {
    return myAxios.post(`${BASE_URL}/login`, value)
 }

 //获取商品列表请求
 export const reqCategoryList = () => {
     return myAxios.get(`${BASE_URL}/manage/category/list`)
 }