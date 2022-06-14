import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom'
import Spinner from '../../common/Spinner';
import axios from "../../../config/axios";
import { markLessonCompleteAsync, remarkCompleteAsync, unmarkCompleteAsync } from '../../../slices/courseSlice';
import Modal from '../../ui/Modal';
import Toast from '../../common/Toast';


function LessonView() {
    const {lessonId, chapterId} = useParams();
    const chapters = useSelector(state => state.course.chapters);
    const completedLessons = useSelector(state => state.course.completedLessons);
    const isLoading = useSelector(state => state.course.isLoading);
    const error = useSelector(state => state.course.error);
    const prev_completed_ids = useSelector(state => state.course.previouslyCompletedLessons);
    const vidref = useRef(null);
    const [showing, setShowing] = useState(false);
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        if (vidref.current !== null) vidref.current.load();
    }, [lessonId]);
    
    
    //return some component to prevent error
    if (chapters.length === 0) return <div className="">Loading...</div>
    
    const chapter = chapters.find(chapter => chapter.id === chapterId);
    
    //in case the user type an invalid chapter, navigate them to the homepage.
    if (!chapter) return <Navigate to="/"></Navigate>
    const lesson = chapter.lessons.find(lesson => lesson.id === lessonId)
    const handleLessonComplete = async () => {
        //already handled errors within the thunk
        dispatch(markLessonCompleteAsync({lessonId}));
    }
    const handleUnmark = async () => {
        dispatch(unmarkCompleteAsync({lessonId}))
        setShowing(false)
    }

    const handleReadd = async () => {
        dispatch(remarkCompleteAsync({lessonId}));
    }
    
    const isCompleted = completedLessons.includes(lesson.id);
    const lessonHasUpdated = prev_completed_ids.includes(lesson.id);
    

    // There'll be more content types. So use if else for now.
  if (lesson.lessonType === "video" ) {return (
    <div className='view-container'>
        <div className='h5 text-center'>{lesson.title}</div>
        <video  className='mx-auto d-block view-video' style={{borderRadius: 10}} controls ref={vidref}>
            <source src={lesson.videoLesson.url}/>
        </video>
        <div className='row w-100 mt-4 mx-auto'>
        <h6 className='col-2 my-0 ms-4'>Description</h6>
        <p className='col-7 my-0 border'>
            {lesson.videoLesson?.description}
        </p>

        {isCompleted? //If for some reason the guy wants to 'unwatch' the lesson.
        <button className='btn btn-danger col-2 ms-4' onClick={()=>setShowing(true)}>Unmark complete</button>
        : 
        lessonHasUpdated ? 
        //Student has watched the video but the teacher updated the lesson so the student has to rewatch. Notify the student.
        <button className='btn btn-warning col-2 ms-4' onClick={handleReadd} >
            Mark completed again
        </button>
        : //Student hasn't touched this lesson before
        <button className='btn btn-success col-2 ms-4' onClick={handleLessonComplete} >
            Mark complete
        </button>
         }
           
        <Modal showing={showing} setShowing={setShowing} title="please confirm">
            <p>Are you sure you wish to mark the lesson as incomplete?</p>
            <div className="d-flex w-50 justify-content-between mx-auto mt-5">
                <button className='btn btn-danger' onClick={handleUnmark}>Confirm</button>
                <button className='btn btn-success' onClick={() => setShowing(false)}>Cancel</button>
            </div>
        </Modal>
        
        {/* {error && <Toast error={error}/>} */}
        </div>
    </div>
  )} else {
      return <h2>Well'be adding other lesson types as well stay tuned!</h2>
  }
} 

export default LessonView