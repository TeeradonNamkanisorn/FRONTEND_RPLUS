import React from 'react'
import { Link } from 'react-router-dom'


function CourseSelectMenu({courses}) {
  return (
    <div className="list-group">
    {courses?.map((course,idx) =>
      <div key={idx} style={{border: "5px solid black"}}>
        <Link to={`/modify-course/${course.id}`} className="list-group-item list-group-item-action">
        {course.name}
        </Link>
        <div>
            <img src={course.imageLink} style={{width: 100, height: 100}}></img>
        </div>
      </div>
      )}
  </div>
  )
}

export default CourseSelectMenu