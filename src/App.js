
import { Routes, Route, Link, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useEffect,useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";

import { initUser, logout } from "./slices/userInfoSlice";
import { getAccessToken } from "./services/localStorage"
import axios from "./config/axios"
import UserMenu from './components/layout/header/UserMenu';
import WebRouter from './routes/WebRouter';
import Spinner from './components/common/Spinner';
import { clearCart } from './slices/cartSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courseLoading = useSelector(state => state.course.isLoading);
  const userLoading = useSelector(state => state.userInfo.isLoading);
  const manyCourseLoading = useSelector(state => state.manyCourses.isLoading);
  const error = useSelector(state => state.globalError.message);
  const cart = useSelector(state => state.cart.cart);
  const itemNumber = Object.keys(cart).length
  const handleLogoutClick = () => {
   dispatch(logout());
   dispatch(clearCart());
   navigate('/');
  }

  return (
    <>
      <div>
      <div className="row">
        <Link className='col-2' to="/">
          <img className='main_logo' src="/Remote_logo.png" alt="page logo"></img>
        </Link>
        <div className='col-6'>SearchBar</div>
        <div className='col-1' role="button" onClick={() => navigate('/cart')}>
          Cart
         {!!itemNumber && (<span className="badge bg-warning ms-1">{itemNumber}</span>)}
         
          </div>
        <div className='col-3'>
        <UserMenu className="text-center"/>
        <Link to="/edit-user/:userId">Update Profile</Link>
        <Link to="/login" className='text-center'>Login</Link>
        <button onClick={handleLogoutClick}> Logout </button>
        </div>
        
      </div>
      <WebRouter/>
   

    </div>

    { (courseLoading || userLoading || manyCourseLoading) && <Spinner title="Please wait for the course content to load"></Spinner> }

    
    </>
  );
}

export default App;
