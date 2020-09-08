import React , {useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {forgot} from '../actions/UserActions'
import { Link } from 'react-router-dom';
function ForgotPasswordScreen(props) {
const [email, setEmail] = useState('');
const userForgot = useSelector(state => state.userForgot);
const { loading, userEmail, error } = userForgot;
const dispatch = useDispatch();

useEffect(() => {
if (userEmail) {
      props.history.push('/signin');
    }
  return () => {
//    
  };
}, [userEmail]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgot(email));
  }

  return ( <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Forgot Password ?</h2>
          <p>Please type the your email !  </p>
          
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Send Email</button>
        </li>
        <li>
          You remember you password ?
          <Link to="/signin">Go to login page </Link>
        </li>

      </ul>
    </form>
  </div>
  );
}

export default ForgotPasswordScreen