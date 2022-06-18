import React from 'react'
import { useNavigate } from 'react-router-dom'

function SuccessPay() {
    const navigate = useNavigate();

  return (
    <div>
        <div className='d-flex justify-content-center align-items-center'>
            <i className="fa-solid fa-circle-check text-success fa-4x"></i>
            <p className="my-0 h3 mx-3">Payment Success!</p>
        </div>
        <p className='mx-auto text-center my-5'>You wiill find your payment history
         <strong role={"button"} onClick={()=>navigate('/')}>here</strong></p>
        <p className='mx-auto text-center'>Click to checkout newly added courses</p>
    </div>
  )
}


export default SuccessPay