import React,{ useEffect, useHistory, useState} from 'react';
import { Link } from "react-router-dom";
import {Modal} from 'react-bootstrap'
import { FiPower, FiTrash2 , FiEdit} from 'react-icons/fi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import {useSelector, useDispatch} from "react-redux";
import {listProducts,saveProduct,deleteProduct,} from '../actions/productActions' 
import logoImg from '../assets/logo.svg';


function HomeScreen(props) {
const productList = useSelector(state => state.productList)
const userSignin = useSelector(state=> state.userSignin);
const {userInfo} = userSignin
const {products, loading, error} = productList;
const [modalVisible ,setModalVisible] = useState(false);
const [id, setId] = useState('');
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [uploading, setUploading] = useState(false);

const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

const dispatch  = useDispatch()

  useEffect(() => {
  if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts())
    return () => {
      //
    };
  }, [successSave,successDelete]);

    function handleLogout() {
    localStorage.clear();
    this.props.history.push('/');
  }


const openModal = (project) => {
  setModalVisible(true);
  setId(project._id);
  setName(project.name);
  setDescription(project.description);
}

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        description,
      })
    );
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };

    return loading ? <div>Loading...</div> :
    error ? <div>{error}</div> :
    <div >
      <header className="project-header">
        <img className="project-image" src={logoImg} alt="Be The Hero"/>
        { userInfo && userInfo.isAdmin && (
                <Link className="profile-button" onClick={() => openModal({})}>
                  Create project
                </Link>
        )}
      </header>
      
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Project </h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
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
      <h1>Listed project</h1>
      <ul>
        {products.map(product => (
          <li key={product._id} >

            <strong>NAME:</strong>
            <p>{product.name}</p>

            <strong>DESCRIPTION:</strong>
            <p>{product.description}</p>

        { userInfo && userInfo.isAdmin && (
            <button  type="button"  onClick={() => deleteHandler(product)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
        )}

            {/*  Navigate to tasks */}
             <div style={{display:"flex"}}>
              <AiOutlineArrowRight size={20} color="#e02041" />  <Link to={"/product/" + product._id} color="#e02041"> Tasks for this project </Link>
              <FiEdit size={20} color="#a8a8b3"  onClick={() => openModal(product)} />
            </div>
          </li>  
        ))}
      </ul>
    </div>
    </div>
}

export default HomeScreen;