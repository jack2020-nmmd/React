import {AppstoreOutlined, HomeFilled, OrderedListOutlined, ToolFilled, UserOutlined, SafetyCertificateFilled, AreaChartOutlined, BarChartOutlined, LineChartOutlined, PieChartFilled} from '@ant-design/icons';
import {Menu} from 'antd';
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import logo from '../../../static/imgs/logo.png';
import './css/left_nav.less'
import menuList from '../../../config/menu_config'
import {createSaveTitleAction} from '../../../redux/action_creators/menu_action'

import React, { Component } from 'react'

const { SubMenu, Item } = Menu;
class LeftNav extends Component {
      
  //用于创建菜单的函数
      creatMenu = (target) => {
        return target.map((item) => {
          if(!item.children){
            return <Item key={item.key} icon={<item.icon/>} onClick = {() => {this.props.saveTitle(item.title)}}>
              <Link to={item.path}>
                {item.title}
              </Link>
            </Item>
          }else{
            return <SubMenu key={item.key} icon={<item.icon/>} title={item.title}>
              {
                this.creatMenu(item.children)
              }
              
              </SubMenu>
            } 
        })
      }
      render() {
        return (
          <div>
              <header className="navHeader">
                <img src={logo} alt="官网图标"/>
                <h1>商品管理系统</h1>
              </header>
            <Menu
              defaultSelectedKeys={this.props.location.pathname.split('/').reverse()[0]}
              defaultOpenKeys={this.props.location.pathname.split('/').splice(2)}
              mode="inline"
              theme="dark"
            >
              
              {
                this.creatMenu(menuList)
              }
            </Menu>
          </div>
        );
      }
     }

export default connect(
  state => ({}),
  {
    saveTitle:createSaveTitleAction
  }
)(withRouter(LeftNav))



