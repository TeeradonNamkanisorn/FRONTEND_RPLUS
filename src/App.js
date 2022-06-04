
import { Routes, Route, Link, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useEffect,useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";

import { initUser, logout } from "./slices/userInfoSlice";
import { getAccessToken } from "./services/localStorage"
import axios from "./config/axios"
import UserMenu from './components/layout/header/UserMenu';
import WebRouter from './routes/WebRouter';
import Spinner from './components/common/Spinner';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);
  const chaptersLoading = useSelector(state => state.course.isLoading);


  const handleLogoutClick = () => {
   dispatch(logout());
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
        <div className='col-1'>Cart</div>
        <div className='col-3'>
        <UserMenu className="text-center"/>
        <Link to="/login" className='text-center'>Login</Link>
        <button onClick={handleLogoutClick}> Logout </button>
        </div>
        {/*Toast */}
      </div>
      <WebRouter/>
   

    </div>

    { (chaptersLoading) && <Spinner title="content"></Spinner> }
    </>
  );
}

export default App;
