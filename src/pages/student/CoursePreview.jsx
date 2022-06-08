import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import TopicsContainer from '../../components/layout/chapter/TopicsContainer';
import { genJPDate, secondsToHm, timeSince } from '../../services/timeFormatter';
import { fetchCourseAsync } from '../../slices/courseSlice';
import { addToCart } from '../../slices/cartSlice';
import Modal from '../../components/ui/Modal';


//
function CoursePreview() {

    const dispatch = useDispatch();
    const course = useSelector(state => state.course);
    const chapters = course.chapters;
    const vid = useRef(null);
    const [showModal, setShowModal] = useState(false);
    
    const length = secondsToHm(Math.floor(course.totalLength));
    const {courseId} = useParams();
    const isInCart = Boolean(useSelector(state => state.cart.cart[courseId]))
    
    const {price, name, description, imageLink, level, videoLink, updatedAt} = course;
    useEffect(() => {
        dispatch(fetchCourseAsync({courseId}))
    },[]);


    useEffect(() => {
        if (vid.current !== null) {
            vid.current.load();
        }
    }, [course])

    const handleAddCart = () => {
        dispatch(addToCart({courseId, price, teacherFirstName: course.teacher.firstName,
        teacherLastName: course.teacher.lastName, name, description, imageLink}))
        setShowModal(false);
    }
  return (
    <div className='container'>
        <div className="row">
            <div className="col-sm-8">
                <div className="mb-3">
                <h5 className="text-center">{name}</h5>
                <div className='d-flex justify-content-center'>
                    <img src={imageLink} className="" style={{maxHeight: 400, maxWidth: 400}} alt="course preview image"/>
                </div>
                <div className="">
                    <p className='text-center'>Course Description</p>
                    <p className="w-75 mx-auto">{description}</p>
                    <div className='d-flex w-75 mx-auto justify-content-between'>
                        <p className="">Level: {level}</p>
                        <p>Total Length: {length}</p>
                    </div>
                    <p className="w-75 mx-auto"><small className="text-muted">Updated: {timeSince(updatedAt)} ago</small></p>
                </div>

                <h5>
                    <TopicsContainer chapters={chapters}/>
                </h5>
                </div>
            </div>
            <div className="col-sm-4">
                <h5>Course Preview Video</h5>
                <video width="400" height="400" controls ref={vid}>
                    <source src={videoLink}/>
                    Your browser does not support the video tag.
                </video>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-success' onClick={() => setShowModal(true)} disabled={isInCart}>Add To Cart</button>
                </div>
            </div>
        </div>
        <Modal showing={showModal} setShowing={setShowModal} size="lg" title="Added to cart" center>
            <p>Press confirm to add the product to the cart. Please navigate to the cart by the icon on the navigation bar to process the payment.</p>
            <div className='d-flex w-50 justify-content-between mx-auto mt-5'>
                <button className='btn btn-success' onClick={handleAddCart}>Confirm</button>
                <button className='btn btn-danger' onClick={() => setShowModal(false)}>Cancel</button>
            </div>
        </Modal>
            
    </div>
  )
}

export default CoursePreview