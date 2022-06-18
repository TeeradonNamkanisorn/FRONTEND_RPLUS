import React, { useId } from 'react'
import { useParams } from 'react-router-dom';
import StudyLessonItem from './StudyLessonItem';

function StudyAccordionItem({chapter}) {
    
    const id = chapter.id;
    const {chapterId: currentChapterId} = useParams();


    
  return (
    <div className="accordion-item">
        <h2 className="accordion-header" id={`flush-heading${id}`}>
        <button className={`accordion-button collapsed `} type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapse"+id} aria-expanded="false" aria-controls={"flush-collapse"+id}
        style={ currentChapterId === id? {
        backgroundColor:" #d0e2fe", color: "#084298"
        } : {}}
        >
            {chapter.chapterIndex+". "} {chapter.name}
        </button>
        </h2>
        <div id={"flush-collapse"+id} className="accordion-collapse collapse" aria-labelledby={`flush-heading${id}`} data-bs-parent="#studyAccordion">
        <div className="accordion-body">
            
            <div className='list-group'>

                {chapter.lessons.map(lesson => (
                    <StudyLessonItem lesson={lesson} chapterId={chapter.id} key={lesson.id}/>
                ))}
            </div>
        </div>
        </div>
    </div>
  )
}

export default StudyAccordionItem