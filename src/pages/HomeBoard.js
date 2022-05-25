import React from 'react'
import { useNavigate } from 'react-router-dom'



export default function HomeBoard() {
  const navigate = useNavigate();
  const handleNavClick = () => {
    navigate("/create-new-course");
  }
  return (
    <>
        {/* {<CreateLessonForm/>} */}
        <div className='container d-flex justify-content-center'>
          <div className='d-flex align-items-center justify-content-center w_50'>
            <i className="fa-solid fa-circle-plus fa-3x mx-3"></i>
            <button className='mx-3' onClick={handleNavClick}>Add New Course</button>
          </div>
        </div>
    </>
  )
}
