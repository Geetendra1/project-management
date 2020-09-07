import {TASK_SAVE_REQUEST,TASK_SAVE_SUCCESS,TASK_SAVE_FAIL,
TASK_DELETE_REQUEST,TASK_DELETE_SUCCESS,TASK_DELETE_FAIL,
MY_TASK_LIST_REQUEST,MY_TASK_LIST_SUCCESS,MY_TASK_LIST_FAIL,
TASK_DETAILS_REQUEST,TASK_DETAILS_SUCCESS,TASK_DETAILS_FAIL

} from '../constants/taskConstants'
import  axios  from "axios";
import  Axios  from "axios";

// ------------- TAsks Actions ---------------------- //
const saveTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_SAVE_REQUEST, payload: task });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!task._id) {
      const { data } = await Axios.post('/api/tasks', task, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: TASK_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        '/api/tasks/' + task._id,
        task,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: TASK_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: TASK_SAVE_FAIL, payload: error.message });
  }
};


const deleteTask = (taskId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: TASK_DELETE_REQUEST, payload: taskId });
    const { data } = await axios.delete('/api/tasks/' + taskId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: TASK_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: TASK_DELETE_FAIL, payload: error.message });
  }
};


const listMyTasks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_TASK_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/tasks/mine", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: MY_TASK_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_TASK_LIST_FAIL, payload: error.message });
  }
}

const detailsTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: TASK_DETAILS_REQUEST, payload: taskId });
    const { data } = await axios.get('/api/tasks/' + taskId);
    console.log(data);
    dispatch({ type: TASK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TASK_DETAILS_FAIL, payload: error.message });
  }
};

export {saveTask, deleteTask,listMyTasks,detailsTask}