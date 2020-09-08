import {USER_SIGNIN_REQUEST,USER_SIGNIN_SUCCESS,USER_SIGNIN_FAIL,
USER_LOGOUT,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL,
USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS,USER_UPDATE_FAIL,
  USERS_LIST_REQUEST,USERS_LIST_SUCCESS,USERS_LIST_FAIL,
  USER_FORGOT_REQUEST,USER_FORGOT_SUCCESS,USER_FORGOT_FAIL

} from '../constants/userConstants'

function userListReducer(state = { users: [] }, action) {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      return { loading: true, };
    case USERS_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}



function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default: return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userForgotReducer(state = {}, action) {
  switch (action.type) {
    case USER_FORGOT_REQUEST:
      return { loading: true };
    case USER_FORGOT_SUCCESS:
      return { loading: false, userEmail: action.payload };
    case USER_FORGOT_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}


export {userSigninReducer,userRegisterReducer,userUpdateReducer,userListReducer,userForgotReducer}