import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CourseSelectMenu from '../../components/layout/course/CourseSelectMenu';
import axios from "../../config/axios";
import { getAccessToken } from '../../services/localStorage';
import "@popperjs/core"
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeacherCoursesAsync } from '../../slices/manyCourseSlice';


export default function TeacherHomeBoard() {
  const navigate = useNavigate();
  const courses = useSelector(state => state.manyCourses.courses);
  const loginTrigger = useSelector(state => state.userInfo.isLoggedIn);
  const myDropdown = useRef(null);
  const dispatch = useDispatch();

  // const handleDropdownClick = () => {
    //   const dd = new Dropdown(myDropdown.current)
    //   console.log(typeof myDropdown.current);
    //   dd.toggle();
    // }
    
    
    const handleNavClick = () => {
      navigate("/create-new-course");
    }
  useEffect(() => {

      dispatch(fetchTeacherCoursesAsync())
   
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
