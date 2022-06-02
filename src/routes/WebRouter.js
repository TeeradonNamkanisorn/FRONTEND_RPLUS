import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import TeacherHomeBoard from "../pages/TeacherHomeBoard"
import LoginPage from "../pages/LoginPage";
import RegisterSelect from "../pages/RegisterSelect";
import CourseCreatorForm from '../components/layout/course/CourseCreatorForm';
import RegisterTeacher from "../pages/RegisterTeacher";
import ModifyCourse from '../pages/ModifyCourse';
import ChapterCreatorPage from '../pages/ChapterCreatorPage';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../services/localStorage';
import { initUser } from '../slices/userInfoSlice';
import axios from "../config/axios";
import CreateLessonForm from '../components/layout/lesson/CreateLessonForm';

function WebRouter() {

    const dispatch = useDispatch();


    useEffect(() => {
        try {
          if (getAccessToken()) {
            dispatch(initUser())
          }
        } catch(err) {
          localStorage.clear();
        }
    
          const token = getAccessToken();
          axios.get("/user/", {headers: {authorization: 'Bearer '+token}}).catch(err => console.log(err));
          
      },[dispatch]);

  return (
    <>
        <Routes>
            <Route path="/" element={<TeacherHomeBoard/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/register" element={<RegisterSelect/>}></Route>
            <Route path="/create-new-course" element={<CourseCreatorForm/>}></Route>
            <Route path="/register-teacher" element={<RegisterTeacher/>}></Route>
            <Route path="/modify-course/:courseId" element={<ModifyCourse/>}></Route>
            <Route path="/modify-course/:courseId/create-new-chapter" element={<ChapterCreatorPage/>}/>
            <Route path="/modify-course/:courseId/modify-chapter/:chapterId/create-new-lesson" element={<CreateLessonForm/>}/>
        </Routes>
    </>
  )
}



export default WebRouter
