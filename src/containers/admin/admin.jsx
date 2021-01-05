import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import { connect } from "react-redux";
import {createDeleteUserInfoAction} from "../../redux/action_creators/login_action";

/*@connect(
  state => ({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction,
  }
)*/
class Admin extends Component{
  componentDidMount(){
    console.log(this.props);
  }
  logout = () => {
    this.props.deleteUserInfo()
  }
  //在render里，若想实现跳转，最好用《redirect》
  render(){
    const {user, token, isLogin} = this.props.userInfo
    if (!isLogin) {
      /*this.props.history.replace("/login")
      return null*/
      return <Redirect to='/login' />
    }else{
      return(
        <div>
         <div>Admin登录了，你的名字是{user.username}</div>
         <button onClick = {this.logout}> 退出登录 </button>
        </div>
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
