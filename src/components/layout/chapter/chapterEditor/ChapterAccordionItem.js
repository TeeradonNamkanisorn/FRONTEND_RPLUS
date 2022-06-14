import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../../../ui/Modal';
import LessonItem from './LessonItem';
import axios from "../../../../config/axios";
import { fetchCourseAsync, setCourseError, setCourseLoading } from '../../../../slices/courseSlice';
import { fetchAllCourseAsync } from '../../../../slices/manyCourseSlice';

function ChapterAccordionItem({ chapter}) {
  const [deleteModalShowing, setDeleteModalShowing] = useState(false);
  const {id: courseId} = useSelector(state => state.course);
  
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
            
            <button className='btn me-2 display-block btn-info ms-3'>
                <i className='fa fa-edit'></i>
            </button>
            </p>
            
            <div className='col-2 offset-0 d-flex justify-content-end align-items-start'>
              <button className='btn btn-danger me-2 flex-grow-0' onClick={()=>setDeleteModalShowing(true)}>
                <i className='fa fa-trash-can'></i>
              </button>
              
            </div>
          </div>
          <ul className='list-group'>
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
  </>
  )
}



export default ChapterAccordionItem