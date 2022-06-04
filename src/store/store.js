import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "../slices/userInfoSlice"
import courseReducer from "../slices/courseSlice";

const store =   configureStore({
    reducer: {
        userInfo: userInfoReducer,
        course: courseReducer
    }
})
export default store; 