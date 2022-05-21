import React, { useEffect, useRef, useState } from 'react'

const dragAndDropStyle = {
    border: "dashed grey 4px",
    backgroundColor: "rgba(255,255,255, 0.8)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999
}

function DragAndDrop(props) {
    const {file, setFile} = props;
    const dropRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    
    let dragCounter = useRef(0);



    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDragIn = e => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.dataTransfer.items);
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            dragCounter.current ++;
            setDragging(true);
        }
    }

    const handleDragOut = e => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            dragCounter.current --;
        }
        if (dragCounter.current === 0) {
            setDragging(false);
        }
    }

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            console.log(e.dataTransfer.files);
            e.dataTransfer.clearData();
            dragCounter.current = 0;
        }
    }

   

    useEffect(() => {
        
        dropRef.current.addEventListener("dragenter", handleDragIn);
        dropRef.current.addEventListener("dragleave", handleDragOut);
        dropRef.current.addEventListener("dragover", handleDrag);
        dropRef.current.addEventListener("drop", handleDrop);


        return () => {
            
            dropRef.current.removeEventListener("dragenter", handleDragIn);
            dropRef.current.removeEventListener("dragleave", handleDragOut);
            dropRef.current.removeEventListener("dragover", handleDrag);
            dropRef.current.removeEventListener("drop", handleDrop);
    
        }
    }, [])

  return (
    <label ref={dropRef} htmlFor={props.for} style={{
        border: dragging? "4px solid grey" : "4px dashed grey"
    }} className="dragAndDropContent">
        {dragging &&
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                left: 0,
                textAlign: 'center',
                color: 'grey',
                fontSize: 36
              }}
            >
              <div>drop here :)</div>
          </div>
        }
        {props.children}
    </label>
  )
}

export default DragAndDrop;