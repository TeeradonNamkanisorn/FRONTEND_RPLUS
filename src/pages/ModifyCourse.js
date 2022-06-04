import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "../config/axios";
import { getAccessToken } from '../services/localStorage';
import { useState } from "react"

import CourseUpdater from '../components/layout/course/CourseUpdater';

import ChapterEditContainer from '../components/layout/chapter/chapterEditor/ChapterEditContainer';
import Modal from '../components/ui/Modal';
import ChapterCreator from '../components/layout/chapter/ChapterCreator';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseAsync } from '../slices/courseSlice';
import Spinner from '../components/common/Spinner';

const ModifyCourse = () => {
    const [apiError, setApiError] = useState("");
    // const [chapters, setChapters] = useState([]);
    const [showing, setShowing] = useState(false);
    const dispatch = useDispatch();
    const chapters = useSelector(state => state.course.chapters);
    console.log(chapters);
    const chaptersLoading = useSelector(state => state.course.isLoading);
    
    const navigate = useNavigate();
    const params = useParams();
    const courseId = params.courseId;
    
    const handleNavigate = () => {
        navigate(`/modify-course/${courseId}/create-new-chapter`)
    }
    
    async function fetchChapters() {
            try {
                // const token = getAccessToken();
                // const res = await axios.get('/chapter/'+courseId, {
                //     headers: {
                //         authorization: "Bearer "+token
                //     }
                // });
                // setChapters(res.data.chapters);
                dispatch(fetchCourseAsync({courseId}));
            } catch (err) {
                setApiError(err?.response?.data?.message || "chapter request error")
            }
        }

    useEffect(() => {
        
            fetchChapters();
        
    }, [courseId])
    
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
    
    </>
  )
}

export default ModifyCourse;