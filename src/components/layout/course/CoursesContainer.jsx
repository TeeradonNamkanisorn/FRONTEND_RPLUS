import React from 'react'
import CourseCard from './CourseCard'

function CoursesContainer({courses}) {
  return (
    <div className='container text-center'>
        {courses.map(course => (
            <CourseCard key={course.id} course={course} />
        ))}
    </div>
  )
}

export default CoursesContainer