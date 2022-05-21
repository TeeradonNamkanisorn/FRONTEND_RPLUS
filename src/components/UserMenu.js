import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { userInfoCtx } from '../contexts/userInfoCtx'

function UserMenu() {
    const {state, dispatch} = useContext(userInfoCtx);
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const toggleActive = () => {
        setIsActive(!isActive);
    };
    const handleClickOutside = (e) => {
        if (!dropdownRef.current.contains(e.target) && dropdownRef.current !== null) {
            setIsActive(false);
        }
    }

    useEffect(() => {
        if(isActive) {
            setTimeout(() => {
                window.addEventListener("click", handleClickOutside);
            });
        }
        return () => {
            window.removeEventListener("click", handleClickOutside);
        }
    },[isActive])
    const username = state.personal.username;
  return (
    <div>
        <div className="menu-container">
      <button onClick={toggleActive} className="menu-trigger">
        <span>{username || "Guest"}</span>
        <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg" alt="User avatar" />
      </button>
      <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
          <li>{state.personal? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}</li>
          <li><a href="/trips">Trips</a></li>
          <li><a href="/saved">Saved</a></li>
        </ul>
      </nav>
    </div>
    </div>
  )
}

export default UserMenu