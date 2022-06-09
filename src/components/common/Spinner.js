import React from 'react'

function Spinner({title}) {
  return (
    <div className="d-flex justify-content-center align-items-center offcanvas-backdrop show" style={{zIndex: 1100}}>
            <span className='ms-3'>{title || "now loading..."}</span>
        <div className='spinner-border text-primary'></div>
    </div>
  )
}

export default Spinner