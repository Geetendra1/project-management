import {TASK_SAVE_REQUEST,TASK_SAVE_SUCCESS,TASK_SAVE_FAIL,
TASK_DELETE_REQUEST,TASK_DELETE_SUCCESS,TASK_DELETE_FAIL,
MY_TASK_LIST_REQUEST,MY_TASK_LIST_SUCCESS,MY_TASK_LIST_FAIL,
TASK_DETAILS_REQUEST,TASK_DETAILS_SUCCESS,TASK_DETAILS_FAIL
} from '../constants/taskConstants'

function taskSaveReducer(state = { task: {} }, action) {
  switch (action.type) {
    case TASK_SAVE_REQUEST:
      return { loading: true };
    case TASK_SAVE_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case TASK_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function taskDeleteReducer(state = { task: {} }, action) {
  switch (action.type) {
    case TASK_DELETE_REQUEST:
      return { loading: true };
    case TASK_DELETE_SUCCESS:
      return { loading: false, task: action.payload, success: true };
    case TASK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function myTaskListReducer(state = {
  tasks: []
}, action) {
  switch (action.type) {
    case MY_TASK_LIST_REQUEST:
      return { loading: true };
    case MY_TASK_LIST_SUCCESS:
      return { loading: false, tasks: action.payload };
    case MY_TASK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function taskDetailsReducer(state = { project : { tasks: [] } }, action) {
  switch (action.type) {
    case TASK_DETAILS_REQUEST:
      return { loading: true };
      
    case TASK_DETAILS_SUCCESS:
      return { loading: false, project: action.payload };
      // console.log( "task",action.payload );
    case TASK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {taskSaveReducer , taskDeleteReducer, myTaskListReducer,taskDetailsReducer}