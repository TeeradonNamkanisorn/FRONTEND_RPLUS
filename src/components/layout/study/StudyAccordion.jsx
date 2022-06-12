import React from 'react'
import StudyAccordionItem from './StudyAccordionItem'

function StudyAccordion({chapters}) {

    
   
  return (
    <div className="accordion accordion-flush" id="studyAccordion">
    {chapters.map(chapter => {
        return <StudyAccordionItem key={chapter.id} chapter={chapter}/>
    })}

</div>
  )
}

export default StudyAccordion