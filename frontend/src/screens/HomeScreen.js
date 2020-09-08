import React,{ useEffect, useHistory, useState} from 'react';
import { Link } from "react-router-dom";
import {Modal} from 'react-bootstrap'
import { FiPower, FiTrash2 , FiEdit} from 'react-icons/fi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import {useSelector, useDispatch} from "react-redux";
import {listProducts,saveProduct,deleteProduct,} from '../actions/productActions' 
import logoImg from '../assets/logo.svg';
import { BiTask } from 'react-icons/bi';
import Moment from 'react-moment'; 
function HomeScreen(props) {
const productList = useSelector(state => state.productList)
const userSignin = useSelector(state=> state.userSignin);
const {userInfo} = userSignin
const {products, loading, error} = productList;
const [modalVisible ,setModalVisible] = useState(false);
const [id, setId] = useState('');
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [started, setStarted] = useState('');
const [end, setEnd] = useState('');

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
  setStarted(project.started);
  setEnd(project.end)
}

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        description,
        started,
        end
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
        {/* <img className="project-image" src={logoImg} alt="Be The Hero"/> */}
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
                <h2>Create/Edit Project </h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
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
                <label htmlFor="description"  className="form-label">Start At</label>
                <input
                  name="started"
                  value={started}
                  id="started"
                  type="date"
                  onChange={(e) => setStarted(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="description"  className="form-label">End At</label>
                <input
                  name="end"
                  value={end}
                  id="end"
                  type="date"
                  onChange={(e) => setEnd(e.target.value)}
                ></input>
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
      <h2>Projects</h2>
      <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">

              <div style={{display:"flex"}}>
                <p  className="product-label">Name of the project :</p>
                <p className="product-value">{product.name}</p>
              </div>

              <div style={{display:"flex"}}>
                <p className="product-label">Description : </p>
                <p className="product-value"> { product.description}</p>
              </div>

              {/* <div style={{display:"flex"}}>
                <p>Owner :</p>
                <p> {product.owner}</p>
              </div> */}

              <div style={{display:"flex"}}>
                <p  className="product-label">start At :</p>
                 <p className="product-value"> <Moment format="DD/MM/YYYY">{product.started}</Moment></p>
              </div>

               <div style={{display:"flex"}}>
                <p  className="product-label">End At :</p>
                <p className="product-value"> <Moment format="DD/MM/YYYY">{product.end}</Moment></p>
              </div>

                 <div style={{display:"flex"}}>
             <Link to={"/tasks/" + product._id} color="#e02041"> <BiTask size={30}  />  </Link>
              <FiEdit style={{marginLeft:"20px"}} size={30} color="#a8a8b3"  onClick={() => openModal(product)} />
              <FiTrash2 style={{marginLeft:"20px"}} size={30} color="#a8a8b3" onClick={() => deleteHandler(product)} />
            </div>
              </div>
            </li>
          ))}
        </ul>
    </div>
    </div>
}

export default HomeScreen;