import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CoursesContainer from '../../components/layout/course/CoursesContainer';
import axios from "../../config/axios";
import { fetchAllCourseAsync } from '../../slices/manyCourseSlice';

function StudentHome() {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.manyCourses.courses) 
  console.log(courses);
  const fetchCourses = async () => {
    try {
      dispatch(fetchAllCourseAsync());

    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchCourses();
  }, [])
  return (
    <CoursesContainer courses={courses}/>
  )
}

export default StudentHome