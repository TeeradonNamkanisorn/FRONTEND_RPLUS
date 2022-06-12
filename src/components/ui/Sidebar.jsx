import React, { useEffect, useId, useState } from 'react'
import {Offcanvas} from "bootstrap";

function Sidebar({toggle, children, title}) {
    const [offCanvas, setOffcanvas] = useState(null);
    const ofcId = useId();
    useEffect(() => {
        const offc = new Offcanvas(document.getElementById(ofcId));

        setOffcanvas(offc)
    }, [])

    useEffect(() => {
        
        if (offCanvas == null) return;
        offCanvas.toggle();
    }, [toggle])

    
  return (
    <>
    
    <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id={ofcId} aria-labelledby="offcanvasWithBothOptionsLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            {children}
        </div>
    </div>
    </>
  )
}

export default Sidebar