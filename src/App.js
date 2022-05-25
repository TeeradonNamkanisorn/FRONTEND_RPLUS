
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { useEffect } from "react";
import {useDispatch} from "react-redux";
import HomeBoard from './pages/HomeBoard';
import LoginPage from "./pages/LoginPage";
import { initUser } from "./slices/userInfoSlice";
import { getAccessToken } from "./services/localStorage"
import axios from "./config/axios"

import RegisterSelect from './components/RegisterSelect';
import RegisterTeacher from './pages/RegisterTeacher';
import UserMenu from './components/UserMenu';
import CourseCreatorForm from './components/teacherUserInterfaces/CourseCreatorForm';
import ModifyCourse from './pages/ModifyCourse';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      if (getAccessToken()) {
        dispatch(initUser())
      }
    } catch(err) {
      localStorage.clear();
    }

      // const token = getAccessToken();
      // axios.get("/user/", {headers: {authorization: 'Bearer '+token}}).catch(err => console.log(err));
      
  },[]);

  return (
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
        
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomeBoard/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterSelect/>}></Route>
        <Route path="/create-new-course" element={<CourseCreatorForm/>}></Route>
        <Route path="/register-teacher" element={<RegisterTeacher/>}></Route>
        <Route path="/modify-course/:courseId" element={<ModifyCourse/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
