import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Modal from '../../../ui/Modal';
import LessonItem from './LessonItem';

function ChapterAccordionItem({styleClasses, chapter}) {
    const [show, setShow] = useState(false);
    const {lessons = []} = chapter;


    


  const handleClick = e => {
    setShow(prev => !prev);
  }
  return (
    <>
      <div className="accordion-item">
      <h2 className="accordion-header" >
        <button className={show? styleClasses.button.showing : styleClasses.button.hiding} type="button" //data-bs-toggle="collapse" data-bs-target={'#collapse'+chapter?.id}
        onClick={handleClick}>
          Chapter {chapter?.chapterIndex}: {chapter?.name}
        </button>
      </h2> 
      <div  className={show? styleClasses.collapase.showing : styleClasses.collapase.hiding} //aria-labelledby="headingOne" data-bs-parent="#accordionExample" id={'collapse'+chapter?.id}
      >
        <div className="accordion-body">
          <p>{chapter?.description}</p>
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
    
  </>
  )
}



export default ChapterAccordionItem