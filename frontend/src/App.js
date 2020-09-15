import React from 'react';
import './App.css';
import { BrowserRouter, Route , Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import HomeScreen from './screens/HomeScreen'
import TasksScreen from './screens/TasksScreen'
import ProductsScreen from './screens/ProductsScreen'
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import TaskScreen from './screens/TaskScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'

function App() {


const userSignin = useSelector(state=> state.userSignin);
const {userInfo} = userSignin


const openMenu = () => {
      document.querySelector(".sidebar").classList.add("open");
    }
const  closeMenu = () =>  {
      document.querySelector(".sidebar").classList.remove("open")
    }


  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="header">
      <div className="brand">
        <button onClick={openMenu}>
          &#9776;
        </button>
        <Link to="/">Project Manager </Link>
      </div>
      <div className="header-links">
       
       {
         userInfo ? <Link to="/profile">{userInfo.name}</Link>
                  : <Link to="/signin">Sign In</Link>
       }
       {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                </ul>
              </div>
            )}
      </div>
    </header>
    <aside className="sidebar">
      <h3>Shopping Categories</h3>
      <button className="sidebar-close-button" onClick={closeMenu}>x</button>
      <ul>
        <li>
          <a href="index.html">Pants</a>
        </li>

        <li>
          <a href="index.html">Shirts</a>
        </li>

      </ul>
    </aside>
    <main className="main">
      <div className="content">
      <Route path="/" exact={true} component={HomeScreen} />
      <Route path="/signin" component={SigninScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/tasks/:id" component={TasksScreen} />
      <Route path="/task/:id" component={TaskScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/forgot/password" component={ForgotPasswordScreen} />
      <Route path="/reset/password/:id" component={ResetPasswordScreen} />
      </div>
    </main>
    <footer className="footer">
      All right reserved.
    </footer>
  </div>
   </BrowserRouter>
  );
}

export default App;
