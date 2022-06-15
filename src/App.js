import {
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initUser, logout } from "./slices/userInfoSlice";
import { getAccessToken } from "./services/localStorage";
import axios from "./config/axios";
import UserMenu from "./components/layout/header/UserMenu";
import WebRouter from "./routes/WebRouter";
import Spinner from "./components/common/Spinner";
import { clearCart } from "./slices/cartSlice";
import SearchBar from "./components/layout/header/SearchBar";
import { clearAllCourses } from "./slices/manyCourseSlice";
import { clearCourse } from "./slices/courseSlice";
import Toast from "./components/common/Toast";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courseLoading = useSelector((state) => state.course.isLoading);
  const userLoading = useSelector((state) => state.userInfo.isLoading);
  const manyCourseLoading = useSelector((state) => state.manyCourses.isLoading);
  const courseError = useSelector(state=>state.course.error);
  const userError = useSelector(state => state.manyCourses.error)
  const cart = useSelector((state) => state.cart.cart);
  const itemNumber = Object.keys(cart).length;
  const role = useSelector((state) => state.userInfo.info.role);

  const handleLogoutClick = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearCourse());
    dispatch(clearAllCourses());
    navigate("/");
  };

  return (
    <>
      <div className="p-4">
        <div className="row">
          <Link className="col-2" to="/">
            <img
              className="main_logo"
              src="/Remote_logo.png"
              alt="page logo"
            ></img>
          </Link>
          <div className="col-6">{role === "student" && <SearchBar />}</div>
          <div
            className="col-1"
            role="button"
            onClick={() => navigate("/cart")}
          >
            <i className="fa fa-shopping-cart fa-2x"></i>
            {!!itemNumber && (
              <span className="badge bg-warning ms-1">{itemNumber}</span>
            )}
          </div>
          <div className="col-3">
            <UserMenu className="text-center" />
            <Link to="/edit-user/:userId">Update Profile</Link>
            <Link to="/login" className="text-center">
              Login
            </Link>
            <button onClick={handleLogoutClick}> Logout </button>
          </div>
        </div>
        <WebRouter />
      </div>

      {(courseLoading || userLoading || manyCourseLoading) && (
        <Spinner title="Please wait for the course content to load"></Spinner>
      )}
      {courseError && <Toast error={courseError}/>}
      {userError && <Toast error={userError}/>}
    </>
  );
}

export default App;
