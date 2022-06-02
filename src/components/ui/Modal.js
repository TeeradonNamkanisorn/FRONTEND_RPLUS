import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { Modal as BsModal} from 'bootstrap'
function Modal(props) {
    const modalId = useId();
    const {showing, setShowing, children, size, title} = props;

    const sizeClass = {
        sm: `modal-sm`,
        lg: `modal-lg`,
        xl: `modal-xl`
    }
    
    const [modal, setModal] = useState(null);

    useEffect(() => {
        const myModal = document.getElementById(''+modalId);
        const theModal = new BsModal(myModal);
        setModal(theModal);
    }, [])

    useEffect(() => {
        
        
        if (showing) {
            modal?.show()
        } else {
            modal?.hide();
        }

    }, [showing]);

    
    
  return <>
      {<div className="modal" tabIndex="-1" id={modalId} onClick={(e) => {setShowing(prev => !prev)}}>
        <div className={`modal-dialog ${sizeClass[size] || ''}`} onClick={e=>e.stopPropagation()}>
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{title || "Modal Title"}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" 
                onClick={(e) => {e.stopPropagation();setShowing(prev => !prev)}}></button>
            </div>
            <div className="modal-body">
                {children}
            </div>
            </div>
        </div>
    </div>}
  </>
  
}

export default Modal