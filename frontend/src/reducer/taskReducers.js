import {TASK_SAVE_REQUEST,TASK_SAVE_SUCCESS,TASK_SAVE_FAIL,
TASK_DELETE_REQUEST,TASK_DELETE_SUCCESS,TASK_DELETE_FAIL

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

export {taskSaveReducer , taskDeleteReducer}