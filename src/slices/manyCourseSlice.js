import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";
import { getAccessToken } from "../services/localStorage";

//Fetch all NOT OWNED
const fetchAllCourseAsync  = createAsyncThunk("fetchAll", async (payload = {}, thunkApi) => {
    try {
        //query = {popularity: true, keyword: "foo"}
        const query = payload;
        let requestQuery = "?"
        for (let key in query) {
            requestQuery +=  (key + "=" + query[key] + "&")
        }

        //Remove the last &
        requestQuery = requestQuery.slice(0, requestQuery.length-1);
        

        const res = await axios.get('/course/'+requestQuery);
        return res.data;
    } catch (err) {
        console.log(err);
        return thunkApi.rejectWithValue(err.response.data.message|| err.message || "server error")
        
    }
});

const fetchOwnCoursesAsync = createAsyncThunk("fetchOwned", async (payload, thunkApi) => {
    try {
        const res = await axios.get('course/owned');
        return res.data;
    } catch(err) {
        return thunkApi.rejectWithValue(err?.response?.data?.message|| err?.message || "request error")
    }
});

const manyCourseSlice = createSlice({
    name: "manyCourse",
    initialState: {
        courses: [],
        error: "",
        isLoading: false
    },
    reducers: {
      
    },
    extraReducers: builder => {
        builder
        .addCase(fetchAllCourseAsync.fulfilled, (state, action) => {
            state.courses = action.payload.courses;
            state.isLoading = false
            state.error = ""
        })
        .addCase(fetchAllCourseAsync.pending, (state, action) => {
            state.isLoading = true;
            state.error = "";
        })
        .addCase(fetchAllCourseAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
        .addCase(fetchOwnCoursesAsync.fulfilled, (state, action) => {
            state.courses = action.payload.courses;
            state.isLoading = false
            state.error = ""
        })
        .addCase(fetchOwnCoursesAsync.pending, (state, action) => {
            state.isLoading = true;
            state.error = ""
        })
        .addCase(fetchOwnCoursesAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
});

export {fetchAllCourseAsync, fetchOwnCoursesAsync};
export default manyCourseSlice.reducer;

