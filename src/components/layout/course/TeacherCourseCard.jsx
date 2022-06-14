import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { genJPDate, secondsToHm } from "../../../services/timeFormatter";

function TeacherCourseCard({ course }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showing, setShowing] = useState(false);
  console.log(course);
  const { id: courseId, price, name, description, imageLink } = course;

  const HM = secondsToHm(Math.round(course.totalLength));
  //June 6, 2022
  const updatedDate = genJPDate(course.updatedAt);
  const createdDate = genJPDate(course.createdAt);

  return (
    <div className="card mb-3 mx-auto p-3" style={{ maxWidth: 900 }}>
      <div className="row g-0">
        <div className="col-md-4 d-flex flex-column justify-content-center">
          <img
            src={imageLink}
            className="img-fluid rounded-start"
            alt="course image"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p
              className="card-text border p-2"
              style={{ maxHeight: 200, overflow: "auto" }}
            >
              {course.description}
            </p>

            <p className="card-text">
              <small className="text-muted mx-4">
                Created date: {createdDate}
              </small>
              <small className="text-muted mx-4">
                Latest update: {updatedDate}
              </small>
            </p>
            <p className="card-text">{HM}</p>
            <div className="d-flex justify-content-center">
              <div className="d-flex align-items-center justify-content-between ">
                <p className="my-0">Level:</p>
                <div className="mx-5">{course.level}</div>
              </div>
              <p className="card-text mx-5 text-center">Instructor: Me</p>
            </div>

            <div className="d-flex justify-content-between w-75">
            <span className="text-center ms-5">Current Price: <strong>{"$" + price}</strong></span>
            
            <span className="text-center">Number of Students: <strong>{course.students.length}</strong></span>
            </div>
          </div>
          <div className="d-flex w-75 justify-content-between mx-auto my-3">
            <button
              className="btn btn-success"
              onClick={() => navigate(`/modify-course/${course.id}`)}
            >
              {" "}
              Edit Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseCard;
