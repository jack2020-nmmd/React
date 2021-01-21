//项目所有请求由这个文件
import myAxios from './myAxios'
//import axios from 'axios'
//import qs from 'querystring'
import jsonp from "jsonp";
import { message } from 'antd'
import {BASE_URL, WEATHER_KEY, CITY} from '../config'
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
 //获取天气信息
 export const reqWeather = () => {
     let result
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_KEY}`, (err, data) => {
        if (err) {
            message.error('请求天气接口失败')
        }else{
            message.success("没有付费，天气网站获取不成功")
            /*const {dayPictureUrl, temperature, weather} = data.result[0].weather_data[0]
            let weatherObj = {dayPictureUrl, temperature, weather}
            result = weatherObj*/
        }
    })
    return result 
}

//新增商品的分类
export  const reqAddCategory = (categoryName) => {
    return myAxios.post(`${BASE_URL}/manage/category/add`, {categoryName})
 }
//更新商品列表分类
 export  const reqUpdateCategory = (categoryObj) => {
    return myAxios.post(`${BASE_URL}/manage/category/update`, categoryObj)
 }

 //请求商品分页列表
 export const reqProductList = (pageNum, pageSize) => {
    return myAxios.get(`${BASE_URL}/manage/product/list`, {params:{pageNum, pageSize}})
}
 //请求更新商品状态
 export  const reqUpdateProductStatus = (productObj) => {
    return myAxios.post(`${BASE_URL}/manage/product/updateStatus`, productObj)
 }
 //根据name/desc搜索商品的分页列表
 export const reqSearchProduct= (pageNum, pageSize, searchType, keyWord) => {
             return myAxios.get(`${BASE_URL}/manage/product/search`, {params:{pageNum, pageSize, [searchType]:keyWord}})}
 //根据商品id获取商品信息
 export const reqProdById= (productId) => {
    return myAxios.get(`${BASE_URL}/manage/product/info`, {params:{productId}})}
//  export const reqSearchProduct= (pageNum, pageSize, searchType, keyword) => {
//     if (searchType === 'name') {
//         return myAxios.get(`${BASE_URL}/manage/category/list`, {params:{pageNum, pageSize, productName:keyword}})
//     }else{
//         return myAxios.get(`${BASE_URL}/manage/category/list`, {params:{pageNum, pageSize, productDesc:keyword}})
//     }
// }