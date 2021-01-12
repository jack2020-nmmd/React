import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import { connect } from "react-redux";
import { Layout} from 'antd';
import {createDeleteUserInfoAction} from "../../redux/action_creators/login_action";
//import {reqCategoryList} from '../../api'
import "./css/admin.less";
import Header from './header/header'
import LeftNav from './left_nav/left_nav'
import Home from '../../components/home/home'
import Category from '../category/category'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
import Product from '../product/product'
import Role from '../role/role'
import USer from '../user/user'
/*@connect(
  state => ({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction,
  }
)*/
const {Footer, Sider, Content } = Layout;
class Admin extends Component{
  componentDidMount(){
    //console.log(this.props);
  }
  logout = () => {
    this.props.deleteUserInfo()
  }


  //在render里，若想实现跳转，最好用《redirect》
  render(){
    const {isLogin} = this.props.userInfo
    if (!isLogin) {
      /*this.props.history.replace("/login")
      return null*/
      return <Redirect to='/login' />
    }else{
      return(
        <Layout className="admin">
          <Sider className="sider">
            <LeftNav/>
          </Sider>
          <Layout>
            <Header/>
            <Content className="content">
              <Switch>
                <Route path="/admin/home" component={Home}/>
                <Route path="/admin/prod_about/category" component={Category}/>
                <Route path="/admin/prod_about/product" component={Product}/>
                <Route path="/admin/user" component={USer}/>
                <Route path="/admin/role" component={Role}/>
                <Route path="/admin/charts/bar" component={Bar}/>                <Route path="/admin/charts/line" component={Line}/>
                <Route path="/admin/charts/pie" component={Pie}/>
                <Redirect to="/admin/home"/>
              </Switch>
            </Content>
            <Footer className="footer">推荐使用谷歌浏览器，获取最佳哦用户体验</Footer>
          </Layout>
        </Layout>
      )
    }
    
  }
}

//export default Admin
//对象中的key就是store中保存该状态的key，
//对象中的value就是store中保存该状态的value
export default connect(
  state => ({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction,
  }
)(Admin)
