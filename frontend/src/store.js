import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productListReducer,productDetailsReducer, productSaveReducer,productDeleteReducer,productAdminListReducer} from "./reducer/productReducers";
import {userSigninReducer, userRegisterReducer,userUpdateReducer,userListReducer} from './reducer/userReducers'
import {taskSaveReducer, taskDeleteReducer} from './reducer/taskReducers'
import Cookie from "js-cookie"
import {cartReducer} from './reducer/cartReducers';
import thunk from 'redux-thunk';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  orderListReducer,
  orderDeleteReducer,
} from './reducer/orderReducers.js';const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;


const initialState = {cart : {cartItems, shipping:{},payment:{}}, userSignin:{userInfo}}

const reducer = combineReducers({
    productList : productListReducer,
    productAdminList:productAdminListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    userList:userListReducer,
    productSave:productSaveReducer,
    productDelete:productDeleteReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay: orderPayReducer,
    userUpdate: userUpdateReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    taskSave:taskSaveReducer,
    taskDelete:taskDeleteReducer
})

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhanser(applyMiddleware(thunk)))

export default store;