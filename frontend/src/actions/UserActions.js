import Axios from "axios";
import axios from "axios"
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
  USERS_LIST_REQUEST,USERS_LIST_SUCCESS,USERS_LIST_FAIL,
  USER_FORGOT_REQUEST,USER_FORGOT_SUCCESS,USER_FORGOT_FAIL
} from "../constants/userConstants";


const listUsers = () => async (dispatch) => {
    try {
        dispatch({type: USERS_LIST_REQUEST});
        const { data } = await axios.get("/api/users");
        
        dispatch({type: USERS_LIST_SUCCESS, payload: data})
    } catch(error) {
         dispatch({type: USERS_LIST_FAIL, payload: error.message})
    }
};

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/api/users/register", { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

const forgot = (email) => async (dispatch) => {
  dispatch({ type: USER_FORGOT_REQUEST, payload: { email} });
  try {
    const { data } = await Axios.post("/api/users/signin/forgot", {email});
    console.log(data);
    dispatch({ type: USER_FORGOT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_FORGOT_FAIL, payload: error.message });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await Axios.put("/api/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

export {signin, register,forgot,update,logout,listUsers} ; 