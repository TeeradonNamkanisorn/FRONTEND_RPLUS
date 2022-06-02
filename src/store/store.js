import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "../slices/userInfoSlice"
import chaptersReducer from "../slices/chapterSlice";

const store =   configureStore({
    reducer: {
        userInfo: userInfoReducer,
        chapters: chaptersReducer
    }
})
export default store; 