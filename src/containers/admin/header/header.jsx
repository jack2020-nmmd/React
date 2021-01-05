import React,{ Component} from 'react'
import { Button } from "antd";
import {FullscreenOutlined} from '@ant-design/icons'
import './css/header.less'
export default class Header extends Component{
    render(){
        return (
        <header className="header">
            <div className="header-top">
                <Button size="small">
                <FullscreenOutlined />
                </Button>
                <span className="username">欢迎，进入</span>
                <Button type="link" >退出登录</Button>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">
                    柱状图
                </div>
                <div className="header-bottom-right">
                    2021-1-5
                    <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气信息"/>
                    晴 -- 温度2~5
                </div>
            </div>
        </header>
        )
    }
}