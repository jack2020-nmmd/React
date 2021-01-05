import { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import 'antd/dist/antd.less';
import Login from "./containers/login/login.jsx";
import Admin from "./containers/admin/admin.jsx";


export default class App extends Component{
  render(){
    return (
      <div className="app">
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/admin' component={Admin}/>
          <Redirect to='/admin'/>
        </Switch>
      </div>
    )
  }
}