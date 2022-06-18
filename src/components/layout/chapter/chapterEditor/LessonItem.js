import React, { useEffect, useRef, useState } from 'react'
import Modal from '../../../ui/Modal';
import axios from "../../../../config/axios";
import { getAccessToken } from '../../../../services/localStorage';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseAsync, setCourseError, setCourseLoading } from '../../../../slices/courseSlice';
import LessonUpdater from '../../lesson/LessonUpdater';
import Toast from '../../../common/Toast';


function LessonItem({lesson, lessons}) {
   const [modalShowing, setModalShowing] = useState(false);
   const error = useSelector(state => state.course.error);
   const [editModalShowing, setEditModalShowing] = useState(false);
   const [swapModalShowing, setSwapModalShowing] = useState(false);
   const vidRef = useRef(null);
   const navigate = useNavigate();
   const { courseId } = useParams();
   const dispatch = useDispatch();
   const handleModalToggle = e => {
       setModalShowing(prev => !prev);
   }

   useEffect(() => {
    if (vidRef.current !== null) {
        vidRef.current.load();
    }
   }, [lesson])


   const handleDeleteVid = async e => {
       try {
        dispatch(setCourseLoading(true));
        await axios.delete(`/lesson/video/${lesson.id}`);
        dispatch(fetchCourseAsync({courseId}));
       } catch (err) {
           console.log(err);
           dispatch(setCourseError(err.response?.data?.message || err.message || "request error please try again later."))
       } finally {
        dispatch(setCourseLoading(false))
       }

   }

   const handleSwapLesson = async ({id1,index1,id2,index2}) => {
       try {
        setSwapModalShowing(false);
        dispatch(setCourseLoading(true))
        dispatch(setCourseError(""));
        const requestBody = {
            inputLessons: [
              {
                id: id1,
                index: index1
              },
              {
                id: id2,
                index: index2
              }
            ]
          }
        await axios.patch('/lesson/swapIndex', requestBody);
        await dispatch(fetchCourseAsync({courseId}))
       } catch (err) {
        dispatch(setCourseError(err.response?.data?.message || err.message || "request error please try again later."))
       } finally {
           dispatch(setCourseLoading(false));
           
       }
   }

   
   
  return (
    <>
        <li className='border list-group-item d-flex justify-content-between align-items-center'>
            <p className='d-flex align-items-center my-0'>{lesson?.lessonIndex}: {lesson?.title} 
            <i className="fas fa-edit ms-5 fa-lg" role="button" onClick={()=>setEditModalShowing(true)}></i></p>
            
            <div className="d-flex align-items-center" style={{width: "100px", height: 40}}
            >
            
            <button className='btn' onClick={() => setSwapModalShowing(true)}>
                <i className='fa-solid fa-arrows-rotate'></i>
            </button>

            <button className="btn" onClick={() => handleModalToggle()}>
                <i className="fa-solid fa-video"></i>
            </button>

            <button  className='btn' onClick={handleDeleteVid}>
                <i className="fa-solid fa-trash-can " role={"button"}></i>
            </button>


            </div>
        </li>
        <Modal showing={modalShowing} setShowing={setModalShowing} size="lg" title={lesson?.title}>
            <video width="500" height="500" controls ref={vidRef}>
                <source src={lesson?.videoLesson?.url}/>
                Your browser does not support the video tag.
            </video>
        </Modal>
        <Modal showing={editModalShowing} setShowing={setEditModalShowing} size="lg" title={"Lesson Edit"}>
            <LessonUpdater lesson={lesson} courseId={courseId} setShowing={setEditModalShowing}/>
        </Modal>

        <Modal showing={swapModalShowing} setShowing={setSwapModalShowing} size="lg">
        <h5 className='my-2'>Select a lesson to swap with lesson #{lesson.lessonIndex}: {lesson.title}</h5>
        <ul className='list-group my-4'>
        {lessons.filter(less => less.id !== lesson.id).map(swapLess => (
            <li className='list-group-item swap-list' key={swapLess.id} role="button"
            onClick={() => {
            handleSwapLesson({
                id1: lesson.id,
                index1: lesson.lessonIndex,
                id2: swapLess.id,
                index2: swapLess.lessonIndex
            })
            }}>
            {swapLess.lessonIndex + '. '+ swapLess.title}
            </li>
        ))
        
        } 
        </ul>
        </Modal>
        
    </>
  )
}

export default LessonItem