import React, { useState } from 'react'
import Modal from '../../../ui/Modal';
import axios from "../../../../config/axios";
import { getAccessToken } from '../../../../services/localStorage';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCourseAsync, setCourseLoading } from '../../../../slices/courseSlice';
import LessonUpdater from '../../lesson/LessonUpdater';

function LessonItem({lesson}) {
   const [modalShowing, setModalShowing] = useState(false);
   const [editModalShowing, setEditModalShowing] = useState(false);
   const navigate = useNavigate();
   const { courseId } = useParams();
   const dispatch = useDispatch();
   const handleModalToggle = e => {
       setModalShowing(prev => !prev);
   }

   const handleDeleteVid = async e => {
       try {
        dispatch(setCourseLoading(true));
        await axios.delete(`/lesson/video/${lesson.id}`, {
            headers: {
                authorization: "Bearer " + getAccessToken()
            }
        });
        dispatch(fetchCourseAsync({courseId}));
       } catch (err) {
           console.log(err);
       } finally {
        dispatch(setCourseLoading(false))
       }

   }

   
   
  return (
    <>
        <li className='border list-group-item d-flex justify-content-between align-items-center'>
            <p className='d-flex align-items-center my-0'>{lesson?.lessonIndex}: {lesson?.title} 
            <i className="fas fa-edit ms-5 fa-lg" role="button" onClick={()=>setEditModalShowing(true)}></i></p>
            
            <div className="d-flex align-items-center" style={{width: "100px", height: 40}}
            >
            <i className="fa-solid fa-video fa-lg mx-3" role="button" onClick={()=> {handleModalToggle()}}></i>
            <i className="fa-solid fa-trash-can fa-lg" role={"button"} onClick={handleDeleteVid}></i>
            </div>
        </li>
        <Modal showing={modalShowing} setShowing={setModalShowing} size="lg" title={lesson?.title}>
            <video width="500" height="500" controls>
                <source src={lesson?.videoLesson?.url}/>
                Your browser does not support the video tag.
            </video>
        </Modal>
        <Modal showing={editModalShowing} setShowing={setEditModalShowing} size="lg" title={"Lesson Edit"}>
            <LessonUpdater lesson={lesson} courseId={courseId} setShowing={setEditModalShowing}/>
        </Modal>
    </>
  )
}

export default LessonItem