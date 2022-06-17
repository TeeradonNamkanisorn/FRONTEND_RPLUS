import React from 'react'

function StudentTransTable({student}) {
    const courses = student.courses;
  return (
    <table className='table table-success table-striped'>
        <thead>
        <tr>
            <th>Transaction ID</th>
            <th>Course Name</th>
            <th>Transfer Value</th>
            <th>Transaction Date</th>
        </tr>
        </thead>
  
    <tbody>

    {
        courses.map(course => (
            <tr key={course.id}>
                <td>{course.studentCourse.chargeId}</td>
                <td>{course.name}</td>
                <td>${course.studentCourse.price}</td>
                <td>{course.studentCourse.createdAt}</td>
            </tr>
           
            ))
            }
    </tbody>
  
</table>
  )
}

export default StudentTransTable