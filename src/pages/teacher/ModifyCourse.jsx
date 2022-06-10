import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "../../config/axios";
import { getAccessToken } from '../../services/localStorage';
import { useState } from "react"

import CourseUpdater from '../../components/layout/course/CourseUpdater';

import ChapterEditContainer from '../../components/layout/chapter/chapterEditor/ChapterEditContainer';
import Modal from '../../components/ui/Modal';
import ChapterCreator from '../../components/layout/chapter/ChapterCreator';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseAsync, setCourseLoading } from '../../slices/courseSlice';
import Spinner from '../../components/common/Spinner';

const ModifyCourse = () => {
    const [apiError, setApiError] = useState("");
    // const [chapters, setChapters] = useState([]);
    const [showing, setShowing] = useState(false);
    const dispatch = useDispatch();
    const chapters = useSelector(state => state.course.chapters);
    const isPublished = useSelector(state => state.course.isPublished);
    const courseLoading = useSelector(state => state.course.isLoading);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const courseId = params.courseId;
    
    const handleNavigate = () => {
        navigate(`/modify-course/${courseId}/create-new-chapter`)
    }

    
    
    async function fetchChapters() {
            try {
                const res = await dispatch(fetchCourseAsync({courseId}))
                
            } catch (err) {
                setApiError(err?.response?.data?.message || "chapter request error")
            }
        }
    
    async function clickPublish() {
        try {
            dispatch(setCourseLoading(true));
            await axios.patch('/course/' + courseId);
            dispatch(fetchCourseAsync({courseId}));
        } catch (err) {
            console.log(err)
            setApiError(err?.response?.data?.message || "chapter request error");
        } finally {
            dispatch(setCourseLoading(false));
        }
    }

    useEffect(() => {
        
            fetchChapters();
        
    }, [courseId, fetchChapters])
    
  return (
    <>
    <div className='container'>
      <CourseUpdater courseId={courseId}/> 
      <ChapterEditContainer chapters={chapters} fetchChapters={fetchChapters}/>

      <Modal showing={showing} setShowing={setShowing} size="lg">
          <ChapterCreator setShowing={setShowing} fetchChapters={fetchChapters}/>
      </Modal>
      <div className='container d-flex justify-content-center'>
          <div className='d-flex align-items-center justify-content-center w_50'>
            <i className="fa-solid fa-circle-plus fa-3x mx-3"></i>
            <button className='mx-3' onClick={() => setShowing(prev => !prev)}>Add New Chapter</button>
          </div>
        </div>
    </div>
    
    <div className='d-flex justify-content-center my-5' >
        <button className='btn' style={{backgroundColor: "purple", color: "white"}} 
        disabled={isPublished} role="button" onClick={clickPublish}>
            Publicize Course
        </button>
    </div>
    
    </>
  )
}

export default ModifyCourse;