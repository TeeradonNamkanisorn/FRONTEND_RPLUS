import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import TeacherHomeBoard from "../pages/teacher/TeacherHomeBoard"
import LoginPage from "../pages/LoginPage";
import RegisterSelect from "../pages/RegisterSelect";
import CourseCreatorForm from '../components/layout/course/CourseCreatorForm';
import RegisterTeacher from "../pages/RegisterTeacher";
import ModifyCourse from '../pages/teacher/ModifyCourse';
import ChapterCreatorPage from '../pages/teacher/ChapterCreatorPage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../services/localStorage';
import { initUser } from '../slices/userInfoSlice';
import axios from "../config/axios";
import CreateLessonForm from '../components/layout/lesson/CreateLessonForm';
import SearchPage from '../pages/student/SearchPage';
import CoursePreview from '../pages/student/CoursePreview';
import Cart from '../pages/student/Cart';
import RegisterStudent from '../pages/RegisterStudent';
import Spinner from '../components/common/Spinner';
import CourseCreator from '../pages/teacher/CourseCreator';
import StudentHome from '../pages/student/StudentHome';
import StudyRoom from '../pages/student/StudyRoom';
import LessonView from '../components/layout/study/LessonView';
function WebRouter() {

    const dispatch = useDispatch();
    const role = useSelector(state => state.userInfo.info.role);
    const token = getAccessToken();
    

    const teacherRoutes =  (
        <Routes>
            <Route path="/" element={<TeacherHomeBoard/>}></Route>
            <Route path="/create-new-course" element={<CourseCreator/>}></Route>
            <Route path="/modify-course/:courseId" element={<ModifyCourse/>}></Route>
            <Route path="/modify-course/:courseId/create-new-chapter" element={<ChapterCreatorPage/>}/>
            <Route path="/modify-course/:courseId/modify-chapter/:chapterId/create-new-lesson" element={<CreateLessonForm/>}/>

            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )

    const studentRoutes = (
        <Routes>
            <Route path="/" element={<StudentHome/>}></Route>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/preview/:courseId" element={<CoursePreview/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/study/:courseId" element={<StudyRoom/>}>
              <Route path=":chapterId/:lessonId" element={<LessonView/>}/>
              <Route path="*" element={<>home</>}/>
            </Route>
            <Route path="*" element={<Navigate to="/"/>}></Route>
        </Routes>
    )


    useEffect(() => {
        try {
          if (getAccessToken()) {
            dispatch(initUser())
          }
        } catch(err) {
          localStorage.clear();
        }
    
          const token = getAccessToken();
          axios.get("/auth/", {headers: {authorization: 'Bearer '+token}}).catch(err => console.log(err));
          
      },[dispatch]);

    
  if (role === "student") {
    return studentRoutes
  } else if (role === "teacher") {
      return teacherRoutes
  } else if (token) {
      // for when the user is loading
      return (
          <Routes>
              <Route path="*" element={<div></div>}/>
          </Routes>
      )
  } else {
      console.log("guest")
      return (
        <Routes>
            <Route path= "/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterSelect/>}></Route>
            <Route path="/register-teacher" element={<RegisterTeacher/>}></Route>
            <Route path="/register-student" element={<RegisterStudent/>}/>
            <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
      )
  }
  
}



export default WebRouter
