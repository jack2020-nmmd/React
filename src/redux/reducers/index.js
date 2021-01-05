import { combineReducers } from "redux";//让它来统一暴露
import  loginReducer  from "./login_reducer";
export default combineReducers({
    userInfo:loginReducer
})