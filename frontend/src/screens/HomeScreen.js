import React,{ useEffect, useHistory} from 'react';
import { Link } from "react-router-dom";
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import {useSelector, useDispatch} from "react-redux";
import {listProducts} from '../actions/productActions' 
import logoImg from '../assets/logo.svg';
function HomeScreen(props) {
const productList = useSelector(state => state.productList)
const userSignin = useSelector(state=> state.userSignin);
const {userInfo} = userSignin
const {products, loading, error} = productList;
const dispatch  = useDispatch()
  useEffect(() => {
    dispatch(listProducts())
    return () => {
      //
    };
  }, []);

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
                <Link className="profile-button" to={"/create/project"}>
                  Create project
                </Link>
        )}

        <button onClick={handleLogout} type="button"> 
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Listed project</h1>
        
      <ul>
        {products.map(product => (
          <li key={product._id} >

            <strong>NAME:</strong>
            <p>{product.name}</p>

            <strong>DESCRIPTION:</strong>
            <p>{product.description}</p>

            <button  type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>

            {/*  Navigate to tasks */}
             <div style={{display:"flex"}}>
              <AiOutlineArrowRight size={20} color="#e02041" />  <Link to={"/product/" + product._id} color="#e02041"> Tasks for this project </Link>
            </div>
          </li>  
        ))}
      </ul>
    </div>
}

export default HomeScreen;