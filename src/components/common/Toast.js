import React, { useEffect, useRef, useState } from 'react';
import {Toast as BsToast} from "bootstrap";

const Toast = ({error}) => {
    const ref = useRef(null);
    const [myToast, setMyToast] = useState(null);

    console.log("error:" ,error);
    useEffect(()=>{
        const toast = new BsToast(ref.current);
        setMyToast(toast);
    }, []);

    useEffect(() => {
        if (error && myToast) {
            myToast.show()
            console.log("showing")
        }
    }, [error, myToast]); 

  return (
    <div className="toast-container position-absolute p-3 start-50 bottom-0 translate-middle-x position-fixed" style={{zIndex: 5000}}>
          <div className="toast align-items-center text-white bg-danger border-0" ref={ref}>
            <div className="d-flex">
              <div className="toast-body">{error}</div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast"
                ></button>
              </div>
            </div>
          </div>
  )
}

export default Toast