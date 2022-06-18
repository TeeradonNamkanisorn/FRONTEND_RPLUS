import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function StudyLessonItem({lesson, chapterId}) {
    const navigate = useNavigate();
    const params = useParams();
    const currentLessonId = params.lessonId;
  return (
    <div>
    {/* <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
            The current button
        </button> */}
        <button type="button" className={`list-group-item list-group-item-action ${currentLessonId === lesson.id? 'active': ''}`} 
        onClick={() => navigate(`${chapterId}/${lesson.id}`)}>
            <div className='row'>
                <div className='col-sm-1'>
                    {lesson.lessonIndex}
                </div>
                <div className='col-sm-9'>
                    {lesson.title}
                </div>
            </div>
        </button>
    </div>
  )
}

export default StudyLessonItem