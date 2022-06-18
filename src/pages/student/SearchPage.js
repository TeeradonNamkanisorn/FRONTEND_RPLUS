import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/common/Spinner';
import Toast from '../../components/common/Toast';
import CoursesContainer from '../../components/layout/course/CoursesContainer';
import SearchSideBar from '../../components/layout/courseSearch/SearchSideBar';
import axios from "../../config/axios";
import { fetchAllCourseAsync } from '../../slices/manyCourseSlice';

function SearchPage() {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.manyCourses.courses) 
  const coursesError = useSelector(state => state.manyCourses.error);
  console.log(courses)
  const fetchCourses = async () => {
    try {
      await dispatch(fetchAllCourseAsync());

    } catch (error) {
      console.log(error);
    }
  }
  
  
  useEffect(() => {
    fetchCourses();
  }, [])
  return (
  <div className='position-relative'>
    <h2 className='text-center'>Available Courses</h2>
    <SearchSideBar/>
    <CoursesContainer courses={courses}/>
    <Toast error={coursesError}/>
  </div>
  )
}

export default SearchPage;