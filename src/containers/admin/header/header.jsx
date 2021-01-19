import React,{ Component} from 'react'
import { Button, Modal } from "antd";
import {FullscreenOutlined, FullscreenExitOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router-dom'//在非路由组件中使用路由组件的API
import { connect } from "react-redux";
import screenfull from 'screenfull'
import dayjs from "dayjs";
import {createDeleteUserInfoAction} from "../../../redux/action_creators/login_action";
import './css/header.less'
import { reqWeather } from "../../../api";
import menuList from '../../../config/menu_config'

const { confirm } = Modal;

class Header extends Component{
    state = {
        isFull:true,
        date:dayjs().format('YYYY 年 MM 月 DD日 HH:mm:ss'),
        title:''
    }
       
    //给全屏设置监听事件
    componentDidMount(){
        screenfull.on('change', () => {
            let isFull = !this.state.isFull
            this.setState({isFull})
        });
        this.timeID = setInterval(() => {
            this.setState({date:dayjs().format('YYYY 年 MM 月 DD日 HH:mm:ss')})
        }, 1000);
        this.getWeather();
        this.getTitle()
    }
    getWeather = ()=>{//因为一般不再生命钩子函数加async说出外面写一个函数
       reqWeather()
    }
    //页面跳转时组件会卸载，但是定时器还在开
    componentWillUnmount(){
        clearInterval(this.timeID)
    }
    //全屏事件
    fullScreen = () => {
        if(screenfull.isEnabled){
            screenfull.toggle()
        }
    }
    //获取标题事件
    getTitle = () => {
        let {pathname} = this.props.location
        let name = pathname.split('/').reverse()[0]
        if (pathname.indexOf('product') !== -1) {
            name = 'product'
        }
        let title = ''
        menuList.map((item) => {
            if(item.children instanceof Array){
                let tmp = item.children.find((item2) => {
                    return item2.key === name
                })
                if(tmp) title = tmp.title
            }else{
                if(name === item.key)  title = item.title
            }
            return title
        })
        //this.setState({title})
        this.setState({title}) 
    }
    //退出登录事件
    layOut = ()=> {
        confirm({
            title: '确认退出登录?',
            icon: <ExclamationCircleOutlined />,
            content: '退出登录会返回登录页面',
            cancelText : "取消",
            okText : "确认",
            onOk : () => {
                this.props.deleteUserInfo()
            },
            onCancel() {},
          });
        
    }
    render(){
        let {isFull} = this.state
        return (
        <header className="header">
            <div className="header-top">
                <Button size="small" onClick={this.fullScreen}>
                {isFull ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
                </Button>
                <span className="username">欢迎{this.props.userInfo.user.username}，进入</span>
                <Button type="link" onClick={this.layOut}>退出登录</Button>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">
                    {this.props.title || this.state.title} 
                </div>
                <div className="header-bottom-right">
                    {this.state.date}
                    <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气信息"/>
                    晴 -- 温度2~5
                </div>
            </div>
        </header>
        )
    }
}

//Header = withRouter(Header)
export default connect(
    state => ({userInfo:state.userInfo, title:state.title}),
    {deleteUserInfo:createDeleteUserInfoAction,}
)(withRouter(Header))