import React from 'react'

function TopicsContainer({chapters}) {

  return (
        <ol className="list-group list-group-numbered">
            {chapters.map(chapter => (
                <li className="list-group-item d-flex justify-content-between align-items-start" key={chapter.id}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{chapter.name}</div>
                        <ul>
                            {chapter.lessons.map(lesson => (
                                <li>
                                    {lesson.lessonIndex}. {lesson.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </li>
            ))}
    </ol>
  )
}

export default TopicsContainer