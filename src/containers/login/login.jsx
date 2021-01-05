import React, {Component} from 'react'
import { Form, Input, Button, message} from 'antd';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {createSaveUserInfoAction} from "../../redux/action_creators/login_action";
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import "./css/login.less";
import logo from "./img/logo.png";
import {reqLogin } from '../../api'

//const qs = require("qs")和上面的一样
const {Item} = Form
//本来是一般组件的，但是用了redux后分了容器组件和UI组件，它使用了connect变为容器组件
class Login extends Component{
  //componentDidMount(){console.log(this.props);}

  // onFinish =  (value) => {
  //   console.log(value);
  //   ///提交表单，现在是发ajax请求，如果不是的话自己要阻止默认提交事情，自己发ajax请求
  //   reqLogin(value)
  //   .then((result) => {
  //     console.log(result);
  //   })
    
  // }
  onFinish =  async(value) => {
    //console.log(value);
    ///提交表单，现在是发ajax请求，如果不是的话自己要阻止默认提交事情，自己发ajax请求
    let result = await reqLogin(value)
    console.log(result.data);
    if (result.status === 0) {
      //1、服务器返回的user信息还有token交由redux保存
      this.props.saveUserInfo(result.data)
      //2、跳转到admin
      this.props.history.replace('/admin')  
    }else{
      message.warn(result.msg,1)
    }
  }
 //密码验证,自定义验证
  pwdValidator = (rule, value) =>{
    if (!value) {
      return Promise.reject('必须输入密码');
    }else if(value.length > 12){
      return Promise.reject('密码必须小于12位');
    }else if(value.length < 4){
      return Promise.reject('密码必须大于4位');
    }else if(!(/^\w+$/).test(value)){
      return Promise.reject('必须是英文，数字或下划线组成');
    }
    return Promise.resolve();
  }

  render(){
    const {isLogin} = this.props
    if(isLogin){
      return <Redirect to='/admin' />
    }else{
      return(
        <div className='login'>
          <header>
            <img src={logo} alt="官网图标"/>
            <h1>商品管理系统</h1>
          </header>
          <section>
            <h1>用户登录</h1>
  
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
            >
                <Item
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your Username!' },
                    { max: 12, message: '用户名必须小于12位!'},
                    { min: 4, message: '用户名必须大于4位!'},
                    { pattern: /^\w+$/, message: '用户名必须由英文、字母和下划线组成!'}
                  ]}
                  validateTrigger='onSubmit'//提交代码才会触发规则
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" style={{color:  'rgba(0, 0, 0, 0.25)'}}/> } placeholder="Username" 
                  />
                </Item>
                <Item
                  name="password"
                  rules={[
                    { validator: this.pwdValidator},
                  ]} 
                  validateTrigger='onSubmit'//提交代码才会触发规则
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" style={{color:  'rgba(0, 0, 0, 0.25)'}}/>}
                    type="password"
                    placeholder="Password"
                  />
              </Item>
              
                <Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Item>
            </Form>
  
          </section>
  
        </div>
      )
    }
    
  }
}

export default connect(
  state => ({isLogin:state.userInfo.isLogin}),
  {
    saveUserInfo:createSaveUserInfoAction,
  }
)(Login)