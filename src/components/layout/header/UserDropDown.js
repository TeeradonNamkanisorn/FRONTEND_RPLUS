import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../../../slices/cartSlice';
import { clearCourse } from '../../../slices/courseSlice';
import { clearAllCourses } from '../../../slices/manyCourseSlice';
import { logout } from '../../../slices/userInfoSlice';

function UserDropDown() {
    const {username, role} = useSelector(state => state.userInfo.info);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const handleLogoutClick = () => {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearCourse());
        dispatch(clearAllCourses());
        navigate("/");
      };

  return (
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
    {username || "guest"}
  </button>
  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    <li><Link class="dropdown-item " to="/">Home</Link></li>
    <li><Link class="dropdown-item " to="/edit-user">Edit Profile</Link></li>
    {(role === "student" && <li><Link className='dropdown-item' to="/search">Buy courses</Link></li>)}
    <li><Link class="dropdown-item" to="/transactions">View Payment History</Link></li>
    <li><hr class="dropdown-divider"/></li>
    <li><span class="dropdown-item" onClick={() => handleLogoutClick()}>Logout</span></li>
  </ul>
</div>
  )
}

export default UserDropDown