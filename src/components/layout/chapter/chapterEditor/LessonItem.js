import React, { useState } from 'react'
import Modal from '../../../ui/Modal';
import axios from "../../../../config/axios";
import { getAccessToken } from '../../../../services/localStorage';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchChaptersAsync } from '../../../../slices/chapterSlice';

function LessonItem({lesson}) {
   const [modalShowing, setModalShowing] = useState(false);
   const navigate = useNavigate();
   const { courseId } = useParams();
   const dispatch = useDispatch();
   const handleModalToggle = e => {
       setModalShowing(prev => !prev);
   }

   const handleDeleteVid = async e => {
       try {
        await axios.delete(`/lesson/video/${lesson.id}`, {
            headers: {
                authorization: "Bearer " + getAccessToken()
            }
        });

        dispatch(fetchChaptersAsync({courseId}));

       } catch (err) {
           console.log(err);
       }

   }

   
   
  return (
    <>
        <li className='border list-group-item d-flex justify-content-between'>
            <p>{lesson?.lessonIndex} {lesson?.title}</p>
            <div className="d-flex justify-items-center" style={{width: "100px", height: 40}}
            >
            <i className="fa-solid fa-video fa-2x mx-3" role="button" onClick={()=> {handleModalToggle()}}></i>
            <i className="fa-solid fa-trash-can fa-2x" role={"button"} onClick={handleDeleteVid}></i>
            </div>
        </li>
        <Modal showing={modalShowing} setShowing={setModalShowing} size="lg" title={lesson?.title}>
            <video width="500" height="500" controls>
                <source src={lesson.videoLesson.url}/>
                Your browser does not support the video tag.
            </video>
        </Modal>
    </>
  )
}

export default LessonItem