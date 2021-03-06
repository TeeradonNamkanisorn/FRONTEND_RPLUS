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

function ChapterEditContainer({chapters}) {

  return (
<div className="accordion" id="accordionExample">
  {chapters.map(chapter => (
    <ChapterAccordionItem  chapter={chapter} chapters={chapters} key={chapter.id}/>
  ))}
  
</div>
  )
}

export default ChapterEditContainer