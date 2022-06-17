import React from 'react'

function TeacherTransTable({teacher}) {
    console.log(teacher)
  return (
    <table className='table table-success table-striped'>
        <thead>
        <tr>
            <th>Transaction ID</th>
            <th>Course Name</th>
            <th>Transfer Value</th>
            <th>Earning (THB)</th>
            <th>Transaction Date</th>
        </tr>
        </thead>
        <tbody>
        {
            teacher.courses.map(course => (
                course.students.map(student => (
                    <tr key={student.id}>
                        <td>{student.studentCourse.chargeId}</td>
                        <td>{course.name}</td>
                        <td>{student.studentCourse.price}</td>
                        <td>{student.studentCourse.teacherEarningTHB}</td>
                        <td>{student.studentCourse.createdAt}</td>
                    </tr>
                ))
            ))
        }
        </tbody>
    </table>
  )
}



export default TeacherTransTable