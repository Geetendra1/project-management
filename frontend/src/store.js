import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productListReducer,productDetailsReducer, productSaveReducer,productDeleteReducer,productAdminListReducer,projectMemberSaveReducer} from "./reducer/productReducers";
import {userSigninReducer, userRegisterReducer,userUpdateReducer,userListReducer,userForgotReducer,userResetReducer} from './reducer/userReducers'
import {taskSaveReducer, taskDeleteReducer, myTaskListReducer,taskDetailsReducer} from './reducer/taskReducers'
import Cookie from "js-cookie"

import thunk from 'redux-thunk';


const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;


const initialState = {cart : {cartItems, shipping:{},payment:{}}, userSignin:{userInfo}}

const reducer = combineReducers({
    productList : productListReducer,
    productAdminList:productAdminListReducer,
    productDetails: productDetailsReducer,
    productSave:productSaveReducer,
    productDelete:productDeleteReducer,
    projectMemberSave:projectMemberSaveReducer,
    
    

    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    userList:userListReducer,
    userForgot:userForgotReducer,
    userUpdate: userUpdateReducer,
    userReset:userResetReducer,
    

    taskSave:taskSaveReducer,
    taskDelete:taskDeleteReducer,
    myTaskList:myTaskListReducer,
    taskDetails:taskDetailsReducer
})

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhanser(applyMiddleware(thunk)))

export default store;