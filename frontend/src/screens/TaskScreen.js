import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsTask , deleteTask} from '../actions/TaskActions';
import { FiPower, FiTrash2 , FiEdit} from 'react-icons/fi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';
function TaskScreen(props) { 
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const taskDetails = useSelector((state) => state.taskDetails);
  const { project, loading, error } = taskDetails;
  const dispatch = useDispatch();

    useEffect(() => {
    dispatch(detailsTask(props.match.params.id));
    return () => {
      //
    };
  }, []);

    const deleteHandler = (task) => {
    dispatch(deleteTask(task._id));
  };


  return( loading ? <div>Loading...</div> :
    error ? <div>{error}</div> :
      <div className="task-details">
      <h1>Listed project</h1>
        <p>{project.name}</p>
        <p>{project.description}</p>

      <ul>
        {project.tasks.map(task => (
          <li key={task._id} >

            <strong>NAME: {task.name}</strong>
            {/* <p>{task.name}</p> */}
       

            <strong>DESCRIPTION: {task.description}</strong>
            {/* <p>{task.description}</p> */}

            <strong>STATUS: {task.staus}</strong>
            {/* <p>{task.staus}</p> */}

            <strong>WORKER : {task.worker}</strong>
            {/* <p>{task.worker}</p> */}

            <strong>STARTING DATE : {task.started}</strong>
            {/* <p>{task.started}</p> */}

            <strong>END DATE: {task.end} </strong>
            {/* <p>{task.end}</p> */}
             <div style={{display:"flex"}}>
             <Link to={"/tasks/" + task._id} color="#e02041"> <BiTask size={30}  />  </Link>
              {/* <FiEdit style={{marginLeft:"20px"}} size={30} color="#a8a8b3"  onClick={() => openModal(task)} /> */}
              <FiTrash2 style={{marginLeft:"20px"}} size={30} color="#a8a8b3" onClick={() => deleteHandler(task)} />
            </div>
          </li>  
        ))}
      </ul>
    </div>
  )}

export default TaskScreen