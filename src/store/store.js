import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "../slices/userInfoSlice"
import courseReducer from "../slices/courseSlice";
import manyCourseSliceReducer from "../slices/manyCourseSlice";
import cartSliceReducer from "../slices/cartSlice";
const store =   configureStore({
    reducer: {
        
        userInfo: userInfoReducer,
        course: courseReducer,
        manyCourses: manyCourseSliceReducer,
        cart: cartSliceReducer
    }
});
export default store; 
//