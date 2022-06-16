import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../../../ui/Modal';
import LessonItem from './LessonItem';
import axios from "../../../../config/axios";
import { fetchCourseAsync, setCourseError, setCourseLoading } from '../../../../slices/courseSlice';
import { fetchAllCourseAsync } from '../../../../slices/manyCourseSlice';

function ChapterAccordionItem({ chapter , chapters}) {
  const [deleteModalShowing, setDeleteModalShowing] = useState(false);
  const {id: courseId} = useSelector(state => state.course);
  const [swapModalShowing, setSwapModalShowing] = useState(false);
  
  const dispatch = useDispatch();
    const {lessons = []} = chapter;



  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
  }

  const handleDeleteClick = async () => {
    try {
      dispatch(setCourseLoading(true));
      console.log(courseId)
      await axios.delete('/chapter/'+chapter.id);
      dispatch(fetchCourseAsync({ courseId }));
    } catch (err) {
      dispatch(setCourseError(err.response?.data?.message || err.message || "request error please try again"))
    } finally {
      dispatch(setCourseLoading(false));
      setDeleteModalShowing(false);
    }
  }

  const handleSwapClick = async ({id1,index1,id2,index2}) => {
    try {
      dispatch(setCourseLoading(true));
      dispatch(setCourseError(""));
    const requestBody = {
      inputChapters: [
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
    await axios.patch('/chapter/swapIndex', requestBody);
    dispatch(fetchCourseAsync({courseId}));
    } catch (err) {
      dispatch(setCourseError(err.response?.data?.message || err.message || "request error please try again later"))
    } finally {
      dispatch(setCourseLoading(false));
      dispatch(setCourseError(""));
    }
  }

  return (
    <>
      <div className="accordion-item">
      <h2 className="accordion-header" id={"heading"+chapter?.id}>
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={'#collapse'+chapter?.id} aria-expanded="true" aria-controls={"collapse"+chapter?.id}
        onClick={handleClick}>
          Chapter {chapter?.chapterIndex}: {chapter?.name}
          
        </button>
        
      </h2> 
      <div  className="accordion-collapse collapse show" aria-labelledby={"heading"+chapter?.id}  id={'collapse'+chapter?.id}
      >
        <div className="accordion-body">
          <div className='row'>
            <p className='chapter-acc-description col-10'>{chapter?.description}
            
        
            </p>
            
            <div className='col-2 offset-0 d-flex justify-content-end align-items-start'>
            <button className='btn me-2 display-block btn-info mx-2'>
                <i className='fa fa-edit'></i>
            </button>
              <button className='btn btn-success mx-2' onClick={() => setSwapModalShowing(true)}>
                <i className="fa-solid fa-arrows-rotate"></i>
              </button>
              <button className='btn btn-danger mx-2 flex-grow-0' onClick={()=>setDeleteModalShowing(true)}>
                <i className='fa fa-trash-can'></i>
              </button>
              
            </div>
          </div>
          <ul className='list-group mt-3'>
          {lessons.map(lesson => (
            <LessonItem key={lesson.id} lesson={lesson}/>
          ))}
          </ul>
          <Link to={`/modify-course/${chapter.courseId}/modify-chapter/${chapter.id}/create-new-lesson`}>
            Create New Lesson
          </Link>
        </div>
      </div>
    </div>
    <Modal showing={deleteModalShowing} setShowing={setDeleteModalShowing} title="Chapter deletion alert" size="lg">
       <div className="alert alert-warning" role="alert">
          Are you sure you wish to delete? All the associated lesson videos will be destroyed as well.
          If you have published this course, any students who have completed correlated lessons will receive the notification.
        </div>
        <div className="d-flex w-50 justify-content-between mx-auto mt-5">
          <button
            className="btn btn-danger"
            onClick={handleDeleteClick}
          >
            Confirm
          </button>
          <button className="btn btn-success" onClick={() => setDeleteModalShowing(false)}>
            Cancel
          </button>
        </div>
    </Modal>
    <Modal showing={swapModalShowing} setShowing={setSwapModalShowing} size="lg">
      <h5 className='my-2'>Select a chapter to swap with chapter #{chapter.chapterIndex}: {chapter.name}</h5>
      <ul className='list-group my-4'>
      {chapters.filter(chap => chap.id !== chapter.id).map(swapChap => (
        <li className='list-group-item swap-list' key={swapChap.id} role="button"
        onClick={() => {
          handleSwapClick({
            id1: chapter.id,
            index1: chapter.chapterIndex,
            id2: swapChap.id,
            index2: swapChap.chapterIndex
          })
        }}>
          {swapChap.chapterIndex + '. '+ swapChap.name}
        </li>
      ))
      
    } 
    </ul>
    </Modal>
  </>
  )
}



export default ChapterAccordionItem