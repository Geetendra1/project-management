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

function TasksScreen (props) {
    const userSignin = useSelector(state=> state.userSignin);
    const productDetails = useSelector(state => state.productDetails)
    const {userInfo} = userSignin
    const {project,loading,error} = productDetails;
    console.log("tasks",project);
    const userList = useSelector(state => state.userList)
    const {users} = userList
    const projectid = props.match.params.id
    
    const [modalVisible ,setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [name, setName] = useState('');
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
  setName(task.name)
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
        name,
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
 <h2>Poject :  {project.name}</h2>
                <Link className="profile-button" onClick={() => openModal({})}>
                  Create Tasks
                </Link>
 
      </header>
            {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create/Edit Task </h2>
              </li>
              <li>
                {loadingSave && <div>Wait.. Email is being send . </div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              
               <li>
                <label htmlFor="name"  className="form-label">Name</label>
                <input
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="description"  className="form-label">Description</label>
                <input
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </li>

                <li>
                <label htmlFor="started"  className="form-label">Start At</label>
                <input
                  name="started"
                  value={started}
                  id="started"
                  type="date"
                  onChange={(e) => setStarted(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="end"  className="form-label">End At</label>
                <input
                  name="end"
                  value={end}
                  id="end"
                  type="date"
                  onChange={(e) => setEnd(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="worker"  className="form-label">Worker</label>
                   <select
                          name="worker"
                          id="worker"
                          value={worker}
                          onChange={(e) => setWorker(e.target.value)}
                        >
                          {project.teamMember.map(user => (
                            <option >{user.name}</option>
                          ))}
                        </select>
              </li>

                <li>
                <label htmlFor="status" className="form-label">Status</label>
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
      <ul className="tasks">
        {project.tasks.map(task => (
          <li key={task._id} >
        <div className="task">
            <div style={{ display:"flex"}}>
            <p className="task-label">Name of task : </p>
            <p className="task-value">{task.name}</p>
            </div>

            <div style={{ display:"flex"}}>
            <p className="task-label">Assigned to : </p>
            <p className="task-value">{task.worker}</p> 
          </div>

         <div style={{ display:"flex"}}>
            <p className="task-label">Current Status  :  </p>
            <p className="task-value">{task.status}</p>
          </div>

          <div style={{ display:"flex"}}>
            <p className="task-label">Description :  </p>
            <p className="task-value">{task.description}</p>
          </div>

          <div style={{ display:"flex"}}>
            <p className="task-label">Start Date is :  </p>
             <p className="task-value"> <Moment format="DD/MM/YYYY">{task.started}</Moment></p>
          </div>

          <div style={{ display:"flex"}}>
            <p className="task-label">End Date : </p>
             <p className="task-value"> <Moment format="DD/MM/YYYY">{task.end}</Moment></p>
          </div>
            
            <div style={{ display:"flex"}}>
              <FiTrash2 size={30} color="#fd7014" onClick={() => deleteHandler(task)} />
              <FiEdit style={{marginLeft:"20px"}} size={30} color="#045757"  onClick={() => openModal(task)} />
            </div>
   
        </div>
          </li>  
        ))}
      </ul>

    </div>
     </div>
}
export default TasksScreen;