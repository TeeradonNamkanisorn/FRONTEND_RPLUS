import React from 'react'
import { useNavigate } from 'react-router-dom';
import { genJPDate, secondsToHm } from '../../../services/timeFormatter';
import ProgressBar from '../../display/ProgressBar';
import CertificateButton from '../../ui/CertificateButton';


function StudentCourseCard({course}) {
    const navigate = useNavigate();
    const {updatedAt, totalLength, createdAt, numberCompleted, numberLesson} = course;
    const createdDate = genJPDate(createdAt);
    const updatedDate = genJPDate(updatedAt);
    const HM = secondsToHm(Math.ceil(totalLength));
    const percentage = numberCompleted * 100/numberLesson;
   
    
    
  //
  return (
    <div className="card mb-3 mx-auto" style={{maxWidth: 900}}>
        <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center flex-column">
                <img src={course.imageLink} className="rounded-start course-img" alt="course image" />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{course.name}</h5>
                    <p className="card-text border" style={{maxHeight: 200, overflow: "auto"}}>{course.description}</p>
                    
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
                    <ProgressBar percentage={percentage}/>
                    
                   
                    <div className='d-flex w-75 justify-content-between mx-auto my-3'>
                        <button className='btn btn-success align-self-start' onClick={()=>navigate(`/study/${course.id}`)}> Go To Course</button>
                        <CertificateButton courseId={course.id} percentage={percentage}/>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default StudentCourseCard