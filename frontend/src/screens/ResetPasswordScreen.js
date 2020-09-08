import React , {useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {reset} from '../actions/UserActions'
import { Link } from 'react-router-dom';

 function ResetPasswordScreen(props) {
const [password, setPassword] = useState('');
const userReset = useSelector(state => state.userReset);
const { loading, userPassword, error } = userReset;
const dispatch = useDispatch();

useEffect(() => {
if (userPassword) {
      props.history.push('/signin');
    }
  return () => {
//    
  };
}, [userPassword]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(reset({ userId :props.match.params.id, password}));
  }


  return (<div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Reset Password ?</h2>
          <p>Please type the your new password !  </p>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="password">new Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Change password</button>
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

export default ResetPasswordScreen