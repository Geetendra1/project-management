import React,{useEffect,useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {detailsProduct} from '../actions/productActions'
import {listUsers} from '../actions/UserActions'
import { FiPower, FiTrash2 , FiEdit } from 'react-icons/fi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from "react-router-dom";
import logoImg from '../assets/logo.svg';
import {saveTask,deleteTask} from '../actions/TaskActions'
import Moment from 'react-moment';

function TaskScreen (props) {
    const userSignin = useSelector(state=> state.userSignin);
    const productDetails = useSelector(state => state.productDetails)
    const {userInfo} = userSignin
    const {project,loading,error} = productDetails;
    const userList = useSelector(state => state.userList)
    const {users} = userList
    const projectid = props.match.params.id
    
    const [modalVisible ,setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [description, setDescription] = useState('');
    const [worker, setWorker] = useState('');
    const [status, setStatus] = useState('');
    const [started, setStarted] = useState('');
    const [end, setEnd] = useState('');
    const taskSave = useSelector((state) => state.taskSave);
    const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = taskSave;

  const taskDelete = useSelector((state) => state.taskDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = taskDelete;
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
      setModalVisible(false);
    }
      dispatch(detailsProduct(props.match.params.id))
      dispatch(listUsers())
      return () => {
        // 
      }
    }, [successSave,successDelete])



  const openModal = (task) => {
  setModalVisible(true);
  setProjectId(projectid);
  setId(task._id);
  setDescription(task.description);
  setWorker(task.worker)
  setStatus(task.status)
  setStarted(task.started)
  setEnd(task.end)
}



  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveTask({
        _id: id,
        projectId,
        description,
        worker,
        status,
        started,
        end
      })
    );
  };

    const deleteHandler = (task) => {
    dispatch(deleteTask(task._id));
  };


  return loading ? <div>Loading...</div> :
    error ? <div>{error}</div> :
    <div >
      <header className="project-header">
        <img className="project-image" src={logoImg} alt="Be The Hero"/>
        { userInfo && userInfo.isAdmin && (
                <Link className="profile-button" onClick={() => openModal({})}>
                  Create Tasks
                </Link>
        )}
      </header>
            {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Task </h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>

                <li>
                <label htmlFor="description">Start At</label>
                <input
                  name="started"
                  value={started}
                  id="started"
                  type="date"
                  onChange={(e) => setStarted(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="description">End At</label>
                <input
                  name="end"
                  value={end}
                  id="end"
                  type="date"
                  onChange={(e) => setEnd(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="description">Worker</label>
                   <select
                          name="worker"
                          id="worker"
                          value={worker}
                          onChange={(e) => setWorker(e.target.value)}
                        >
                          {users.map(user => (
                            <option >{user.name}</option>
                          ))}
                        </select>
              </li>

                <li>
                <label htmlFor="status">Status</label>
                   <select
                          name="status"
                          id="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                         <option >Not-assigned</option>
                          <option >Started</option>
                          <option >InProgress</option>
                          <option >Delayed</option>
                          <option >Completed</option>
                        </select>
              </li>

              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="profile-container">

      <h1>Listed Tasks of {project.name}</h1>

      <ul>
        {project.tasks.map(task => (
          <li key={task._id} >

            <strong>WORKER:</strong>
            <p>{task.worker}</p>

            <strong>DESCRIPTION:</strong>
            <p>{task.description}</p>

              <strong>STATUS:</strong>
            <p>{task.status}</p>

              <strong>STARTED AT:</strong>
            <p> <Moment format="YYYY/MM/DD">{task.started}</Moment></p>

        { userInfo && userInfo.isAdmin && (
            <div style={{ display:"flex",justifyContent:"space-around"}}>
              <FiTrash2 size={20} color="#a8a8b3" onClick={() => deleteHandler(task)} />
            </div>
        )}
              <FiEdit size={20} color="#a8a8b3"  onClick={() => openModal(task)} />

          </li>  
        ))}
      </ul>

    </div>
     </div>
}
export default TaskScreen;