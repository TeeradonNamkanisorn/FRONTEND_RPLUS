import React from 'react'
import { useNavigate } from 'react-router-dom'
import { genJPDate, secondsToHm } from "../../../services/timeFormatter";


function CourseCard({course}) {
   const navigate = useNavigate();

   const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}
    const HM = secondsToHm(Math.floor(course.totalLength))
//June 6, 2022
    const updatedDate = genJPDate(course.updatedAt);
    const createdDate = genJPDate(course.createdAt);
  return (
    <div className="card mb-3 mx-auto" style={{maxWidth: 900}}>
        <div className="row g-0">
            <div className="col-md-4">
                <img src={course.imageLink} className="img-fluid rounded-start" alt="course image" />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{course.name}</h5>
                    <p className="card-text">{course.description}</p>
                    
                    <p className="card-text">
                        <small className="text-muted mx-4">Created date:  {createdDate}</small>
                        <small className="text-muted mx-4">Latest update:  {updatedDate}</small>
                    </p>
                    <p className="card-text">{HM}</p>
                    <div className='d-flex justify-content-center'>
                        <div className='d-flex align-items-center justify-content-between '>
                            <p className='my-0'>Level:</p>
                            <div className='mx-5'>
                                {course.level}
                            </div>
                        </div>
                        <p className='card-text mx-5 text-center'>Instructor: {course.teacher.firstName} {course.teacher.lastName}</p>
                    </div>
                    <div className='d-flex w-75 justify-content-between mx-auto my-3'>
                        <button className='btn btn-success' onClick={()=>navigate(`/preview/${course.id}`)}> Preview Course</button>
                        <button className='btn btn-info'>Add to Cart</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseCard