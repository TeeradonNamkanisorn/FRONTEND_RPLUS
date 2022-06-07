import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "../slices/userInfoSlice"
import courseReducer from "../slices/courseSlice";
import globalErrorReducer from "../slices/globalErrorSlice";
import manyCourseSliceReducer from "../slices/manyCourseSlice";
const store =   configureStore({
    reducer: {
        globalError: globalErrorReducer,
        userInfo: userInfoReducer,
        course: courseReducer,
        manyCourses: manyCourseSliceReducer
    }
});
export default store; 