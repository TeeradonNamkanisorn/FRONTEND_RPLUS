import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import TopicsContainer from '../../components/layout/chapter/TopicsContainer';
import { genJPDate, secondsToHm, timeSince } from '../../services/timeFormatter';
import { fetchCourseAsync } from '../../slices/courseSlice';


//
function CoursePreview() {

    const dispatch = useDispatch();
    const course = useSelector(state => state.course);
    const chapters = course.chapters;
    const vid = useRef(null)
    
    const length = secondsToHm(Math.floor(course.totalLength));
    const {courseId} = useParams();
    useEffect(() => {
        dispatch(fetchCourseAsync({courseId}))
    },[]);


    useEffect(() => {
        if (vid.current !== null) {
            vid.current.load();
        }
    }, [course])


  return (
    <div className='container'>
        <div className="row">
            <div className="col-sm-8">
                <div className="mb-3">
                <h5 className="text-center">{course.name}</h5>
                <div className='d-flex justify-content-center'>
                    <img src={course.imageLink} className="" style={{maxHeight: 400, maxWidth: 400}} alt="course preview image"/>
                </div>
                <div className="">
                    <p className='text-center'>Course Description</p>
                    <p className="w-75 mx-auto">{course.description}</p>
                    <div className='d-flex w-75 mx-auto justify-content-between'>
                        <p className="">Level: {course.level}</p>
                        <p>Total Length: {length}</p>
                    </div>
                    <p className="w-75 mx-auto"><small className="text-muted">Updated: {timeSince(course.updatedAt)} ago</small></p>
                </div>

                <h5>
                    <TopicsContainer chapters={chapters}/>
                </h5>
                </div>
            </div>
            <div className="col-sm-4">
                <h5>Course Preview Video</h5>
                <video width="400" height="400" controls ref={vid}>
                    <source src={course.videoLink}/>
                    Your browser does not support the video tag.
                </video>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-success'>Add To Cart</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default CoursePreview