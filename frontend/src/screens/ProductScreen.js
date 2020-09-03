import React,{useEffect,useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {detailsProduct} from '../actions/productActions'
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from "react-router-dom";
import logoImg from '../assets/logo.svg';

function ProductScreen (props) {
    const[qty,setQty] = useState(1)
    const userSignin = useSelector(state=> state.userSignin);
    const {userInfo} = userSignin
    const productDetails = useSelector(state => state.productDetails)
    const {tasks,loading,error} = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(detailsProduct(props.match.params.id))
      // console.log(projects);
      return () => {
        console.log(tasks);
      }
    }, [])

    function handleLogout() {
    localStorage.clear();
    this.props.history.push('/');
  }

  return loading ? <div>Loading...</div> :
    error ? <div>{error}</div> :
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        
        { userInfo && userInfo.isAdmin && (
                <Link className="profile-button" to={"/create/tasks/" + props.match.params.id}>
                  Create Tasks
                </Link>
        )}

        <button onClick={handleLogout} type="button"> 
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Listed Tasks</h1>

      <ul>
        {tasks.map(task => (
          <li key={task._id} >

            <strong>NAME:</strong>
            <p>{task.projectId}</p>

            <strong>DESCRIPTION:</strong>
            <p>{task.description}</p>

            <button  type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>

            {/*  Navigate to tasks */}
             <div style={{display:"flex"}}>
              <AiOutlineArrowRight size={20} color="#e02041" />  <Link to={"/product/" + task._id} color="#e02041"> Details for this project </Link>
            </div>
          </li>  
        ))}
      </ul>
    </div>
     
}
export default ProductScreen;