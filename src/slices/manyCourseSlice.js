import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";
import { getAccessToken } from "../services/localStorage";

const fetchAllCourseAsync  = createAsyncThunk("fetchAll", async (payload, thunkApi) => {
    try {
        const res = await axios.get('/course/');
        return res.data;
    } catch (err) {
        thunkApi.rejectWithValue(err.response.data.message)
    }
});

const manyCourseSlice = createSlice({
    name: "manyCourse",
    initialState: {
        courses: [],
        error: {
            message: ""
        },
        isLoading: false
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
        .addCase(fetchAllCourseAsync.fulfilled, (state, action) => {
            state.courses = action.payload.courses;
            state.isLoading = false
        })
        .addCase(fetchAllCourseAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchAllCourseAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error.message = action.payload
        })
    }
});

export {fetchAllCourseAsync};
export default manyCourseSlice.reducer;

