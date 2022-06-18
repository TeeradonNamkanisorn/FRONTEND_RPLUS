import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import Toast from '../../components/common/Toast';
import StudyAccordion from '../../components/layout/study/StudyAccordion';
import Sidebar from '../../components/ui/Sidebar';
import { fetchStudentCourseAsync } from '../../slices/courseSlice';

const togglerStyle = {
    width: "10vw",
    height: "100vh",
    position: "fixed",
    right: "0vw",
    border: "2px solid grey"
}
function StudyRoom() {
    const {courseId} = useParams();
    const dispatch = useDispatch();
    const [toggle,setToggle] = useState(false);
    const course = useSelector(state => state.course);
    const chapters = course.chapters;
    const courseError = useSelector(state => state.course.error);
    

    useEffect(()=>{
        dispatch(fetchStudentCourseAsync({courseId}));
    }, [])
  return (
    <>
        
        <div style={togglerStyle} onMouseEnter={()=>setToggle(prev =>!prev)}></div>
        <Sidebar toggle={toggle} title={course.name}>
            <StudyAccordion chapters={chapters}/>
        </Sidebar>
        <Outlet/>
       
    </>
  )
}

export default StudyRoom