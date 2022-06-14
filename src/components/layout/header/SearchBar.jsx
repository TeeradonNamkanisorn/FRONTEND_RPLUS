import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCourseAsync,
  setSearchKeyword,
} from "../../../slices/manyCourseSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.manyCourses.searchKeyword);
  const keywordForm = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchAllCourseAsync({
        keyword,
      })
    );
  };

  const handleClickSubmit = async () => {
    await dispatch(
      fetchAllCourseAsync({
        keyword,
      })
    );
    dispatch(setSearchKeyword(""));
  };

  const handleChange = (e) => {
    dispatch(setSearchKeyword(e.target.value));
  };

  return (
    <form onSubmit={handleSubmit} ref={keywordForm}>
      <label htmlFor="courseKeyword" className="me-3">
        Search Course
      </label>
      <input
        className="mx-auto w-60"
        id="courseKeyword"
        placeholder="enter course keyword"
        value={keyword}
        onChange={handleChange}
      />
      <i
        className="fa-solid fa-magnifying-glass ms-3"
        role={"button"}
        onClick={handleClickSubmit}
      ></i>
    </form>
  );
}

export default SearchBar;
