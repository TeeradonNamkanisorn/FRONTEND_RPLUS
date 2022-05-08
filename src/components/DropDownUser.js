import React, { useState, useRef } from 'react'

function DropDownUser() {
    const dropDownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    }
    
  return (
    <div>DropDownUser</div>
  )
}

export default DropDownUser