import React from 'react'

function ProgressBar({percentage}) {
  return (
    <div className='d-flex mt-3 align-items-center'>
        <p style={{marginTop: 16, marginBottom: 20}}>Progress</p>
        <div className='bg-lightGray w-100 my-3 ms-2' style={{height: 24, position: 'relative'}}>
            <div className='border bg-success text-light text-center progress-box' style={{left: `${percentage-5}%`}}>{percentage+"%"}</div>
            <div className='bg-info' style={{width: `${percentage}%`, height: "100%"}}></div>
        </div>
    </div>
  )
}

export default ProgressBar