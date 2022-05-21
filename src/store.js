import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./slices/userInfoSlice";
export default configureStore({
    reducer: {
        userInfo: userInfoReducer,
    }
})