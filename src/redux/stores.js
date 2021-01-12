import { createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";
//import { compose } from "redux-devtools";
import reducer from "./reducers/index";

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
//export default createStore(reducer, devToolsEnhancer())
// export default createStore(reducer,
// window .__REDUX_DEVTOOLS_EXTENSION__ && window .__REDUX_DEVTOOLS_EXTENSION__()
// )
// export default  process.env.NODE_ENV === 'production' ? (
//     createStore(reducer, applyMiddleware(thunk))
// ) : (
//     window.__REDUX_DEVTOOLS_EXTENSION__ ? (
//         createStore(reducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()))
//     ) : (
//         createStore(reducer, applyMiddleware(thunk))
//     )
// )