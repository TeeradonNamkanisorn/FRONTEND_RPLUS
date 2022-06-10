import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import axios from "../../config/axios";
import { fetchOwnCoursesAsync } from '../../slices/manyCourseSlice';

function StudentHome() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const courses = useSelector(state => state.manyCourses.courses);
    const coursesError = useSelector(state => state.manyCourses.error);
    console.log(courses);
    useEffect(() => {
        dispatch(fetchOwnCoursesAsync());
    }, [dispatch])
  return (
    <div style={{fontWeight: "bold"}} role="button" onClick={() => navigate('/search')}>Get more courses</div>
  )
}

export default StudentHome