import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseAsync,
  setCourseError,
  setCourseLoading,
} from "../../slices/courseSlice";
import axios from "../../config/axios";

function PriceEditor() {
  const { price, id: courseId } = useSelector((state) => state.course);
  const [coursePrice, setCoursePrice] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    setCoursePrice(price);
  }, [price]);

  const handleUpdatePrice = async () => {
    try {
      dispatch(setCourseLoading(true));
      dispatch(setCourseError(""));

      await axios.patch(`/course/${courseId}/price`, {
        price: coursePrice,
      });

      dispatch(fetchCourseAsync({ courseId }));
    } catch (err) {
      dispatch(
        setCourseError(
          err.response?.data?.value || err.message || "request error"
        )
      );
    } finally {
      dispatch(setCourseLoading(false));
    }
  };
  return (
    <div className="row">
      <label htmlFor="priceRange" className="form-label col-1">
        Set Price
      </label>
      <div className="col-6">
        <input
          type="range"
          className="form-range"
          min="5"
          max="15"
          step="0.5"
          id="priceRange"
          value={coursePrice}
          onChange={(e) => setCoursePrice(e.target.value)}
        ></input>
      </div>
      <span className="col-1">${coursePrice}</span>
      <button className="col-2 btn btn-success" onClick={handleUpdatePrice}>
        Set New Price
      </button>
    </div>
  );
}

export default PriceEditor;


