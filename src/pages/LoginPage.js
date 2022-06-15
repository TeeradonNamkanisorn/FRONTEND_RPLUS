import axios from "../config/axios";
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { saveAccessToken } from "../services/localStorage";
import { useDispatch, useSelector } from "react-redux";
import {loginUser, setUserError} from "../slices/userInfoSlice"


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userError = useSelector(state => state.userInfo.error);
  

  const handleNav = () => {
    navigate('/');
  }
  

  const handleSubmit = async e => {
    e.preventDefault();
      const body = {email,password};
      dispatch(loginUser(body));
    
  }

  useEffect(() => {
    dispatch(setUserError(""));
  }, [dispatch])
  return (
    <div>
        <form className='container w-75' onSubmit={handleSubmit}>
          <div className="form-group row my-3">
              <label className="col-2" htmlFor="exampleInputEmail1">Email address</label>
              <div className="col-8">
                <input className={`form-control ${false? "is-invalid" : ""}`} type="email" id="exampleInputEmail1"  placeholder="Enter email" onChange={e=>setEmail(e.target.value)}/>
                <div className="invalid-feedback">{""}</div>
              </div>
          </div>

          <div className="form-group row my-3">
              <label className="col-2" htmlFor="passwordInput">Password</label>
              <div className="col-8">
                <input className={`form-control ${false? "is-invalid" : ""}`} type="password"  id="passwordInput"  placeholder="Enter password" onChange={e=>setPassword(e.target.value)}/>
                <div className="invalid-feedback">{""}</div>
              </div>
          </div>
          <div className='row'>
            <button className='rounded btn btn-primary col-sm-1 offset-sm-1' type='button' onClick={handleNav}>Go Back</button>
            <button className='rounded btn btn-primary col-sm-1 offset-sm-7' type="submit">Login</button>
          </div>
        </form>
        <Link to="/register">Register</Link>
       
    </div>
  )
}

export default LoginPage;