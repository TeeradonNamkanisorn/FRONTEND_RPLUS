import React, { useState } from 'react'
import ChapterAccordionItem from './ChapterAccordionItem'
const styleClasses = {
  collapase: {
    showing: 'accordion-collapse collapse show',
    hiding: 'accordion-collapes collapse'
  },
  button: {
    showing: 'accordion-button',
    hiding: 'accordion-button collapsed'
  }
}

function ChapterEditContainer({chapters, fetchChapters}) {
  

  return (
<div className="accordion" id="accordionExample">
  {chapters.map(chapter => (
    <ChapterAccordionItem styleClasses={styleClasses} chapter={chapter} fetchChapters={fetchChapters} key={chapter.id}/>
  ))}
  
</div>
  )
}

export default ChapterEditContainer