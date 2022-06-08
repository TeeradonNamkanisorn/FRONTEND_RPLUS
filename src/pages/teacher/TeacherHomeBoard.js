import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CourseSelectMenu from '../../components/layout/course/CourseSelectMenu';
import axios from "../../config/axios";
import { getAccessToken } from '../../services/localStorage';
import "@popperjs/core"
import { useSelector } from 'react-redux';


export default function TeacherHomeBoard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const loginTrigger = useSelector(state => state.userInfo.isLoggedIn);
  const myDropdown = useRef(null);
  
  // const handleDropdownClick = () => {
    //   const dd = new Dropdown(myDropdown.current)
    //   console.log(typeof myDropdown.current);
    //   dd.toggle();
    // }
    
    const handleNavClick = () => {
      navigate("/create-new-course");
    }
  useEffect(() => {

    const fetchCourses = async function() {
  
    try {
      const res = await axios.get('/teacher/courses');
      setCourses(res.data.courses);
      
    } catch (err) {
      console.log(err);
    }
    }
    fetchCourses()
  }, [loginTrigger])
  return (
    <>
        <CourseSelectMenu courses={courses}/>
        <div className='container d-flex justify-content-center'>
          <div className='d-flex align-items-center justify-content-center w_50'>
            <i className="fa-solid fa-circle-plus fa-3x mx-3"></i>
            <button className='mx-3' onClick={handleNavClick}>Add New Course</button>
          </div>
        </div>

        {/* <div className="dropdown" id="dd" ref={myDropdown}>
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
  >
    Dropdown button
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <p className="dropdown-item">Action</p>
    <p className="dropdown-item">Action</p>
    <p className="dropdown-item">Action</p>
  </div>
</div> */}
    </>
  )
}
